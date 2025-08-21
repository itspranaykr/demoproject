// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Toggle chatbot visibility
    chatbotBtn.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        
        // Process message and generate response
        setTimeout(() => {
            generateResponse(message);
        }, 500);
    }
    
    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot response
    function generateResponse(userMessage) {
        let response = '';
        userMessage = userMessage.toLowerCase();
        
        // Simple response logic based on keywords
        if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
            response = "Hello there! How can I assist you with solar energy solutions today?";
        } else if (userMessage.includes('off grid') || userMessage.includes('off-grid')) {
            response = "Our off-grid solar systems operate independently of the main power grid, perfect for remote locations. They include solar panels, batteries for storage, and an inverter.";
        } else if (userMessage.includes('on grid') || userMessage.includes('on-grid')) {
            response = "On-grid systems are connected to the main electricity grid. They allow you to use solar power when available and draw from the grid when needed, often with net metering benefits.";
        } else if (userMessage.includes('hybrid')) {
            response = "Hybrid systems combine the best of both worlds - they can use solar power, draw from the grid, and store excess energy in batteries for later use.";
        } else if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('quote')) {
            response = "Pricing depends on your energy needs, location, and system type. Would you like me to connect you with one of our solar experts for a customized quote?";
        } else if (userMessage.includes('contact') || userMessage.includes('number') || userMessage.includes('phone')) {
            response = "You can reach us at +91 7011669314 or email info@agsolar.in. Our team is available Mon-Sun from 9AM to 10PM.";
        } else if (userMessage.includes('service') || userMessage.includes('install')) {
            response = "We provide end-to-end solar solutions including consultation, design, installation, and maintenance. Which type of system are you interested in?";
        } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
            response = "You're welcome! Is there anything else you'd like to know about solar solutions?";
        } else {
            response = "I'm still learning about solar energy solutions. For detailed information, please contact our experts at +91 70116 69314 or visit our services page.";
        }
        
        addMessage(response, 'bot');
    }
    
    // Auto-open chatbot after a delay (optional)
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            addMessage("Hi there! I'm here to help you learn about solar solutions. Feel free to ask me anything!", 'bot');
        }
    }, 10000);
});