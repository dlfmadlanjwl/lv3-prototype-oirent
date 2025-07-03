import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { ChatItem, RentalItem } from '../types';

interface ChatListViewProps {
  chatList: ChatItem[];
  onBack: () => void;
  onChatSelect: (partnerName: string) => void;
  items?: RentalItem[]; // 물품 정보 전달
}

const ChatListView = ({ chatList, onBack, onChatSelect, items = [] }: ChatListViewProps) => {
  // 물품 id로 이름/이미지 찾기
  const getItemInfo = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? { name: item.name, imageUrl: item.imageUrl } : { name: '알 수 없음', imageUrl: '' };
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
        <h1 className="text-xl font-bold text-gray-900 mt-2">채팅 목록</h1>
      </div>

      {/* 채팅 목록 */}
      <div className="px-4 py-4">
        {chatList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-gray-500">아직 진행 중인 채팅이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {chatList.map((chat) => {
              const itemInfo = getItemInfo(chat.relatedItemId);
              return (
                <div
                  key={chat.partnerName}
                  onClick={() => onChatSelect(chat.partnerName)}
                  className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {itemInfo.imageUrl ? (
                      <img
                        src={itemInfo.imageUrl}
                        alt={itemInfo.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        ?
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">{chat.partnerName}</h3>
                        <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{chat.lastMessage}</p>
                      <div className="text-xs text-cucumber-600 mt-1 truncate">{itemInfo.name}</div>
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

export default ChatListView;
