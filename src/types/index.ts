
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
