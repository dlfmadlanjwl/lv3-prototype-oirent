// 카카오맵 API 설정
export const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY || '';

// 카카오맵 API URL
export const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

// 기본 위치 (서울 시청)
export const DEFAULT_LOCATION = {
  lat: 37.5665,
  lng: 126.9780,
  address: '서울특별시 중구 세종대로 110'
}; 