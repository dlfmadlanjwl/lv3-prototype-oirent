import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { BorrowedItem, RentalItem } from '../types';

interface BorrowedItemsViewProps {
  borrowedItems: BorrowedItem[];
  items: RentalItem[];
  onBack: () => void;
  onReturn: (itemId: string) => void;
  onItemSelect: (item: RentalItem) => void;
  onWriteReview?: (itemId: string, itemName: string, target: '대여자' | '대여 물품') => void;
}

const BorrowedItemsView = ({ borrowedItems, items, onBack, onReturn, onItemSelect, onWriteReview }: BorrowedItemsViewProps) => {
  // 빌린 물건 정보 매칭
  const getItemDetails = (itemId: string) => items.find(i => i.id === itemId);

  const borrowedOngoing = borrowedItems.filter(b => b.status === '대여 중');
  const borrowedReturned = borrowedItems.filter(b => b.status === '반납 완료');

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-cucumber-600 hover:text-cucumber-700"
          >
            <ArrowLeft size={20} />
            <span>뒤로 가기</span>
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mt-2">빌린 물건 목록</h1>
      </div>

      {/* 빌린 물건 목록 */}
      <div className="px-4 py-4">
        {/* 대여 중 */}
        <h2 className="text-lg font-semibold mb-2">대여 중</h2>
        {borrowedOngoing.length === 0 ? (
          <p className="text-gray-500 text-center py-8">대여 중인 물건이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {borrowedOngoing.map(borrowedItem => {
              const itemDetails = getItemDetails(borrowedItem.itemId);
              if (!itemDetails) return null;
              return (
                <div key={borrowedItem.itemId} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center space-x-4">
                  <img src={itemDetails.imageUrl} alt={itemDetails.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 cursor-pointer" onClick={() => onItemSelect(itemDetails)}>{itemDetails.name}</h3>
                    <div className="text-cucumber-600 font-semibold mb-1">{itemDetails.pricePerDay.toLocaleString()}포인트/일</div>
                    <div className="text-xs text-gray-500 mb-1">{borrowedItem.rentDate.slice(0, 10)} 대여 시작</div>
                    <button
                      onClick={() => onReturn(itemDetails.id)}
                      className="px-3 py-1 bg-cucumber-600 text-white text-xs rounded hover:bg-cucumber-700 transition-colors mt-1"
                    >
                      반납 요청
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 반납 완료 */}
        <h2 className="text-lg font-semibold mt-8 mb-2">반납 완료</h2>
        {borrowedReturned.length === 0 ? (
          <p className="text-gray-500 text-center py-8">반납한 물건이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {borrowedReturned.map(borrowedItem => {
              const itemDetails = getItemDetails(borrowedItem.itemId);
              if (!itemDetails) return null;
              return (
                <div key={borrowedItem.itemId} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-4">
                  <img src={itemDetails.imageUrl} alt={itemDetails.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 cursor-pointer" onClick={() => onItemSelect(itemDetails)}>{itemDetails.name}</h3>
                    <div className="text-cucumber-600 font-semibold mb-1">{itemDetails.pricePerDay.toLocaleString()}포인트/일</div>
                    <div className="text-xs text-gray-500 mb-1">{borrowedItem.rentDate.slice(0, 10)} 대여 시작</div>
                    <div className="flex space-x-2 mt-2">
                      {onWriteReview && (
                        <>
                          <button
                            onClick={() => onWriteReview(itemDetails.id, itemDetails.name, '대여 물품')}
                            className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition-colors"
                          >
                            물건 후기 작성
                          </button>
                          <button
                            onClick={() => onWriteReview(itemDetails.id, itemDetails.name, '대여자')}
                            className="px-3 py-1 bg-cucumber-600 text-white text-xs rounded hover:bg-cucumber-700 transition-colors"
                          >
                            대여자 후기 작성
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedItemsView;
