import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  MessageCircle,
  Camera,
  Shirt,
  Building2,
  BarChart3,
  ChevronDown,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Smartphone,
  Send,
  Compass,
  Gift,
  FileText,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Language, ViewMode, WeddingTemplate, UserAccount } from '../types';
import { WEDDING_TEMPLATES } from '../data/mockData';
import { WEDDING_SERVICES } from '../data/weddingServicesData';
import { CuoiThoiiiLogo } from './CuoiThoiiiLogo';

interface LandingPageProps {
  onNavigate: (view: ViewMode) => void;
  onSelectTemplate: (template: WeddingTemplate) => void;
  lang: Language;
  currentUser?: UserAccount | null;
  onOpenAuthModal?: (
    mode?: 'login' | 'signup',
    targetView?: ViewMode,
    reason?: string
  ) => void;
}

const referenceTemplateImages = [
  'https://assets.chungdoi.com/template-previews/vi/listing/song_hy_red.197afce7.webp',
  'https://assets.chungdoi.com/template-previews/vi/listing/song_hy_green.7f0d10fa.webp',
  'https://assets.chungdoi.com/template-previews/vi/listing/double_dragon_red.e3dd75ad.webp',
  'https://assets.chungdoi.com/template-previews/vi/listing/double_phoenix_red.3bba531a.webp',
];

interface TimelinePhase {
  id: string;
  label: string;
  period: string;
  tasks: { id: string; title: string; category: string; done: boolean }[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectTemplate,
  currentUser,
  onOpenAuthModal,
}) => {
  // Carousel state for preserved section
  const featuredTemplates = WEDDING_TEMPLATES.slice(0, 6);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);

  // Hero interactive countdown simulator state
  const [groomName, setGroomName] = useState('Đăng');
  const [brideName, setBrideName] = useState('Linh');
  const [weddingDateStr, setWeddingDateStr] = useState('2026-10-24');

  // AI Assistant Interactive state
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isAiAnswering, setIsAiAnswering] = useState(false);
  const [currentAiAnswer, setCurrentAiAnswer] = useState<string | null>(null);

  // Checklist interactive state
  const [activeChecklistTab, setActiveChecklistTab] = useState('6months');
  const [checklistTasks, setChecklistTasks] = useState<Record<string, boolean>>({
    't-1': true,
    't-2': true,
    't-3': false,
    't-4': false,
    't-5': true,
    't-6': false,
    't-7': false,
    't-8': false,
  });

  // Budget interactive category filter
  const [budgetCategory, setBudgetCategory] = useState<'all' | 'groom' | 'bride'>('all');

  // FAQ open item
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    try {
      const target = new Date(weddingDateStr).getTime();
      const now = new Date().getTime();
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 168;
    } catch {
      return 168;
    }
  };
  const daysLeft = calculateDaysRemaining();

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

  const goToBuilder = () => {
    if (!currentUser) {
      if (onOpenAuthModal) {
        onOpenAuthModal('login', 'builder', 'Vui lòng đăng nhập để bắt đầu tạo thiệp cưới');
      } else {
        onNavigate('login');
      }
      return;
    }
    onNavigate('builder');
  };

  // Pre-configured AI assistant prompts & answers matching Plan Cưới
  const aiPrompts = [
    {
      title: 'Trình tự lễ ăn hỏi & đón dâu',
      badge: 'Nghi lễ',
      query: 'Trình tự lễ ăn hỏi và lễ đón dâu miền Bắc gồm những nghi lễ gì?',
      answer: `Chào hai bạn! Lễ ăn hỏi & đón dâu truyền thống chuẩn miền Bắc gồm các bước chính:
1. Nhà trai xuất phát & trao tráp: Đội bê tráp nam - nữ trao duyên trước cửa nhà gái.
2. Mở tráp & thưa chuyện: Đại diện nhà trai chào hỏi, trình bày lễ vật (thường 5, 7 hoặc 9 tráp).
3. Cô dâu ra mắt: Chú rể đón cô dâu từ phòng trong ra làm lễ chào hai họ.
4. Lễ gia tiên: Cô dâu chú rể thắp hương báo cáo ông bà tổ tiên.
5. Mời trà & chụp ảnh kỉ niệm: Cô dâu chú rể rót trà mời người lớn hai bên.
6. Lại quả (Lễ hồi): Nhà gái chia lại một phần lễ vật cho nhà trai mang về (xé bằng tay, không dùng dao kéo).
💡 Mẹo từ Cưới thôiii: Chuẩn bị phong bao lì xì trao duyên từ 50.000đ - 100.000đ/bao cho đội bê tráp!`,
    },
    {
      title: 'Phân bổ ngân sách 200 triệu',
      badge: 'Ngân sách',
      query: 'Gợi ý phân bổ ngân sách 200 triệu cho tiệc 250 khách nhà trai & nhà gái',
      answer: `Với ngân sách 200 triệu cho 250 khách (~25 bàn tiệc), Cưới thôiii khuyến nghị phân bổ theo tỉ lệ vàng:
• Tiệc cưới & Đồ uống (50%): ~100.000.000 đ (~3.800.000 đ/bàn đã gồm bia/nước ngọt).
• Ảnh cưới & Phóng sự (15%): ~30.000.000 đ (Gói pre-wedding ngoại cảnh + quay phóng sự ngày cưới).
• Váy cưới, Áo dài & Vest (12%): ~24.000.000 đ (1 váy lễ chính, 1 váy đi bàn, 2 vest chú rể, áo dài ăn hỏi).
• Nhẫn cưới & Trang sức (10%): ~20.000.000 đ (Cặp nhẫn cưới vàng 18K/vàng trắng).
• Tráp ăn hỏi & Xe hoa (8%): ~16.000.000 đ (Tráp 7 lễ trọn gói + thuê xe rước dâu).
• Dự phòng phát sinh (5%): ~10.000.000 đ (Bồi dưỡng ban tổ chức, phát sinh thiệp, hoa cầm tay).`,
    },
    {
      title: 'Checklist 6 tháng trước cưới',
      badge: 'Lịch trình',
      query: 'Checklist chuẩn bị cưới trong 6 tháng cần ưu tiên những việc gì?',
      answer: `Lịch trình 6 tháng chuẩn bị cưới tối ưu:
• Tháng thứ 6: Xem ngày lành tháng tốt, chốt trung tâm tiệc cưới (đặt cọc sớm để giữ sảnh đẹp và ưu đãi bia).
• Tháng thứ 5: Chọn phong cách & đặt lịch chụp ảnh cưới pre-wedding để kịp lấy ảnh phóng, album.
• Tháng thứ 4: Thử váy cưới, may vest chú rể, tìm đơn vị tráp ăn hỏi và trang trí tư gia.
• Tháng thứ 3: Lập danh sách khách mời 2 nhà, tạo thiệp cưới online Cưới thôiii gửi khách ở xa.
• Tháng thứ 2: Mua nhẫn cưới, đặt thiệp giấy (nếu có), chốt thực đơn thử món tại nhà hàng.
• 1 tháng cuối: Phát thiệp, tổng hợp RSVP khách xác nhận tham dự, sắp xếp sơ đồ chỗ ngồi bàn tiệc.`,
    },
    {
      title: 'Bài phát biểu đại diện nhà trai',
      badge: 'Phát biểu',
      query: 'Mẫu bài phát biểu đại diện họ nhà trai xin dâu ngắn gọn, trang trọng',
      answer: `Mẫu bài phát biểu xin dâu chuẩn mực (khoảng 3 phút):
"Kính thưa cụ ông cụ bà, cô dì chú bác cùng toàn thể quan viên hai họ!
Tôi xin tự giới thiệu, tôi là... đại diện cho họ nhà trai. Hôm nay là ngày lành tháng tốt, được sự đồng thuận của hai gia đình và sự nguyện ý của hai cháu [Tên Chú Rể] và [Tên Cô Dâu].
Gia đình chúng tôi xin phép kính dâng cơi trầu chén rượu và lễ vật theo phong tục truyền thống, chính thức xin phép họ nhà gái được đón cháu [Tên Cô Dâu] về làm dâu con trong gia đình họ [Tên Họ Nhà Trai].
Kính mong gia đình họ nhà gái chấp thuận cho hai cháu nên duyên vợ chồng, trăm năm hòa hợp. Tôi xin trân trọng cảm ơn!"`,
    },
  ];

  const handleAskQuestion = (index: number) => {
    setSelectedPromptIndex(index);
    setIsAiAnswering(true);
    setCurrentAiAnswer(null);
    setTimeout(() => {
      setCurrentAiAnswer(aiPrompts[index].answer);
      setIsAiAnswering(false);
    }, 400);
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setIsAiAnswering(true);
    setCurrentAiAnswer(null);
    setTimeout(() => {
      setCurrentAiAnswer(
        `Dạ Trợ lý AI đã ghi nhận câu hỏi: "${customQuestion}".\nĐối với nội dung này, Cưới thôiii khuyến nghị hai bạn:\n1. Trao đổi cụ thể với hai bên gia đình về nguyện vọng và phong tục tập quán riêng của từng địa phương.\n2. Cân đối dựa trên ngân sách hiện có để tránh áp lực tài chính sau đám cưới.\n3. Sử dụng các công cụ tính toán ngân sách và checklist có sẵn trong Cưới thôiii để theo dõi tiến độ chuẩn xác nhất!`
      );
      setIsAiAnswering(false);
      setCustomQuestion('');
    }, 600);
  };

  const toggleChecklistTask = (taskId: string) => {
    setChecklistTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const checklistPhases: TimelinePhase[] = [
    {
      id: '12months',
      label: '12 - 9 Tháng',
      period: 'Khởi động & Ngân sách',
      tasks: [
        { id: 't-1', title: 'Họp mặt hai gia đình, xem ngày lành tháng tốt', category: 'Gia đình', done: checklistTasks['t-1'] ?? true },
        { id: 't-2', title: 'Dự trù ngân sách sơ bộ cho Nhà Trai & Nhà Gái', category: 'Tài chính', done: checklistTasks['t-2'] ?? true },
        { id: 't-3', title: 'Khảo sát và đặt cọc trung tâm tiệc cưới / khách sạn', category: 'Địa điểm', done: checklistTasks['t-3'] ?? false },
      ],
    },
    {
      id: '6months',
      label: '6 - 4 Tháng',
      period: 'Trang phục & Hình ảnh',
      tasks: [
        { id: 't-4', title: 'Chụp ảnh pre-wedding ngoại cảnh hoặc studio', category: 'Hình ảnh', done: checklistTasks['t-4'] ?? false },
        { id: 't-5', title: 'Chọn và thử váy cưới, may đo vest cưới chú rể', category: 'Trang phục', done: checklistTasks['t-5'] ?? true },
        { id: 't-6', title: 'Đặt mâm tráp ăn hỏi và trang trí hoa tư gia', category: 'Nghi lễ', done: checklistTasks['t-6'] ?? false },
      ],
    },
    {
      id: '2months',
      label: '3 - 1 Tháng',
      period: 'Khách mời & Thiệp cưới',
      tasks: [
        { id: 't-7', title: 'Tạo thiệp cưới online Cưới thôiii và gửi khách ở xa', category: 'Thiệp cưới', done: checklistTasks['t-7'] ?? false },
        { id: 't-8', title: 'Chọn mua cặp nhẫn cưới kỷ vật trăm năm', category: 'Trang sức', done: checklistTasks['t-8'] ?? false },
        { id: 't-9', title: 'Tổng hợp phản hồi RSVP và xếp sơ đồ chỗ ngồi bàn tiệc', category: 'Khách mời', done: checklistTasks['t-9'] ?? false },
      ],
    },
  ];

  const currentPhase = checklistPhases.find((p) => p.id === activeChecklistTab) || checklistPhases[1];
  const completedCount = Object.values(checklistTasks).filter(Boolean).length;
  const totalTasks = 8;
  const progressPercent = Math.min(100, Math.round((completedCount / totalTasks) * 100));

  const vendorHighlights = WEDDING_SERVICES.slice(0, 3);

  const faqs = [
    {
      q: 'Cưới thôiii hỗ trợ gì cho các cặp đôi?',
      a: 'Cưới thôiii là nền tảng tất cả trong một (All-in-one): từ tạo thiệp cưới online miễn phí, quản lý danh sách khách mời, xác nhận RSVP, sơ đồ bàn tiệc, dự trù ngân sách hai nhà đến Hỏi Hoa (AI) tư vấn nghi lễ, thủ tục cưới truyền thống 24/7.',
    },
    {
      q: 'Ứng dụng có miễn phí hoàn toàn không?',
      a: 'Hoàn toàn miễn phí! Các tính năng cốt lõi như Lập kế hoạch cưới, Checklist đếm ngược, Quản lý ngân sách, Trợ lý AI và Tạo thiệp cưới online cơ bản đều miễn phí 100%. Bạn có thể nâng cấp gói VIP khi muốn dùng tên miền riêng, không giới hạn lưu lượng ảnh chất lượng cao hoặc tính năng nâng cao.',
    },
    {
      q: 'Hai vợ chồng có thể cùng đăng nhập và quản lý chung không?',
      a: 'Có! Tính năng Đồng bộ Cặp đôi (Couple Sync) cho phép cả Chú rể và Cô dâu cùng truy cập trên điện thoại hoặc máy tính. Bất kỳ thay đổi nào về khách mời, công việc đã hoàn thành hay khoản chi mới đều được đồng bộ tức thời.',
    },
    {
      q: 'Thiệp cưới online có thể gửi qua Zalo hay Messenger được không?',
      a: 'Cực kỳ tiện lợi! Bạn chỉ cần sao chép link thiệp hoặc chia sẻ trực tiếp qua Zalo, Messenger, Facebook, tin nhắn SMS. Khách mời mở thiệp mượt mà trên mọi thiết bị mà không cần cài đặt ứng dụng.',
    },
    {
      q: 'Làm sao để tìm và nhận ưu đãi từ các Nhà cung cấp dịch vụ cưới?',
      a: 'Tại mục "Khám Phá", bạn có thể duyệt qua 500+ nhà cung cấp uy tín (Studio ảnh, Nhà hàng tiệc cưới, Váy cưới, Tráp lễ, Nhẫn cưới) với mức giá minh bạch, đánh giá thật và các voucher ưu đãi độc quyền dành riêng cho cặp đôi Cưới thôiii.',
    },
  ];

  return (
    <div className="overflow-hidden bg-[#FAF8F5] text-[#332A27] font-body selection:bg-rose-100 selection:text-rose-900">
      {/* =========================================================================
          HERO SECTION - Plan Cưới Style (AI Wedding Planner + Countdown Simulator)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F6] via-[#FAF8F5] to-[#FAF8F5] pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
        {/* Soft background glow accents */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-60 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Top Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-rose-600 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 animate-pulse text-rose-500" />
              <span>Nền tảng AI Wedding Planner miễn phí tại Việt Nam</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl lg:text-[68px] lg:leading-[1.12]">
              Lên kế hoạch cưới thông minh,
              <span className="block mt-2 font-wedding italic font-normal text-rose-600">
                tiết kiệm &amp; nhẹ nhàng cùng AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
              Đồng hành cùng cô dâu &amp; chú rể từ bước chuẩn bị đầu tiên: Dự trù ngân sách 2 họ,
              checklist đếm ngược thông minh, gợi ý nhà cung cấp uy tín và Trợ lý AI giải đáp phong tục nghi lễ 24/7.
            </p>
          </div>

          {/* Interactive Hero Widget: Couple Countdown Simulator */}
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-xl shadow-rose-900/5 backdrop-blur-md sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
                  <Calendar className="h-4 w-4" />
                  Đếm ngược ngày trọng đại của hai bạn
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Tên Chú Rể</label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      placeholder="Tên Chú Rể"
                      className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-2 text-sm font-semibold text-stone-800 focus:border-rose-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Tên Cô Dâu</label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      placeholder="Tên Cô Dâu"
                      className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-2 text-sm font-semibold text-stone-800 focus:border-rose-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-stone-500">Ngày cưới dự kiến</label>
                  <input
                    type="date"
                    value={weddingDateStr}
                    onChange={(e) => setWeddingDateStr(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-2 text-sm font-medium text-stone-800 focus:border-rose-400 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Countdown Preview & Direct Action */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50/50 p-6 text-center border border-rose-100/60">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                  {groomName || 'Chú rể'} &amp; {brideName || 'Cô dâu'}
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-rose-600 sm:text-6xl">{daysLeft}</span>
                  <span className="text-sm font-semibold text-stone-600">ngày nữa</span>
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  Khoảng {Math.round(daysLeft / 7)} tuần để chuẩn bị mọi việc hoàn hảo
                </p>

                <div className="mt-5 flex w-full flex-col gap-2">
                  <button
                    onClick={() => onNavigate('wedding-plan')}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-rose-600/25 transition hover:bg-rose-700 hover:shadow-lg"
                  >
                    Bắt đầu lập kế hoạch ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={goToBuilder}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-rose-300 hover:bg-rose-50/50"
                  >
                    Tạo thiệp cưới online miễn phí
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Trust Bar */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-y border-stone-200/70 bg-white/50 py-6 text-center backdrop-blur-sm sm:grid-cols-4">
            <div>
              <div className="font-display text-2xl font-bold text-stone-800 sm:text-3xl">85.000+</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-stone-500">Cặp đôi tin dùng</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-rose-600 sm:text-3xl">500+</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-stone-500">Nhà cung cấp xác thực</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-stone-800 sm:text-3xl">100%</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-stone-500">Miễn phí sử dụng</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-amber-500 sm:text-3xl">4.9 / 5.0</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-stone-500">Đánh giá hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRESERVED SECTION: "Mẫu thiệp cưới online đẹp nhất" (Retained exactly)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
            <Gift className="h-3.5 w-3.5" />
            Bộ sưu tập thiệp cưới 2026
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#171313] sm:text-4xl lg:text-[42px]">
            Mẫu thiệp cưới online <span className="font-script text-4xl font-normal text-[#ed0068] sm:text-5xl">đẹp nhất</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#958c8b] sm:text-base">
            Khám phá những mẫu thiệp cưới được thiết kế tinh tế và hiện đại
          </p>
        </div>

        <div className="template-carousel-stage relative mt-10 h-[510px] overflow-hidden bg-[#ebe9e9] px-2 py-5 sm:mt-12 sm:h-[590px] sm:px-5 rounded-3xl">
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
                  style={
                    {
                      left: 'calc(50% + var(--carousel-offset) * var(--carousel-gap))',
                      '--carousel-offset': offset,
                      '--carousel-scale': isActive ? 1 : 0.84 - Math.max(distance - 1, 0) * 0.06,
                      opacity: isActive ? 1 : distance === 1 ? 0.58 : 0.2,
                      filter: isActive ? 'none' : 'blur(0.4px)',
                      zIndex: 10 - distance,
                      pointerEvents: isActive ? 'auto' : 'none',
                    } as React.CSSProperties
                  }
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

                      {/* Quick Select on Active Card */}
                      {isActive && (
                        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1.5 rounded-xl bg-white/95 p-2.5 text-center shadow-lg backdrop-blur">
                          <p className="text-xs font-bold text-stone-800">{template.name}</p>
                          <button
                            onClick={() => {
                              onSelectTemplate(template);
                              if (!currentUser) {
                                if (onOpenAuthModal) {
                                  onOpenAuthModal('login', 'builder', 'Vui lòng đăng nhập để sử dụng mẫu thiệp này');
                                } else {
                                  onNavigate('login');
                                }
                                return;
                              }
                              onNavigate('builder');
                            }}
                            className="w-full rounded-lg bg-[#ed0068] py-1.5 text-xs font-bold text-white transition hover:bg-[#ca0059] cursor-pointer"
                          >
                            Chọn mẫu này
                          </button>
                        </div>
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

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => onNavigate('templates')}
            className="inline-flex items-center gap-2 rounded-full bg-[#ed0068] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#ed0068]/20 transition hover:bg-[#ca0059]"
          >
            Xem tất cả 400+ mẫu thiệp <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={goToBuilder}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Tự thiết kế từ đầu
          </button>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI FEATURE 1: TRỢ LÝ CƯỚI AI (AI WEDDING ASSISTANT 24/7)
         ========================================================================= */}
      <section className="bg-gradient-to-b from-stone-50 to-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28 border-y border-stone-200/60">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
                <WandSparkles className="h-3.5 w-3.5" />
                Trí Tuệ Nhân Tạo Cưới thôiii
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Trợ lý cưới AI thông minh
                <span className="block font-wedding italic font-normal text-rose-600">
                  Giải đáp mọi nghi lễ, thủ tục 24/7
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-stone-600">
                Không còn lo lắng hỏi han khắp nơi hay bất đồng quan điểm giữa hai họ. Trợ lý AI được huấn luyện chuyên sâu về
                phong tục cưới hỏi 3 miền Bắc - Trung - Nam, giúp bạn tự tin giải quyết từ mâm tráp, văn khấn, phân bổ ngân sách
                đến kịch bản MC hoàn hảo.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Tư vấn phong tục 3 miền chuẩn xác',
                    desc: 'Nắm rõ quy tắc sính lễ, thách cưới, giờ hoàng đạo và kiêng kỵ.',
                  },
                  {
                    title: 'Dự toán chi phí & tối ưu ngân sách',
                    desc: 'Cân đối chi phí tiệc, váy cưới, chụp ảnh phù hợp với số lượng khách.',
                  },
                  {
                    title: 'Soạn thảo lời mời & bài phát biểu',
                    desc: 'Hỗ trợ văn khấn gia tiên, lời mời thiệp cưới và bài phát biểu 2 họ.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">{item.title}</h4>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive AI Chat Box Demo */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-rose-950/5 sm:p-7">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white shadow-md">
                    <WandSparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900">Trợ Lý Hoa (AI Wedding Planner)</h4>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs text-stone-400">Sẵn sàng phản hồi tức thời</p>
                  </div>
                </div>
                <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
                  Miễn phí
                </span>
              </div>

              {/* Quick Prompt Chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {aiPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(idx)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      selectedPromptIndex === idx && currentAiAnswer
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'border border-stone-200 bg-stone-50 text-stone-700 hover:border-rose-300 hover:bg-rose-50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Chat Message Bubble */}
              <div className="mt-5 min-h-[220px] rounded-2xl bg-stone-50 p-4 border border-stone-100">
                <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Hỏi: {aiPrompts[selectedPromptIndex]?.query}
                </div>

                {isAiAnswering ? (
                  <div className="flex items-center gap-2 py-8 justify-center text-sm text-stone-500">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
                    Trợ lý AI đang tra cứu phong tục &amp; tính toán chi phí...
                  </div>
                ) : (
                  <div className="text-xs leading-relaxed text-stone-700 whitespace-pre-line font-medium">
                    {currentAiAnswer || aiPrompts[0].answer}
                  </div>
                )}
              </div>

              {/* Custom Input */}
              <form onSubmit={handleCustomQuestionSubmit} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Hỏi bất kỳ điều gì về đám cưới của bạn..."
                  className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:border-rose-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-rose-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI FEATURE 2: SMART WEDDING CHECKLIST (Checklist Đếm Ngược)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Checklist 60+ Đầu Việc Chuẩn Hoá
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-[42px]">
            Checklist công việc thông minh
            <span className="block font-wedding italic font-normal text-rose-600">
              Không còn nỗi lo bỏ sót hay sát ngày cuống cuồng
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
            Mỗi đầu việc được gắn với mốc thời gian đếm ngược chính xác, phân chia rõ ràng người phụ trách giữa Cô dâu và Chú rể.
          </p>
        </div>

        {/* Interactive Checklist Stage */}
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 sm:p-8">
          {/* Progress Header */}
          <div className="flex flex-col gap-4 border-b border-stone-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <Clock className="h-4 w-4 text-rose-500" />
                Tiến độ chuẩn bị cưới của hai bạn
              </div>
              <h3 className="mt-1 text-xl font-bold text-stone-900">
                Đã hoàn thành {completedCount} / {totalTasks} đầu việc quan trọng ({progressPercent}%)
              </h3>
            </div>
            <div className="w-full sm:w-48">
              <div className="h-3 w-full overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Timeline Tabs */}
          <div className="mt-6 flex flex-wrap gap-2 border-b border-stone-100 pb-4">
            {checklistPhases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActiveChecklistTab(phase.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  activeChecklistTab === phase.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {phase.label} • <span className="opacity-80 font-normal">{phase.period}</span>
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="mt-6 space-y-3">
            {currentPhase.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleChecklistTask(task.id)}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                  checklistTasks[task.id]
                    ? 'border-emerald-200 bg-emerald-50/40 text-stone-500'
                    : 'border-stone-200 bg-white hover:border-rose-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border transition ${
                      checklistTasks[task.id]
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {checklistTasks[task.id] && <Check className="h-4 w-4" />}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        checklistTasks[task.id] ? 'line-through text-stone-400' : 'text-stone-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="text-[11px] font-medium text-stone-400">{task.category}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    checklistTasks[task.id]
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {checklistTasks[task.id] ? 'Đã xong' : 'Chưa xong'}
                </span>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-stone-100 pt-6 sm:flex-row">
            <span className="text-xs text-stone-500">
              * Hệ thống gợi ý hơn 60 việc chi tiết cho đám cưới truyền thống và hiện đại.
            </span>
            <button
              onClick={() => onNavigate('wedding-plan')}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-stone-800"
            >
              Mở toàn bộ Checklist <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI FEATURE 3: QUẢN LÝ NGÂN SÁCH 2 NHÀ (SMART BUDGET PLANNER)
         ========================================================================= */}
      <section className="bg-[#FAF4F0] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 border-y border-stone-200/60">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Interactive Budget Card */}
            <div className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xl shadow-stone-300/40 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 pb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Bảng Quản Lý Ngân Sách
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-stone-900">Chi Phí Cưới 2 Nhà</h3>
                </div>

                {/* Filter Pills */}
                <div className="flex rounded-xl bg-stone-100 p-1 text-xs font-semibold text-stone-600">
                  <button
                    onClick={() => setBudgetCategory('all')}
                    className={`rounded-lg px-3 py-1 transition ${
                      budgetCategory === 'all' ? 'bg-white text-stone-900 shadow-sm' : 'hover:text-stone-900'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setBudgetCategory('groom')}
                    className={`rounded-lg px-3 py-1 transition ${
                      budgetCategory === 'groom' ? 'bg-white text-stone-900 shadow-sm' : 'hover:text-stone-900'
                    }`}
                  >
                    Nhà Trai
                  </button>
                  <button
                    onClick={() => setBudgetCategory('bride')}
                    className={`rounded-lg px-3 py-1 transition ${
                      budgetCategory === 'bride' ? 'bg-white text-stone-900 shadow-sm' : 'hover:text-stone-900'
                    }`}
                  >
                    Nhà Gái
                  </button>
                </div>
              </div>

              {/* 3 Summary Stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-stone-50 p-3.5 border border-stone-100">
                  <div className="text-[11px] font-medium text-stone-400">Dự kiến</div>
                  <div className="mt-1 text-sm font-bold text-stone-900 sm:text-base">
                    {budgetCategory === 'groom' ? '140 Tr' : budgetCategory === 'bride' ? '110 Tr' : '250 Tr'}
                  </div>
                </div>
                <div className="rounded-2xl bg-rose-50 p-3.5 border border-rose-100">
                  <div className="text-[11px] font-medium text-rose-600">Đã chi / Cọc</div>
                  <div className="mt-1 text-sm font-bold text-rose-700 sm:text-base">
                    {budgetCategory === 'groom' ? '92 Tr' : budgetCategory === 'bride' ? '73 Tr' : '165 Tr'}
                  </div>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3.5 border border-emerald-100">
                  <div className="text-[11px] font-medium text-emerald-600">Còn lại</div>
                  <div className="mt-1 text-sm font-bold text-emerald-700 sm:text-base">
                    {budgetCategory === 'groom' ? '48 Tr' : budgetCategory === 'bride' ? '37 Tr' : '85 Tr'}
                  </div>
                </div>
              </div>

              {/* Category Breakdown Bars */}
              <div className="mt-6 space-y-3.5">
                {[
                  { name: 'Tiệc cưới & Đồ uống', amount: '120.000.000 đ', percent: 48, color: 'bg-rose-500' },
                  { name: 'Chụp ảnh & Phim cưới', amount: '35.000.000 đ', percent: 14, color: 'bg-amber-500' },
                  { name: 'Váy cưới, Vest & Trang phục', amount: '30.000.000 đ', percent: 12, color: 'bg-indigo-500' },
                  { name: 'Nhẫn cưới & Nữ trang vàng', amount: '25.000.000 đ', percent: 10, color: 'bg-emerald-500' },
                  { name: 'Mâm tráp & Trang trí gia tiên', amount: '25.000.000 đ', percent: 10, color: 'bg-sky-500' },
                  { name: 'Dự phòng phát sinh', amount: '15.000.000 đ', percent: 6, color: 'bg-stone-400' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                      <span>{item.name}</span>
                      <span>{item.amount} ({item.percent}%)</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-amber-50/80 p-3 text-xs text-amber-800 border border-amber-200/60">
                <span className="font-semibold">💡 Lời khuyên AI: Đã chi 66% ngân sách. Hạng mục Tiệc cưới đang trong ngưỡng an toàn.</span>
              </div>
            </div>

            {/* Explanation & Value Prop */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3.5 py-1 text-xs font-bold text-rose-600">
                <DollarSign className="h-3.5 w-3.5" />
                Kiểm Soát Chi Tiêu Minh Bạch
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Dự trù chi phí cưới
                <span className="block font-wedding italic font-normal text-rose-600">
                  Phân chia rõ ràng giữa hai bên gia đình
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-stone-600">
                Nỗi sợ lớn nhất của cô dâu chú rể là chi tiêu mất kiểm soát, phát sinh cả trăm triệu ngoài dự kiến.
                Cưới thôiii cung cấp bảng tính thông minh, phân chia rành mạch khoản nào của Nhà Trai, khoản nào của Nhà Gái và khoản nào do Cặp đôi tự chi trả.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  'Cảnh báo thông minh khi một hạng mục vượt quá ngân sách dự kiến.',
                  'Theo dõi chi tiết tiền cọc, tiến độ thanh toán từng đợt cho nhà hàng, studio.',
                  'Báo cáo trực quan, dễ dàng xuất file gửi phụ huynh xem xét.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-stone-700">
                    <Check className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('budget-calc')}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
              >
                Mở bảng tính ngân sách chi tiết <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI FEATURE 4: QUẢN LÝ KHÁCH MỜI & SƠ ĐỒ BÀN TIỆC
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
              <Users className="h-3.5 w-3.5" />
              Khách Mời &amp; Sơ Đồ Chỗ Ngồi
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Mời cưới tinh tế,
              <span className="block font-wedding italic font-normal text-rose-600">
                quản lý RSVP &amp; xếp bàn chu đáo
              </span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-stone-600">
              Không còn cảnh khách mời bối rối tìm chỗ hay tiệc cưới bị thừa thiếu cỗ.
              Theo dõi xác nhận tham dự (RSVP) theo thời gian thực và kéo thả sắp xếp sơ đồ bàn tiệc dễ dàng.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <span className="text-2xl font-bold text-stone-900">320</span>
                <p className="text-xs text-stone-500 mt-1">Tổng thiệp mời đã gửi</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                <span className="text-2xl font-bold text-emerald-600">278</span>
                <p className="text-xs text-emerald-700 mt-1">Đã xác nhận tham dự (87%)</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('seating-chart')}
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-stone-800"
              >
                Khám phá Sơ đồ bàn tiệc <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate('rsvp-dashboard')}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                Xem RSVP Dashboard
              </button>
            </div>
          </div>

          {/* Interactive Seating Chart Mockup */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/40">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-rose-500" />
                <h4 className="text-sm font-bold text-stone-900">Sơ đồ sảnh tiệc: Sảnh Hoa Sen (30 Bàn)</h4>
              </div>
              <span className="text-xs font-semibold text-stone-400">Đã xếp: 28/30 bàn</span>
            </div>

            {/* Table layout grid */}
            <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-2">
              {[
                { name: 'Bàn 01 • VIP Nhà Gái', count: '10/10 khách', status: 'Đủ chỗ', type: 'vip' },
                { name: 'Bàn 02 • VIP Nhà Trai', count: '10/10 khách', status: 'Đủ chỗ', type: 'vip' },
                { name: 'Bàn 03 • Bạn Đại Học Cô Dâu', count: '9/10 khách', status: 'Còn 1 chỗ', type: 'friend' },
                { name: 'Bàn 04 • Đồng Nghiệp Chú Rể', count: '8/10 khách', status: 'Còn 2 chỗ', type: 'work' },
              ].map((table, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-4 transition ${
                    table.type === 'vip'
                      ? 'border-rose-200 bg-rose-50/40'
                      : 'border-stone-200 bg-stone-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">{table.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        table.type === 'vip' ? 'bg-rose-100 text-rose-700' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {table.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                    <span>{table.count}</span>
                    <span className="text-[11px] font-semibold text-rose-600">Xem danh sách →</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-stone-100 p-4 text-xs text-stone-600">
              <span className="font-bold text-stone-800">Tính năng nổi bật:</span> Khách mời quét mã QR tại bàn để biết đúng vị trí ghế ngồi của mình, không lo chen chúc hay ngồi nhầm bàn.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI FEATURE 5: KHÁM PHÁ NHÀ CUNG CẤP UY TÍN (VENDORS SHOWCASE)
         ========================================================================= */}
      <section className="bg-stone-900 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-bold text-rose-400">
                <Compass className="h-3.5 w-3.5" />
                Khám Phá Dịch Vụ Cưới
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                500+ Nhà cung cấp uy tín
                <span className="block font-wedding italic font-normal text-rose-400">
                  Được cộng đồng cô dâu chú rể xác thực &amp; đánh giá
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-300">
                Tìm kiếm Trung tâm tiệc cưới, Studio ảnh cưới, Váy cưới, Tráp lễ và Nhẫn cưới với mức giá minh bạch cùng ưu đãi độc quyền qua Cưới thôiii.
              </p>
            </div>

            <button
              onClick={() => onNavigate('kham-pha')}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500"
            >
              Khám phá tất cả nhà cung cấp <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Featured Vendor Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {vendorHighlights.map((vendor) => (
              <article
                key={vendor.id}
                className="group overflow-hidden rounded-3xl bg-stone-800 text-stone-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-950/40"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                    {vendor.categoryLabel}
                  </span>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-400/90 px-2 py-0.5 text-xs font-bold text-stone-900 backdrop-blur">
                    <Star className="h-3 w-3 fill-current" />
                    {vendor.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{vendor.name}</h3>
                  <p className="mt-1 text-xs text-stone-400">{vendor.address}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-stone-700/60 pt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">Giá từ</span>
                      <p className="text-sm font-bold text-rose-400">
                        {vendor.priceStarting} / {vendor.priceType}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('kham-pha')}
                      className="rounded-full bg-stone-700 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI FEATURE 6: ĐỒNG BỘ HAI VỢ CHỒNG (COUPLE SYNC)
         ========================================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28 border-b border-stone-200/60">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
                <Smartphone className="h-3.5 w-3.5" />
                Đồng Bộ Hai Vợ Chồng
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Cùng nhau chuẩn bị,
                <span className="block font-wedding italic font-normal text-rose-600">
                  gắn kết từng khoảnh khắc
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-stone-600">
                Không còn cảnh một người làm tất cả còn một người không biết gì.
                Cưới thôiii cho phép Chú rể và Cô dâu cùng đăng nhập, phân chia công việc, theo dõi chi tiêu và nhận thông báo đẩy tức thì.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Đồng bộ thời gian thực (Real-time Sync)',
                    desc: 'Khi Chú rể tick xong việc hoặc Cô dâu cập nhật thêm khách mời, dữ liệu được cập nhật ngay lập tức.',
                  },
                  {
                    title: 'Phân quyền linh hoạt',
                    desc: 'Dễ dàng phân chia phụ trách: Chú rể lo xe hoa, tiệc & âm thanh; Cô dâu lo váy cưới, trang trí & hoa cưới.',
                  },
                  {
                    title: 'Dùng mượt mà trên mọi thiết bị',
                    desc: 'Hỗ trợ máy tính, iPhone, Android không cần cài đặt phức tạp.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-800">{item.title}</h4>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('signup')}
                  className="rounded-full bg-rose-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
                >
                  Đăng ký tài khoản cặp đôi
                </button>
              </div>
            </div>

            {/* Visual device mockup */}
            <div className="relative mx-auto max-w-md rounded-[2.5rem] border-8 border-stone-800 bg-stone-900 p-4 shadow-2xl shadow-stone-800/20">
              <div className="rounded-[1.8rem] bg-[#FAF8F5] p-5 text-stone-800">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                    <span className="text-xs font-bold text-stone-900">Đăng &amp; Linh • Cưới thôiii</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Đã đồng bộ
                  </span>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm border border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Thông báo mới nhất</span>
                  <p className="mt-1 text-xs text-stone-700">
                    ❤️ <strong>Linh</strong> vừa hoàn thành đầu việc: <em>&ldquo;Chốt mẫu thiệp cưới Song Hỷ Đỏ&rdquo;</em>
                  </p>
                  <span className="text-[10px] text-stone-400 mt-1 block">2 phút trước</span>
                </div>

                <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm border border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Chi phí vừa ghi nhận</span>
                  <p className="mt-1 text-xs text-stone-700">
                    💳 <strong>Đăng</strong> đã ghi nhận cọc nhà hàng: <em>20.000.000 đ</em> (Nhà Trai chi)
                  </p>
                  <span className="text-[10px] text-stone-400 mt-1 block">15 phút trước</span>
                </div>

                <div className="mt-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 p-3 text-white text-center">
                  <p className="text-xs font-bold">Còn 168 ngày đến đám cưới</p>
                  <p className="text-[11px] opacity-90 mt-0.5">Hai bạn đã hoàn thành 68% kế hoạch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLAN CƯỚI CẨM NANG & BLOG CƯỚI (WEDDING GUIDE)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
              <FileText className="h-3.5 w-3.5" />
              Cẩm Nang &amp; Kinh Nghiệm Cưới
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Kiến thức &amp; bí quyết từ các cặp đôi đi trước
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 transition hover:text-rose-700"
          >
            Xem tất cả bài viết <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Checklist chuẩn bị đám cưới: 12 tuần cuối cùng không thể bỏ sót',
              desc: 'Chi tiết từng tuần đếm ngược trước ngày trọng đại: từ chốt danh sách khách, duyệt kịch bản MC đến xếp bàn.',
              category: 'Lập Kế Hoạch',
              time: '8 phút đọc',
            },
            {
              title: 'Dự toán chi phí đám cưới Việt 2026: Cách tránh bẫy phát sinh',
              desc: 'Bí quyết giúp cặp đôi tiết kiệm từ 30 đến 50 triệu đồng khi đặt tiệc, thuê váy cưới và làm tráp lễ ăn hỏi.',
              category: 'Ngân Sách',
              time: '6 phút đọc',
            },
            {
              title: 'Thủ tục lễ dạm ngõ, ăn hỏi và đón dâu: Hướng dẫn chuẩn phong tục',
              desc: 'Nghi thức truyền thống 3 miền, chuẩn bị lễ vật tráp quả, văn khấn gia tiên và các lời phát biểu quan trọng.',
              category: 'Nghi Lễ',
              time: '10 phút đọc',
            },
          ].map((article, idx) => (
            <article
              key={idx}
              onClick={() => onNavigate('blog')}
              className="cursor-pointer rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-600">{article.category}</span>
                <span className="text-stone-400">{article.time}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-stone-900 leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">{article.desc}</p>
              <div className="mt-5 text-xs font-bold text-rose-600 flex items-center gap-1">
                Đọc bài viết <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          REVIEWS / TESTIMONIALS (ĐÁNH GIÁ TỪ CẶP ĐÔI)
         ========================================================================= */}
      <section className="bg-stone-100/70 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-rose-600 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-current text-rose-500" />
              Đánh Giá Thực Tế
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
              Hơn 85.000+ cặp đôi đã tin tưởng chọn lựa
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              Cùng nghe chia sẻ từ các cặp đôi đã chuẩn bị đám cưới nhẹ nhàng cùng Cưới thôiii.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                couple: 'Linh & Minh Quân',
                wedding: 'Đám cưới tại Hà Nội • Tháng 10/2025',
                quote:
                  'Tính năng phân chia ngân sách 2 họ và checklist đếm ngược giúp tụi mình tiết kiệm được gần 40 triệu so với dự tính ban đầu. Thiệp cưới online gửi khách ai cũng khen sang trọng và hiện đại!',
              },
              {
                couple: 'Thu Thảo & Hoàng Nam',
                wedding: 'Đám cưới tại TP.HCM • Tháng 12/2025',
                quote:
                  'Trợ lý AI giải đáp nghi thức lễ gia tiên cực kỳ chi tiết, giúp hai đứa tự tin giải thích cho bố mẹ hai bên đồng thuận. Tính năng RSVP giúp tụi mình chốt đúng số bàn, không bị dư cỗ nào.',
              },
              {
                couple: 'Huyền My & Tuấn Anh',
                wedding: 'Đám cưới tại Đà Nẵng • Tháng 01/2026',
                quote:
                  'Hai vợ chồng bận rộn công việc nhưng nhờ app đồng bộ, lúc rảnh chỉ cần mở điện thoại tick việc là nắm trọn tiến độ. Thực sự là cứu tinh cho các cặp đôi trẻ hiện nay!',
              },
            ].map((review, idx) => (
              <div key={idx} className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-stone-600 italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-stone-100 pt-4">
                  <h4 className="text-sm font-bold text-stone-900">{review.couple}</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">{review.wedding}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ SECTION (CÂU HỎI THƯỜNG GẶP)
         ========================================================================= */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-600">
            <HelpCircle className="h-3.5 w-3.5" />
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
            Câu hỏi thường gặp về Cưới thôiii
          </h2>
        </div>

        <div className="mt-10 divide-y divide-stone-200 rounded-3xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="p-6">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-bold text-stone-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs leading-relaxed text-stone-600">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION BANNER
         ========================================================================= */}
      <section className="bg-gradient-to-br from-rose-600 via-rose-700 to-stone-900 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Heart className="mx-auto h-12 w-12 text-rose-200 animate-bounce" />
          <h2 className="mt-6 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Bắt đầu lên kế hoạch cho ngày hạnh phúc nhất
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-100 sm:text-lg">
            Hoàn toàn miễn phí. Không cần thẻ tín dụng. Hãy để Cưới thôiii đồng hành cùng hai bạn từ hôm nay.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate('wedding-plan')}
              className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-sm font-bold text-rose-700 shadow-xl transition hover:bg-rose-50 hover:scale-105"
            >
              Lên kế hoạch cưới ngay
            </button>
            <button
              onClick={goToBuilder}
              className="w-full sm:w-auto rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Tạo thiệp cưới online miễn phí
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (Cưới thôiii Footer)
         ========================================================================= */}
      <footer className="bg-stone-950 px-5 py-16 text-stone-400 sm:px-8 lg:px-12 border-t border-stone-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="mb-2">
                <CuoiThoiiiLogo
                  size="md"
                  variant="light"
                  onClick={() => onNavigate('landing')}
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-400 max-w-sm">
                Nền tảng AI Wedding Planner &amp; Thiệp cưới online hàng đầu Việt Nam.
                Giúp cặp đôi chuẩn bị hôn lễ thông minh, tiết kiệm và trọn vẹn yêu thương.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-stone-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Bảo mật thông tin &amp; Đồng bộ dữ liệu hai người</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Công cụ cưới</h4>
              <ul className="mt-4 space-y-2.5 text-xs">
                <li>
                  <button onClick={() => onNavigate('wedding-plan')} className="hover:text-white transition">
                    Checklist việc cần làm
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('budget-calc')} className="hover:text-white transition">
                    Dự trù ngân sách 2 nhà
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('seating-chart')} className="hover:text-white transition">
                    Sơ đồ bàn tiệc
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('tools')} className="hover:text-white transition">
                    Tất cả công cụ cưới
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Thiệp cưới &amp; Dịch vụ</h4>
              <ul className="mt-4 space-y-2.5 text-xs">
                <li>
                  <button onClick={() => onNavigate('templates')} className="hover:text-white transition">
                    Mẫu thiệp cưới online
                  </button>
                </li>
                <li>
                  <button onClick={goToBuilder} className="hover:text-white transition">
                    Tạo thiệp mới
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('kham-pha')} className="hover:text-white transition">
                    Khám phá nhà cung cấp
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('pricing')} className="hover:text-white transition">
                    Bảng giá &amp; Gói cước
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hỗ trợ &amp; Cẩm nang</h4>
              <ul className="mt-4 space-y-2.5 text-xs">
                <li>
                  <button onClick={() => onNavigate('blog')} className="hover:text-white transition">
                    Cẩm nang cưới
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('reviews')} className="hover:text-white transition">
                    Đánh giá từ cặp đôi
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('login')} className="hover:text-white transition">
                    Đăng nhập tài khoản
                  </button>
                </li>
                <li>
                  <span className="text-stone-500">Hotline: 1900 6868 (8:00 - 22:00)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-stone-800 pt-8 text-xs text-stone-400 sm:flex-row sm:items-center">
            <p>© 2026 Cưới thôiii. Bản quyền thuộc về nền tảng cưới hỏi Việt Nam.</p>
            <div className="flex gap-4">
              <span>Chính sách bảo mật</span>
              <span>Điều khoản sử dụng</span>
              <span>Hỗ trợ trực tuyến</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
