import React, { useState, useRef, useEffect } from 'react';
import { ParsedData } from '../types';
import { DataAnalyzer } from '../utils/dataAnalyzer';
import { Brain, Send, Lightbulb, MessageSquare, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIQuestionInputProps {
  data: ParsedData;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "How many total records are there?",
  "What columns are available?",
  "What's the sum of all values?",
  "What's the average value?",
  "What's the maximum value?",
  "What's the minimum value?",
  "Show me data quality issues",
  "Identify trends in the data"
];

export const AIQuestionInput: React.FC<AIQuestionInputProps> = ({ data }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setQuestion('');
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const response = DataAnalyzer.answerQuestion(userMessage.content, data);
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion);
    
    // Automatically submit after a short delay
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }, 100);
  };

  const copyToClipboard = () => {
    const text = messages.map(msg => 
      `${msg.type === 'user' ? 'Question' : 'Answer'}: ${msg.content}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">AI Data Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Ask questions about your data and get instant answers
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ask me anything about your data
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
              I can help you analyze patterns, find insights, and understand your data better
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                }`}>
                  <div className="flex items-start mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    }`}>
                      {message.type === 'user' 
                        ? <MessageSquare className="w-3 h-3 text-white" /> 
                        : <Brain className="w-3 h-3 text-white" />
                      }
                    </div>
                    <div className="text-xs font-semibold">
                      {message.type === 'user' ? 'You' : 'AI Assistant'}
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Conversation actions */}
      {messages.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between">
          <button
            onClick={clearConversation}
            className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Clear</span>
          </button>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Suggested Questions */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Suggested Questions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {SUGGESTED_QUESTIONS.map((suggestedQuestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(suggestedQuestion)}
              className="text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-lg transition-colors"
            >
              {suggestedQuestion}
            </button>
          ))}
        </div>
      </div>

      {/* Question Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about your data..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};