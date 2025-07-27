import React, { useState, useRef, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import { cn } from "../utils/cn";
import chatbotIcon from "../assets/logos/chatboticon.png";
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: t('chatbot.greeting'),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (inputValue) => {
    if (!inputValue.trim()) return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: t('chatbot.error'),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const placeholders = [
    "What is BEYOUND's mission?",
    "Tell me about your products.",
    "How is your clothing adaptive?",
    "What materials do you use?",
    "How can I get involved?",
  ];

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-5 right-5 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 animate-float"
          aria-label="Open chat"
        >
          <img 
            src={chatbotIcon} 
            alt="Chatbot" 
            className="h-8 w-8 object-contain filter brightness-0 invert"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm rounded-lg bg-gray-900/80 backdrop-blur-md border border-gray-700/50 shadow-lg sm:bottom-8 sm:right-8">
          <div className="relative flex items-center justify-between border-b border-gray-700/50 px-4 py-3 bg-gray-800/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <img 
                src={chatbotIcon} 
                alt="Chatbot" 
                className="h-6 w-6 object-contain filter brightness-0 invert"
              />
              <div className="font-semibold text-white">BEYOUND Assistant</div>
            </div>
            <button
              onClick={toggleChat}
              className="rounded-full p-2 text-gray-300 hover:bg-gray-700/50 transition-colors"
              aria-label="Close chat"
            >
              <svg
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-900/40 backdrop-blur-sm">
            <ul className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs rounded-lg px-3 py-2 text-sm backdrop-blur-sm",
                      msg.sender === "user"
                        ? "bg-red-600/90 text-white border border-red-500/30"
                        : "bg-gray-800/60 text-white border border-gray-700/50"
                    )}
                  >
                    {msg.text}
                  </div>
                </li>
              ))}
              {isTyping && (
                <li className="flex justify-start">
                  <div className="flex w-fit items-center gap-2 rounded-lg bg-gray-800/60 backdrop-blur-sm px-3 py-2.5 border border-gray-700/50">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  </div>
                </li>
              )}
              <div ref={messagesEndRef} />
            </ul>
          </div>

          <div className="border-t border-gray-700/50 p-2 bg-gray-800/60 backdrop-blur-sm">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => {
                /* We will handle state in the onSubmit function */
              }}
              onSubmit={handleSendMessage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 