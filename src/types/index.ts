export interface RentalItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  ownerName: string;
  ownerRating: number;
  location: {
    lat: number;
    lng: number;
  };
  distance: number;
  isAvailable: boolean;
  reviews: Review[];
  imageUrl: string;
  ownerId: string;
  currentRenterId?: string;
  availablePeriods?: { start: string; end: string }[]; // 대여 가능 기간
  category: '디지털' | '생활용품' | '공간대여' | '인력대여';
}

export interface BorrowedItem {
  itemId: string;
  status: '대여 중' | '반납 완료';
  rentDate: string;
}

export interface ChatItem {
  partnerName: string;
  lastMessage: string;
  lastMessageTime: string;
  relatedItemId: string;
}

export interface Review {
  id: string;
  itemId: string;
  reviewerName: string;
  rating: number;
  content: string;
  date: string;
  target: '대여자' | '대여 물품';
}

export interface User {
  id: string;
  name: string;
  occupation: string;
  rating: number;
  totalTransactions: number;
  profileImage: string;
}

export interface FavoriteItem {
  itemId: string;
  addedAt: string; // ISO string
}

export interface PointTransaction {
  id: string;
  type: 'earned' | 'spent'; // 'earned': 빌려줘서 얻은 포인트, 'spent': 빌려서 사용한 포인트
  amount: number;
  itemName: string;
  date: string; // ISO string
  description: string;
}
