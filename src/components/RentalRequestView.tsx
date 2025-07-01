import { useState } from 'react';
import type { RentalItem } from '../types';

interface ReservedTime {
  start: string; // ISO string
  end: string;   // ISO string
}

interface RentalRequestViewProps {
  item: RentalItem;
  onBack: () => void;
  onRequest: (itemId: string, startDate: string, endDate: string) => void;
  reservedTimes?: ReservedTime[]; // 예약된 시간대
}

function getDisabledDates(reservedTimes: ReservedTime[]) {
  // 예약된 구간의 모든 날짜를 추출 (YYYY-MM-DD)
  const disabled = new Set<string>();
  reservedTimes.forEach(rt => {
    const start = new Date(rt.start);
    const end = new Date(rt.end);
    let cur = new Date(start);
    while (cur <= end) {
      disabled.add(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }
  });
  return disabled;
}

function getMonthDays(year: number, month: number) {
  // month: 0~11
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const Calendar = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  disabledDates
}: {
  startDate: string;
  endDate: string;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  disabledDates: Set<string>;
}) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0~11
  const days = getMonthDays(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0:일~6:토

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date) => {
    const d = formatDate(date);
    if (disabledDates.has(d)) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate('');
    } else if (startDate && !endDate) {
      if (d < startDate) {
        setStartDate(d);
        setEndDate('');
      } else {
        setEndDate(d);
      }
    }
  };

  // 달력 셀 스타일
  const getCellStyle = (date: Date) => {
    const d = formatDate(date);
    if (disabledDates.has(d)) return 'bg-gray-200 text-gray-400 cursor-not-allowed';
    if (startDate && endDate && d >= startDate && d <= endDate) return 'bg-cucumber-600 text-white font-bold';
    if (startDate === d) return 'bg-cucumber-500 text-white font-bold';
    if (endDate === d) return 'bg-cucumber-500 text-white font-bold';
    return 'bg-white hover:bg-cucumber-50';
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setMonth(m => (m === 0 ? 11 : m - 1))} className="text-2xl px-2">◀</button>
        <div className="text-lg font-bold">{year}년 {month + 1}월</div>
        <button onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))} className="text-2xl px-2">▶</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-1">
        <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-lg">
        {Array(firstDayOfWeek).fill(null).map((_, i) => <div key={i}></div>)}
        {days.map(date => {
          const d = formatDate(date);
          return (
            <button
              key={d}
              type="button"
              className={`aspect-square rounded-lg transition-all text-base md:text-lg ${getCellStyle(date)}`}
              style={{ minWidth: 44, minHeight: 44 }}
              disabled={disabledDates.has(d)}
              onClick={() => handleDateClick(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const RentalRequestView = ({ item, onBack, onRequest, reservedTimes = [] }: RentalRequestViewProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const disabledDates = getDisabledDates(reservedTimes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!startDate || !endDate) return;
    if (startDate > endDate) {
      setError('종료일이 시작일보다 빠를 수 없습니다.');
      return;
    }
    // 선택한 구간에 예약된 날짜가 포함되는지 확인
    let cur = new Date(startDate);
    const end = new Date(endDate);
    while (cur <= end) {
      if (disabledDates.has(cur.toISOString().slice(0, 10))) {
        setError('선택한 기간에 이미 예약된 날짜가 포함되어 있습니다.');
        return;
      }
      cur.setDate(cur.getDate() + 1);
    }
    onRequest(item.id, startDate, endDate);
  };

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col">
      <div className="px-4 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cucumber-600 hover:text-cucumber-700"
        >
          ← 뒤로 가기
        </button>
      </div>
      <div className="px-4 py-6 flex-1 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">대여 날짜 선택</h1>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          disabledDates={disabledDates}
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 items-center justify-center">
            <div>
              <label className="block mb-1 font-medium">시작일</label>
              <div className="text-lg font-bold min-w-[100px] text-center border rounded py-2 bg-gray-50">{startDate || '-'}</div>
            </div>
            <div>
              <label className="block mb-1 font-medium">종료일</label>
              <div className="text-lg font-bold min-w-[100px] text-center border rounded py-2 bg-gray-50">{endDate || '-'}</div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors text-xl mt-4"
            disabled={!startDate || !endDate}
          >
            대여 요청하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentalRequestView; 