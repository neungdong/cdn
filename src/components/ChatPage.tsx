// import React, { useState, useEffect, useRef } from 'react';
// import { apiV1Client } from '../libs/api/apiClient';


// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const eventSourceRef = useRef(null);

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     // 사용자 메시지 추가
//     setMessages(prev => [...prev, { sender: 'user', message: inputValue }]);

//     // SSE 연결 열기
//     if (eventSourceRef.current) {
//       eventSourceRef.current.close();
//     }

//     // SSE 연결
//     eventSourceRef.current = new EventSource(`${apiV1Client.defaults.baseURL}chat/stream?prompt=${encodeURIComponent(inputValue)}`, {
//       withCredentials: true,
//     });

//     eventSourceRef.current.onmessage = (event) => {
//       const data = event.data;

//       if (data !== '[DONE]') {
//         setMessages(prev => [...prev, { sender: 'bot', message: data }]);
//       } else {
//         eventSourceRef.current.close();
//       }
//     };

//     eventSourceRef.current.onerror = (err) => {
//       console.error('SSE 연결 오류:', err);
//       eventSourceRef.current.close();
//     };

//     setInputValue('');
//   };

//   useEffect(() => {
//     return () => {
//       if (eventSourceRef.current) {
//         eventSourceRef.current.close();
//       }
//     };
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>요금제 추천 챗봇</h2>
//       <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'auto' }}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
//             <strong>{msg.sender === 'user' ? '나' : '챗봇'}: </strong>
//             {msg.message}
//           </div>
//         ))}
//       </div>
//       <div style={{ marginTop: '10px' }}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={e => setInputValue(e.target.value)}
//           placeholder="메시지를 입력하세요"
//           style={{ width: '80%', padding: '8px' }}
//         />
//         <button onClick={handleSendMessage} style={{ padding: '8px 16px', marginLeft: '8px' }}>
//           전송
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
import React, { useEffect, useRef, useState } from 'react';
import { apiV1Client } from '../libs/api/apiClient';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const eventSourceRef = useRef<EventSource | null>(null);

  // SSE 연결
  const connectSSE = () => {
    // accesstoken은 withCredentials 옵션으로 자동 전달됨
    const eventSource = new EventSource(`http://localhost:8080/api/chat/connect`, { withCredentials: true });
    
    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;
  };

  useEffect(() => {
    connectSSE();
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  // 메시지 전송
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      await apiV1Client.post('/chat/send', { message: input });
      setMessages((prev) => [...prev, `나: ${input}`]);
      setInput('');
    } catch (error) {
      console.error('전송 실패:', error);
    }
  };

  // 엔터키 전송
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">요금제 추천 챗봇</h1>

      <div className="border p-4 rounded h-96 overflow-y-auto mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">{msg}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
