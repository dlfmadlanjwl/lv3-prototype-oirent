import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchView from '../components/SearchView';
import ItemDetailView from '../components/ItemDetailView';
import ChatListView from '../components/ChatListView';
import ChatView from '../components/ChatView';
import BorrowedItemsView from '../components/BorrowedItemsView';
import ProfileView from '../components/ProfileView';
import ReviewView from '../components/ReviewView';
import MessageModal from '../components/MessageModal';
import TipsModal from '../components/TipsModal';
import RentalRequestView from '../components/RentalRequestView';
import { rentalItems, jjangguBorrowedItems, mockChatList } from '../data/mockData';
import type { RentalItem, BorrowedItem, ChatItem, Review } from '../types';

const Index = () => {
  const [currentView, setCurrentView] = useState<string>('search');
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [selectedChatPartner, setSelectedChatPartner] = useState<string>('');
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>(jjangguBorrowedItems);
  const [messageModal, setMessageModal] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [tipsModal, setTipsModal] = useState<{ show: boolean; content: string; loading: boolean }>({ show: false, content: '', loading: false });
  const [items, setItems] = useState<RentalItem[]>(rentalItems);
  const [searchResults, setSearchResults] = useState<RentalItem[]>(rentalItems);
  const [reviewData, setReviewData] = useState<{ itemId: string; itemName: string } | null>(null);
  const [rentalRequestItem, setRentalRequestItem] = useState<RentalItem | null>(null);

  // 검색 함수
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(items);
      return;
    }
    
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  // 물품 선택
  const handleItemSelect = (item: RentalItem) => {
    setSelectedItem(item);
    setCurrentView('itemDetail');
  };

  // 대여 요청
  const handleRentRequest = (itemId: string) => {
    const newBorrowedItem: BorrowedItem = {
      itemId,
      status: '대여 중',
      rentDate: new Date().toISOString()
    };
    
    setBorrowedItems([...borrowedItems, newBorrowedItem]);
    
    // 물품 상태 업데이트
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, isAvailable: false, currentRenterId: 'jjanggu' } : item
      )
    );
    
    setSearchResults(prevResults => 
      prevResults.map(item => 
        item.id === itemId ? { ...item, isAvailable: false, currentRenterId: 'jjanggu' } : item
      )
    );
    
    showMessage('대여 요청이 완료되었습니다!');
  };

  // 반납 처리
  const handleReturn = (itemId: string) => {
    setBorrowedItems(prevItems => 
      prevItems.map(item => 
        item.itemId === itemId ? { ...item, status: '반납 완료' } : item
      )
    );
    
    // 물품 상태 업데이트
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, isAvailable: true, currentRenterId: undefined } : item
      )
    );
    
    setSearchResults(prevResults => 
      prevResults.map(item => 
        item.id === itemId ? { ...item, isAvailable: true, currentRenterId: undefined } : item
      )
    );
    
    showMessage('반납이 완료되었습니다!');
  };

  // 메시지 모달 표시
  const showMessage = (message: string) => {
    setMessageModal({ show: true, message });
  };

  // 사용 팁 생성
  const generateTips = async (itemName: string) => {
    setTipsModal({ show: true, content: '', loading: true });
    
    // 실제 API 호출 대신 가상 데이터로 시뮬레이션
    setTimeout(() => {
      const tips = `${itemName} 사용 팁:\n\n1. 사용 전 물품 상태를 꼼꼼히 확인하세요\n2. 설명서가 있다면 반드시 읽어보세요\n3. 사용 후에는 깨끗하게 정리해주세요\n4. 문제가 생기면 즉시 대여자에게 연락하세요\n5. 반납 시간을 꼭 지켜주세요`;
      setTipsModal({ show: true, content: tips, loading: false });
    }, 2000);
  };

  // 리뷰 작성
  const handleReviewSubmit = (review: Review) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === review.itemId
          ? { ...item, reviews: [...item.reviews, review] }
          : item
      )
    );
    
    setSearchResults(prevResults =>
      prevResults.map(item =>
        item.id === review.itemId
          ? { ...item, reviews: [...item.reviews, review] }
          : item
      )
    );
    
    showMessage('리뷰가 작성되었습니다!');
    setCurrentView('itemDetail');
  };

  // 채팅 선택
  const handleChatSelect = (partnerName: string) => {
    setSelectedChatPartner(partnerName);
    setCurrentView('chat');
  };

  // 대여 시간 선택 및 요청 페이지로 이동
  const handleRentRequestWithTime = (item: RentalItem) => {
    setRentalRequestItem(item);
    setCurrentView('rentalRequest');
  };

  // 뷰 렌더링
  const renderCurrentView = () => {
    switch (currentView) {
      case 'search':
        return (
          <SearchView
            items={searchResults}
            onSearch={handleSearch}
            onItemSelect={handleItemSelect}
            borrowedItems={borrowedItems}
          />
        );
      case 'itemDetail':
        return selectedItem ? (
          <ItemDetailView
            item={selectedItem}
            onBack={() => setCurrentView('search')}
            onRentRequest={handleRentRequest}
            onRentRequestWithTime={handleRentRequestWithTime}
            onReturn={handleReturn}
            onGenerateTips={generateTips}
            onWriteReview={(itemId, itemName) => {
              setReviewData({ itemId, itemName });
              setCurrentView('review');
            }}
            borrowedItems={borrowedItems}
          />
        ) : null;
      case 'chatList':
        return (
          <ChatListView
            chatList={mockChatList}
            onBack={() => setCurrentView('search')}
            onChatSelect={handleChatSelect}
          />
        );
      case 'chat':
        return (
          <ChatView
            partnerName={selectedChatPartner}
            onBack={() => setCurrentView('chatList')}
          />
        );
      case 'borrowedItems':
        return (
          <BorrowedItemsView
            borrowedItems={borrowedItems}
            items={items}
            onBack={() => setCurrentView('search')}
            onReturn={handleReturn}
            onItemSelect={handleItemSelect}
          />
        );
      case 'profile':
        return (
          <ProfileView
            onBack={() => setCurrentView('search')}
            items={items.filter(item => item.ownerId === 'jjanggu')}
            onItemSelect={handleItemSelect}
          />
        );
      case 'review':
        return reviewData ? (
          <ReviewView
            itemId={reviewData.itemId}
            itemName={reviewData.itemName}
            onBack={() => setCurrentView('itemDetail')}
            onSubmit={handleReviewSubmit}
          />
        ) : null;
      case 'rentalRequest':
        return rentalRequestItem ? (
          <RentalRequestView
            item={rentalRequestItem}
            onBack={() => setCurrentView('itemDetail')}
            onRequest={(itemId, startDate, endDate) => {
              // 실제 대여 요청 처리: 기존 handleRentRequest 재사용 가능
              handleRentRequest(itemId);
              setCurrentView('itemDetail');
            }}
            reservedTimes={[
              // 예시: 예약된 시간대 (실제 데이터로 교체 가능)
              { start: '2024-06-22T10:00', end: '2024-06-22T14:00' },
              { start: '2024-06-23T09:00', end: '2024-06-23T12:00' }
            ]}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      
      <main className="pb-4">
        {renderCurrentView()}
      </main>

      {/* 메시지 모달 */}
      {messageModal.show && (
        <MessageModal
          message={messageModal.message}
          onClose={() => setMessageModal({ show: false, message: '' })}
        />
      )}

      {/* 사용 팁 모달 */}
      {tipsModal.show && (
        <TipsModal
          content={tipsModal.content}
          loading={tipsModal.loading}
          onClose={() => setTipsModal({ show: false, content: '', loading: false })}
        />
      )}
    </div>
  );
};

export default Index;
