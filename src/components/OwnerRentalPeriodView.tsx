import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { RentalItem } from '../types';

interface OwnerRentalPeriodViewProps {
  item: RentalItem;
  onBack: () => void;
  onSave: (periods: { start: string; end: string }[]) => void;
}

const OwnerRentalPeriodView = ({ item, onBack, onSave }: OwnerRentalPeriodViewProps) => {
  const [periods, setPeriods] = useState<{ start: string; end: string }[]>(item.availablePeriods || []);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const addPeriod = () => {
    setError('');
    if (!start || !end) {
      setError('시작일과 종료일을 모두 선택하세요.');
      return;
    }
    if (start > end) {
      setError('종료일이 시작일보다 빠를 수 없습니다.');
      return;
    }
    setPeriods([...periods, { start, end }]);
    setStart('');
    setEnd('');
  };

  const removePeriod = (idx: number) => {
    setPeriods(periods.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="px-4 py-4 border-b border-gray-200 flex items-center">
        <button
          onClick={onBack}
          className="text-cucumber-600 hover:text-cucumber-700 mr-2"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">대여 가능 기간 설정</h1>
      </div>
      <div className="px-4 py-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium">시작일</label>
          <input
            type="date"
            value={start}
            onChange={e => setStart(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">종료일</label>
          <input
            type="date"
            value={end}
            onChange={e => setEnd(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="button"
          onClick={addPeriod}
          className="w-full bg-cucumber-600 text-white py-2 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors flex items-center justify-center mb-6"
        >
          <Plus size={18} className="mr-1" /> 기간 추가
        </button>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">설정된 기간</h2>
          {periods.length === 0 ? (
            <p className="text-gray-500">아직 설정된 기간이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {periods.map((p, idx) => (
                <li key={idx} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                  <span>{p.start} ~ {p.end}</span>
                  <button onClick={() => removePeriod(idx)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={() => onSave(periods)}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default OwnerRentalPeriodView; 