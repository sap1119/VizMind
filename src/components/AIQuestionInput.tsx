import React from 'react';
import { ParsedData } from '../types';
import { DataAnalyzer } from '../utils/dataAnalyzer';
import { Brain, Send, Lightbulb } from 'lucide-react';

interface AIQuestionInputProps {
  data: ParsedData;
}

const SUGGESTED_QUESTIONS = [
  "How many total records are there?",
  "What columns are available?",
  "What's the sum of all values?",
  "What's the average value?",
  "What's the maximum value?",
  "What's the minimum value?"
];

export const AIQuestionInput: React.FC<AIQuestionInputProps> = ({ data }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const response = DataAnalyzer.answerQuestion(question, data);
      setAnswer(response);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion);
    const response = DataAnalyzer.answerQuestion(suggestedQuestion, data);
    setAnswer(response);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Data Insights</h3>
            <p className="text-sm text-gray-600">
              Ask questions about your data and get instant answers
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Suggested Questions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Suggested Questions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SUGGESTED_QUESTIONS.map((suggestedQuestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(suggestedQuestion)}
                className="text-left px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                {suggestedQuestion}
              </button>
            ))}
          </div>
        </div>

        {/* Question Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your data..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>

        {/* Answer Display */}
        {answer && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-green-500 rounded-full flex-shrink-0 mt-1">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Answer:</h4>
                <p className="text-gray-700">{answer}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};