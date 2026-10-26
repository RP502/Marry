import React, { useMemo, useState } from 'react';
import { CalendarDays, Camera, Check, ChevronRight, Crown, MapPin, Search, Shirt, Sparkles, X } from 'lucide-react';
import { WeddingServiceCategory } from '../data/weddingServicesData';
import { WEDDING_SERVICES } from '../data/weddingServicesData';
import { ViewMode } from '../types';

interface WeddingServicesPageProps {
  onNavigate: (view: ViewMode) => void;
}

const categories: Array<{ id: WeddingServiceCategory; label: string }> = [
  { id: 'all', label: 'Tất cả dịch vụ' },
  { id: 'bride', label: 'Váy cô dâu' },
  { id: 'groom', label: 'Vest chú rể' },
  { id: 'photo', label: 'Combo chụp ảnh cưới' },
  { id: 'accessories', label: 'Phụ kiện cưới' },
];

export const WeddingServicesPage: React.FC<WeddingServicesPageProps> = ({ onNavigate }) => {
  const [category, setCategory] = useState<WeddingServiceCategory>('all');
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const services = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('vi-VN');
    return WEDDING_SERVICES.filter((service) => category === 'all' || service.category === category).filter((service) => {
      if (!query) return true;
      return `${service.name} ${service.description} ${service.tags.join(' ')}`.toLocaleLowerCase('vi-VN').includes(query);
    });
  }, [category, search]);

  return (
    <div className="min-h-screen bg-[#fbf9f7] pb-20">
      <section className="bg-[#f5e8e4] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[.16em] text-[#a9232c]">
              <Sparkles className="h-3.5 w-3.5" /> Dịch vụ cưới cùng ChungĐôi
            </span>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-[#3d302d] sm:text-6xl">
              Chuẩn bị thật đẹp cho ngày trọng đại
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#715f5c]">
              Thuê váy cô dâu, vest chú rể, phụ kiện và chọn combo chụp ảnh cưới từ những đối tác được tuyển chọn.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-[#715f5c]">
              {['Tư vấn theo ngân sách', 'Thử đồ theo lịch hẹn', 'Đối tác được xác minh'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-2"><Check className="h-3.5 w-3.5 text-[#a9232c]" />{item}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-white p-5 shadow-sm"><Shirt className="h-7 w-7 text-[#a9232c]" /><p className="mt-10 font-display text-xl font-semibold">Trang phục cưới</p><p className="mt-1 text-xs text-stone-500">Váy, vest và phụ kiện</p></div>
            <div className="mt-8 rounded-3xl bg-[#a9232c] p-5 text-white shadow-xl"><Camera className="h-7 w-7" /><p className="mt-10 font-display text-xl font-semibold">Ảnh cưới</p><p className="mt-1 text-xs text-white/75">Combo theo câu chuyện</p></div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#a9232c]">Khám phá dịch vụ</p><h2 className="mt-2 font-display text-3xl font-semibold text-[#3d302d] sm:text-4xl">Chọn điều phù hợp với hai bạn</h2></div>
          <div className="relative w-full lg:w-80"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm váy, vest, combo..." className="w-full rounded-full border border-[#e7d9d4] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#a9232c]" /></div>
        </div>
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => <button key={item.id} onClick={() => setCategory(item.id)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${category === item.id ? 'bg-[#a9232c] text-white' : 'border border-[#eadedb] bg-white text-stone-600 hover:border-[#a9232c]'}`}>{item.label}</button>)}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="group overflow-hidden rounded-3xl border border-[#eadedb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-64 overflow-hidden bg-[#f2e9e5]"><img src={service.image} alt={service.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />{service.featured && <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#a9232c]"><Crown className="h-3 w-3" /> Được yêu thích</span>}</div>
              <div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#a9232c]">{service.categoryLabel}</p><h3 className="mt-1 font-display text-2xl font-semibold text-[#3d302d]">{service.name}</h3></div></div><p className="mt-3 text-sm leading-6 text-stone-600">{service.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{service.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f8efec] px-2.5 py-1 text-[10px] font-semibold text-[#866b66]">{tag}</span>)}</div><div className="mt-5 border-t border-stone-100 pt-4"><p className="font-bold text-[#a9232c]">{service.price}</p><p className="mt-1 flex items-center gap-1 text-xs text-stone-500"><MapPin className="h-3.5 w-3.5" /> {service.location}</p><button onClick={() => { setSelectedService(service.id); setSubmitted(false); }} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#a9232c] py-3 text-xs font-bold text-white transition hover:bg-[#831e25]">Tư vấn & đặt lịch <ChevronRight className="h-4 w-4" /></button></div></div>
            </article>
          ))}
        </div>
      </main>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <button onClick={() => setSelectedService(null)} className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:bg-stone-100" aria-label="Đóng"><X className="h-5 w-5" /></button>
            <CalendarDays className="h-8 w-8 text-[#a9232c]" />
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#3d302d]">Đặt lịch tư vấn</h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">Để lại thông tin, đội ngũ ChungĐôi sẽ liên hệ để tư vấn mẫu và lịch thử phù hợp.</p>
            {submitted ? <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-700">Đã ghi nhận yêu cầu. ChungĐôi sẽ liên hệ với bạn sớm nhất.</div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="mt-6 space-y-3"><input required placeholder="Tên của bạn" className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#a9232c]" /><input required type="tel" placeholder="Số điện thoại" className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#a9232c]" /><input required type="date" className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#a9232c]" /><button className="w-full rounded-xl bg-[#a9232c] py-3 text-sm font-bold text-white">Gửi yêu cầu</button></form>}
          </div>
        </div>
      )}
    </div>
  );
};
