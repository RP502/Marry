import React, { useMemo, useState } from 'react';
import { BookOpen, ChevronRight, MapPin, Search, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';
import { CUSTOMS_ARTICLES, REGION_LABELS, WeddingRegion } from '../data/customsData';

interface CustomsAdvisorPageProps {
  onNavigate: (view: ViewMode) => void;
}

const normalize = (value: string) =>
  value.toLocaleLowerCase('vi-VN').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const CustomsAdvisorPage: React.FC<CustomsAdvisorPageProps> = ({ onNavigate }) => {
  const [region, setRegion] = useState<WeddingRegion>('all');
  const [search, setSearch] = useState('');
  const [knowledgeStatus] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('chungdoi_knowledge_status') || '{}') as Record<string, boolean>;
    } catch {
      return {};
    }
  });
  const publishedArticles = CUSTOMS_ARTICLES.filter((article) => knowledgeStatus[article.id] !== false);
  const articles = useMemo(
    () =>
      publishedArticles.filter((article) => region === 'all' || article.region === region).filter((article) => {
        const haystack = normalize(`${article.title} ${article.summary} ${article.answer}`);
        return !search || haystack.includes(normalize(search));
      }),
    [region, search, publishedArticles],
  );

  return (
    <div className="min-h-screen bg-[#fbf9f7] pb-20">
      <section className="bg-[#f5e9e4] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[.16em] text-[#a9232c]">
              <Sparkles className="h-3.5 w-3.5" /> Trợ lý phong tục cưới hỏi
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold text-[#3d302d] sm:text-6xl">Hỏi chuyện cưới hỏi Việt Nam</h1>
            <p className="mt-4 max-w-2xl leading-7 text-[#715f5c]">
              Tra cứu nghi lễ, lễ vật và lưu ý theo vùng miền. Câu trả lời được đối chiếu từ kho tri thức đã tuyển chọn và luôn nêu rõ khi chưa đủ thông tin.
            </p>
            <button onClick={() => onNavigate('builder')} className="mt-7 rounded-full bg-[#a9232c] px-6 py-3 text-sm font-bold text-white">
              Tạo kế hoạch cưới của bạn <ChevronRight className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-12">
        <section>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm nghi lễ, lễ vật, phong tục..." className="w-full rounded-2xl border border-[#e7d9d4] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#a9232c]" />
            </div>
            <select value={region} onChange={(event) => setRegion(event.target.value as WeddingRegion)} className="rounded-2xl border border-[#e7d9d4] bg-white px-4 py-3 text-sm text-stone-700 outline-none">
              {Object.entries(REGION_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div className="mt-6 space-y-4">
            {articles.map((article) => (
              <article key={article.id} className="rounded-3xl border border-[#eadedb] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-[#a9232c]">
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {REGION_LABELS[article.region]}</span>
                      <span>{article.topic}</span>
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-[#3d302d]">{article.title}</h2>
                  </div>
                  <BookOpen className="h-5 w-5 shrink-0 text-[#d3aaa0]" />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#806f6f]">{article.summary}</p>
                <details className="mt-4 border-t border-stone-100 pt-4">
                  <summary className="cursor-pointer text-sm font-bold text-[#a9232c]">Xem nội dung tham khảo</summary>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{article.answer}</p>
                  <p className="mt-3 text-xs text-stone-400">Nguồn: {article.sources.join('; ')} · Cập nhật {article.reviewedAt}</p>
                </details>
              </article>
            ))}
            {!articles.length && <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">Không tìm thấy nội dung phù hợp. Hãy thử từ khóa khác.</div>}
          </div>
        </section>

      </main>
    </div>
  );
};
