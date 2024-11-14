// components/ChatBot.tsx
import React, { useState, useEffect, useRef } from "react";
import css from "./ChatBot.module.css";
import { Message, QuickResponse } from "../types/chat.type";
import { ChatService } from "../lib/chat.service";

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
  // languages: ["English", "Spanish"],
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
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      text: botInfo.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ]
);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = message.trim();
      setMessage("");

      // Add user message to chat
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: userMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);

      setIsLoading(true);
      try {
        // Get bot response
        const botResponse = await ChatService.sendMessage(userMessage);

        // Add bot response to chat
        const newBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newBotMessage]);

        if (!isOpen) {
          triggerShake();
        }
      } catch (error) {
        console.error("Failed to get bot response:", error);
        // Optionally add an error message to the chat
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickResponse = async (response: QuickResponse) => {
    // Handle quick response as a user message
    const messageText = `${response.title}: ${response.description}`;
    setMessage(messageText);
    await handleSubmit({ preventDefault: () => {} } as React.FormEvent);
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
            <div className={css.messageContainer}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${css.message} ${
                    msg.sender === "user" ? css.userMessage : css.botMessage
                  }`}
                >
                  {msg.text}
                  <div className={css.messageTime}>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={css.botMessage}>
                  <div className={css.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={css.quickResponses}>
              <div className={css.quickResponses}>
                {!hasInteracted &&
                  quickResponses.map((response, index) => (
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
            </div>

            <form onSubmit={handleSubmit} className={css.chatInput}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className={css.messageInput}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={css.sendButton}
                disabled={isLoading}
              >
                {isLoading ? "..." : "Send"}
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
