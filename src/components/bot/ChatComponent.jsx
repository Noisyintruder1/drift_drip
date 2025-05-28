import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatComponent.css';
import "bootstrap/dist/js/bootstrap.js"
import 'bootstrap/dist/css/bootstrap.min.css'



const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [robotActive, setRobotActive] = useState(false);

  useEffect(() => {
    // Robot "wakes up" when first message is sent
    if (messages.length > 0 && !robotActive) {
      setRobotActive(true);
    }
  }, [messages, robotActive]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Simulate thinking delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });
      
      const botMessage = { 
        text: response.data.message, 
        sender: 'bot',
        suggestions: response.data.suggestions || []
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting to the chatbot.", 
        sender: 'bot',
        suggestions: []
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage();
  };

  // Loading dots animation component
  const TypingIndicator = () => (
    <div className="typing-indicator">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );

  return (
    
    <div className="chat-app">
      
      {/* Robot Head */}
      
      <div className={`robot-head ${robotActive ? 'active' : ''}`}>
        <div className="robot-face">
          <div className="eyes">
            <div className="eye left"></div>
            <div className="eye right"></div>
          </div>
          <div className="mouth"></div>
        </div>
        {isTyping && <div className="robot-thinking"></div>}
      </div>

      <div className="chat-container">
        <h3 className='leo'>Welcome to Drift,Trip& Drip Collection customer Care</h3>
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h3>Hello! I'm your friendly AI assistant</h3>
              <p>Ask me anything or try one of these:</p>
              <div className="welcome-suggestions">
                <button onClick={() => handleSuggestionClick("hi")}>hi</button>
                <button onClick={() => handleSuggestionClick("how are you")}>how are you</button>
                <button onClick={() => handleSuggestionClick("what is your name")}>what is your name</button>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">
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
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot typing-message">
              <TypingIndicator />
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} disabled={isTyping}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;