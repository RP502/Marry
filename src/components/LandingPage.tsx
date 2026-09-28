import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Music,
  MapPin,
  Users,
  Smartphone,
  ShieldCheck,
  Star,
  ChevronRight,
  Play,
  Palette,
  Clock,
  ExternalLink,
  Calculator,
  CheckSquare,
  MessageSquare,
  Mic,
  CalendarDays,
  Image as ImageIcon,
  Grid,
  BookOpen,
} from 'lucide-react';
import { ViewMode, Language, WeddingTemplate } from '../types';
import { WEDDING_TEMPLATES } from '../data/mockData';
import { BLOG_POSTS } from '../data/weddingToolsData';

interface LandingPageProps {
  onNavigate: (view: ViewMode) => void;
  onSelectTemplate: (template: WeddingTemplate) => void;
  lang: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectTemplate,
  lang,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filterStyles = [
    { id: 'all', label: lang === 'vi' ? 'Tất cả phong cách' : 'All Styles' },
    { id: 'floral', label: lang === 'vi' ? 'Lãng mạn Pastel' : 'Romantic Floral' },
    { id: 'luxury', label: lang === 'vi' ? 'Sang trọng Quý phái' : 'Luxury Gold' },
    { id: 'modern', label: lang === 'vi' ? 'Tối giản Hiện đại' : 'Minimalist' },
    { id: 'traditional', label: lang === 'vi' ? 'Truyền thống Á Đông' : 'Traditional' },
    { id: 'vintage', label: lang === 'vi' ? 'Vintage Mộc mạc' : 'Vintage' },
    { id: 'korean', label: lang === 'vi' ? 'Hàn Quốc Dịu Dàng' : 'Korean' },
  ];

  const filteredTemplates =
    selectedStyle === 'all'
      ? WEDDING_TEMPLATES
      : WEDDING_TEMPLATES.filter((t) => t.style === selectedStyle);

  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-rose-500" />,
      titleVi: 'Chuẩn hoá cho điện thoại',
      descVi: 'Thiết kế chuẩn tỉ lệ màn hình smartphone, mở mượt mà trên Zalo, Facebook, Messenger và trình duyệt.',
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      titleVi: 'Xác nhận tham dự (RSVP)',
      descVi: 'Khách mời xác nhận đi 1 mình hay cùng người thân, ghi chú món ăn giúp bạn đặt bàn tiệc chuẩn xác 100%.',
    },
    {
      icon: <QrCode className="w-6 h-6 text-emerald-500" />,
      titleVi: 'Hộp mừng cưới VietQR',
      descVi: 'Tự động tạo mã QR quét qua mọi app ngân hàng. Khách ở xa gửi quà mừng dễ dàng chỉ trong vài giây.',
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      titleVi: 'Sổ lưu bút & Thả tim chúc phúc',
      descVi: 'Không gian ấm áp để gia đình, bạn bè viết những dòng tâm sự, gửi lời chúc phúc lưu giữ trọn đời.',
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-500" />,
      titleVi: 'Chỉ đường Google Maps 1 chạm',
      descVi: 'Tích hợp bản đồ chính xác tới từng sảnh cưới, kèm tính năng lưu sự kiện vào lịch Google/iCloud.',
    },
    {
      icon: <Music className="w-6 h-6 text-purple-500" />,
      titleVi: 'Nhạc nền tình yêu lãng mạn',
      descVi: 'Giai điệu piano ngọt ngào mở ra cảm xúc hân hoan khi khách chạm tay mở bức thiệp hồng.',
    },
  ];

  const pricingPlans = [
    {
      nameVi: 'Gói Trải Nghiệm',
      nameEn: 'Free Starter',
      price: '0đ',
      badge: 'Miễn phí',
      highlight: false,
      featuresVi: [
        'Chọn 3 mẫu thiệp cơ bản',
        'Website hiển thị 30 ngày',
        'Album cưới tối đa 5 ảnh',
        'Bản đồ chỉ đường Google Maps',
        'Sổ lưu bút cơ bản',
      ],
      ctaVi: 'Dùng Miễn Phí',
    },
    {
      nameVi: 'Gói Hạnh Phúc',
      nameEn: 'Happiness Pro',
      price: '199.000đ',
      badge: 'Phổ biến nhất',
      highlight: true,
      featuresVi: [
        'Mở khoá toàn bộ 400+ mẫu thiệp cao cấp',
        'Thời gian lưu trữ 1 năm',
        'Album ảnh HD không giới hạn & video',
        'Quản lý khách mời RSVP chi tiết',
        'Hộp mừng cưới VietQR động',
        'Tùy chỉnh link theo tên khách riêng',
        'Nhạc nền tùy chọn & hiệu ứng hoa bay',
      ],
      ctaVi: 'Chọn Gói Hạnh Phúc',
    },
    {
      nameVi: 'Gói Chung Đôi Vĩnh Cửu',
      nameEn: 'Forever VIP',
      price: '399.000đ',
      badge: 'Trọn đời',
      highlight: false,
      featuresVi: [
        'Lưu trữ vĩnh viễn website kỷ niệm ngày cưới',
        'Tên miền riêng theo tên cặp đôi (tùy chọn)',
        'Tất cả tính năng cao cấp nhất',
        'Xuất file danh sách khách mời Excel',
        'Tạo thiệp tĩnh in ấn chất lượng cao',
        'Hỗ trợ thiết kế & chỉnh sửa 1-1',
      ],
      ctaVi: 'Chọn Gói VIP',
    },
  ];

  const faqs = [
    {
      qVi: 'Tôi có thể chia sẻ thiệp qua Zalo và Messenger như thế nào?',
      aVi: 'Sau khi tạo thiệp xong, bạn chỉ cần bấm nút "Sao chép link" hoặc "Chia sẻ Zalo". Link thiệp khi gửi sẽ hiện đầy đủ hình đại diện ảnh cưới, tên cô dâu chú rể và lời mời trang trọng như một tấm thiệp kỹ thuật số chuyên nghiệp.',
    },
    {
      qVi: 'Người nhận thiệp có cần cài đặt ứng dụng gì để mở không?',
      aVi: 'Hoàn toàn không! Bất kỳ ai nhận được đường link đều có thể mở trực tiếp trên điện thoại (iPhone, Samsung, Xiaomi...) hoặc máy tính bằng bất kỳ trình duyệt web nào, giao diện mượt mà và tự động co giãn đẹp mắt.',
    },
    {
      qVi: 'Tính năng hộp mừng cưới VietQR hoạt động ra sao?',
      aVi: 'Bạn chỉ cần nhập số tài khoản ngân hàng và tên ngân hàng của cô dâu hoặc chú rể trong phần chỉnh sửa. Hệ thống Chung Đôi sẽ tự sinh mã QR chuẩn Napas/VietQR. Khách chỉ cần quét mã bằng ứng dụng ngân hàng là tiền về thẳng tài khoản của bạn, không qua trung gian, 100% an toàn.',
    },
    {
      qVi: 'Tôi có thể tạo thiệp có ghi rõ tên từng vị khách không?',
      aVi: 'Có! Tính năng thiệp cá nhân hoá của Chung Đôi cho phép bạn nhập danh sách tên khách (ví dụ: "Kính gửi: Anh Hoàng & Bạn gái", "Kính mời: Bác Ba"). Hệ thống sẽ tự tạo link riêng mang tên vị khách đó trên bì thư rất trang trọng.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Background decorative blurs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-r from-rose-100/60 via-amber-50/40 to-pink-100/50 blur-3xl -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-medium">
                <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Nền tảng thiệp cưới &amp; website đám cưới thông minh #1</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Tạo Website Đám Cưới &amp; Thiệp Cưới Online{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-600 via-rose-500 to-amber-600 font-display">
                  Tinh Tế Trong 3 Phút
                </span>
              </h1>

              {/* Subhead */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">
                Thay thế thiệp giấy truyền thống bằng trải nghiệm đa phương tiện sống động: hình ảnh HD,
                nhạc nền du dương, xác nhận tham dự RSVP thông minh và hộp mừng cưới VietQR tiện lợi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-create-cta"
                  onClick={() => onNavigate('builder')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-base shadow-lg shadow-rose-200 hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 active:scale-98"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Tạo thiệp cưới miễn phí ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-preview-cta"
                  onClick={() => onNavigate('invitation')}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-medium text-base border border-stone-300 shadow-xs hover:border-stone-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Xem thiệp mẫu thực tế</span>
                </button>
              </div>

              {/* Value proof bullets */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-500 font-medium">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Miễn phí khởi tạo</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Gửi Zalo không giới hạn</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Hỗ trợ VietQR mọi ngân hàng</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Phone Preview Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                {/* Outer Phone Shell */}
                <div className="relative bg-stone-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-stone-900/10 shadow-rose-900/10">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-900 rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                  </div>

                  {/* Inner Screen Preview */}
                  <div className="relative bg-[#FAF5F0] rounded-[36px] overflow-hidden border border-amber-900/10 h-[560px] flex flex-col">
                    {/* Header Image with Couple */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                        alt="Minh Triết & Thảo Vy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-4 text-white text-center">
                        <span className="text-[11px] uppercase tracking-widest text-amber-200 font-semibold">
                          We Are Getting Married
                        </span>
                        <h3 className="text-2xl font-script text-white mt-1">
                          Minh Triết &amp; Thảo Vy
                        </h3>
                        <p className="text-xs text-stone-200 mt-0.5">28 . 11 . 2026</p>
                      </div>

                      {/* Floating Music Pill */}
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center space-x-1.5 text-[10px] text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                        <span>Nhạc cưới</span>
                      </div>
                    </div>

                    {/* Invitation Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      {/* Countdown badge */}
                      <div className="bg-white/80 rounded-2xl p-2.5 border border-rose-100 text-center shadow-xs">
                        <p className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                          Đếm ngược ngày cưới
                        </p>
                        <div className="grid grid-cols-4 gap-1 mt-1 text-stone-800">
                          <div className="bg-rose-50/70 py-1 rounded">
                            <span className="text-sm font-bold block">76</span>
                            <span className="text-[9px] text-stone-500">Ngày</span>
                          </div>
                          <div className="bg-rose-50/70 py-1 rounded">
                            <span className="text-sm font-bold block">14</span>
                            <span className="text-[9px] text-stone-500">Giờ</span>
                          </div>
                          <div className="bg-rose-50/70 py-1 rounded">
                            <span className="text-sm font-bold block">28</span>
                            <span className="text-[9px] text-stone-500">Phút</span>
                          </div>
                          <div className="bg-rose-50/70 py-1 rounded">
                            <span className="text-sm font-bold block">45</span>
                            <span className="text-[9px] text-stone-500">Giây</span>
                          </div>
                        </div>
                      </div>

                      {/* Venue preview mini */}
                      <div className="bg-white rounded-xl p-2.5 border border-stone-200/70 text-xs space-y-1">
                        <div className="flex items-center text-rose-600 font-semibold">
                          <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span className="truncate">White Palace Luxury Hall</span>
                        </div>
                        <p className="text-stone-500 text-[11px] truncate">
                          194 Hoàng Văn Thụ, Phú Nhuận, TP. HCM
                        </p>
                      </div>

                      {/* Interactive Button */}
                      <button
                        onClick={() => onNavigate('invitation')}
                        className="w-full py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold shadow-sm hover:brightness-105 transition-all flex items-center justify-center space-x-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mở toàn bộ thiệp mời điện tử</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Testimonial Tag */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-stone-100 flex items-center space-x-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-stone-800">VietQR Tự Động</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">
                        Napas 247
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">Mừng cưới chuẩn xác &amp; bảo mật</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white border-y border-stone-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-display">
                85,000+
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Cặp đôi đã tin dùng
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                420+
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Mẫu thiệp đa phong cách
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                1,500,000+
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Lời chúc phúc được gửi
              </p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-display">
                99.8%
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Đánh giá hài lòng 5 sao
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEMPLATE SHOWCASE */}
      <section id="templates-section" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Kho Thiết Kế Độc Quyền
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 font-display">
              Mẫu Thiệp Cưới &amp; Website Xu Hướng 2026
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Được thiết kế tinh xảo bởi các chuyên gia mỹ thuật cưới. Dễ dàng đổi ảnh, nội dung và màu
              sắc theo phong cách riêng của bạn chỉ trong một nốt nhạc.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {filterStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedStyle === style.id
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-200'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-72 overflow-hidden bg-stone-100">
                  <img
                    src={template.coverImage}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors" />

                  {/* Badge */}
                  {template.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-full text-[11px] font-bold text-rose-600 shadow-xs">
                      {template.badge}
                    </span>
                  )}

                  {/* Style Tag */}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[11px] text-white font-medium">
                    {template.styleLabel}
                  </span>

                  {/* Quick Action Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                    <button
                      onClick={() => onNavigate('invitation')}
                      className="px-4 py-2 rounded-full bg-white text-stone-900 text-xs font-semibold shadow-md hover:bg-stone-100 transition-colors flex items-center space-x-1"
                    >
                      <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Xem thử</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectTemplate(template);
                        onNavigate('builder');
                      }}
                      className="px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-md hover:bg-rose-600 transition-colors flex items-center space-x-1"
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>Dùng mẫu này</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {template.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-200"
                        style={{ backgroundColor: template.themeColor }}
                      />
                      <span className="text-xs text-stone-500 font-medium">Tone màu chủ đạo</span>
                    </div>

                    <button
                      onClick={() => {
                        onSelectTemplate(template);
                        onNavigate('builder');
                      }}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                    >
                      <span>Bắt đầu sửa</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('builder')}
              className="px-8 py-3.5 rounded-full bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:border-stone-400 shadow-xs hover:bg-stone-50 transition-colors"
            >
              Khám phá thêm mẫu thiệp và bắt đầu tạo &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES SECTION */}
      <section className="bg-stone-100/70 py-16 sm:py-24 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Tính Năng Đột Phá
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 font-display">
              Mọi Thứ Cần Cho Một Đám Cưới Thời Đại Số
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Chung Đôi kết hợp hoàn hảo giữa nét văn hóa cưới truyền thống Việt Nam và tiện ích công
              nghệ hiện đại nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.titleVi}</h3>
                <p className="text-sm text-stone-600 leading-relaxed font-body">{item.descVi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3 EASY STEPS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Quy Trình Nhanh Gọn
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 font-display">
              Chỉ 3 Bước Cho Ngày Chung Đôi
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Không cần biết lập trình hay đồ họa phức tạp, ai cũng có thể tự tay tạo thiệp cưới trong mơ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/80 text-center relative">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-sm shadow-rose-200">
                1
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Chọn Mẫu Thiết Kế</h3>
              <p className="text-sm text-stone-600">
                Duyệt qua bộ sưu tập phong phú từ phong cách lãng mạn, thanh lịch đến hiện đại hoặc cổ điển.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/80 text-center relative">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-sm shadow-rose-200">
                2
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Điền Thông Tin &amp; Ảnh</h3>
              <p className="text-sm text-stone-600">
                Nhập tên cô dâu chú rể, ngày giờ cưới, câu chuyện tình yêu, tải album ảnh cưới và cấu hình VietQR.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/80 text-center relative">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-sm shadow-rose-200">
                3
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Gửi Thiệp &amp; Đón Chúc Phúc</h3>
              <p className="text-sm text-stone-600">
                Nhận đường link trực quan và chia sẻ qua Zalo, Facebook; theo dõi phản hồi tham dự theo thời gian thực.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('builder')}
              className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-sm transition-all"
            >
              Thử nghiệm trình tạo thiệp ngay bây giờ
            </button>
          </div>
        </div>
      </section>

      {/* 5.5 WEDDING TOOLS SUITE (HỆ SINH THÁI TIỆN ÍCH CƯỚI CHUNG ĐÔI) */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Hệ Sinh Thái Tiện Ích Đám Cưới
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 font-display">
              Trọn Bộ Công Cụ Hỗ Trợ Chuẩn Bị Đám Cưới
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Không chỉ là thiệp cưới, Chung Đôi cung cấp bộ giải pháp thông minh giúp đôi bạn chuẩn bị
              hôn lễ trọn vẹn từ tính toán chi phí, soạn lời mời Zalo đến sắp xếp bàn tiệc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigate('budget-calc')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Dự Trù Chi Phí Cưới
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Lập dự toán theo từng hạng mục: tiệc cưới, nhẫn cưới, ảnh cưới, trang phục; theo dõi số tiền đã cọc và còn lại.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Dùng thử miễn phí</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('wedding-plan')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Kế Hoạch &amp; Checklist 12 Tuần
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Danh sách việc cần làm chi tiết theo từng giai đoạn: 6 tháng trước, 3 tháng, 1 tháng và ngày cưới chính thức.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Xem checklist</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('invitation-messages')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Tin Nhắn Mời Cưới Zalo &amp; SMS
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Mẫu tin nhắn chuẩn lịch sự và tinh tế cho từng đối tượng: bạn thân, bạn học, đồng nghiệp, cấp trên, họ hàng xa.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Sao chép mẫu</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('speeches')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Bài Phát Biểu Đám Cưới
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Lời phát biểu chuẩn lễ nghi cho họ nhà trai, họ nhà gái tại lễ thành hôn, lễ ăn hỏi và lời cảm ơn của cô dâu chú rể.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Đọc bài phát biểu</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('save-the-date')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Tạo Ảnh Báo Hỷ (Save The Date)
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Thiết kế ảnh báo hỷ sắc nét 4:5 chỉ trong 1 phút để đăng Story Facebook, Zalo, Instagram nhắc hẹn bạn bè.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Tạo ảnh ngay</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('compress-image')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Nén Dung Lượng Ảnh Cưới
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Giảm 80-90% dung lượng ảnh máy cơ (từ 10MB còn 200KB) vẫn sắc nét để gửi bạn bè và tải lên web nhanh tức thì.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Nén ảnh miễn phí</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('seating-chart')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Grid className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Sơ Đồ Xếp Bàn Tiệc (Seating Chart)
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Phân chia bàn tiệc nhà trai, nhà gái, bàn bạn bè, bàn VIP dễ dàng để tiếp đón chu đáo, không bị thiếu chỗ.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Xếp bàn tiệc</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('lunar-converter')}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  Đổi Lịch Âm - Dương Cưới Hỏi
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Tra cứu ngày hoàng đạo, giờ tốt rước dâu và thông tin Can Chi chính xác để in lên thiệp cưới trang trọng.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-rose-600">
                <span>Tra cứu ngày lành</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.6 BLOG & WEDDING GUIDES PREVIEW */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                Cẩm Nang Cưới Hỏi
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-2">
                Bí Quyết &amp; Kinh Nghiệm Cưới Mới Nhất
              </h2>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="flex items-center space-x-1 px-4 py-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 text-xs font-bold transition-colors"
            >
              <span>Xem tất cả bài viết</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog')}
                className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-stone-200/80 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-stone-200">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-rose-600 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block mb-1">
                      {post.date} &bull; {post.readTime}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">{post.summary}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-200/60 text-xs font-bold text-rose-600 flex items-center justify-between">
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section className="bg-stone-100/60 py-16 sm:py-24 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Bảng Giá Tiết Kiệm
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-3 font-display">
              Chi Phí Nhỏ Cho Hạnh Phúc To
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Tiết kiệm hàng triệu đồng so với in thiệp truyền thống. Không giới hạn số lượng khách mời nhận thiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? 'bg-white border-2 border-rose-500 shadow-xl shadow-rose-100 relative'
                    : 'bg-white border border-stone-200/80 shadow-xs'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold text-stone-900">{plan.nameVi}</h3>
                    {!plan.highlight && (
                      <span className="text-xs text-stone-500 font-medium">{plan.badge}</span>
                    )}
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
                      {plan.price}
                    </span>
                    <span className="text-xs text-stone-500 ml-1">/ đám cưới</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.featuresVi.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs sm:text-sm text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onNavigate('builder')}
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  {plan.ctaVi}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REAL COUPLE STORIES & TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Chia Sẻ Hạnh Phúc
            </span>
            <h2 className="text-3xl font-bold text-stone-900 mt-3 font-display">
              Cảm Nhận Từ Các Cặp Đôi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                "Thiệp gửi qua Zalo trông xịn xò bất ngờ! Bạn bè ai cũng khen nức nở tính năng xác nhận đi
                mấy người và mã QR mừng cưới. Tiết kiệm cho tụi mình hơn 4 triệu tiền in thiệp giấy."
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Thanh Hằng & Quốc Đạt"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Thanh Hằng &amp; Quốc Đạt</h4>
                  <p className="text-[11px] text-stone-500">Đám cưới tại Gem Center, TP. HCM</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                "Bố mẹ hai bên lúc đầu cứ lo người lớn tuổi không biết xem, nhưng giao diện của Chung Đôi quá
                rõ ràng, bấm vào là hiện bản đồ chỉ đường và thời gian cưới to rõ, người lớn khen tấm tắc!"
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Văn Lâm & Bích Ngọc"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Văn Lâm &amp; Bích Ngọc</h4>
                  <p className="text-[11px] text-stone-500">Đám cưới tại Hà Nội</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                "Thích nhất là mục Sổ lưu bút online. Đêm tân hôn hai vợ chồng ngồi đọc lại từng lời chúc
                xúc động muốn khóc. Đây là kỷ niệm vô giá mà thiệp giấy không thể nào có được."
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Minh Khang & Thu Hà"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Minh Khang &amp; Thu Hà</h4>
                  <p className="text-[11px] text-stone-500">Đám cưới tại Đà Nẵng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-stone-500 text-sm mt-1">Giải đáp mọi thắc mắc về thiệp cưới online Chung Đôi</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-stone-900 hover:text-rose-600 transition-colors"
                >
                  <span>{faq.qVi}</span>
                  <span className="text-stone-400 font-normal text-xl ml-4">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.aVi}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA BANNER */}
      <section className="py-16 bg-linear-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Sẵn Sàng Cho Ngày Chung Đôi Hoàn Hảo?
          </h2>
          <p className="mt-3 text-rose-100 text-sm sm:text-base max-w-xl mx-auto font-body">
            Khởi tạo thiệp cưới online chỉ trong 3 phút. Không cần thẻ tín dụng, trải nghiệm miễn phí ngay hôm nay!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('builder')}
              className="px-8 py-4 rounded-full bg-white text-rose-600 font-bold text-sm sm:text-base shadow-xl hover:bg-stone-50 transition-colors active:scale-95"
            >
              Bắt đầu tạo thiệp cưới của bạn &rarr;
            </button>
            <button
              onClick={() => onNavigate('invitation')}
              className="px-6 py-4 rounded-full bg-rose-700/50 hover:bg-rose-700 text-white font-semibold text-sm sm:text-base border border-white/30 transition-colors"
            >
              Xem thiệp mẫu trước
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white font-bold text-lg font-display">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>Chung Đôi</span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                Nền tảng tạo website đám cưới &amp; thiệp cưới trực tuyến thông minh, thanh lịch và mang đậm dấu ấn hạnh phúc của đôi lứa.
              </p>
              <div className="text-[11px] text-stone-500">
                &copy; {new Date().getFullYear()} ChungDoi.com. All rights reserved.
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Tính Năng &amp; Quản Lý</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('builder')} className="hover:text-white transition-colors">
                    Tạo thiệp cưới trực tuyến
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('rsvp-dashboard')} className="hover:text-white transition-colors">
                    Quản lý khách mời &amp; RSVP
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('budget-calc')} className="hover:text-white transition-colors">
                    Dự trù chi phí &amp; Ngân sách cưới
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('wedding-plan')} className="hover:text-white transition-colors">
                    Kế hoạch &amp; Checklist 12 tuần
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('seating-chart')} className="hover:text-white transition-colors">
                    Sơ đồ xếp bàn tiệc (Seating Chart)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Công Cụ &amp; Mẫu</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('templates')} className="hover:text-white transition-colors">
                    Kho 400+ mẫu thiệp cưới đẹp
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('invitation-messages')} className="hover:text-white transition-colors">
                    Tin nhắn mời cưới Zalo &amp; SMS
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('speeches')} className="hover:text-white transition-colors">
                    Bài phát biểu đám cưới chuẩn lễ nghi
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('save-the-date')} className="hover:text-white transition-colors">
                    Tạo ảnh Báo Hỷ (Save The Date)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('compress-image')} className="hover:text-white transition-colors">
                    Nén dung lượng ảnh cưới online
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('lunar-converter')} className="hover:text-white transition-colors">
                    Đổi ngày âm - dương cưới hỏi
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Cẩm Nang &amp; Hỗ Trợ</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                    Cẩm nang &amp; Kinh nghiệm cưới hỏi
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                    Bảng giá &amp; Gói dịch vụ
                  </button>
                </li>
                <li className="text-stone-300">Hotline / Zalo: 0988 123 456</li>
                <li className="text-stone-300">Email: hotro@chungdoi.com</li>
                <li className="text-stone-400 text-[11px] pt-1">TP. Hồ Chí Minh &amp; Hà Nội</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
