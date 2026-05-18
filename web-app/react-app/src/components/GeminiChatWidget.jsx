import React, { useState } from 'react';
import api from '../services/api';
import './GeminiChatWidget.css';

export default function GeminiChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! Ask me about products or categories.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: trimmed });
      const reply = res?.data?.reply || 'Sorry, I could not answer that.';
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'AI error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemini-widget">
      <div className="gemini-header">AI Assistant</div>
      <div className="gemini-messages">
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}`}
            className={`gemini-message ${msg.role === 'user' ? 'gemini-user' : 'gemini-bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form className="gemini-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask something..."
          aria-label="Ask the AI assistant"
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}
