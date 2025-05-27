import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });
      
      const botMessage = { 
        text: response.data.message, 
        sender: 'bot',
        suggestions: response.data.suggestions || [] // Ensure suggestions is always an array
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting to the chatbot.", 
        sender: 'bot',
        suggestions: [] // Add empty array for suggestions
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            {msg.sender === 'bot' && Array.isArray(msg.suggestions) && msg.suggestions.length > 0 && (
              <div className="suggestions">
                {msg.suggestions.map((suggestion, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-btn"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && <div className="message bot">Typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;