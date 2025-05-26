// script.js - Save in static/js/ directory

document.addEventListener('DOMContentLoaded', function() {
    const messageContainer = document.getElementById('messageContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const newChatButton = document.querySelector('.new-chat-btn');
    
    // Auto-resize textarea as user types
    userInput.addEventListener('input', function() {
        // Reset height to auto to properly calculate new height
        this.style.height = 'auto';
        // Set new height based on scrollHeight with a max height
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });
    
    // Focus input on page load
    userInput.focus();
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        // Remove typing indicator if it exists
        removeTypingIndicator();
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('message-avatar');
        
        const avatarIcon = document.createElement('i');
        avatarIcon.classList.add('fas');
        avatarIcon.classList.add(isUser ? 'fa-user' : 'fa-robot');
        avatarDiv.appendChild(avatarIcon);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const textDiv = document.createElement('div');
        textDiv.classList.add('message-text');
        
        // If content contains code, we'll handle it specially
        if (content.includes('```')) {
            // Split by code blocks
            const segments = content.split(/```(\w*)\n|```/g);
            for (let i = 0; i < segments.length; i++) {
                if (segments[i] && segments[i].trim()) {
                    if (i % 2 === 0) {
                        // Regular text
                        const paragraphs = segments[i].split('\n\n');
                        paragraphs.forEach(paragraph => {
                            if (paragraph.trim()) {
                                const p = document.createElement('p');
                                p.textContent = paragraph.trim();
                                textDiv.appendChild(p);
                            }
                        });
                    } else {
                        // Code block (segments[i] might be the language)
                        if (segments[i+1] && segments[i+1].trim()) {
                            const codeBlock = document.createElement('div');
                            codeBlock.classList.add('code-block');
                            codeBlock.textContent = segments[i+1].trim();
                            textDiv.appendChild(codeBlock);
                            // Skip the next segment as we've already used it
                            i++;
                        }
                    }
                }
            }
        } else {
            // Regular text with paragraphs
            const paragraphs = content.split('\n\n');
            paragraphs.forEach(paragraph => {
                if (paragraph.trim()) {
                    const p = document.createElement('p');
                    p.textContent = paragraph.trim();
                    textDiv.appendChild(p);
                }
            });
        }
        
        contentDiv.appendChild(textDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        messageContainer.appendChild(messageDiv);
        
        // Scroll to the latest message
        scrollToBottom();
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        messageDiv.id = 'typingIndicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('message-avatar');
        
        const avatarIcon = document.createElement('i');
        avatarIcon.classList.add('fas', 'fa-robot');
        avatarDiv.appendChild(avatarIcon);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const textDiv = document.createElement('div');
        textDiv.classList.add('message-text');
        
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        
        // Create three dots for the typing animation
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('typing-dot');
            typingDiv.appendChild(dot);
        }
        
        textDiv.appendChild(typingDiv);
        contentDiv.appendChild(textDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        messageContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Function to scroll to bottom of message container
    function scrollToBottom() {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    
    // Function to send message to server
    async function sendMessage(message) {
        try {
            // Show typing indicator
            showTypingIndicator();
            
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            // Add slight delay to simulate typing
            setTimeout(() => {
                addMessage(data.response);
                
                // If conversation ended
                if (data.status === 'end') {
                    userInput.disabled = true;
                    sendButton.disabled = true;
                    // You could show a message or UI element indicating chat has ended
                }
            }, 700);
            
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again later.');
        }
    }
    
    // Function to handle sending a message
    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input and reset height
            userInput.value = '';
            userInput.style.height = 'auto';
            
            // Send to server
            sendMessage(message);
            
            // Focus on input
            userInput.focus();
        }
    }
    
    // Event listener for send button
    sendButton.addEventListener('click', handleSendMessage);
    
    // Event listener for Enter key (without shift)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            handleSendMessage();
        }
    });
    
    // New chat button functionality
    newChatButton.addEventListener('click', function() {
        // Clear the chat
        while (messageContainer.firstChild) {
            messageContainer.removeChild(messageContainer.firstChild);
        }
        
        // Add initial bot message
        addMessage('Hello! How can I assist you today?');
        
        // Add to chat history
        const chatHistory = document.querySelector('.chat-history');
        const newHistoryItem = document.createElement('div');
        newHistoryItem.classList.add('history-item');
        newHistoryItem.innerHTML = '<i class="fas fa-comment"></i><span>New Chat</span>';
        
        // Remove active class from all history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to new item
        newHistoryItem.classList.add('active');
        chatHistory.prepend(newHistoryItem);
        
        // Enable input if it was disabled
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
    });
    
    // Add click event to history items
    document.addEventListener('click', function(e) {
        if (e.target.closest('.history-item')) {
            const historyItem = e.target.closest('.history-item');
            
            // Remove active class from all history items
            document.querySelectorAll('.history-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            historyItem.classList.add('active');
            
            // In a real app, you would load the chat history here
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', scrollToBottom);
});