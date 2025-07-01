
import { useState } from 'react';
import { Search } from 'lucide-react';
import type { RentalItem, BorrowedItem } from '../types';

interface SearchViewProps {
  items: RentalItem[];
  onSearch: (query: string) => void;
  onItemSelect: (item: RentalItem) => void;
  borrowedItems: BorrowedItem[];
}

const SearchView = ({ items, onSearch, onItemSelect, borrowedItems }: SearchViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getItemStatus = (item: RentalItem) => {
    const borrowedItem = borrowedItems.find(b => b.itemId === item.id && b.status === '대여 중');
    if (borrowedItem) {
      return '대여 중 (나)';
    }
    if (!item.isAvailable) {
      return '대여 중';
    }
    return '대여 가능';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '대여 중 (나)':
        return 'text-cucumber-600 bg-cucumber-100';
      case '대여 중':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* 검색 섹션 */}
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="물건을 검색해보세요 (예: 울트라와이드 모니터)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cucumber-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-cucumber-600 text-white rounded-lg hover:bg-cucumber-700 transition-colors flex items-center justify-center"
          >
            <Search size={20} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600">현재 반경: 5km</p>
      </div>

      {/* 검색 결과 */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        ) : (
          items.map((item) => {
            const status = getItemStatus(item);
            const statusColor = getStatusColor(status);
            
            return (
              <div
                key={item.id}
                onClick={() => onItemSelect(item)}
                className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-cucumber-600 font-semibold">
                        {item.pricePerDay.toLocaleString()}원/일
                      </div>
                      <div className="text-xs text-gray-500">
                        ⭐ {item.ownerRating} · {item.ownerName} · {item.distance}km
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchView;
