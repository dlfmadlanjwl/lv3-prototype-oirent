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
import RentalRequestView from '../components/RentalRequestView';
import PointHistoryView from '../components/PointHistoryView';
import OwnerProfileView from '../components/OwnerProfileView';
import OwnerRentalPeriodView from '../components/OwnerRentalPeriodView';
import ItemRegistrationView from '../components/ItemRegistrationView';
import { rentalItems, jjangguBorrowedItems, mockChatList, pointTransactions, currentUser } from '../data/mockData';
import type { RentalItem, BorrowedItem, ChatItem, Review, FavoriteItem } from '../types';

const Index = () => {
  const [currentView, setCurrentView] = useState<string>('search');
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [selectedChatPartner, setSelectedChatPartner] = useState<string>('');
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>(jjangguBorrowedItems);
  const [messageModal, setMessageModal] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [items, setItems] = useState<RentalItem[]>(rentalItems);
  const [searchResults, setSearchResults] = useState<RentalItem[]>(rentalItems);
  const [reviewData, setReviewData] = useState<{ itemId: string; itemName: string; target?: string } | null>(null);
  const [rentalRequestItem, setRentalRequestItem] = useState<RentalItem | null>(null);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [previousView, setPreviousView] = useState<string>('search');
  const [ownerProfile, setOwnerProfile] = useState<{ ownerId: string } | null>(null);
  const [periodItem, setPeriodItem] = useState<RentalItem | null>(null);

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
    setPreviousView(currentView);
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

  // 관심 품목 등록/해제
  const handleToggleFavorite = (itemId: string) => {
    setFavoriteItems(prev => {
      const isFavorite = prev.some(fav => fav.itemId === itemId);
      if (isFavorite) {
        return prev.filter(fav => fav.itemId !== itemId);
      } else {
        return [...prev, { itemId, addedAt: new Date().toISOString() }];
      }
    });
  };

  // 관심 품목 여부 확인
  const isFavorite = (itemId: string) => {
    return favoriteItems.some(fav => fav.itemId === itemId);
  };

  // 포인트 내역 페이지로 이동
  const handleNavigateToPointHistory = () => {
    setCurrentView('pointHistory');
  };

  // 대여자 정보 보기
  const handleOwnerClick = (ownerId: string) => {
    setOwnerProfile({ ownerId });
    setCurrentView('ownerProfile');
  };

  // 대여 가능 기간 설정 진입
  const handleSetPeriod = () => {
    setPeriodItem(selectedItem);
    setCurrentView('setPeriod');
  };

  // 대여 가능 기간 저장
  const handleSavePeriod = (periods: { start: string; end: string }[]) => {
    if (!periodItem) return;
    setItems(prev => prev.map(item => item.id === periodItem.id ? { ...item, availablePeriods: periods } : item));
    setSearchResults(prev => prev.map(item => item.id === periodItem.id ? { ...item, availablePeriods: periods } : item));
    setCurrentView('itemDetail');
  };

  // 물품 등록 페이지로 이동
  const handleRegisterItem = () => {
    setCurrentView('itemRegistration');
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
            onRegisterItem={handleRegisterItem}
          />
        );
      case 'itemDetail':
        return selectedItem ? (
          <ItemDetailView
            item={selectedItem}
            onBack={() => setCurrentView(previousView)}
            onRentRequest={handleRentRequest}
            onRentRequestWithTime={handleRentRequestWithTime}
            onReturn={handleReturn}
            onWriteReview={(itemId, itemName) => {
              setReviewData({ itemId, itemName });
              setCurrentView('review');
            }}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite(selectedItem.id)}
            borrowedItems={borrowedItems}
            currentUserId="jjanggu"
            onOwnerClick={handleOwnerClick}
            onSetPeriod={handleSetPeriod}
          />
        ) : null;
      case 'chatList':
        return (
          <ChatListView
            chatList={mockChatList}
            onBack={() => setCurrentView('search')}
            onChatSelect={handleChatSelect}
            items={items}
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
            onWriteReview={(itemId, itemName, target) => {
              setReviewData({ itemId, itemName, target });
              setCurrentView('review');
            }}
          />
        );
      case 'profile':
        return (
          <ProfileView
            onBack={() => setCurrentView('search')}
            items={items.filter(item => item.ownerId === 'jjanggu')}
            favoriteItems={items.filter(item => favoriteItems.some(fav => fav.itemId === item.id))}
            onItemSelect={handleItemSelect}
            onReturn={handleReturn}
            onNavigateToPointHistory={handleNavigateToPointHistory}
            onRegisterItem={handleRegisterItem}
          />
        );
      case 'review':
        return reviewData ? (
          <ReviewView
            itemId={reviewData.itemId}
            itemName={reviewData.itemName}
            target={reviewData.target}
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
      case 'pointHistory':
        return (
          <PointHistoryView
            onBack={() => setCurrentView('profile')}
            transactions={pointTransactions}
          />
        );
      case 'ownerProfile':
        if (!ownerProfile) return null;
        // ownerId로 User 정보 찾기
        let owner = currentUser;
        if (ownerProfile.ownerId !== currentUser.id) {
          const foundItem = items.find(i => i.ownerId === ownerProfile.ownerId);
          if (foundItem) {
            owner = {
              id: foundItem.ownerId,
              name: foundItem.ownerName,
              occupation: '',
              rating: foundItem.ownerRating,
              totalTransactions: 0,
              profileImage: ''
            };
          }
        }
        const ownerItems = items.filter(i => i.ownerId === ownerProfile.ownerId);
        const ownerReviews = items.flatMap(i => i.reviews.filter(r => i.ownerId === ownerProfile.ownerId && r.target === '대여자'));
        return (
          <OwnerProfileView
            owner={owner}
            items={ownerItems}
            reviews={ownerReviews}
            onBack={() => setCurrentView('itemDetail')}
          />
        );
      case 'setPeriod':
        return periodItem ? (
          <OwnerRentalPeriodView
            item={periodItem}
            onBack={() => setCurrentView('itemDetail')}
            onSave={handleSavePeriod}
          />
        ) : null;
      case 'itemRegistration':
        return (
          <ItemRegistrationView />
        );
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
    </div>
  );
};

export default Index;
