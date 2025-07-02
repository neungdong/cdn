import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = 'http://localhost:8080';
  const SESSION_ID = 'dummySessionId';  // 실제 세션값으로 교체 가능

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 📌 서버-센트 이벤트(SSE) 연결 useEffect 추가
  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/api/plans/chat/connect/${SESSION_ID}`);

    eventSource.onmessage = (event) => {
      console.log('SSE 수신:', event.data);
      const newMessage = {
        id: Date.now(),
        type: 'bot',
        content: event.data,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    };

    eventSource.onerror = (err) => {
      console.error('SSE 오류:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []); // 최초 한 번만 연결

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // 더미 응답 예시 제거 — 서버 응답이 SSE로 오므로 필요 없음

    try {
      await fetch(`${API_BASE_URL}/api/plans/chat/message/${SESSION_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: inputMessage
      });
    } catch (e) {
      console.error(e);
    }

    setInputMessage('');
  };

  const renderMessage = (msg) => (
    <div key={msg.id} style={{ margin: '8px 0', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
      <div style={{
        display: 'inline-block',
        padding: '8px 12px',
        borderRadius: '8px',
        background: msg.type === 'user' ? '#1976d2' : '#e0e0e0',
        color: msg.type === 'user' ? '#fff' : '#000',
        maxWidth: '60%'
      }}>
        <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>{msg.content}</div>
        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.6 }}>{msg.timestamp.toLocaleTimeString()}</div>
      </div>
    </div>
  );

  const renderRecommendationCard = (plan, index) => (
    <div key={index} style={{
      border: '1px solid #ccc',
      padding: '12px',
      borderRadius: '8px',
      margin: '8px 0'
    }}>
      <h4 style={{ margin: '0 0 8px', fontSize: '16px' }}>{plan.planName}</h4>
      <p>통화: {plan.voiceAllowance}</p>
      <p>데이터: {plan.dataAllowance}</p>
      <p>문자: {plan.smsAllowance}</p>
      <p>가격: {plan.monthlyFee}원</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ background: '#1976d2', color: '#fff', padding: '12px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
        <h2 style={{ margin: 0 }}>요금제 추천 챗봇</h2>
      </div>

      <div style={{ padding: '12px', height: '400px', overflowY: 'auto' }}>
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      {recommendations && (
        <div style={{ padding: '12px', background: '#f9f9f9' }}>
          <h3 style={{ margin: '0 0 8px' }}>추천 요금제</h3>
          {recommendations.map(renderRecommendationCard)}
        </div>
      )}

      <div style={{ display: 'flex', borderTop: '1px solid #ccc', padding: '8px' }}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{ flex: 1, padding: '8px', resize: 'none', borderRadius: '4px' }}
          rows={1}
        />
        <button onClick={sendMessage} style={{ marginLeft: '8px', padding: '8px 12px' }}>전송</button>
      </div>
    </div>
  );
};

export default ChatBot;
