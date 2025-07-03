import { ArrowLeft, Star } from 'lucide-react';
import type { User, RentalItem, Review } from '../types';

interface OwnerProfileViewProps {
  owner: User;
  items: RentalItem[];
  reviews: Review[];
  onBack: () => void;
}

const OwnerProfileView = ({ owner, items, reviews, onBack }: OwnerProfileViewProps) => {
  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="px-4 py-4 border-b border-gray-200 flex items-center">
        <button
          onClick={onBack}
          className="text-cucumber-600 hover:text-cucumber-700 mr-2"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">대여자 정보</h1>
      </div>
      <div className="px-4 py-6 flex flex-col items-center">
        <img
          src={owner.profileImage}
          alt={owner.name}
          className="w-24 h-24 rounded-full object-cover mb-3 border"
        />
        <h2 className="text-xl font-bold mb-1">{owner.name}</h2>
        <div className="flex items-center space-x-2 mb-2">
          <Star size={18} className="text-yellow-400 fill-current" />
          <span className="text-gray-700 font-medium">{owner.rating}</span>
          <span className="text-gray-400">({owner.totalTransactions}회 거래)</span>
        </div>
        <div className="text-gray-600 mb-4">{owner.occupation}</div>
      </div>
      <div className="px-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">대여자 후기</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 후기가 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{review.reviewerName}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerProfileView; 