
import { MessageSquare, User } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Header = ({ currentView, onNavigate }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 앱 로고 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('search')}
          >
            <div className="text-2xl">🥒</div>
            <h1 className="text-xl font-bold text-cucumber-600">오이빌림</h1>
          </div>

          {/* 네비게이션 버튼들 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('chatList')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'chatList' || currentView === 'chat'
                  ? 'bg-cucumber-100 text-cucumber-700'
                  : 'text-cucumber-600 hover:bg-cucumber-50'
              }`}
            >
              <MessageSquare size={18} />
              <span className="text-sm font-medium">채팅</span>
            </button>

            <button
              onClick={() => onNavigate('borrowedItems')}
              className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                currentView === 'borrowedItems'
                  ? 'bg-cucumber-100 text-cucumber-700'
                  : 'text-cucumber-600 hover:bg-cucumber-50'
              }`}
            >
              빌린 물건
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'profile'
                  ? 'bg-cucumber-100 text-cucumber-700'
                  : 'text-cucumber-600 hover:bg-cucumber-50'
              }`}
            >
              <User size={18} />
              <span className="text-sm font-medium">프로필</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
