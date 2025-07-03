import { useState } from 'react';
import { Search } from 'lucide-react';
import type { RentalItem, BorrowedItem } from '../types';

interface SearchViewProps {
  items: RentalItem[];
  onSearch: (query: string) => void;
  onItemSelect: (item: RentalItem) => void;
  borrowedItems: BorrowedItem[];
}

const categories = ['전체', '디지털', '생활용품', '공간대여', '인력대여'] as const;

type Category = typeof categories[number];

const SearchView = ({ items, onSearch, onItemSelect, borrowedItems }: SearchViewProps) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // 카테고리 필터링
  const filteredItems = items.filter(item =>
    (selectedCategory === '전체' || item.category === selectedCategory)
  );

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
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="px-4 py-4 border-b border-gray-200">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="flex-1 border rounded px-3 py-2"
          />
          <button type="submit" className="bg-cucumber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors">
            검색
          </button>
        </form>
        {/* 카테고리 필터 */}
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium border transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cucumber-600 text-white border-cucumber-600'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-cucumber-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 py-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">해당 카테고리에 등록된 물건이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map(item => {
              const status = getItemStatus(item);
              const statusColor = getStatusColor(status);
              const isBorrowed = borrowedItems.some(b => b.itemId === item.id && b.status === '대여 중');
              return (
                <div
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
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
                      <div className="text-xs text-gray-400 mt-1">카테고리: {item.category}</div>
                    </div>
                  </div>
                  {isBorrowed && (
                    <div className="mt-2 text-xs text-red-500 font-semibold">내가 빌린 물건</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
