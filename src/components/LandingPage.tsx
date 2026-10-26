import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  MessageCircle,
  Camera,
  Shirt,
  BarChart3,
  ChevronDown,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
} from 'lucide-react';
import { Language, ViewMode, WeddingTemplate } from '../types';
import { WEDDING_TEMPLATES } from '../data/mockData';
import { WEDDING_SERVICES } from '../data/weddingServicesData';

interface LandingPageProps {
  onNavigate: (view: ViewMode) => void;
  onSelectTemplate: (template: WeddingTemplate) => void;
  lang: Language;
}

const referenceTemplateImages = [
  'https://assets.chungdoi.com/template-previews/vi/listing/song_hy_red.197afce7.webp',
  'https://assets.chungdoi.com/template-previews/vi/listing/song_hy_green.7f0d10fa.webp',
  'https://assets.chungdoi.com/template-previews/vi/listing/double_dragon_red.e3dd75ad.webp',
  'https://assets.chungdoi.com/template-previews/vi/listing/double_phoenix_red.3bba531a.webp',
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectTemplate,
  lang,
}) => {
  const featuredTemplates = WEDDING_TEMPLATES.slice(0, 6);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const benefits = [
    ['01', 'Đẹp và tinh tế', 'Mẫu thiệp được thiết kế chỉn chu, tôn lên câu chuyện riêng của hai bạn.'],
    ['02', 'Tạo trong vài phút', 'Chọn mẫu, thêm ảnh và thông tin. Không cần biết thiết kế hay công nghệ.'],
    ['03', 'Gửi được mọi nơi', 'Chia sẻ qua Zalo, Messenger, email hoặc tạo mã QR để khách dễ dàng truy cập.'],
  ];

  const goToBuilder = () => onNavigate('builder');
  const serviceHighlights = WEDDING_SERVICES.filter((service) => service.featured).slice(0, 3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTemplateIndex((current) => (current + 1) % featuredTemplates.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [featuredTemplates.length]);

  const getTemplateImage = (template: WeddingTemplate, index: number) =>
    index < referenceTemplateImages.length ? referenceTemplateImages[index] : template.coverImage;

  const getCarouselOffset = (index: number) => {
    const rawOffset = (index - activeTemplateIndex + featuredTemplates.length) % featuredTemplates.length;
    return rawOffset > featuredTemplates.length / 2 ? rawOffset - featuredTemplates.length : rawOffset;
  };

  return (
    <div className="overflow-hidden bg-[#fbf9f7] text-[#3d302d]">
      <section className="relative bg-[#f1eeee]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.9),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,220,230,.65),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e7cbd0] bg-white/70 px-4 py-2 text-xs font-semibold text-[#b00045]">
              <Sparkles className="h-4 w-4" />
              Thiệp cưới online hiện đại
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-[-.03em] text-[#302526] sm:text-6xl lg:text-[76px]">
              Gửi lời yêu thương
              <span className="block font-script font-normal text-[#ec0068]">đến mọi người</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-[#6c5e5e] sm:text-lg">
              Một tấm thiệp đẹp thay bạn kể câu chuyện tình yêu. Tạo thiệp cưới online miễn phí,
              gửi nhanh hơn, xa hơn và vẫn trọn vẹn sự chân thành.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={goToBuilder}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ed0068] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#ed0068]/20 transition hover:-translate-y-0.5 hover:bg-[#ca0059]"
              >
                Tạo thiệp miễn phí
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('templates')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6c9c7] bg-white/70 px-7 py-4 text-sm font-semibold text-[#4c3b3b] transition hover:bg-white"
              >
                <Play className="h-4 w-4 fill-current text-[#ed0068]" />
                Xem mẫu thiệp
              </button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#806f6f]">
              {['Không cần thẻ', 'Thử 3 ngày', 'Đẹp mới thanh toán'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#ed0068]" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[430px] sm:min-h-[560px]">
            <div className="absolute left-1/2 top-1/2 h-[330px] w-[270px] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[30px] bg-white p-3 shadow-2xl shadow-[#8f5365]/20 sm:h-[480px] sm:w-[350px]">
              <img
                src={referenceTemplateImages[0]}
                alt="Mẫu thiệp cưới Song Hỷ"
                className="h-full w-full rounded-[22px] object-cover"
              />
            </div>
            <div className="absolute left-[5%] top-[20%] hidden h-[300px] w-[155px] rotate-[-16deg] overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:block">
              <img src={referenceTemplateImages[1]} alt="" className="h-full w-full rounded-xl object-cover" />
            </div>
            <div className="absolute right-[3%] top-[15%] hidden h-[330px] w-[165px] rotate-[14deg] overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:block">
              <img src={referenceTemplateImages[2]} alt="" className="h-full w-full rounded-xl object-cover" />
            </div>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#9b8383] shadow-lg backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#ed0068]" />
              400+ mẫu thiệp được yêu thích
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eee2df] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#eee2df] px-5 py-7 text-center sm:grid-cols-4 sm:px-8 lg:px-12">
          {[
            ['85.000+', 'cặp đôi đã tin dùng'],
            ['400+', 'mẫu thiệp tinh tế'],
            ['24/7', 'luôn sẵn sàng hỗ trợ'],
            ['3 phút', 'để tạo thiệp đầu tiên'],
          ].map(([value, label]) => (
            <div key={label} className="px-3 py-2">
              <div className="font-display text-2xl font-semibold text-[#3d302d] sm:text-3xl">{value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[.12em] text-[#9d8986]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#171313] sm:text-4xl lg:text-[42px]">
            Mẫu thiệp cưới online <span className="font-script text-4xl font-normal text-[#ed0068] sm:text-5xl">đẹp nhất</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#958c8b] sm:text-base">
            Khám phá những mẫu thiệp cưới được thiết kế tinh tế và hiện đại
          </p>
        </div>
        <div className="template-carousel-stage relative mt-10 h-[510px] overflow-hidden bg-[#ebe9e9] px-2 py-5 sm:mt-12 sm:h-[590px] sm:px-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,.88),transparent_42%)]" />
          <button
            onClick={() => setActiveTemplateIndex((activeTemplateIndex - 1 + featuredTemplates.length) % featuredTemplates.length)}
            className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3d302d] shadow-[0_8px_20px_rgba(80,60,60,.13)] transition hover:scale-105 hover:text-[#ed0068] sm:left-8"
            aria-label="Mẫu trước"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => setActiveTemplateIndex((activeTemplateIndex + 1) % featuredTemplates.length)}
            className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3d302d] shadow-[0_8px_20px_rgba(80,60,60,.13)] transition hover:scale-105 hover:text-[#ed0068] sm:right-8"
            aria-label="Mẫu tiếp theo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="template-carousel-track relative mx-auto h-full max-w-[1500px]">
            {featuredTemplates.map((template, index) => {
              const offset = getCarouselOffset(index);
              const isActive = offset === 0;
              const distance = Math.abs(offset);

              return (
                <article
                  key={template.id}
                  className="template-carousel-card absolute top-1/2 w-[190px] transition-[transform,opacity,filter] duration-700 ease-out sm:w-[284px]"
                  style={{
                    left: 'calc(50% + var(--carousel-offset) * var(--carousel-gap))',
                    '--carousel-offset': offset,
                    '--carousel-scale': isActive ? 1 : 0.84 - Math.max(distance - 1, 0) * 0.06,
                    opacity: isActive ? 1 : distance === 1 ? 0.58 : 0.2,
                    filter: isActive ? 'none' : 'blur(0.4px)',
                    zIndex: 10 - distance,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="rounded-[1.1rem] bg-white p-2 shadow-2xl shadow-[#6c5a5a]/25 sm:rounded-[1.25rem] sm:p-3">
                    <div className="relative h-[350px] overflow-hidden rounded-[.8rem] bg-[#f5f0ec] sm:h-[520px] sm:rounded-[1rem]">
                      <img
                        src={getTemplateImage(template, index)}
                        alt={template.name}
                        onError={(event) => {
                          event.currentTarget.src = template.coverImage;
                        }}
                        className={`template-scroll-image w-full object-cover ${isActive ? 'template-scroll-image-active' : 'h-full'}`}
                      />
                      {isActive && template.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#b00045] shadow-sm backdrop-blur">
                          {template.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
            {featuredTemplates.map((template, index) => (
              <button
                key={template.id}
                onClick={() => setActiveTemplateIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeTemplateIndex ? 'w-8 bg-[#ed0068]' : 'w-2.5 bg-[#bcb8b8] hover:bg-[#ed0068]/60'}`}
                aria-label={`Xem ${template.name}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => onNavigate('templates')} className="text-sm font-bold text-[#ed0068] transition hover:text-[#b00045]">
            Xem tất cả mẫu thiệp <ArrowRight className="ml-1 inline h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="bg-[#f1eeee] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ed0068]">Tạo thiệp cưới dễ dàng</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[#3d302d] sm:text-5xl">
            Làm thiệp cưới online đơn giản
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#806f6f]">
            Chỉ với 3 bước, bạn đã có một tấm thiệp mang câu chuyện riêng của hai bạn.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            {[
              ['01', 'Chọn mẫu', 'Khám phá hàng trăm mẫu thiệp tinh tế, hiện đại và truyền thống.'],
              ['02', 'Điền thông tin', 'Thêm tên, ngày cưới, địa điểm, ảnh và lời nhắn của riêng bạn.'],
              ['03', 'Chia sẻ', 'Gửi thiệp qua Zalo, Messenger hoặc mã QR đến khách mời.'],
            ].map(([number, title, description]) => (
              <div key={number} className="relative rounded-3xl bg-white p-7 text-left shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ed0068] text-xs font-bold text-white">{number}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#806f6f]">{description}</p>
              </div>
            ))}
          </div>
          <button onClick={goToBuilder} className="mt-10 rounded-full bg-[#ed0068] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#ed0068]/20">
            Bắt đầu tạo thiệp <ArrowRight className="ml-1 inline h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="bg-[#dcd9da] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ed0068]">Được yêu thích bởi khách hàng</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#3d302d] sm:text-5xl">
              Đánh giá từ <span className="italic text-[#ed0068]">khách hàng</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['Linh & Minh', 'Thiệp rất đẹp và dễ chỉnh sửa. Khách mời của tụi mình ai cũng khen giao diện xinh.'],
              ['Hạnh & Hoàng', 'Tạo xong chỉ vài phút là gửi được cho cả hai bên gia đình, tiện hơn thiệp giấy rất nhiều.'],
              ['Anh & Dương', 'Đội ngũ hỗ trợ nhanh, tư vấn mẫu thiệp và cách viết lời mời rất tận tâm.'],
            ].map(([name, content]) => (
              <article key={name} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-[#ed0068]">{[1, 2, 3, 4, 5].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-5 text-sm leading-7 text-[#675958]">“{content}”</p>
                <p className="mt-5 text-xs font-bold text-[#3d302d]">{name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1ee] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ed0068]">Theo dõi ngày vui</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-[#3d302d] sm:text-5xl">
              Biết ai đã đến, <span className="italic text-[#ed0068]">điều gì cần làm</span>
            </h2>
            <p className="mt-5 leading-7 text-[#806f6f]">Quản lý khách mời, RSVP và tiến độ chuẩn bị đám cưới trong một nơi duy nhất.</p>
            <div className="mt-7 space-y-3 text-sm text-[#675958]">
              {['Theo dõi xác nhận tham dự theo thời gian thực', 'Quản lý checklist và ngân sách cưới', 'Chia sẻ link thiệp riêng cho từng khách mời'].map((item) => <div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#ed0068]" />{item}</div>)}
            </div>
            <button onClick={() => onNavigate('dashboard')} className="mt-8 rounded-full bg-[#ed0068] px-6 py-3 text-sm font-bold text-white">Khám phá dashboard</button>
          </div>
          <div className="rounded-[2rem] border border-white bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4"><div><p className="text-xs text-stone-400">Tổng lượt xem thiệp</p><p className="mt-1 font-display text-4xl font-semibold">1,420</p></div><div className="rounded-2xl bg-[#fce5ef] p-3 text-[#ed0068]"><BarChart3 className="h-6 w-6" /></div></div>
            <div className="mt-6 flex h-36 items-end gap-3">{[32, 48, 42, 75, 58, 92, 68, 100].map((height, index) => <div key={index} className="flex-1 rounded-t-lg bg-[#ed0068]/80" style={{ height: `${height}%` }} />)}</div>
            <div className="mt-4 flex justify-between text-[10px] text-stone-400"><span>Thứ 2</span><span>Thứ 4</span><span>Thứ 6</span><span>Hôm nay</span></div>
          </div>
        </div>
      </section>

      <section className="bg-[#302526] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff71ad]">Dịch vụ cưới</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Thuê váy cưới, vest & <span className="italic text-[#ff71ad]">chụp ảnh</span></h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#d9c9c6]">Chuẩn bị trọn vẹn cho ngày trọng đại với các dịch vụ được tuyển chọn cùng ChungĐôi.</p></div>
            <button onClick={() => onNavigate('services')} className="inline-flex items-center gap-2 rounded-full bg-[#ed0068] px-5 py-3 text-sm font-bold text-white">Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceHighlights.map((service) => <article key={service.id} className="group overflow-hidden rounded-3xl bg-white text-[#3d302d]"><div className="h-56 overflow-hidden"><img src={service.image} alt={service.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-5"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#ed0068]">{service.category === 'photo' ? <Camera className="h-3.5 w-3.5" /> : <Shirt className="h-3.5 w-3.5" />}{service.categoryLabel}</div><h3 className="mt-2 font-display text-2xl font-semibold">{service.name}</h3><p className="mt-2 text-sm text-stone-600">{service.price}</p><button onClick={() => onNavigate('services')} className="mt-4 text-xs font-bold text-[#ed0068]">Xem chi tiết <ChevronRight className="inline h-4 w-4" /></button></div></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ed0068]">Giải đáp</p><h2 className="mt-3 font-display text-4xl font-semibold text-[#3d302d]">Câu hỏi thường gặp về thiệp cưới online</h2></div>
        <div className="mt-10 divide-y divide-[#eadedb] rounded-3xl border border-[#eadedb] bg-white">
          {['Thiệp cưới online là gì?', 'Làm thế nào để tạo một tấm thiệp cưới?', 'Thiệp có thể chia sẻ qua Zalo không?', 'Tôi có thể thuê váy và vest qua ChungĐôi không?', 'Khách mời có cần cài ứng dụng không?'].map((question) => <details key={question} className="group px-5"><summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-semibold text-[#3d302d]">{question}<ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><p className="pb-5 text-sm leading-6 text-[#806f6f]">Bạn có thể thao tác trực tiếp trên website. Đội ngũ ChungĐôi luôn sẵn sàng hỗ trợ nếu bạn cần tư vấn thêm.</p></details>)}
        </div>
      </section>

      <section className="bg-[#f7f1ee]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ed0068]">Đơn giản hơn bạn nghĩ</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-[#3d302d] sm:text-5xl">
                Tụi mình lo phần thiệp, bạn tận hưởng ngày vui
              </h2>
              <button onClick={goToBuilder} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ed0068] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#ed0068]/20">
                Bắt đầu ngay <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {benefits.map(([number, title, description]) => (
                <div key={number} className="rounded-3xl bg-white p-6 shadow-sm">
                  <span className="font-display text-3xl text-[#ed0068]">{number}</span>
                  <h3 className="mt-8 font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#806f6f]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl">
          <Heart className="mx-auto h-8 w-8 fill-[#ed0068] text-[#ed0068]" />
          <h2 className="mt-4 font-display text-4xl font-semibold text-[#3d302d]">Khi bạn cần, tụi mình luôn có mặt</h2>
          <p className="mt-4 leading-7 text-[#806f6f]">Cần hỗ trợ chọn mẫu hay chỉnh sửa thiệp? Nhắn tụi mình bất cứ khi nào bạn cần.</p>
          <button className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#eadedb] bg-white px-6 py-3 text-sm font-bold text-[#3d302d] shadow-sm transition hover:border-[#ed0068] hover:text-[#ed0068]">
            <MessageCircle className="h-4 w-4" /> Nhắn tụi mình
          </button>
        </div>
      </section>

      <footer className="bg-[#302526] px-5 py-12 text-[#d9c9c6] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-2xl font-semibold text-white">ChungĐôi<span className="text-[#ed0068]">.com</span></div>
            <p className="mt-2 text-xs text-[#a99391]">Thiệp cưới online đẹp, đơn giản và chân thành.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs">
            <button onClick={() => onNavigate('templates')} className="hover:text-white">Mẫu thiệp</button>
            <button onClick={() => onNavigate('pricing')} className="hover:text-white">Bảng giá</button>
            <button onClick={() => onNavigate('blog')} className="hover:text-white">Cẩm nang</button>
            <button onClick={() => onNavigate('login')} className="hover:text-white">Đăng nhập</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
