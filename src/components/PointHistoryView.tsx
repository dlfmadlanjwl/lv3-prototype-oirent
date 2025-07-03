import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import type { PointTransaction } from '../types';

interface PointHistoryViewProps {
  onBack: () => void;
  transactions: PointTransaction[];
}

const PointHistoryView = ({ onBack, transactions }: PointHistoryViewProps) => {
  // 총 수입과 지출 계산
  const totalEarned = transactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalSpent = transactions
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalEarned - totalSpent;

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="px-4 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cucumber-600 hover:text-cucumber-700"
        >
          <ArrowLeft size={20} />
          <span>뒤로 가기</span>
        </button>
        <h1 className="text-2xl font-bold mt-2">포인트 내역</h1>
      </div>

      {/* 포인트 요약 */}
      <div className="px-4 py-6 bg-gradient-to-r from-cucumber-50 to-emerald-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {balance.toLocaleString()} 포인트
          </h2>
          <p className="text-gray-600">현재 잔액</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="text-green-500 mr-2" size={20} />
              <span className="text-green-600 font-semibold">수입</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              +{totalEarned.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="text-red-500 mr-2" size={20} />
              <span className="text-red-600 font-semibold">지출</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              -{totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 거래 내역 */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">거래 내역</h3>
        
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">거래 내역이 없습니다.</p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`bg-white rounded-lg p-4 border-l-4 ${
                  transaction.type === 'earned' 
                    ? 'border-green-500' 
                    : 'border-red-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{transaction.itemName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
                  </div>
                  <div className={`text-right ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <p className="text-lg font-bold">
                      {transaction.type === 'earned' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} 포인트
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PointHistoryView; 