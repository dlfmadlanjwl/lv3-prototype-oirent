import type { RentalItem, BorrowedItem, ChatItem, PointTransaction } from '../types';

export const rentalItems: RentalItem[] = [
  {
    id: '1',
    name: '울트라와이드 모니터 34인치',
    description: '삼성 울트라와이드 모니터 34인치입니다. 게임, 업무용으로 최적화되어 있습니다.',
    pricePerDay: 5000,
    ownerName: '김개발',
    ownerRating: 4.8,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 1.2,
    isAvailable: true,
    reviews: [
      {
        id: '1',
        itemId: '1',
        reviewerName: '이사용',
        rating: 5,
        content: '화질이 정말 좋아요! 업무 효율이 확실히 올라갔습니다.',
        date: '2024-06-15',
        target: '대여 물품'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    ownerId: 'kimdev',
    category: '디지털',
    availablePeriods: [
      {
        start: '2024-07-04',
        end: '2024-07-06'
      }
    ]
  },
  {
    id: '2',
    name: '에어프라이어',
    description: '필립스 에어프라이어입니다. 건강한 요리를 만들 수 있어요.',
    pricePerDay: 3000,
    ownerName: '박요리',
    ownerRating: 4.6,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 0.8,
    isAvailable: false,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    ownerId: 'parkcook',
    currentRenterId: 'other',
    category: '생활용품'
  },
  {
    id: '3',
    name: '캠핑 텐트 4인용',
    description: '코베아 4인용 캠핑 텐트입니다. 방수 기능이 뛰어납니다.',
    pricePerDay: 8000,
    ownerName: '최캠핑',
    ownerRating: 4.9,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 2.1,
    isAvailable: true,
    reviews: [
      {
        id: '2',
        itemId: '3',
        reviewerName: '강산행',
        rating: 5,
        content: '설치가 쉽고 방수도 잘 되네요. 가족 캠핑에 완벽했어요!',
        date: '2024-06-10',
        target: '대여 물품'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400&h=300&fit=crop',
    ownerId: 'choicamp',
    category: '생활용품'
  },
  {
    id: '4',
    name: '닌텐도 스위치',
    description: '닌텐도 스위치 본체 + 젤다의 전설 게임 포함입니다.',
    pricePerDay: 4000,
    ownerName: '정게임',
    ownerRating: 4.7,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 1.5,
    isAvailable: false,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    ownerId: 'junggame',
    currentRenterId: 'jjanggu',
    category: '디지털'
  },
  {
    id: '5',
    name: '전동 드릴 세트',
    description: '보쉬 전동 드릴 + 드릴 비트 세트입니다. DIY 작업에 최적화되어 있습니다.',
    pricePerDay: 6000,
    ownerName: 'DIY마스터',
    ownerRating: 4.8,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 0.5,
    isAvailable: true,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
    ownerId: 'diymaster',
    category: '생활용품'
  },
  {
    id: '6',
    name: '러닝머신',
    description: '가정용 러닝머신입니다. 홈트레이닝에 완벽해요.',
    pricePerDay: 7000,
    ownerName: '헬스매니아',
    ownerRating: 4.5,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 3.0,
    isAvailable: true,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    ownerId: 'healthmania',
    category: '디지털'
  },
  {
    id: '7',
    name: '프로젝터',
    description: '휴대용 미니 프로젝터입니다. 영화 감상이나 프레젠테이션에 최적입니다.',
    pricePerDay: 10000,
    ownerName: '짱구 (Jjanggu)',
    ownerRating: 4.9,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 0.0,
    isAvailable: false,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    ownerId: 'jjanggu',
    currentRenterId: 'user1',
    category: '디지털'
  },
  {
    id: '8',
    name: '블루투스 스피커',
    description: 'JBL 블루투스 스피커입니다. 휴대하기 편하고 음질이 좋습니다.',
    pricePerDay: 3000,
    ownerName: '짱구 (Jjanggu)',
    ownerRating: 4.9,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 0.0,
    isAvailable: true,
    reviews: [
      {
        id: '3',
        itemId: '8',
        reviewerName: '음악러버',
        rating: 5,
        content: '음질이 정말 좋아요! 파티할 때 완벽했어요.',
        date: '2024-06-12',
        target: '대여 물품'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    ownerId: 'jjanggu',
    category: '디지털'
  },
  {
    id: '9',
    name: '스터디룸(2시간)',
    description: '조용한 스터디룸, 2시간 단위 대여 가능',
    pricePerDay: 12000,
    ownerName: '공간주인',
    ownerRating: 4.7,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 0.3,
    isAvailable: true,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop',
    ownerId: 'spaceowner',
    category: '공간대여'
  },
  {
    id: '10',
    name: '이사 도우미(3시간)',
    description: '이사/짐 옮기기 도와드립니다. 3시간 기준',
    pricePerDay: 50000,
    ownerName: '이사왕',
    ownerRating: 4.8,
    location: { lat: 37.5665, lng: 126.9780 },
    distance: 1.0,
    isAvailable: true,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop',
    ownerId: 'movehelper',
    category: '인력대여'
  }
];

export const jjangguBorrowedItems: BorrowedItem[] = [
  {
    itemId: '4',
    status: '대여 중',
    rentDate: '2024-06-18T10:00:00Z'
  },
  {
    itemId: '8',
    status: '반납 완료',
    rentDate: '2024-06-10T10:00:00Z'
  }
];

export const mockChatList: ChatItem[] = [
  {
    partnerName: '정게임',
    lastMessage: '네, 언제든지 연락주세요!',
    lastMessageTime: '오후 2:30',
    relatedItemId: '4'
  },
  {
    partnerName: '김개발',
    lastMessage: '모니터 상태 어떠세요?',
    lastMessageTime: '오전 11:15',
    relatedItemId: '1'
  }
];

export const currentUser = {
  id: 'jjanggu',
  name: '짱구 (Jjanggu)',
  occupation: 'IT 회사 개발자',
  rating: 4.9,
  totalTransactions: 23,
  profileImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face'
};

export const pointTransactions: PointTransaction[] = [
  // 빌려줘서 얻은 포인트 (수입)
  {
    id: '1',
    type: 'earned',
    amount: 10000,
    itemName: '프로젝터',
    date: '2024-06-20T14:30:00Z',
    description: 'user1님이 프로젝터를 대여하여 10000포인트를 획득했습니다.'
  },
  {
    id: '2',
    type: 'earned',
    amount: 3000,
    itemName: '블루투스 스피커',
    date: '2024-06-15T10:15:00Z',
    description: '음악러버님이 블루투스 스피커를 대여하여 3000포인트를 획득했습니다.'
  },
  {
    id: '3',
    type: 'earned',
    amount: 8000,
    itemName: '캠핑 텐트',
    date: '2024-06-10T16:45:00Z',
    description: '캠핑러님이 캠핑 텐트를 대여하여 8000포인트를 획득했습니다.'
  },
  // 빌려서 사용한 포인트 (지출)
  {
    id: '4',
    type: 'spent',
    amount: 4000,
    itemName: '닌텐도 스위치',
    date: '2024-06-18T09:20:00Z',
    description: '정게임님의 닌텐도 스위치를 대여하여 4000포인트를 사용했습니다.'
  },
  {
    id: '5',
    type: 'spent',
    amount: 6000,
    itemName: '전동 드릴 세트',
    date: '2024-06-12T13:10:00Z',
    description: 'DIY마스터님의 전동 드릴 세트를 대여하여 6000포인트를 사용했습니다.'
  },
  {
    id: '6',
    type: 'spent',
    amount: 5000,
    itemName: '울트라와이드 모니터',
    date: '2024-06-08T11:30:00Z',
    description: '김개발님의 울트라와이드 모니터를 대여하여 5000포인트를 사용했습니다.'
  }
];
