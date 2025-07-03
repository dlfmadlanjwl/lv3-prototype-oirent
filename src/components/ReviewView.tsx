import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Review } from '../types';

interface ReviewViewProps {
  itemId: string;
  itemName: string;
  target?: '대여자' | '대여 물품';
  onBack: () => void;
  onSubmit: (review: Review) => void;
}

const ReviewView = ({ itemId, itemName, target = '대여 물품', onBack, onSubmit }: ReviewViewProps) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    onSubmit({
      id: Date.now().toString(),
      itemId,
      reviewerName: '짱구',
      rating,
      content: content.trim(),
      date: new Date().toISOString().slice(0, 10),
      target,
    });
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
        <h1 className="text-2xl font-bold mb-4">{target} 후기 작성</h1>
      </div>

      {/* 리뷰 작성 폼 */}
      <div className="px-4 py-6 space-y-6">
        <div>
          <p className="text-gray-700 mb-4">
            '<span className="font-semibold text-cucumber-600">{itemName}</span>'에 대한 리뷰
          </p>
        </div>

        {/* 리뷰 대상 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            리뷰 대상
          </label>
          <input type="hidden" value={target} />
        </div>

        {/* 별점 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            별점 (1-5점)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cucumber-500 focus:border-transparent"
          />
        </div>

        {/* 리뷰 내용 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            리뷰 내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="리뷰 내용을 입력해주세요..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cucumber-500 focus:border-transparent resize-none"
          />
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
