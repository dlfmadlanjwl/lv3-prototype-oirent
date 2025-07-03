import { ArrowLeft, Star, Plus } from 'lucide-react';
import { currentUser } from '../data/mockData';
import type { RentalItem } from '../types';
import { useState } from 'react';

interface ProfileViewProps {
  onBack: () => void;
  items: RentalItem[];
  favoriteItems: RentalItem[];
  onItemSelect: (item: RentalItem) => void;
  onReturn?: (itemId: string) => void;
  onNavigateToPointHistory?: () => void;
  onRegisterItem?: () => void;
}

const ProfileView = ({ onBack, items, favoriteItems, onItemSelect, onReturn, onNavigateToPointHistory, onRegisterItem }: ProfileViewProps) => {
  const [activeTab, setActiveTab] = useState<'myItems' | 'favorites'>('myItems');

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

        {/* 탭 버튼들 */}
        <div className="flex space-x-1 mb-4">
          <button
            onClick={() => setActiveTab('myItems')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'myItems'
                ? 'bg-cucumber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            내 물품 ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'favorites'
                ? 'bg-cucumber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            관심 품목 ({favoriteItems.length})
          </button>
        </div>

        {/* 탭 내용 */}
        {activeTab === 'myItems' ? (
          // 내 물품 목록
          <div className="space-y-6">
            {/* 대여 중인 물품 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">대여 중인 물품</h4>
              <div className="space-y-4">
                {items.filter(item => !item.isAvailable).length === 0 ? (
                  <p className="text-gray-500 text-center py-4">대여 중인 물품이 없습니다.</p>
                ) : (
                  items.filter(item => !item.isAvailable).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                          onClick={() => onItemSelect(item)}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 cursor-pointer" onClick={() => onItemSelect(item)}>{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-cucumber-600 font-semibold">
                              {item.pricePerDay.toLocaleString()}포인트/일
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                                대여 중
                              </span>
                              {onReturn && (
                                <button
                                  onClick={() => onReturn(item.id)}
                                  className="px-3 py-1 bg-cucumber-600 text-white text-xs rounded hover:bg-cucumber-700 transition-colors"
                                >
                                  반납 처리
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 대여 가능한 물품 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">대여 가능한 물품</h4>
              <div className="space-y-4">
                {items.filter(item => item.isAvailable).length === 0 ? (
                  <p className="text-gray-500 text-center py-4">대여 가능한 물품이 없습니다.</p>
                ) : (
                  items.filter(item => item.isAvailable).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onItemSelect(item)}
                      className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-cucumber-600 font-semibold">
                              {item.pricePerDay.toLocaleString()}포인트/일
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                              대여 가능
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          // 관심 품목 목록
          <div className="space-y-4">
            {favoriteItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">관심 품목이 없습니다.</p>
            ) : (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-cucumber-600 font-semibold">
                          {item.pricePerDay.toLocaleString()}포인트/일
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isAvailable ? '대여 가능' : '대여 중'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 프로필 수정 버튼 */}
        <div className="px-4 py-4">
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            프로필 수정
          </button>
        </div>

        {/* 포인트 내역 버튼 */}
        <div className="px-4 py-2">
          <button 
            onClick={() => onNavigateToPointHistory && onNavigateToPointHistory()}
            className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors"
          >
            💰 포인트 내역 보기
          </button>
        </div>

        {/* 물품 등록 버튼 */}
        {onRegisterItem && (
          <div className="px-4 py-2">
            <button 
              onClick={onRegisterItem}
              className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              물품 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
