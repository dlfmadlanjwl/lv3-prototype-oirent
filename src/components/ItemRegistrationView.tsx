import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Upload, MapPin } from 'lucide-react';
import { toast } from './ui/use-toast';
import MapLocationPicker from './MapLocationPicker';

interface ItemRegistrationForm {
  name: string;
  description: string;
  pricePerDay: number;
  category: '디지털' | '생활용품' | '공간대여' | '인력대여';
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
}

const ItemRegistrationView: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ItemRegistrationForm>({
    name: '',
    description: '',
    pricePerDay: 0,
    category: '생활용품',
    imageUrl: '',
    location: {
      lat: 37.5665,
      lng: 126.9780
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const handleInputChange = (field: keyof ItemRegistrationForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: numValue
        }
      }));
    }
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location: {
        lat: location.lat,
        lng: location.lng,
        address: location.address
      }
    }));
    setShowMapPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.name.trim()) {
      toast({
        title: "입력 오류",
        description: "물품명을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "입력 오류",
        description: "물품 설명을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    if (formData.pricePerDay <= 0) {
      toast({
        title: "입력 오류",
        description: "올바른 가격을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.imageUrl.trim()) {
      toast({
        title: "입력 오류",
        description: "이미지 URL을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 구현에서는 API 호출
      // await registerItem(formData);
      
      // 임시로 1초 대기
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "등록 완료",
        description: "물품이 성공적으로 등록되었습니다.",
      });

      // 메인 페이지로 이동
      navigate('/', { replace: true });
    } catch (error) {
      toast({
        title: "등록 실패",
        description: "물품 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 실제 구현에서는 이미지 업로드 API 호출
      // const uploadedUrl = await uploadImage(file);
      // handleImageUrlChange(uploadedUrl);
      
      // 임시로 파일명 표시
      handleImageUrlChange(`업로드된 이미지: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">물품 등록</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>대여할 물품 정보를 입력해주세요</CardTitle>
            <CardDescription>
              정확한 정보를 입력하면 더 많은 사람들이 관심을 가질 수 있어요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 물품명 */}
              <div className="space-y-2">
                <Label htmlFor="name">물품명 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="예: 울트라와이드 모니터 34인치"
                  required
                />
              </div>

              {/* 카테고리 */}
              <div className="space-y-2">
                <Label htmlFor="category">카테고리 *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: '디지털' | '생활용품' | '공간대여' | '인력대여') => 
                    handleInputChange('category', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="디지털">디지털</SelectItem>
                    <SelectItem value="생활용품">생활용품</SelectItem>
                    <SelectItem value="공간대여">공간대여</SelectItem>
                    <SelectItem value="인력대여">인력대여</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 설명 */}
              <div className="space-y-2">
                <Label htmlFor="description">물품 설명 *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="물품의 특징, 사용법, 주의사항 등을 자세히 설명해주세요"
                  rows={4}
                  required
                />
              </div>

              {/* 가격 */}
              <div className="space-y-2">
                <Label htmlFor="price">일일 대여 가격 (포인트) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.pricePerDay}
                  onChange={(e) => handleInputChange('pricePerDay', parseInt(e.target.value) || 0)}
                  placeholder="예: 5000"
                  required
                />
              </div>

              {/* 이미지 */}
              <div className="space-y-2">
                <Label htmlFor="image">물품 이미지 *</Label>
                <div className="space-y-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    이미지 업로드
                  </Button>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="또는 이미지 URL을 직접 입력하세요"
                  />
                </div>
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl.startsWith('업로드된 이미지:') ? '/placeholder.svg' : formData.imageUrl}
                      alt="미리보기"
                      className="w-32 h-24 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 위치 정보 */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  위치 정보
                </Label>
                
                {/* 지도에서 위치 선택 버튼 */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowMapPicker(true)}
                  className="w-full"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  지도에서 위치 선택
                </Button>
                
                {/* 선택된 위치 정보 표시 */}
                {formData.location.address && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">선택된 위치</p>
                    <p className="text-sm text-gray-600 mb-2">{formData.location.address}</p>
                    <p className="text-xs text-gray-500">
                      좌표: {formData.location.lat.toFixed(6)}, {formData.location.lng.toFixed(6)}
                    </p>
                  </div>
                )}
                
                {/* 수동 입력 옵션 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">위도 (수동 입력)</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="any"
                      value={formData.location.lat}
                      onChange={(e) => handleLocationChange('lat', e.target.value)}
                      placeholder="37.5665"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lng">경도 (수동 입력)</Label>
                    <Input
                      id="lng"
                      type="number"
                      step="any"
                      value={formData.location.lng}
                      onChange={(e) => handleLocationChange('lng', e.target.value)}
                      placeholder="126.9780"
                    />
                  </div>
                </div>
              </div>

              {/* 등록 버튼 */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? '등록 중...' : '물품 등록'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* 지도 위치 선택 모달 */}
      {showMapPicker && (
        <MapLocationPicker
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowMapPicker(false)}
          initialLocation={formData.location}
        />
      )}
    </div>
  );
};

export default ItemRegistrationView; 