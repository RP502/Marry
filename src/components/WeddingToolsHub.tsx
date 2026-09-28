import React, { useState, useRef } from 'react';
import {
  Calculator,
  CheckSquare,
  MessageSquare,
  Mic,
  Calendar,
  Image as ImageIcon,
  Users,
  Grid,
  Copy,
  Check,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign,
  Heart,
  CalendarDays,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import {
  BudgetItem,
  ChecklistTask,
  InvitationMessageTemplate,
  SpeechTemplate,
  SeatingTable,
  WeddingData,
  ViewMode,
} from '../types';
import {
  INITIAL_BUDGET_ITEMS,
  INITIAL_CHECKLIST_TASKS,
  INVITATION_MESSAGE_TEMPLATES,
  SPEECH_TEMPLATES,
  INITIAL_SEATING_TABLES,
} from '../data/weddingToolsData';

interface WeddingToolsHubProps {
  initialTab?: string;
  weddingData: WeddingData;
  onNavigate: (view: ViewMode) => void;
  lang: 'vi' | 'en';
}

type ToolTab =
  | 'budget'
  | 'checklist'
  | 'messages'
  | 'speeches'
  | 'savethedate'
  | 'compress'
  | 'seating'
  | 'lunar';

export const WeddingToolsHub: React.FC<WeddingToolsHubProps> = ({
  initialTab = 'budget',
  weddingData,
  onNavigate,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<ToolTab>(
    (initialTab as ToolTab) || 'budget'
  );

  // 1. BUDGET STATE
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
  const [budgetCategoryFilter, setBudgetCategoryFilter] = useState<string>('all');
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCategory, setNewBudgetCategory] = useState('Tiệc cưới & Địa điểm');
  const [newBudgetCost, setNewBudgetCost] = useState<number>(5000000);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  // Budget calculations
  const totalEstimated = budgetItems.reduce((acc, item) => acc + item.estimatedCost, 0);
  const totalActual = budgetItems.reduce((acc, item) => acc + item.actualCost, 0);
  const totalPaid = budgetItems
    .filter((item) => item.paid)
    .reduce((acc, item) => acc + item.actualCost, 0);
  const remainingToPay = totalActual - totalPaid;

  const formatVnd = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // 2. CHECKLIST STATE
  const [tasks, setTasks] = useState<ChecklistTask[]>(INITIAL_CHECKLIST_TASKS);
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPhase, setNewTaskPhase] = useState<ChecklistTask['phase']>('1month');

  const completedTaskCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedTaskCount / tasks.length) * 100);

  // 3. MESSAGE TEMPLATES STATE
  const [msgTarget, setMsgTarget] = useState<InvitationMessageTemplate['target']>('close_friends');
  const [customMsgCouple, setCustomMsgCouple] = useState(`${weddingData.groom.shortName} & ${weddingData.bride.shortName}`);
  const [customMsgDate, setCustomMsgDate] = useState(weddingData.mainCeremony.date);
  const [customMsgVenue, setCustomMsgVenue] = useState(weddingData.mainCeremony.venueName);
  const [customMsgUrl, setCustomMsgUrl] = useState(`${window.location.origin}/?guest=Ban`);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // 4. SPEECH TEMPLATES STATE
  const [speechCategory, setSpeechCategory] = useState<SpeechTemplate['category']>('thanh_hon');
  const [copiedSpeechId, setCopiedSpeechId] = useState<string | null>(null);

  // 5. SAVE THE DATE GENERATOR STATE
  const [stdGroom, setStdGroom] = useState(weddingData.groom.name);
  const [stdBride, setStdBride] = useState(weddingData.bride.name);
  const [stdDate, setStdDate] = useState(weddingData.mainCeremony.date);
  const [stdVenueCity, setStdVenueCity] = useState('TP. Hồ Chí Minh');
  const [stdStyle, setStdStyle] = useState<'rose' | 'gold' | 'minimal' | 'vintage'>('rose');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 6. IMAGE COMPRESSOR STATE
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressQuality, setCompressQuality] = useState<'web' | 'balanced' | 'hd'>('balanced');
  const [isCompressing, setIsCompressing] = useState(false);

  // 7. SEATING TABLES STATE
  const [tables, setTables] = useState<SeatingTable[]>(INITIAL_SEATING_TABLES);
  const [newTableName, setNewTableName] = useState('');
  const [newTableSide, setNewTableSide] = useState<SeatingTable['side']>('groom');
  const [newGuestName, setNewGuestName] = useState('');
  const [selectedTableId, setSelectedTableId] = useState<string>(INITIAL_SEATING_TABLES[0].id);

  // 8. LUNAR CONVERTER STATE
  const [solarInputDate, setSolarInputDate] = useState(weddingData.mainCeremony.date);

  // Helper for message substitution
  const formatMessage = (content: string) => {
    return content
      .replace(/\[TÊN_BẠN\]/g, weddingData.groom.shortName)
      .replace(/\[TÊN_VỢ\/CHỒNG\]/g, weddingData.bride.shortName)
      .replace(/\[TÊN_CHÚ_RỂ\]/g, weddingData.groom.name)
      .replace(/\[TÊN_CÔ_DAU\]/g, weddingData.bride.name)
      .replace(/\[TÊN_SẾP\]/g, 'Quý anh/chị')
      .replace(/\[NGÀY_CƯỚI\]/g, customMsgDate)
      .replace(/\[NGÀY_ÂM_LỊCH\]/g, weddingData.mainCeremony.lunarDate)
      .replace(/\[ĐỊA_ĐIỂM\]/g, customMsgVenue)
      .replace(/\[LINK_THIỆP\]/g, customMsgUrl);
  };

  const handleCopyMessage = (msg: InvitationMessageTemplate) => {
    const formatted = formatMessage(msg.content);
    navigator.clipboard.writeText(formatted);
    setCopiedMsgId(msg.id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleCopySpeech = (speech: SpeechTemplate) => {
    const formatted = speech.content
      .replace(/\[TÊN_ĐẠI_DIỆN\]/g, 'Nguyễn Văn Nam')
      .replace(/\[QUAN_HỆ\]/g, 'Bác họ')
      .replace(/\[TÊN_CHÚ_RỂ\]/g, weddingData.groom.name)
      .replace(/\[TÊN_CÔ_DAU\]/g, weddingData.bride.name);
    navigator.clipboard.writeText(formatted);
    setCopiedSpeechId(speech.id);
    setTimeout(() => setCopiedSpeechId(null), 2000);
  };

  // Image compressor handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      setUploadedImage(imgUrl);
      compressImageWithCanvas(imgUrl, compressQuality);
    };
    reader.readAsDataURL(file);
  };

  const compressImageWithCanvas = (
    imageSrc: string,
    qualityMode: 'web' | 'balanced' | 'hd'
  ) => {
    setIsCompressing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let maxWidth = 1200;
      let quality = 0.75;

      if (qualityMode === 'web') {
        maxWidth = 800;
        quality = 0.65;
      } else if (qualityMode === 'hd') {
        maxWidth = 1920;
        quality = 0.88;
      }

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      setCompressedImage(compressedDataUrl);

      // Approximate byte size
      const head = 'data:image/jpeg;base64,';
      const approxBytes = Math.round(((compressedDataUrl.length - head.length) * 3) / 4);
      setCompressedSize(approxBytes);
      setIsCompressing(false);
    };
  };

  // Save the date download
  const handleDownloadSaveTheDate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // Instagram 4:5 ratio
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background fill
    if (stdStyle === 'rose') {
      ctx.fillStyle = '#FFF5F5';
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.strokeStyle = '#FDA4AF';
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, 1000, 1270);
    } else if (stdStyle === 'gold') {
      ctx.fillStyle = '#FCF9F2';
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, 1000, 1270);
    } else if (stdStyle === 'minimal') {
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 1000, 1270);
    } else {
      ctx.fillStyle = '#FAF5EF';
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 10;
      ctx.strokeRect(40, 40, 1000, 1270);
    }

    // Header Text
    ctx.fillStyle = stdStyle === 'gold' ? '#92400E' : stdStyle === 'minimal' ? '#0F172A' : '#BE123C';
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('SAVE OUR DATE', 540, 240);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('CHÚNG TÔI SẮP KẾT HÔN', 540, 310);

    // Couple Names
    ctx.fillStyle = '#1C1917';
    ctx.font = 'italic bold 76px serif';
    ctx.fillText(`${stdGroom}`, 540, 520);
    ctx.font = 'italic 50px serif';
    ctx.fillStyle = '#E11D48';
    ctx.fillText('&', 540, 600);
    ctx.fillStyle = '#1C1917';
    ctx.font = 'italic bold 76px serif';
    ctx.fillText(`${stdBride}`, 540, 690);

    // Date
    ctx.fillStyle = stdStyle === 'gold' ? '#B45309' : '#E11D48';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText(stdDate, 540, 890);

    // Venue & City
    ctx.fillStyle = '#475569';
    ctx.font = '32px sans-serif';
    ctx.fillText(stdVenueCity, 540, 970);
    ctx.fillText('Thân mời bạn cùng đón chờ ngày chung đôi!', 540, 1030);

    // Footer signature
    ctx.font = '22px sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Thiệp cưới online tạo bởi Chung Đôi (chungdoi.com)', 540, 1220);

    // Download image
    const link = document.createElement('a');
    link.download = `Save_The_Date_${stdGroom}_${stdBride}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const navTools = [
    { id: 'budget', label: 'Dự trù chi phí cưới', icon: <Calculator className="w-4 h-4" /> },
    { id: 'checklist', label: 'Checklist 12 tuần', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'messages', label: 'Tin nhắn mời cưới', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'speeches', label: 'Bài phát biểu cưới', icon: <Mic className="w-4 h-4" /> },
    { id: 'savethedate', label: 'Tạo ảnh Save The Date', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'compress', label: 'Nén dung lượng ảnh', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'seating', label: 'Sơ đồ xếp bàn tiệc', icon: <Grid className="w-4 h-4" /> },
    { id: 'lunar', label: 'Đổi ngày âm - dương', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Trung Tâm Công Cụ Cưới Chung Đôi
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-3">
            Trọn Bộ Công Cụ &amp; Tiện Ích Chuẩn Bị Đám Cưới
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-body">
            Giải phóng áp lực chuẩn bị hôn lễ với bộ công cụ số hoá thông minh: tính toán ngân sách,
            lập kế hoạch 12 tuần, tạo ảnh báo hỷ, soạn tin nhắn Zalo và xếp bàn tiệc chu đáo.
          </p>
        </div>

        {/* Tools Switcher Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-stone-200/70 rounded-2xl mb-8 max-w-5xl mx-auto">
          {navTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id as ToolTab)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                activeTab === tool.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>

        {/* 1. BUDGET TAB (DỰ TRÙ CHI PHÍ CƯỚI) */}
        {activeTab === 'budget' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Stat Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
                <span className="text-xs font-bold text-stone-500 uppercase">Dự toán ban đầu</span>
                <div className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-2">
                  {formatVnd(totalEstimated)}
                </div>
                <span className="text-[11px] text-stone-400">Ngân sách dự kiến</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs bg-linear-to-br from-white to-rose-50/40">
                <span className="text-xs font-bold text-rose-600 uppercase">Chi phí thực tế</span>
                <div className="text-xl sm:text-2xl font-bold text-rose-600 font-display mt-2">
                  {formatVnd(totalActual)}
                </div>
                <span className="text-[11px] text-rose-500">
                  {totalActual <= totalEstimated ? '✓ Đang trong tầm kiểm soát' : '⚠️ Vượt dự tính'}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs">
                <span className="text-xs font-bold text-emerald-600 uppercase">Đã thanh toán / Cọc</span>
                <div className="text-xl sm:text-2xl font-bold text-emerald-600 font-display mt-2">
                  {formatVnd(totalPaid)}
                </div>
                <span className="text-[11px] text-stone-400">Đã giải ngân</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
                <span className="text-xs font-bold text-amber-600 uppercase">Còn lại cần chi</span>
                <div className="text-xl sm:text-2xl font-bold text-amber-600 font-display mt-2">
                  {formatVnd(remainingToPay)}
                </div>
                <span className="text-[11px] text-stone-400">Cần trả ngày cưới</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-stone-400" />
                <select
                  value={budgetCategoryFilter}
                  onChange={(e) => setBudgetCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-stone-300 rounded-xl bg-white"
                >
                  <option value="all">Tất cả hạng mục ({budgetItems.length})</option>
                  <option value="Tiệc cưới & Địa điểm">Tiệc cưới &amp; Địa điểm</option>
                  <option value="Trang phục & Trang điểm">Trang phục &amp; Trang điểm</option>
                  <option value="Ảnh cưới & Phim phóng sự">Ảnh cưới &amp; Phim</option>
                  <option value="Lễ nghi & Lễ vật">Lễ nghi &amp; Lễ vật</option>
                  <option value="Nhẫn cưới & Trang sức">Nhẫn cưới &amp; Trang sức</option>
                  <option value="Thiệp mời & Quà cảm ơn">Thiệp mời &amp; Quà</option>
                  <option value="Xe hoa & Vận chuyển">Xe hoa &amp; Vận chuyển</option>
                  <option value="Quỹ dự phòng phát sinh">Quỹ dự phòng</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddBudgetModal(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm khoản chi mới</span>
              </button>
            </div>

            {/* Budget Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      <th className="py-3.5 px-6">Tên Hạng Mục Chi</th>
                      <th className="py-3.5 px-4">Nhóm</th>
                      <th className="py-3.5 px-4">Dự Tính</th>
                      <th className="py-3.5 px-4">Thực Tế</th>
                      <th className="py-3.5 px-4">Trạng Thái</th>
                      <th className="py-3.5 px-4">Ghi Chú</th>
                      <th className="py-3.5 px-4 text-right">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                    {budgetItems
                      .filter(
                        (item) =>
                          budgetCategoryFilter === 'all' ||
                          item.category === budgetCategoryFilter
                      )
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/80">
                          <td className="py-3.5 px-6 font-semibold text-stone-900">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px] font-medium">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">{formatVnd(item.estimatedCost)}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-rose-600">
                            {formatVnd(item.actualCost)}
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => {
                                setBudgetItems((prev) =>
                                  prev.map((b) =>
                                    b.id === item.id ? { ...b, paid: !b.paid } : b
                                  )
                                );
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                                item.paid
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : 'bg-amber-50 text-amber-700 border-amber-300'
                              }`}
                            >
                              {item.paid ? '✓ Đã thanh toán' : 'Chưa thanh toán'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-stone-500 max-w-xs truncate">
                            {item.notes || '-'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() =>
                                setBudgetItems((prev) => prev.filter((b) => b.id !== item.id))
                              }
                              className="text-stone-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Budget Modal */}
            {showAddBudgetModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
                  <h3 className="text-lg font-bold text-stone-900 font-display mb-3">
                    Thêm Khoản Chi Tiêu Mới
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tên khoản chi
                      </label>
                      <input
                        type="text"
                        value={newBudgetName}
                        onChange={(e) => setNewBudgetName(e.target.value)}
                        placeholder="Ví dụ: Thuê hoa tươi trang trí xe hoa"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nhóm hạng mục
                      </label>
                      <select
                        value={newBudgetCategory}
                        onChange={(e) => setNewBudgetCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white"
                      >
                        <option value="Tiệc cưới & Địa điểm">Tiệc cưới &amp; Địa điểm</option>
                        <option value="Trang phục & Trang điểm">Trang phục &amp; Trang điểm</option>
                        <option value="Ảnh cưới & Phim phóng sự">Ảnh cưới &amp; Phim</option>
                        <option value="Lễ nghi & Lễ vật">Lễ nghi &amp; Lễ vật</option>
                        <option value="Nhẫn cưới & Trang sức">Nhẫn cưới &amp; Trang sức</option>
                        <option value="Thiệp mời & Quà cảm ơn">Thiệp mời &amp; Quà</option>
                        <option value="Xe hoa & Vận chuyển">Xe hoa &amp; Vận chuyển</option>
                        <option value="Quỹ dự phòng phát sinh">Quỹ dự phòng</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Số tiền (VNĐ)
                      </label>
                      <input
                        type="number"
                        step={500000}
                        value={newBudgetCost}
                        onChange={(e) => setNewBudgetCost(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        onClick={() => setShowAddBudgetModal(false)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => {
                          if (!newBudgetName.trim()) return;
                          setBudgetItems((prev) => [
                            ...prev,
                            {
                              id: `b-${Date.now()}`,
                              category: newBudgetCategory,
                              name: newBudgetName.trim(),
                              estimatedCost: newBudgetCost,
                              actualCost: newBudgetCost,
                              paid: false,
                            },
                          ]);
                          setNewBudgetName('');
                          setShowAddBudgetModal(false);
                        }}
                        className="px-5 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-xs"
                      >
                        Thêm ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. CHECKLIST 12 TUẦN TAB */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Progress Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-stone-900">
                    Tiến Độ Chuẩn Bị Đám Cưới
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Đã hoàn thành {completedTaskCount}/{tasks.length} đầu việc quan trọng.
                  </p>
                </div>
                <div className="text-2xl font-bold text-rose-600 font-display">
                  {progressPercent}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-rose-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Quick Phase Filter */}
              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => setPhaseFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    phaseFilter === 'all'
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Tất cả giai đoạn
                </button>
                <button
                  onClick={() => setPhaseFilter('6months')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    phaseFilter === '6months'
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Trước 6 tháng
                </button>
                <button
                  onClick={() => setPhaseFilter('3months')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    phaseFilter === '3months'
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Trước 3 tháng
                </button>
                <button
                  onClick={() => setPhaseFilter('1month')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    phaseFilter === '1month'
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Trước 1 tháng
                </button>
                <button
                  onClick={() => setPhaseFilter('2weeks')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    phaseFilter === '2weeks'
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Trước 2 tuần
                </button>
                <button
                  onClick={() => setPhaseFilter('weddingDay')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    phaseFilter === 'weddingDay'
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Ngày hôn lễ
                </button>
              </div>
            </div>

            {/* Task list */}
            <div className="space-y-3">
              {tasks
                .filter((t) => phaseFilter === 'all' || t.phase === phaseFilter)
                .map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      setTasks((prev) =>
                        prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
                      );
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                      task.completed
                        ? 'bg-white/80 border-stone-200 opacity-75'
                        : 'bg-white border-stone-200 hover:border-rose-300 shadow-xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}} // handled by parent div click
                      className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-bold ${
                            task.completed ? 'line-through text-stone-400' : 'text-stone-900'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                          {task.phaseLabel}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{task.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3. INVITATION MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Context Inputs */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-3">
                Cá nhân hóa lời mời cho cặp đôi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-600 mb-1">
                    Ngày cưới chính thức
                  </label>
                  <input
                    type="text"
                    value={customMsgDate}
                    onChange={(e) => setCustomMsgDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-600 mb-1">
                    Tên nhà hàng / Sảnh tiệc
                  </label>
                  <input
                    type="text"
                    value={customMsgVenue}
                    onChange={(e) => setCustomMsgVenue(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-600 mb-1">
                    Link thiệp cưới online
                  </label>
                  <input
                    type="text"
                    value={customMsgUrl}
                    onChange={(e) => setCustomMsgUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INVITATION_MESSAGE_TEMPLATES.map((tmpl) => {
                const formatted = formatMessage(tmpl.content);
                const isCopied = copiedMsgId === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase">
                          {tmpl.targetLabel}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">
                          Chuẩn Zalo / SMS
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900 mb-3">{tmpl.title}</h4>
                      <div className="bg-[#FAF8F5] p-4 rounded-2xl text-xs text-stone-700 whitespace-pre-line font-body leading-relaxed border border-stone-200/60 select-all">
                        {formatted}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex justify-end">
                      <button
                        onClick={() => handleCopyMessage(tmpl)}
                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã sao chép tin nhắn!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép gửi Zalo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. SPEECHES TAB (BÀI PHÁT BIỂU ĐÁM CƯỚI) */}
        {activeTab === 'speeches' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex gap-2 border-b border-stone-200 pb-2">
              <button
                onClick={() => setSpeechCategory('thanh_hon')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  speechCategory === 'thanh_hon'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-stone-600 border'
                }`}
              >
                Lễ Thành Hôn (Tiệc cưới)
              </button>
              <button
                onClick={() => setSpeechCategory('an_hoi')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  speechCategory === 'an_hoi'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-stone-600 border'
                }`}
              >
                Lễ Ăn Hỏi (Tráp sính lễ)
              </button>
              <button
                onClick={() => setSpeechCategory('cam_on')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  speechCategory === 'cam_on'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-stone-600 border'
                }`}
              >
                Lời cảm ơn của Cô Dâu &amp; Chú Rể
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {SPEECH_TEMPLATES.filter((s) => s.category === speechCategory).map((speech) => (
                <div
                  key={speech.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                        {speech.speakerLabel}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-stone-900 mt-1">
                        {speech.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopySpeech(speech)}
                      className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
                    >
                      {copiedSpeechId === speech.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép bài đọc</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200/80 text-sm text-stone-800 whitespace-pre-line leading-relaxed font-body">
                    {speech.content
                      .replace(/\[TÊN_ĐẠI_DIỆN\]/g, 'Nguyễn Văn Nam')
                      .replace(/\[QUAN_HỆ\]/g, 'Bác họ')
                      .replace(/\[TÊN_CHÚ_RỂ\]/g, weddingData.groom.name)
                      .replace(/\[TÊN_CÔ_DAU\]/g, weddingData.bride.name)}
                  </div>

                  {speech.tips && speech.tips.length > 0 && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/70">
                      <span className="text-xs font-bold text-amber-800 uppercase block mb-1">
                        💡 Lưu ý khi phát biểu trước hôn trường:
                      </span>
                      <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
                        {speech.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SAVE THE DATE GENERATOR TAB */}
        {activeTab === 'savethedate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Options */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-stone-900 font-display">
                Thiết Kế Ảnh Báo Hỷ (Save The Date)
              </h3>
              <p className="text-xs text-stone-500">
                Tạo thiệp ảnh báo hỷ sắc nét 4:5 để đăng Story Zalo, Facebook, Instagram nhắc nhở bạn bè để dành lịch trước ngày cưới.
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tên Chú Rể</label>
                <input
                  type="text"
                  value={stdGroom}
                  onChange={(e) => setStdGroom(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tên Cô Dâu</label>
                <input
                  type="text"
                  value={stdBride}
                  onChange={(e) => setStdBride(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ngày Hôn Lễ</label>
                <input
                  type="text"
                  value={stdDate}
                  onChange={(e) => setStdDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tỉnh / Thành Phố</label>
                <input
                  type="text"
                  value={stdVenueCity}
                  onChange={(e) => setStdVenueCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phong cách thiết kế
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStdStyle('rose')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold ${
                      stdStyle === 'rose'
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-stone-200'
                    }`}
                  >
                    🌸 Hồng Lãng Mạn
                  </button>
                  <button
                    onClick={() => setStdStyle('gold')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold ${
                      stdStyle === 'gold'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-stone-200'
                    }`}
                  >
                    ✨ Vàng Hoàng Gia
                  </button>
                  <button
                    onClick={() => setStdStyle('minimal')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold ${
                      stdStyle === 'minimal'
                        ? 'border-slate-800 bg-slate-100 text-slate-900'
                        : 'border-stone-200'
                    }`}
                  >
                    🖤 Tối Giản Hiện Đại
                  </button>
                  <button
                    onClick={() => setStdStyle('vintage')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold ${
                      stdStyle === 'vintage'
                        ? 'border-amber-800 bg-amber-50 text-amber-900'
                        : 'border-stone-200'
                    }`}
                  >
                    📜 Vintage Cổ Điển
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleDownloadSaveTheDate}
                  className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-200 flex items-center justify-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải ảnh Báo Hỷ sắc nét (PNG)</span>
                </button>
              </div>
            </div>

            {/* Right Live Preview Frame */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                className={`w-[360px] sm:w-[420px] aspect-4/5 rounded-3xl p-8 border-8 flex flex-col justify-between text-center shadow-2xl transition-all duration-300 ${
                  stdStyle === 'rose'
                    ? 'bg-[#FFF5F5] border-rose-300 text-stone-800'
                    : stdStyle === 'gold'
                    ? 'bg-[#FCF9F2] border-amber-400 text-stone-900'
                    : stdStyle === 'minimal'
                    ? 'bg-slate-50 border-slate-800 text-slate-900'
                    : 'bg-[#FAF5EF] border-amber-800 text-amber-950'
                }`}
              >
                <div>
                  <span className="text-xs tracking-widest font-bold uppercase block text-stone-500">
                    SAVE OUR DATE
                  </span>
                  <p className="text-[11px] uppercase tracking-wider text-rose-600 font-semibold mt-1">
                    Chúng tôi sắp kết hôn
                  </p>
                </div>

                <div className="my-auto space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-display italic font-bold text-stone-900">
                    {stdGroom}
                  </h2>
                  <span className="text-2xl text-rose-500 font-display italic">&amp;</span>
                  <h2 className="text-3xl sm:text-4xl font-display italic font-bold text-stone-900">
                    {stdBride}
                  </h2>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-bold tracking-tight text-rose-600 font-display">
                    {stdDate}
                  </div>
                  <div className="text-xs text-stone-600 font-medium">{stdVenueCity}</div>
                  <div className="text-[10px] text-stone-400 pt-2 font-mono">
                    chungdoi.com/vi &bull; Thiệp cưới online
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. IMAGE COMPRESSOR TAB */}
        {activeTab === 'compress' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold font-display text-stone-900">
                Nén Dung Lượng Ảnh Cưới Trực Tuyến
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Giảm dung lượng ảnh cưới chụp từ máy ảnh (5MB - 15MB) xuống còn ~200KB - 500KB mà vẫn
                giữ nguyên độ nét sắc sảo, giúp trang thiệp cưới tải nhanh tức thì ngay cả trên 4G.
              </p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-stone-300 hover:border-rose-400 rounded-3xl p-8 text-center transition-colors bg-[#FAF8F5]">
              <input
                type="file"
                accept="image/*"
                id="photo-compress-input"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="photo-compress-input"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-stone-900">
                  Nhấp để tải ảnh cưới lên nén
                </span>
                <span className="text-xs text-stone-400 mt-1">
                  Hỗ trợ JPG, PNG, WEBP (Bảo mật 100% xử lý ngay trên trình duyệt của bạn)
                </span>
              </label>
            </div>

            {uploadedImage && (
              <div className="space-y-6 pt-4 border-t border-stone-200">
                {/* Mode Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">Mức độ nén tối ưu:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCompressQuality('web');
                        compressImageWithCanvas(uploadedImage, 'web');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        compressQuality === 'web'
                          ? 'bg-rose-500 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Web siêu nhẹ (800px)
                    </button>
                    <button
                      onClick={() => {
                        setCompressQuality('balanced');
                        compressImageWithCanvas(uploadedImage, 'balanced');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        compressQuality === 'balanced'
                          ? 'bg-rose-500 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Cân bằng chuẩn (1200px)
                    </button>
                    <button
                      onClick={() => {
                        setCompressQuality('hd');
                        compressImageWithCanvas(uploadedImage, 'hd');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        compressQuality === 'hd'
                          ? 'bg-rose-500 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Sắc nét Full HD (1920px)
                    </button>
                  </div>
                </div>

                {/* Comparison Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
                    <span className="text-xs text-stone-500 block mb-2 font-semibold">
                      Ảnh Gốc Trước Khi Nén
                    </span>
                    <div className="h-48 rounded-xl overflow-hidden bg-stone-200 mb-2">
                      <img src={uploadedImage} alt="Original" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-stone-700 font-mono">
                      {(originalSize / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>

                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-700 block mb-2 font-semibold">
                      Ảnh Sau Khi Tối Ưu
                    </span>
                    <div className="h-48 rounded-xl overflow-hidden bg-stone-200 mb-2">
                      {compressedImage && (
                        <img
                          src={compressedImage}
                          alt="Compressed"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm font-bold text-emerald-700 font-mono">
                        {(compressedSize / 1024).toFixed(0)} KB
                      </span>
                      {originalSize > 0 && compressedSize > 0 && (
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          Giảm {Math.round((1 - compressedSize / originalSize) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                {compressedImage && (
                  <div className="flex justify-center pt-2">
                    <a
                      href={compressedImage}
                      download="ChungDoi_Compressed_Photo.jpg"
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-200 flex items-center space-x-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Tải ảnh đã nén về máy</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 7. SEATING CHART TAB */}
        {activeTab === 'seating' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Bar */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  Sơ Đồ Xếp Bàn Tiệc Cưới (Seating Chart)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Quản lý vị trí bàn tiệc nhà trai, nhà gái, họ hàng, bạn bè để tiếp đón chu đáo nhất.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-stone-600">
                  Tổng {tables.length} bàn tiệc ({tables.reduce((acc, t) => acc + t.capacity, 0)} chỗ)
                </span>
                <button
                  onClick={() => {
                    const newTable: SeatingTable = {
                      id: `tbl-${Date.now()}`,
                      name: `Bàn 0${tables.length + 1}: Bạn bè`,
                      side: 'mutual',
                      capacity: 10,
                      assignedGuests: [],
                      notes: 'Bàn tiệc mới',
                    };
                    setTables([...tables, newTable]);
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  + Thêm bàn mới
                </button>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map((tbl) => (
                <div
                  key={tbl.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          tbl.side === 'vip'
                            ? 'bg-amber-100 text-amber-800'
                            : tbl.side === 'groom'
                            ? 'bg-blue-100 text-blue-800'
                            : tbl.side === 'bride'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {tbl.side === 'vip'
                          ? 'Bàn Danh Dự'
                          : tbl.side === 'groom'
                          ? 'Nhà Trai'
                          : tbl.side === 'bride'
                          ? 'Nhà Gái'
                          : 'Bàn Chung'}
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-600">
                        {tbl.assignedGuests.length}/{tbl.capacity} khách
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-stone-900 mb-1">{tbl.name}</h4>
                    <p className="text-[11px] text-stone-400 mb-4">{tbl.notes}</p>

                    {/* Guests inside table */}
                    <div className="space-y-1.5 min-h-[100px] bg-stone-50 p-3 rounded-2xl border border-stone-200/60">
                      {tbl.assignedGuests.length === 0 ? (
                        <div className="text-center text-[11px] text-stone-400 py-6">
                          Chưa có khách nào được xếp vào bàn này.
                        </div>
                      ) : (
                        tbl.assignedGuests.map((g, idx) => (
                          <div
                            key={idx}
                            className="bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-800 flex items-center justify-between"
                          >
                            <span>{g}</span>
                            <button
                              onClick={() => {
                                const updated = tbl.assignedGuests.filter((_, i) => i !== idx);
                                setTables(
                                  tables.map((t) =>
                                    t.id === tbl.id ? { ...t, assignedGuests: updated } : t
                                  )
                                );
                              }}
                              className="text-stone-300 hover:text-rose-500"
                            >
                              &times;
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add guest input */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex gap-2">
                    <input
                      type="text"
                      placeholder="Thêm tên khách..."
                      id={`guest-input-${tbl.id}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = (e.target as HTMLInputElement).value.trim();
                          if (val && tbl.assignedGuests.length < tbl.capacity) {
                            setTables(
                              tables.map((t) =>
                                t.id === tbl.id
                                  ? { ...t, assignedGuests: [...t.assignedGuests, val] }
                                  : t
                              )
                            );
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                      className="w-full px-2.5 py-1 text-xs border border-stone-300 rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById(
                          `guest-input-${tbl.id}`
                        ) as HTMLInputElement;
                        if (input && input.value.trim() && tbl.assignedGuests.length < tbl.capacity) {
                          setTables(
                            tables.map((t) =>
                              t.id === tbl.id
                                ? { ...t, assignedGuests: [...t.assignedGuests, input.value.trim()] }
                                : t
                            )
                          );
                          input.value = '';
                        }
                      }}
                      className="px-3 py-1 bg-stone-800 text-white rounded-lg text-xs font-semibold"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. LUNAR CONVERTER TAB */}
        {activeTab === 'lunar' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6 animate-fadeIn">
            <div className="text-center">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase">
                Phong Tục Cưới Hỏi Truyền Thống
              </span>
              <h3 className="text-2xl font-bold font-display text-stone-900 mt-2">
                Tra Cứu &amp; Đổi Lịch Âm - Dương Cưới Hỏi
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Xem ngày lành tháng tốt, giờ hoàng đạo rước dâu và thông tin Can Chi chính xác để in lên thiệp cưới.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200/80 space-y-4">
              <label className="block text-xs font-semibold text-stone-700">
                Chọn ngày dương lịch dự kiến tổ chức:
              </label>
              <input
                type="date"
                value={solarInputDate}
                onChange={(e) => setSolarInputDate(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-stone-300 rounded-xl bg-white focus:border-rose-500 focus:outline-hidden font-mono"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-400 block uppercase">
                    Ngày Dương Lịch
                  </span>
                  <div className="text-xl font-bold text-stone-900 font-display mt-1">
                    {solarInputDate}
                  </div>
                  <span className="text-xs text-stone-500">Chủ Nhật (Mùa cưới đẹp)</span>
                </div>

                <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 shadow-xs">
                  <span className="text-[11px] font-bold text-rose-500 block uppercase">
                    Ngày Âm Lịch Tương Ứng
                  </span>
                  <div className="text-xl font-bold text-rose-700 font-display mt-1">
                    Ngày 08 Tháng 09 (Năm Bính Ngọ)
                  </div>
                  <span className="text-xs text-rose-600 font-semibold">
                    ✓ Ngày Hoàng Đạo (Kim Đường Hoàng Đạo)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
              <span className="font-bold text-amber-800 uppercase block">
                ✨ Giờ Hoàng Đạo xuất phát rước dâu gợi ý:
              </span>
              <p>• <strong>Giờ Mão (05h - 07h)</strong>: Giờ sinh khí hưng vượng, thích hợp xuất hành rước dâu từ sớm.</p>
              <p>• <strong>Giờ Tỵ (09h - 11h)</strong>: Thời điểm hoàn hảo làm lễ gia tiên và trao hoa cưới.</p>
              <p>• <strong>Giờ Mùi (13h - 15h) &amp; Dậu (17h - 19h)</strong>: Giờ hoàng kim khai tiệc đón khách tại nhà hàng.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
