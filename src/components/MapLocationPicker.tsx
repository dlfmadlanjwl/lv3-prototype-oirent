import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, X } from 'lucide-react';
import { KAKAO_MAP_API_URL, DEFAULT_LOCATION } from '../config/map';

interface MapLocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  onClose: () => void;
  initialLocation?: { lat: number; lng: number };
}

declare global {
  interface Window {
    kakao: any;
  }
}

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  onLocationSelect,
  onClose,
  initialLocation = DEFAULT_LOCATION
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  useEffect(() => {
    // 카카오맵 API 로드
    const script = document.createElement('script');
    script.src = KAKAO_MAP_API_URL;
    script.async = true;
    
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(initialLocation.lat, initialLocation.lng),
            level: 3
          };
          
          const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
          setMap(kakaoMap);
          
          // 초기 마커 생성
          const initialMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(initialLocation.lat, initialLocation.lng)
          });
          initialMarker.setMap(kakaoMap);
          setMarker(initialMarker);
          
          // 지도 클릭 이벤트
          window.kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            
            // 기존 마커 제거
            if (marker) {
              marker.setMap(null);
            }
            
            // 새 마커 생성
            const newMarker = new window.kakao.maps.Marker({
              position: latlng
            });
            newMarker.setMap(kakaoMap);
            setMarker(newMarker);
            
            // 주소 검색
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                const locationData = {
                  lat: latlng.getLat(),
                  lng: latlng.getLng(),
                  address
                };
                setSelectedLocation(locationData);
              }
            });
          });
        }
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [initialLocation]);

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // 카카오맵 API 키가 없는 경우를 위한 대체 UI
  if (!window.kakao) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>위치 선택</span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                카카오맵 API 키가 설정되지 않았습니다.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                실제 구현에서는 카카오맵 API 키를 설정하여 지도에서 위치를 선택할 수 있습니다.
              </p>
              
              {/* 임시 위치 선택 UI */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    위도
                  </label>
                  <input
                    type="number"
                    step="any"
                    defaultValue={initialLocation.lat}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lat = parseFloat(e.target.value);
                      if (!isNaN(lat)) {
                        setSelectedLocation(prev => ({
                          lat,
                          lng: prev?.lng || initialLocation.lng,
                          address: prev?.address || '수동 입력'
                        }));
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    경도
                  </label>
                  <input
                    type="number"
                    step="any"
                    defaultValue={initialLocation.lng}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lng = parseFloat(e.target.value);
                      if (!isNaN(lng)) {
                        setSelectedLocation(prev => ({
                          lat: prev?.lat || initialLocation.lat,
                          lng,
                          address: prev?.address || '수동 입력'
                        }));
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  취소
                </Button>
                <Button onClick={handleConfirm} className="flex-1">
                  확인
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>지도에서 위치 선택</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              ref={mapRef} 
              className="w-full h-64 rounded-lg border border-gray-200"
            />
            
            {selectedLocation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">선택된 위치</h4>
                <p className="text-sm text-gray-600 mb-1">
                  주소: {selectedLocation.address}
                </p>
                <p className="text-sm text-gray-600">
                  좌표: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                취소
              </Button>
              <Button 
                onClick={handleConfirm} 
                disabled={!selectedLocation}
                className="flex-1"
              >
                위치 선택 완료
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapLocationPicker; 