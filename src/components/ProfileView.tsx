import { ArrowLeft, Star } from 'lucide-react';
import { currentUser } from '../data/mockData';
import type { RentalItem } from '../types';

interface ProfileViewProps {
  onBack: () => void;
  items: RentalItem[];
  onItemSelect: (item: RentalItem) => void;
}

const ProfileView = ({ onBack, items, onItemSelect }: ProfileViewProps) => {
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
        <h1 className="text-xl font-bold text-gray-900 mt-2">내 프로필</h1>
      </div>

      {/* 프로필 정보 */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <img
            src={currentUser.profileImage}
            alt="프로필"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
          <p className="text-gray-600">{currentUser.occupation}</p>
        </div>

        {/* 신뢰도 점수 카드 */}
        <div className="bg-cucumber-50 border border-cucumber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-cucumber-800">
              신뢰도 점수: {currentUser.rating} / 5.0
            </span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(currentUser.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-cucumber-700">총 {currentUser.totalTransactions}회 거래 완료</p>
        </div>

        {/* 내가 올린 물건 섹션 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">내가 올린 물건</h3>
          
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📱</div>
              <p className="text-gray-500">아직 올린 물건이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.isAvailable 
                            ? 'text-blue-600 bg-blue-100'
                            : 'text-red-600 bg-red-100'
                        }`}>
                          {item.isAvailable ? '대여 가능' : '대여 중'}
                        </span>
                      </div>
                      <div className="text-cucumber-600 font-semibold">
                        {item.pricePerDay.toLocaleString()}포인트/일
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 프로필 수정 버튼 */}
        <button className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
