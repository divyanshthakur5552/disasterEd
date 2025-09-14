import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Trash2,
  MessageSquare,
  Download,
  Share2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Header from "components/ui/Header";
import Breadcrumb from "components/ui/Breadcrumb";

// Always use Netlify route
const BACKEND_URL = "/api/chat";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Disaster Education Assistant. I can help you with information about disaster preparedness, emergency response, safety protocols, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      liked: null,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToChatAPI = async (message) => {
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Error connecting to backend:", error);
      return "I'm having trouble connecting to the server. Try again later.";
    }
  };

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, 1000 + Math.random() * 2000);
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "24px";

    try {
      await simulateTyping();
      const botResponse = await sendMessageToChatAPI(userMessage.text);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        liked: null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
        liked: null,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "24px";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleLike = (messageId, liked) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, liked: msg.liked === liked ? null : liked }
          : msg
      )
    );
  };

  const regenerateResponse = async (messageIndex) => {
    const userMessage = messages[messageIndex - 1];
    if (!userMessage || userMessage.sender !== "user") return;

    setIsLoading(true);
    try {
      await simulateTyping();
      const botResponse = await sendMessageToChatAPI(userMessage.text);

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === messageIndex
            ? { ...msg, text: botResponse, timestamp: new Date(), liked: null }
            : msg
        )
      );
    } catch (error) {
      console.error("Error regenerating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your Disaster Education Assistant. I can help you with information about disaster preparedness, emergency response, safety protocols, and more. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
        liked: null,
      },
    ]);
  };

  const exportChat = () => {
    const chatContent = messages
      .map(
        (msg) =>
          `${msg.sender.toUpperCase()} (${formatTime(msg.timestamp)}): ${
            msg.text
          }`
      )
      .join("\n\n");

    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `disaster-assistant-chat-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareChat = async () => {
    const chatContent = messages
      .slice(-5)
      .map(
        (msg) => `${msg.sender === "user" ? "You" : "Assistant"}: ${msg.text}`
      )
      .join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Disaster Education Chat",
          text: chatContent,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      copyToClipboard(chatContent, "share");
    }
  };

  const formatTime = (timestamp) =>
    timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const quickActions = [
    "What should I include in an emergency kit?",
    "How do I prepare for an earthquake?",
    "What are the signs of a tornado?",
    "First aid basics for emergencies",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <Header />
      <div className="max-w-4xl mx-auto px-4">
        <Breadcrumb />

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-3 rounded-full">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Disaster Education Assistant
                </h1>
                <p className="text-gray-600">
                  Get expert guidance on emergency preparedness and disaster
                  response
                </p>
              </div>
            </div>

            {/* Chat Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={exportChat}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export chat"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={shareChat}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share chat"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={clearChat}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Start
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 inline mr-2 text-blue-500" />
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 group ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-primary"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                <div
                  className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg relative ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <ReactMarkdown>{message.text}</ReactMarkdown>

                    {/* Message Actions */}
                    <div
                      className={`absolute -bottom-8 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                        message.sender === "user" ? "right-0" : "left-0"
                      }`}
                    >
                      <button
                        onClick={() =>
                          copyToClipboard(message.text, message.id)
                        }
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {message.sender === "bot" && (
                        <>
                          <button
                            onClick={() => handleLike(message.id, true)}
                            className={`p-1 rounded ${
                              message.liked === true
                                ? "text-green-600"
                                : "text-gray-400 hover:text-green-600"
                            }`}
                            title="Like response"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleLike(message.id, false)}
                            className={`p-1 rounded ${
                              message.liked === false
                                ? "text-red-600"
                                : "text-gray-400 hover:text-red-600"
                            }`}
                            title="Dislike response"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => regenerateResponse(index)}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded"
                            title="Regenerate response"
                            disabled={isLoading}
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {(isLoading || isTyping) && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Assistant is thinking...
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="border-t bg-gray-50 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about safety tips, emergency procedures, or disaster preparedness..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 overflow-hidden focus:border-transparent resize-none min-h-[48px] max-h-[120px]"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
