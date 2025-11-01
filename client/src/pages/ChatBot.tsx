import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { MessageCircle, Send, Bot, User, Loader2 } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const ChatBot = () => {
  const { isSignedIn } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key'
  const genAI = new GoogleGenerativeAI(API_KEY)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isSignedIn && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `Hello! 👋 I'm your AI programming assistant. I can help you with coding questions, explain programming concepts, debug issues, and provide learning guidance. What would you like to know?`,
        isUser: false,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isSignedIn])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
      
      const prompt = `You are a helpful AI programming assistant. The user asked: "${userMessage.content}". 
      Please provide a helpful, accurate, and educational response. If it's about programming, include code examples when relevant. 
      Keep responses conversational but informative. If the question is not programming-related, gently redirect to programming topics while still being helpful.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const aiResponse = response.text()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Simple formatting for code blocks
    const parts = content.split('```')
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <pre key={index} className="bg-black/40 p-4 rounded-lg my-2 overflow-x-auto">
            <code className="text-green-400 text-sm">{part}</code>
          </pre>
        )
      }
      // Regular text with line breaks
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part}
        </div>
      )
    })
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
            <MessageCircle className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sign In Required
          </h1>
          <p className="text-gray-300 mb-6">
            Please sign in to chat with our AI programming assistant.
          </p>
          <Link
            to="/sign-up"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-500/20 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full border border-purple-500/30 mr-4">
              <MessageCircle className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Programming Assistant
              </h1>
              <p className="text-gray-300">Ask me anything about programming!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-6 py-6 overflow-hidden">
        <div className="h-full max-w-full mx-auto flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[90%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 ml-3' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 mr-3'
                  }`}>
                    {message.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-2xl p-4 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-gray-100'
                  }`}>
                    <div className="text-sm">
                      {formatMessage(message.content)}
                    </div>
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.isUser ? 'text-purple-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                      <span className="text-gray-300 text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about programming, debugging, concepts, or anything code-related..."
                  className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                  disabled={isTyping}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot