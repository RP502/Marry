import React, { useMemo, useState } from 'react';
import { Bot, ChevronDown, Send, ShieldAlert, Sparkles, X } from 'lucide-react';
import { UserAccount } from '../types';
import { CUSTOMS_ARTICLES } from '../data/customsData';

interface ChatbotWidgetProps {
  currentUser: UserAccount | null;
  currentView: string;
}

type Message = { role: 'user' | 'assistant'; text: string; sources?: string[] };

const normalize = (value: string) =>
  value.toLocaleLowerCase('vi-VN').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ currentUser, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [knowledgeStatus] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('chungdoi_knowledge_status') || '{}') as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  const articles = useMemo(
    () => CUSTOMS_ARTICLES.filter((article) => knowledgeStatus[article.id] !== false),
    [knowledgeStatus],
  );

  const askQuestion = () => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const normalized = normalize(trimmed);
    const matched = articles.find((article) => {
      const terms = normalize(`${article.title} ${article.summary} ${article.answer}`).split(/\s+/);
      return terms.filter((term) => term.length > 3 && normalized.includes(term)).length >= 2;
    });

    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      matched
        ? { role: 'assistant', text: matched.answer, sources: matched.sources }
        : {
            role: 'assistant',
            text: 'Mình chưa có đủ dữ liệu đáng tin cậy để trả lời câu hỏi này. Bạn hãy nêu rõ vùng miền, nghi lễ hoặc lễ vật; đồng thời xác nhận lại với đại diện hai gia đình.',
          },
    ]);
    setQuestion('');
  };

  const contextLabel = currentUser?.role === 'admin' ? 'Trợ lý quản trị' : 'Trợ lý cưới AI "Hoa"';
  const isAuthScreen = ['login', 'signup', 'verify-magic-link', 'xac-minh'].includes(currentView);

  if (isAuthScreen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-7 md:right-7">
      {isOpen && (
        <section className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[#eadedb] bg-white shadow-2xl shadow-[#5c3030]/20">
          <header className="flex items-center justify-between bg-[#a9232c] px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><Bot className="h-5 w-5" /></div>
              <div><p className="text-sm font-bold">{contextLabel}</p><p className="text-[11px] text-white/75">Tư vấn phong tục có nguồn</p></div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 hover:bg-white/15" aria-label="Ẩn chatbot"><ChevronDown className="h-5 w-5" /></button>
          </header>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#fbf8f6] p-4">
            {!messages.length && (
              <div className="rounded-2xl bg-white p-3 text-sm leading-6 text-stone-600 shadow-sm">
                <div className="mb-1 flex items-center gap-1.5 font-bold text-[#a9232c]"><Sparkles className="h-3.5 w-3.5" /> Xin chào!</div>
                Bạn có thể hỏi về nghi lễ, lễ vật hoặc phong tục theo từng vùng miền.
              </div>
            )}
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rounded-2xl px-3 py-2.5 text-sm leading-6 ${message.role === 'user' ? 'ml-8 bg-[#a9232c] text-white' : 'mr-3 bg-white text-stone-700 shadow-sm'}`}>
                <p>{message.text}</p>
                {message.sources && <p className="mt-2 border-t border-stone-100 pt-2 text-[10px] leading-4 text-stone-400">Nguồn: {message.sources.join('; ')}</p>}
              </div>
            ))}
          </div>
          <div className="border-t border-stone-100 bg-white p-3">
            <div className="flex gap-2">
              <input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && askQuestion()} placeholder="Đặt câu hỏi bằng tiếng Việt..." className="min-w-0 flex-1 rounded-xl border border-stone-200 px-3 py-2.5 text-xs outline-none focus:border-[#a9232c]" />
              <button onClick={askQuestion} className="rounded-xl bg-[#a9232c] px-3 text-white" aria-label="Gửi câu hỏi"><Send className="h-4 w-4" /></button>
            </div>
            <p className="mt-2 flex gap-1 text-[10px] leading-4 text-stone-400"><ShieldAlert className="mt-0.5 h-3 w-3 shrink-0" /> Nội dung chỉ mang tính tham khảo.</p>
          </div>
        </section>
      )}
      <button onClick={() => setIsOpen((open) => !open)} className={`ml-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl shadow-[#a9232c]/30 transition hover:scale-105 ${isOpen ? 'bg-[#6d2026]' : 'bg-[#a9232c]'}`} aria-label={isOpen ? 'Ẩn chatbot' : 'Mở chatbot'}>
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
      {!isOpen && <span className="pointer-events-none absolute bottom-16 right-0 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6d4a47] shadow-lg hidden sm:inline-block">Hỏi Hoa (AI) về cưới hỏi</span>}
    </div>
  );
};
