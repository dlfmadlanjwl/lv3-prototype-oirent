
import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface ChatViewProps {
  partnerName: string;
  onBack: () => void;
}

const ChatView = ({ partnerName, onBack }: ChatViewProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'partner', content: '안녕하세요! 대여 관련 문의드립니다.', time: '오후 2:28' },
    { id: 2, sender: 'me', content: '네, 안녕하세요! 무엇을 도와드릴까요?', time: '오후 2:29' },
    { id: 3, sender: 'partner', content: '언제까지 사용 가능한가요?', time: '오후 2:29' },
    { id: 4, sender: 'me', content: '이번 주말까지 괜찮습니다!', time: '오후 2:30' },
    { id: 5, sender: 'partner', content: '네, 언제든지 연락주세요!', time: '오후 2:30' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        content: message,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col">
      {/* 헤더 */}
      <div className="bg-cucumber-600 text-white px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="text-white hover:text-cucumber-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">{partnerName}</h1>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'me'
                  ? 'bg-cucumber-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-cucumber-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cucumber-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="bg-cucumber-600 text-white px-4 py-2 rounded-lg hover:bg-cucumber-700 transition-colors flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
