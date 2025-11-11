
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useAppContext } from '../App';
import { ChatBotIcon, CloseIcon, PaperAirplaneIcon } from './IconComponents';

interface Message {
  text: string;
  sender: 'user' | 'ai' | 'error';
}

interface AiStudyBuddyProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiStudyBuddy: React.FC<AiStudyBuddyProps> = ({ isOpen, onClose }) => {
  const { t } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: t('aiBuddy.welcomeMessage'), sender: 'ai' }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const newMessages: Message[] = [...messages, { text: trimmedInput, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: "user", parts: [{ text: trimmedInput }] }],
        config: {
          systemInstruction: "You are a friendly and helpful biology tutor for 10th-grade students in Oman. Explain concepts clearly and simply, in Arabic. Your answers should be related to biology. If asked about a non-biology topic, politely state that you can only assist with biology questions.",
        },
      });
      
      const aiResponseText = response.text;
      setMessages([...newMessages, { text: aiResponseText, sender: 'ai' }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages([...newMessages, { text: t('aiBuddy.errorMessage'), sender: 'error' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed bottom-0 end-0 z-[60] w-full max-w-md h-full md:h-[70vh] md:max-h-[600px] md:bottom-8 md:end-8 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="ai-buddy-title"
    >
      <div className="bg-white dark:bg-slate-800 h-full w-full flex flex-col shadow-2xl rounded-t-lg md:rounded-lg">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-emerald-600 dark:bg-emerald-700 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <ChatBotIcon className="w-6 h-6" />
            <h3 id="ai-buddy-title" className="font-bold text-lg">{t('aiBuddy.title')}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close chat"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900" role="log">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender !== 'user' && <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><ChatBotIcon className="w-5 h-5 text-white" /></div>}
                <div
                  className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${
                    msg.sender === 'user' ? 'bg-emerald-500 text-white rounded-br-none' : 
                    msg.sender === 'error' ? 'bg-red-500 text-white rounded-bl-none' : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-end gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><ChatBotIcon className="w-5 h-5 text-white" /></div>
                  <div className="px-4 py-3 rounded-2xl bg-gray-200 dark:bg-slate-700 rounded-bl-none">
                      <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce"></span>
                      </div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <footer className="p-4 border-t border-gray-200 dark:border-slate-700">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('aiBuddy.inputPlaceholder')}
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AiStudyBuddy;