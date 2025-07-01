
interface MessageModalProps {
  message: string;
  onClose: () => void;
}

const MessageModal = ({ message, onClose }: MessageModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full animate-fade-in">
        <p className="text-gray-800 mb-6 text-center">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-cucumber-600 text-white py-3 rounded-lg font-semibold hover:bg-cucumber-700 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
