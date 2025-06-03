import React, { useState, useEffect } from 'react';
import './ChatComponent.css';
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [robotActive, setRobotActive] = useState(false);

  // Chatbot response configuration
  const chatbotConfig = {
    pairs: [
      {
        pattern: /hi|hello|hey/i,
        responses: ["Hello! How can I assist you today?", "Hi there! How can I help?"]
      },
      {
        pattern: /what is your name|who are you/i,
        responses: ["I'm your friendly chatbot assistant!", "You can call me ChatBot!"]
      },
      {
        pattern: /how are you|how's it going/i,
        responses: ["I'm doing great, thanks for asking! How may I assist you today?"]
      },
      {
        pattern: /thank you|thanks/i,
        responses: ["Happy to help!"]
      },
      {
        pattern: /bye|goodbye|see you/i,
        responses: ["Goodbye! Have a nice day!"]
      },
      {
        pattern: /help|support/i,
        responses: ["What do you need?"]
      },
      {
        pattern: /(.*)(buy|purchase)(.*)/i,
        responses: ["Would you like to purchase one item or more than one?"],
        suggestions: ["one", "more than one"]
      },
      {
        pattern: /one/i,
        responses: ["Select the product by clicking the cart button on Getproduct, then click the cart icon on the navbar, proceed to checkout, enter your phone number, receive an Mpesa message, then enter your Mpesa pin to complete payment."]
      },
      {
        pattern: /more than one/i,
        responses: ["Select the product by clicking the cart button on Getproduct, then click the cart icon on the navbar, proceed to checkout, enter your phone number, receive an Mpesa message, then enter your Mpesa pin to complete payment."]
      },
      {
        pattern: /(.*)(human|customercare)(.*)/i,
        responses: ["Contact your front desk manager on 0792827049"]
      },
      {
        pattern: /(.*)/i, // Default catch-all
        responses: ["I'm still learning. Could you ask me something else?"]
      }
    ],
    reflections: {
      "i am": "you are",
      "i was": "you were",
      "i": "you",
      "i'm": "you are",
      "i'd": "you would",
      "i've": "you have",
      "i'll": "you will",
      "my": "your",
      "you are": "I am",
      "you were": "I was",
      "you've": "I have",
      "you'll": "I will",
      "your": "my",
      "yours": "mine",
      "you": "me",
      "me": "you"
    }
  };

  useEffect(() => {
    if (messages.length > 0 && !robotActive) {
      setRobotActive(true);
    }
  }, [messages, robotActive]);

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Check for quit commands
    if (input === 'quit' || input === 'bye' || input === 'goodbye') {
      return {
        message: "Goodbye! Have a nice day.",
        suggestions: [],
        status: 'end'
      };
    }

    // Find matching pattern
    for (const pair of chatbotConfig.pairs) {
      if (pair.pattern.test(input)) {
        return {
          message: pair.responses[Math.floor(Math.random() * pair.responses.length)],
          suggestions: pair.suggestions || [],
          status: 'success'
        };
      }
    }

    // Default response
    return {
      message: chatbotConfig.pairs[chatbotConfig.pairs.length - 1].responses[0],
      suggestions: [],
      status: 'success'
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Simulate thinking delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = getBotResponse(input);
      
      const botMessage = { 
        text: response.message, 
        sender: 'bot',
        suggestions: response.suggestions || []
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      if (response.status === 'end') {
        // Reset chat after goodbye
        setTimeout(() => {
          setMessages([]);
          setRobotActive(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, something went wrong.", 
        sender: 'bot',
        suggestions: []
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    // Use setTimeout to ensure the input is updated before sending
    setTimeout(() => {
      handleSendMessage();
    }, 0);
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
        <h3 className='leo'>Welcome to Drift, Trip & Drip Collection Customer Care</h3>
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h3>Hello! I'm your friendly AI assistant</h3>
              <p>Ask me anything or try one of these:</p>
              <div className="welcome-suggestions">
                <button onClick={() => handleSuggestionClick("hi")}>Say Hello</button>
                <button onClick={() => handleSuggestionClick("how are you")}>Check In</button>
                <button onClick={() => handleSuggestionClick("how to buy")}>Purchase Help</button>
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