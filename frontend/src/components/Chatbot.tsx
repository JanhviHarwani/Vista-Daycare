// components/ChatBot.tsx
import React, { useState, useEffect } from "react";
import css from "./ChatBot.module.css";

interface ChatBubbleIconProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  isShaking?: boolean;
}

const ChatBubbleIcon = ({ onClick, style, isShaking }: ChatBubbleIconProps) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={style}
    className={`${css.chatIcon} ${isShaking ? css.shake : ""}`}
  >
    {/* Circle background */}
    <circle
      cx="30"
      cy="30"
      r="30"
      fill="#a2845e"
      className={css.circleBackground}
    />

    {/* Chat bubble shape */}
    <path
      d="M44 25.5C44 21.9101 41.0899 19 37.5 19H22.5C18.9101 19 16 21.9101 16 25.5V34.5C16 38.0899 18.9101 41 22.5 41H31L38 45V41H37.5C41.0899 41 44 38.0899 44 34.5V25.5Z"
      fill="white"
      className={css.chatBubble}
    />
  </svg>
);

const botInfo = {
  name: "Rosa",
  title: "Care Companion",
  avatar: <ChatBubbleIcon />,
  greeting:
    "¡Hola! I'm Rosa, your Vista Care companion. How may I assist you today?",
  languages: ["English", "Spanish"],
};

const quickResponses = [
  {
    title: "Our Services",
    description: "Learn about our adult day care services",
  },
  {
    title: "Schedule a Visit",
    description: "Book a tour of our facility",
  },
  {
    title: "Daily Activities",
    description: "View our activity calendar",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Initial welcome shake
  useEffect(() => {
    if (!hasInteracted) {
      const timeout = setTimeout(() => {
        triggerShake();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasInteracted]);

  // Periodic shake when closed
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isOpen && hasInteracted) {
      interval = setInterval(() => {
        triggerShake();
      }, 30000); // Shake every 30 seconds when closed

      return () => clearInterval(interval);
    }
  }, [isOpen, hasInteracted]);

  const toggleChat = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Simulate message sending
    //   const userMessage = message.trim();
    //   setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        if (!isOpen) {
          triggerShake();
        }
      }, 1000);
    }
  };

  const handleQuickResponse = (response: typeof quickResponses[0]) => {
    // Handle quick response selection
    console.log(`Selected: ${response.title}`);
    // Add your logic here
  };

  return (
    <div className={css.chatbotContainer}>
      {isOpen && (
        <div className={css.chatWindow}>
          <div className={css.chatHeader}>
            <div className={css.headerContent}>
              <div className={css.avatarContainer}>{botInfo.avatar}</div>
              <div className={css.headerInfo}>
                <h3>{botInfo.name}</h3>
                <p>{botInfo.title}</p>
                <div className={css.languageBadges}>
                  {botInfo.languages.map((lang) => (
                    <span key={lang} className={css.badge}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={toggleChat}
                className={css.closeButton}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          <div className={css.chatBody}>
            <div className={css.welcomeMessage}>
              <p>{botInfo.greeting}</p>
            </div>

            <div className={css.quickResponses}>
              {quickResponses.map((response, index) => (
                <button 
                  key={index} 
                  className={css.responseButton}
                  onClick={() => handleQuickResponse(response)}
                >
                  <strong>{response.title}</strong>
                  <span>{response.description}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className={css.chatInput}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className={css.messageInput}
              />
              <button type="submit" className={css.sendButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      <ChatBubbleIcon
        style={{ cursor: "pointer" }}
        onClick={toggleChat}
        isShaking={isShaking}
      />
    </div>
  );
};

export default ChatBot;