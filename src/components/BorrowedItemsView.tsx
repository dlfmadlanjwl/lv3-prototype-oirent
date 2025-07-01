import { ArrowLeft } from 'lucide-react';
import type { BorrowedItem, RentalItem } from '../types';

interface BorrowedItemsViewProps {
  borrowedItems: BorrowedItem[];
  items: RentalItem[];
  onBack: () => void;
  onReturn: (itemId: string) => void;
  onItemSelect: (item: RentalItem) => void;
}

const BorrowedItemsView = ({ borrowedItems, items, onBack, onReturn, onItemSelect }: BorrowedItemsViewProps) => {
  const getBorrowedItemDetails = (borrowedItem: BorrowedItem) => {
    return items.find(item => item.id === borrowedItem.itemId);
  };

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
        {borrowedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-gray-500">아직 빌린 물건이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {borrowedItems.map((borrowedItem) => {
              const itemDetails = getBorrowedItemDetails(borrowedItem);
              if (!itemDetails) return null;

              return (
                <div
                  key={borrowedItem.itemId}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex space-x-4">
                    <img
                      src={itemDetails.imageUrl}
                      alt={itemDetails.name}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                      onClick={() => onItemSelect(itemDetails)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 
                          className="font-semibold text-gray-900 cursor-pointer hover:text-cucumber-600"
                          onClick={() => onItemSelect(itemDetails)}
                        >
                          {itemDetails.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          borrowedItem.status === '대여 중' 
                            ? 'text-cucumber-600 bg-cucumber-100'
                            : 'text-gray-600 bg-gray-100'
                        }`}>
                          {borrowedItem.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        대여자: {itemDetails.ownerName}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-cucumber-600 font-semibold">
                          {itemDetails.pricePerDay.toLocaleString()}포인트/일
                        </div>
                        {borrowedItem.status === '대여 중' && (
                          <button
                            onClick={() => onReturn(borrowedItem.itemId)}
                            className="bg-cucumber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cucumber-700 transition-colors"
                          >
                            반납하기
                          </button>
                        )}
                      </div>
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
