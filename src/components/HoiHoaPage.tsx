import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Calendar,
  MapPin,
  DollarSign,
  Heart,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  PenSquare,
  HelpCircle,
  Search,
  Bell,
  User as UserIcon,
  Shirt,
  Camera,
  Scissors,
  Palette,
  Wand2,
  Image as ImageIcon,
  Check,
  X,
  MessageSquare,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ViewMode, UserAccount, WeddingData } from '../types';

interface HoiHoaPageProps {
  user: UserAccount | null;
  weddingData: WeddingData;
  onNavigate: (view: ViewMode) => void;
  onOpenAuthModal?: (mode?: 'login' | 'signup' | 'verify', targetView?: ViewMode, reason?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'hoa';
  content: string;
  timestamp: string;
  actionSuggestions?: string[];
}

export const HoiHoaPage: React.FC<HoiHoaPageProps> = ({
  user,
  weddingData,
  onNavigate,
  onOpenAuthModal
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'ai-studio'>('chat');
  
  // Couple & Wedding Context state
  const [coupleInfo, setCoupleInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('cuoithoiii_hoa_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      weddingDate: weddingData.ceremonyDate || '2026-11-14',
      lunarDate: '6/10 ÂL',
      region: 'Bắc Ninh',
      budget: 'Chưa có',
      style: 'Chưa chọn',
      vendorsBooked: 0,
      totalVendors: 10,
      stylesPreference: [] as string[],
      notes: ''
    };
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('cuoithoiii_hoa_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // AI Studio state
  const [aiStudioTool, setAiStudioTool] = useState<'dress' | 'hair' | 'makeup' | 'photo'>('dress');
  const [selectedDressStyle, setSelectedDressStyle] = useState('princess');
  const [selectedHairStyle, setSelectedHairStyle] = useState('wavy');
  const [selectedMakeupTone, setSelectedMakeupTone] = useState('korean');
  const [aiGeneratedResult, setAiGeneratedResult] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cuoithoiii_hoa_profile', JSON.stringify(coupleInfo));
    } catch {
      // ignore
    }
  }, [coupleInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('cuoithoiii_hoa_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Calculate days left
  const daysLeft = (() => {
    try {
      const target = new Date(coupleInfo.weddingDate).getTime();
      const today = new Date().getTime();
      const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
      return isNaN(diff) ? 13 : Math.max(diff, 0);
    } catch {
      return 13;
    }
  })();

  // Response generator for Hoa AI
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (!user && onOpenAuthModal) {
      onOpenAuthModal('login', 'customs', 'Vui lòng đăng nhập để lưu trữ lịch sử trò chuyện cùng Hoa AI');
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI logic responding contextually
    setTimeout(() => {
      let reply = '';
      let suggestions: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('nhà hàng') || lower.includes('tiệc cưới') || lower.includes('bắc ninh')) {
        reply = `Dạ chào anh chị! Đối với khu vực **${coupleInfo.region || 'Bắc Ninh'}**, để chuẩn bị tiệc cưới chỉn chu và tối ưu chi phí, Hoa gợi ý danh sách địa điểm uy tín nhất:\n\n1. **Trung tâm tiệc cưới & sự kiện Phoenix Resort Bắc Ninh** (Đồi Pháo Thủ, TP. Bắc Ninh): Không gian sân vườn sang trọng, sức chứa 300 - 800 khách, thực đơn từ 2.800.000đ - 4.500.000đ/bàn.\n2. **Trung tâm Hội nghị Tiệc cưới Trầu Cau** (Đường Lý Thái Tổ): Vị trí trung tâm, sảnh tiệc hoàng gia, âm thanh ánh sáng hiện đại, set menu từ 2.200.000đ/bàn.\n3. **Grand Phoenix Hotel Bac Ninh**: Tiêu chuẩn 5 sao, dịch vụ decor trọn gói và ưu đãi phòng tân hôn.\n\n💡 **Mẹo của Hoa:** Anh chị nên hỏi rõ chính sách đồ uống (có miễn phí nước ngọt, bia khai tiệc không) và phí dịch vụ phát sinh trước khi đặt cọc nhé!`;
        suggestions = ['Xem mẫu dự trù ngân sách tiệc cưới', 'Cần cọc trước bao nhiêu %?', 'Cách chọn thực đơn cưới ngon'];
      } else if (lower.includes('13 ngày') || lower.includes('gấp') || lower.includes('chốt nhà cung cấp')) {
        reply = `Còn **${daysLeft} ngày** nữa là ngày trọng đại, đây là giai đoạn nước rút then chốt! Hoa lập danh sách thứ tự ưu tiên chốt ngay hôm nay cho anh chị:\n\n🔥 **Việc ƯU TIÊN SỐ 1 (Hôm nay phải xong):**\n• Chốt số bàn tiệc chính thức với nhà hàng & bàn dự phòng (thường 2 - 3 bàn).\n• Chốt lịch thử đồ cưới & lấy váy cưới, vest chú rể (thử lại xem có cần bóp/nới eo không).\n\n⚡ **Việc ƯU TIÊN SỐ 2 (1-2 ngày tới):**\n• Rà soát xe hoa, xe đón dâu & giờ xuất phát theo phong thủy.\n• Gửi kịch bản MC & danh sách bài hát cho ban nhạc / âm thanh.\n• Chốt đội ngũ bê tráp & trang phục áo dài đỡ tráp.\n\n✨ Anh chị hãy giữ sức khỏe, ngủ đủ giấc và uống nhiều nước để có diện mạo rạng rỡ nhất nhé!`;
        suggestions = ['Kiểm tra checklist 7 ngày cuối', 'Tạo kịch bản MC đám cưới', 'Phân bổ ghế ngồi khách mời'];
      } else if (lower.includes('ngân sách') || lower.includes('bao nhiêu tiền') || lower.includes('đã chi')) {
        reply = `Hiện tại ngân sách của anh chị đang để: **${coupleInfo.budget === 'Chưa có' ? 'Chưa đặt hạn mức' : coupleInfo.budget}**.\n\nTheo kinh nghiệm của Hoa tại khu vực phía Bắc, cơ cấu chi phí cưới thông thường được chia như sau:\n• **Tiệc cưới & Đồ uống:** 50% - 55%\n• **Chụp ảnh cưới, Váy cưới, Make-up:** 15% - 18%\n• **Tráp ăn hỏi & Lễ vật:** 10% - 12%\n• **Thiệp cưới & Quà cảm ơn:** 3% - 5%\n• **Chi phí dự phòng phát sinh:** 10%\n\nAnh chị có thể bấm nút **Sửa** ở khung bên phải để Hoa lưu ngân sách dự kiến và giúp tính toán chi tiết từng khoản nhé!`;
        suggestions = ['Tôi có ngân sách 150 triệu', 'Làm sao để tiết kiệm chi phí tiệc?', 'Mở công cụ dự trù ngân sách'];
      } else if (lower.includes('còn bao nhiêu ngày') || lower.includes('lịch hôm nay')) {
        reply = `Hôm nay là thời điểm tuyệt vời để rà soát! Còn **${daysLeft} ngày** nữa là tới ngày cưới **${coupleInfo.weddingDate} (${coupleInfo.lunarDate})**.\n\n🎯 **Nhiệm vụ hôm nay Hoa gợi ý:**\n1. Kiểm tra danh sách khách đã xác nhận tham dự (RSVP).\n2. Liên hệ xác nhận giờ giao hoa cầm tay và xe hoa ngày cưới.\n3. Chuẩn bị phong bao lì xì cho đội bê tráp hai họ.\n\nHoa luôn ở đây hỗ trợ anh chị bất kỳ lúc nào!`;
        suggestions = ['Xem danh sách khách mời', 'Gợi ý lời cảm ơn sau cưới'];
      } else if (lower.includes('phong cách') || lower.includes('concept')) {
        reply = `Hoa rất thích trao đổi về phong cách cưới! Các concept cưới thịnh hành nhất 2026 gồm:\n\n🌿 **Tối giản & Tinh tế (Minimalist Clean):** Tông màu trắng, kem, hoa baby trắng, ánh nến lung linh.\n💐 **Cổ điển sang trọng (Classic Elegance):** Váy ren hoàng gia, hoa hồng đỏ nhung hoặc hoa lan trắng, sảnh tiệc lộng lẫy.\n🌸 **Truyền thống Á Đông (Modern Heritage):** Áo dài cưới gấm đỏ, tráp son thếp vàng, decor họa tiết Long Phụng cách tân.\n✨ **Rustic Sân vườn:** Gỗ mộc, hoa tươi nhiệt đới và không gian mở thoáng đãng.\n\nAnh chị thích phong cách nào nhất để Hoa gợi ý nhà cung cấp phù hợp?`;
        suggestions = ['Tôi thích phong cách Tối giản Hàn Quốc', 'Tôi thích phong cách Truyền thống Á Đông'];
      } else {
        reply = `Cảm ơn anh chị đã nhắn cho Hoa! Về câu hỏi "${text}", Hoa đã ghi nhận thông tin. \n\nVới đám cưới tại **${coupleInfo.region}** dự kiến ngày **${coupleInfo.weddingDate}**, Hoa khuyên anh chị nên chuẩn bị sớm các khâu tiệc, chụp ảnh và thiệp mời trực tuyến để khách có trải nghiệm tốt nhất.\n\nAnh chị muốn Hoa tư vấn chi tiết hơn về phần nào ạ?`;
        suggestions = ['Tư vấn thực đơn tiệc cưới', 'Gợi ý mẫu thiệp cưới đẹp', 'Cách mời khách qua Zalo tinh tế'];
      }

      const hoaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'hoa',
        content: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        actionSuggestions: suggestions
      };

      setMessages(prev => [...prev, hoaMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearHistory = () => {
    if (window.confirm('Anh chị có chắc muốn làm mới cuộc trò chuyện với Hoa không?')) {
      setMessages([]);
      localStorage.removeItem('cuoithoiii_hoa_chat_messages');
    }
  };

  // AI Studio simulator
  const handleGenerateAiStudio = () => {
    setIsGeneratingAi(true);
    setAiGeneratedResult(null);

    setTimeout(() => {
      setIsGeneratingAi(false);
      if (aiStudioTool === 'dress') {
        setAiGeneratedResult('https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80');
      } else if (aiStudioTool === 'makeup') {
        setAiGeneratedResult('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80');
      } else if (aiStudioTool === 'hair') {
        setAiGeneratedResult('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80');
      } else {
        setAiGeneratedResult('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80');
      }
    }, 1200);
  };

  const popularProvinces = [
    'Bắc Ninh',
    'Hà Nội',
    'TP. Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Bình Dương',
    'Nghệ An',
    'Quảng Ninh'
  ];

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-stone-800 pb-20">
      {/* Top Header Bar */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 tracking-tight">
                Hỏi Hoa
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full border border-rose-100">
                <Sparkles className="w-3 h-3 text-rose-500" /> Trợ lý AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Trợ lý cưới Hoa và các công cụ AI thử váy, trang điểm, tóc
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <div className="flex items-center p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'chat'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Trò chuyện
              </button>
              <button
                onClick={() => setActiveTab('ai-studio')}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'ai-studio'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" /> AI Studio
              </button>
            </div>

            {/* Quick Action Utilities */}
            <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
              <button
                onClick={() => alert('Hoa là trợ lý AI thông minh được huấn luyện chuyên sâu về phong tục, nhà cung cấp và nghi lễ cưới hỏi tại Việt Nam.')}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
                title="Hướng dẫn"
              >
                <HelpCircle className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={() => onNavigate('tools')}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
                title="Công cụ cưới"
              >
                <Search className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'chat' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT / MAIN COLUMN: Chat Conversation & Local Recommendations */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Header Box: Avatar Hoa & "Trò chuyện mới" button */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-linear-to-tr from-rose-200 to-pink-100 border-2 border-rose-300 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                    <span className="text-2xl" role="img" aria-label="Hoa mascot">🌸</span>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                      Hoa
                      <span className="text-[11px] font-normal text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Online
                      </span>
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500">
                      Trợ lý chuẩn bị cưới của anh chị
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClearHistory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 transition-colors shadow-2xs"
                >
                  <PenSquare className="w-3.5 h-3.5 text-stone-500" />
                  <span>Trò chuyện mới</span>
                </button>
              </div>

              {/* Next Action Suggestion Cards */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Việc tiếp theo
                  </span>
                  <span className="text-xs text-stone-400">
                    Còn {daysLeft} ngày
                  </span>
                </div>

                <div
                  onClick={() => handleSendMessage('Gợi ý danh sách các nhà cung cấp cần đặt trước?')}
                  className="flex items-center justify-between p-3.5 bg-rose-50/60 hover:bg-rose-50 rounded-xl border border-rose-100 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Shirt className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                        Chưa đặt nhà cung cấp nào
                      </h4>
                      <p className="text-xs text-stone-500">
                        Nên xem gì trước
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </div>

                <div className="divide-y divide-stone-100 pt-1">
                  <button
                    onClick={() => handleSendMessage(`Còn ${daysLeft} ngày nữa là cưới, nên chốt nhà cung cấp nào trước?`)}
                    className="w-full py-2.5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors group"
                  >
                    <span>Còn {daysLeft} ngày nữa là cưới, nên chốt nhà cung cấp nào trước?</span>
                    <ArrowRight className="w-4 h-4 text-rose-500 transform group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </button>

                  <button
                    onClick={() => handleSendMessage(`Gợi ý nhà hàng tiệc cưới ở ${coupleInfo.region}`)}
                    className="w-full py-2.5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors group"
                  >
                    <span>Gợi ý nhà hàng tiệc cưới ở {coupleInfo.region}</span>
                    <ArrowRight className="w-4 h-4 text-rose-500 transform group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </button>
                </div>
              </div>

              {/* Regional Wedding Prep Section (Matching reference UI banner) */}
              <div className="bg-linear-to-br from-amber-50/40 via-white to-rose-50/40 rounded-2xl p-5 border border-stone-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-100/80 border border-rose-200 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                    🌸
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">
                      Chuẩn bị cưới theo địa phương
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                      Nhà hàng tiệc cưới theo vùng, đánh giá ở tỉnh và mức trung bình khu vực
                    </p>
                  </div>
                </div>

                {/* Province Filter Chips */}
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                  {popularProvinces.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => {
                        setCoupleInfo(prev => ({ ...prev, region: prov }));
                        handleSendMessage(`Tư vấn chi phí và nhà hàng tiệc cưới tốt nhất tại ${prov}`);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        coupleInfo.region === prov
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-700 hover:border-rose-300 hover:bg-rose-50/50'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs min-h-[280px] flex flex-col justify-between">
                <div className="space-y-4 mb-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center text-2xl mb-3">
                        💬
                      </div>
                      <h4 className="text-sm font-bold text-stone-800">
                        Chưa có tin nhắn nào
                      </h4>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                        Hãy chọn gợi ý phía trên hoặc đặt câu hỏi bất kỳ về kế hoạch cưới, lễ vật, nhà hàng, thiệp mời để Hoa giải đáp ngay!
                      </p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender === 'hoa' && (
                          <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-sm shrink-0">
                            🌸
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-rose-600 text-white rounded-tr-none'
                              : 'bg-stone-50 border border-stone-200 text-stone-800 rounded-tl-none whitespace-pre-line'
                          }`}
                        >
                          <div>{msg.content}</div>
                          {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-stone-200/60 flex flex-wrap gap-1.5">
                              {msg.actionSuggestions.map((sug, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleSendMessage(sug)}
                                  className="text-[11px] font-semibold text-rose-700 bg-white hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                                >
                                  {sug}
                                </button>
                              ))}
                            </div>
                          )}
                          <div
                            className={`text-[10px] mt-1.5 text-right ${
                              msg.sender === 'user' ? 'text-rose-200' : 'text-stone-400'
                            }`}
                          >
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {isTyping && (
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-sm shrink-0">
                        🌸
                      </div>
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-stone-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse delay-75"></span>
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse delay-150"></span>
                        <span>Hoa đang soạn câu trả lời...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Bottom Input Area */}
                <div className="pt-3 border-t border-stone-100">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Hỏi bất cứ điều gì về chuẩn bị cưới..."
                      className="w-full bg-stone-50 hover:bg-stone-100/60 focus:bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-full pl-4 pr-12 py-3 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-1.5 w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-2xs"
                      title="Gửi câu hỏi"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Profile, Memory, Suggestions, History (Exact screenshot layout) */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              {/* Card 1: Về anh chị (Profile Card) */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900">
                    Về anh chị
                  </h3>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 transition-colors"
                  >
                    Sửa
                  </button>
                </div>

                <p className="text-xs text-stone-500">
                  Hoa dùng thông tin này để trả lời sát hơn
                </p>

                {/* Budget CTA Callout */}
                <div
                  onClick={() => setIsEditProfileOpen(true)}
                  className="p-3.5 bg-rose-50/70 hover:bg-rose-50 rounded-xl border border-rose-100/90 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                        Cho Hoa biết ngân sách
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Hoa sẽ gợi ý vừa với ngân sách của anh chị
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </div>

                {/* Details List */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" /> Ngày cưới
                    </span>
                    <span className="font-semibold text-stone-800">
                      T7, 14/11/2026 ({coupleInfo.lunarDate})
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" /> Khu vực
                    </span>
                    <span className="font-semibold text-stone-800">
                      {coupleInfo.region}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-stone-400" /> Ngân sách
                    </span>
                    <span className="font-semibold text-stone-800">
                      {coupleInfo.budget}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-stone-400" /> Kiểu cưới
                    </span>
                    <span className="font-semibold text-stone-800">
                      {coupleInfo.style}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-stone-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-400" /> Tiến độ
                    </span>
                    <span className="font-semibold text-stone-800">
                      Đã đặt {coupleInfo.vendorsBooked}/{coupleInfo.totalVendors} nhà cung cấp
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Hoa ghi nhớ từ trò chuyện */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-stone-900">
                  Hoa ghi nhớ từ trò chuyện
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {coupleInfo.stylesPreference.length > 0
                    ? `Hoa đã ghi nhớ phong cách yêu thích của anh chị: ${coupleInfo.stylesPreference.join(', ')}.`
                    : 'Hoa chưa nhớ điều gì từ trò chuyện. Khi anh chị kể thêm (số bàn, phong cách...), Hoa sẽ ghi lại ở đây để gợi ý sát hơn.'}
                </p>

                <div
                  onClick={() => setIsStyleModalOpen(true)}
                  className="p-3 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/80 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                        Chọn phong cách
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Chọn vài phong cách anh chị thích để Hoa gợi ý sát hơn
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </div>
              </div>

              {/* Card 3: Gợi ý câu hỏi */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-2">
                <h3 className="text-sm font-bold text-stone-900 mb-2">
                  Gợi ý câu hỏi
                </h3>

                <button
                  onClick={() => handleSendMessage('Lịch hôm nay')}
                  className="w-full py-2 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-rose-600 transition-colors group"
                >
                  <span>Lịch hôm nay</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleSendMessage('Đã chi bao nhiêu rồi?')}
                  className="w-full py-2 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-rose-600 transition-colors group border-t border-stone-100"
                >
                  <span>Đã chi bao nhiêu rồi?</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleSendMessage('Còn bao nhiêu ngày?')}
                  className="w-full py-2 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-rose-600 transition-colors group border-t border-stone-100"
                >
                  <span>Còn bao nhiêu ngày?</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleSendMessage('Xem hướng dẫn chuẩn bị đám cưới toàn diện')}
                  className="w-full py-2 flex items-center justify-between text-xs font-medium text-stone-700 hover:text-rose-600 transition-colors group border-t border-stone-100"
                >
                  <span>Xem hướng dẫn</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-rose-600 transition-colors" />
                </button>
              </div>

              {/* Card 4: Lịch sử trò chuyện */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
                <div
                  onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-stone-900">
                    Lịch sử trò chuyện
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      isHistoryCollapsed ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {!isHistoryCollapsed && (
                  <>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {messages.length > 0
                        ? `Đang lưu phiên trò chuyện hiện tại (${messages.length} tin nhắn).`
                        : 'Chưa có cuộc trò chuyện nào được lưu. Cuộc trò chuyện mới sẽ được lưu tự động.'}
                    </p>

                    <button
                      onClick={handleClearHistory}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 block transition-colors"
                    >
                      Quản lý cuộc trò chuyện
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* AI STUDIO TAB */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs max-w-4xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" /> AI Wedding Studio 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
                Thử Váy, Kiểu Tóc & Trang Điểm AI
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2">
                Trải nghiệm ướm thử phong cách cưới hoàn hảo trước ngày trọng đại cùng công nghệ AI tạo hình chân thực
              </p>
            </div>

            {/* Sub-tools selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'dress', label: 'Thử Váy Cưới AI', icon: Shirt },
                { id: 'hair', label: 'Thử Kiểu Tóc AI', icon: Scissors },
                { id: 'makeup', label: 'Tone Make-up AI', icon: Palette },
                { id: 'photo', label: 'Ảnh Cưới Nghệ Thuật', icon: Camera }
              ].map((tool) => {
                const Icon = tool.icon;
                const isSelected = aiStudioTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setAiStudioTool(tool.id as any);
                      setAiGeneratedResult(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 text-rose-700 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-rose-600' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold">{tool.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Config & Generator panel */}
            <div className="p-5 sm:p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-5">
              {aiStudioTool === 'dress' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Chọn phom dáng váy cưới:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'princess', label: 'Công chúa bồng xòe' },
                      { id: 'mermaid', label: 'Đuôi cá quyến rũ' },
                      { id: 'a_line', label: 'Chữ A thanh lịch' },
                      { id: 'aodai', label: 'Áo dài cưới hoàng gia' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedDressStyle(s.id)}
                        className={`p-2.5 text-xs font-semibold rounded-xl border transition-all ${
                          selectedDressStyle === s.id
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStudioTool === 'hair' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Chọn kiểu tóc cô dâu:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'wavy', label: 'Uốn xoăn sóng nước lơi' },
                      { id: 'bun_high', label: 'Búi cao đính vương miện' },
                      { id: 'bun_low', label: 'Búi thấp cài hoa baby' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedHairStyle(s.id)}
                        className={`p-2.5 text-xs font-semibold rounded-xl border transition-all ${
                          selectedHairStyle === s.id
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStudioTool === 'makeup' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Chọn tone trang điểm:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'korean', label: 'Trong trẻo Hàn Quốc' },
                      { id: 'thai', label: 'Sắc sảo phong cách Thái' },
                      { id: 'peach', label: 'Cam đào ngọt ngào' },
                      { id: 'western', label: 'Tây đằm thắm sang trọng' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedMakeupTone(s.id)}
                        className={`p-2.5 text-xs font-semibold rounded-xl border transition-all ${
                          selectedMakeupTone === s.id
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStudioTool === 'photo' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Chọn bối cảnh chụp ảnh cưới:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'studio', label: 'Studio tối giản thanh lịch' },
                      { id: 'beach', label: 'Hoàng hôn biển lãng mạn' },
                      { id: 'outdoor', label: 'Sân vườn Đà Lạt mộng mơ' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        className="p-2.5 text-xs font-semibold rounded-xl border bg-white text-stone-700 border-stone-200 hover:border-rose-300"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-stone-500">
                  AI sẽ áp dụng tỷ lệ khuôn mặt và ánh sáng tự nhiên chuẩn Studio.
                </p>

                <button
                  onClick={handleGenerateAiStudio}
                  disabled={isGeneratingAi}
                  className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  {isGeneratingAi ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>AI đang kết xuất...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Xem thử diện mạo ngay</span>
                    </>
                  )}
                </button>
              </div>

              {/* Result Preview Container */}
              {aiGeneratedResult && (
                <div className="mt-5 p-4 bg-white rounded-2xl border border-stone-200 text-center animate-fade-in">
                  <span className="inline-block text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-3">
                    Kết quả thử nghiệm AI hoàn tất
                  </span>
                  <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-md aspect-3/4 bg-stone-100 relative">
                    <img
                      src={aiGeneratedResult}
                      alt="Kết quả thử váy và makeup AI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-stone-500 mt-3">
                    Anh chị có thể tải ảnh về hoặc gửi ảnh qua cho Hoa để nhận gợi ý studio may/thuê tương tự nhé!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal ("Về anh chị") */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">
                Cập nhật thông tin đám cưới
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Hoa sẽ dùng các thông tin này để tư vấn sát với thực tế ngày cưới và ngân sách của anh chị.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Khu vực tổ chức cưới:
                </label>
                <input
                  type="text"
                  value={coupleInfo.region}
                  onChange={(e) => setCoupleInfo({ ...coupleInfo, region: e.target.value })}
                  placeholder="Ví dụ: Bắc Ninh, Hà Nội, TP.HCM..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Ngân sách dự kiến:
                </label>
                <input
                  type="text"
                  value={coupleInfo.budget}
                  onChange={(e) => setCoupleInfo({ ...coupleInfo, budget: e.target.value })}
                  placeholder="Ví dụ: 150 triệu, 250 triệu..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Kiểu đám cưới mong muốn:
                </label>
                <select
                  value={coupleInfo.style}
                  onChange={(e) => setCoupleInfo({ ...coupleInfo, style: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:border-rose-500 outline-none"
                >
                  <option value="Chưa chọn">Chưa chọn</option>
                  <option value="Truyền thống ấm cúng">Truyền thống ấm cúng</option>
                  <option value="Hiện đại sang trọng">Hiện đại sang trọng</option>
                  <option value="Tối giản Hàn Quốc">Tối giản Hàn Quốc</option>
                  <option value="Sân vườn ngoài trời">Sân vườn ngoài trời</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Số lượng nhà cung cấp đã chốt (0 - 10):
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={coupleInfo.vendorsBooked}
                  onChange={(e) => setCoupleInfo({ ...coupleInfo, vendorsBooked: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setIsEditProfileOpen(false);
                  handleSendMessage('Hoa ơi, tôi vừa cập nhật thông tin đám cưới, hãy gợi ý cho tôi nhé!');
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Style Preference Modal */}
      {isStyleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">
                Chọn phong cách cưới yêu thích
              </h3>
              <button
                onClick={() => setIsStyleModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Chọn các phong cách anh chị quan tâm để Hoa cá nhân hóa các gợi ý váy cưới, sảnh tiệc và thiệp mời.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'Tối giản Hàn Quốc',
                'Truyền thống Á Đông',
                'Hoàng gia sang trọng',
                'Rustic sân vườn',
                'Vintage cổ điển',
                'Tiệc thân mật (Micro-wedding)'
              ].map((style) => {
                const isSelected = coupleInfo.stylesPreference.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => {
                      const exists = coupleInfo.stylesPreference.includes(style);
                      const updated = exists
                        ? coupleInfo.stylesPreference.filter(s => s !== style)
                        : [...coupleInfo.stylesPreference, style];
                      setCoupleInfo({ ...coupleInfo, stylesPreference: updated });
                    }}
                    className={`p-3 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50 text-rose-700'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span>{style}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsStyleModalOpen(false)}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
