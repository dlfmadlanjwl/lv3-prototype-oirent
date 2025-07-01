
interface TipsModalProps {
  content: string;
  loading: boolean;
  onClose: () => void;
}

const TipsModal = ({ content, loading, onClose }: TipsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full animate-slide-up">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          ✨ 사용 팁
        </h3>
        
        <div className="mb-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cucumber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">AI가 사용 팁을 생성하고 있습니다...</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                {content}
              </pre>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          disabled={loading}
          className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default TipsModal;
