import { ArrowLeft, Star } from 'lucide-react';
import type { RentalItem, BorrowedItem } from '../types';

interface ItemDetailViewProps {
  item: RentalItem;
  onBack: () => void;
  onRentRequest: (itemId: string) => void;
  onRentRequestWithTime?: (item: RentalItem) => void;
  onReturn: (itemId: string) => void;
  onWriteReview: (itemId: string, itemName: string) => void;
  borrowedItems: BorrowedItem[];
}

const ItemDetailView = ({
  item,
  onBack,
  onRentRequest,
  onRentRequestWithTime,
  onReturn,
  onWriteReview,
  borrowedItems
}: ItemDetailViewProps) => {
  const isRentedByMe = borrowedItems.some(b => b.itemId === item.id && b.status === '대여 중');
  
  const renderActionButton = () => {
    if (isRentedByMe) {
      return (
        <button
          onClick={() => onReturn(item.id)}
          className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors"
        >
          반납하기
        </button>
      );
    }
    
    if (item.isAvailable) {
      return (
        <button
          onClick={() => onRentRequestWithTime ? onRentRequestWithTime(item) : onRentRequest(item.id)}
          className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors"
        >
          대여 요청하기
        </button>
      );
    }
    
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
      >
        대여 중
      </button>
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* 뒤로 가기 버튼 */}
      <div className="px-4 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cucumber-600 hover:text-cucumber-700"
        >
          <ArrowLeft size={20} />
          <span>뒤로 가기</span>
        </button>
      </div>

      {/* 물품 이미지 */}
      <div className="px-4 py-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>

      {/* 물품 정보 */}
      <div className="px-4 py-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        </div>

        {/* 대여 정보 카드 */}
        <div className="bg-cucumber-50 border border-cucumber-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-cucumber-800">
              {item.pricePerDay.toLocaleString()}포인트/일
            </span>
            <span className="text-sm text-gray-600">{item.distance}km</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">대여자:</span>
            <span className="font-medium text-gray-900">{item.ownerName}</span>
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{item.ownerRating}</span>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          {renderActionButton()}
          
          <button className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
            관심 품목 등록
          </button>
        </div>

        {/* 체험 리뷰 섹션 */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">체험 리뷰</h2>
            <button
              onClick={() => onWriteReview(item.id, item.name)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              리뷰 작성하기
            </button>
          </div>
          
          {item.reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">아직 리뷰가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {item.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{review.reviewerName}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.content}</p>
                  <span className="text-xs text-cucumber-600 font-medium mt-2 inline-block">
                    {review.target}에 대한 리뷰
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailView;
