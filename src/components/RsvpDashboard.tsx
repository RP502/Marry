import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  Phone,
  Utensils,
  Share2,
} from 'lucide-react';
import { Guest, WeddingData } from '../types';

interface RsvpDashboardProps {
  guests: Guest[];
  weddingData: WeddingData;
  onAddGuest: (guest: Omit<Guest, 'id' | 'createdAt'>) => void;
  onUpdateGuestStatus: (
    guestId: string,
    status: 'attending' | 'not_attending' | 'tentative' | 'pending'
  ) => void;
  onDeleteGuest: (guestId: string) => void;
  onToggleSent: (guestId: string) => void;
}

export const RsvpDashboard: React.FC<RsvpDashboardProps> = ({
  guests,
  weddingData,
  onAddGuest,
  onUpdateGuestStatus,
  onDeleteGuest,
  onToggleSent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSide, setFilterSide] = useState<'all' | 'groom' | 'bride'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New guest form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSide, setNewSide] = useState<'groom' | 'bride' | 'mutual'>('groom');
  const [newCount, setNewCount] = useState(1);
  const [newStatus, setNewStatus] = useState<'attending' | 'not_attending' | 'tentative' | 'pending'>('pending');
  const [newDiet, setNewDiet] = useState('');

  // Calculations
  const totalGuests = guests.length;
  const attendingGuests = guests.filter((g) => g.attendingStatus === 'attending');
  const totalHeadcount = attendingGuests.reduce((sum, g) => sum + (g.guestCount || 1), 0);
  const estimatedTables = Math.ceil(totalHeadcount / 10);
  const notAttendingCount = guests.filter((g) => g.attendingStatus === 'not_attending').length;
  const tentativeCount = guests.filter((g) => g.attendingStatus === 'tentative').length;
  const pendingCount = guests.filter((g) => g.attendingStatus === 'pending').length;

  // Filtered guest list
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.phone && g.phone.includes(searchTerm));
    const matchesSide = filterSide === 'all' || g.side === filterSide;
    const matchesStatus = filterStatus === 'all' || g.attendingStatus === filterStatus;
    return matchesSearch && matchesSide && matchesStatus;
  });

  const handleCopyLink = (guest: Guest) => {
    const link = `${window.location.origin}/?guest=${encodeURIComponent(guest.name)}`;
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Tên khách', 'Số điện thoại', 'Phía gia đình', 'Trạng thái', 'Số lượng người', 'Ghi chú món ăn', 'Lời chúc'];
    const rows = guests.map((g) => [
      `"${g.name}"`,
      `"${g.phone || ''}"`,
      `"${g.side === 'groom' ? 'Nhà trai' : g.side === 'bride' ? 'Nhà gái' : 'Chung'}"`,
      `"${g.attendingStatus}"`,
      g.guestCount,
      `"${g.dietaryNotes || ''}"`,
      `"${g.wishes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Danh_sach_khach_moi_${weddingData.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNewGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddGuest({
      name: newName.trim(),
      phone: newPhone.trim(),
      side: newSide,
      attendingStatus: newStatus,
      guestCount: newStatus === 'attending' ? Number(newCount) : 0,
      dietaryNotes: newDiet.trim(),
    });

    setNewName('');
    setNewPhone('');
    setNewDiet('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Quản Lý Khách Mời &amp; Xác Nhận RSVP
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Theo dõi số lượng khách xác nhận tham dự theo thời gian thực để chuẩn bị bàn tiệc chu đáo nhất.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCsv}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-stone-500" />
              <span>Xuất file Excel/CSV</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs shadow-rose-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm khách mời mới</span>
            </button>
          </div>
        </div>

        {/* 1. TOP STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase">Tổng danh sách</span>
              <Users className="w-5 h-5 text-stone-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-display mt-2">
              {totalGuests}
            </div>
            <span className="text-[11px] text-stone-400">thiệp đã khởi tạo</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-xs bg-linear-to-br from-white to-rose-50/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 uppercase">Xác nhận tham gia</span>
              <CheckCircle2 className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-600 font-display mt-2">
              {attendingGuests.length}{' '}
              <span className="text-sm font-normal text-stone-600">
                ({totalHeadcount} người)
              </span>
            </div>
            <span className="text-[11px] text-rose-500 font-medium">
              Ước tính khoảng ~{estimatedTables} bàn tiệc
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 uppercase">Chưa chắc chắn</span>
              <HelpCircle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-600 font-display mt-2">
              {tentativeCount}
            </div>
            <span className="text-[11px] text-stone-400">cần liên hệ lại</span>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase">Báo vắng mặt</span>
              <XCircle className="w-5 h-5 text-stone-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-stone-600 font-display mt-2">
              {notAttendingCount}
            </div>
            <span className="text-[11px] text-stone-400">gửi lời chúc từ xa</span>
          </div>
        </div>

        {/* 2. FILTER & SEARCH BAR */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc SĐT..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Side filter */}
            <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFilterSide('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterSide === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                }`}
              >
                Tất cả phía
              </button>
              <button
                onClick={() => setFilterSide('groom')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterSide === 'groom' ? 'bg-white text-rose-600 shadow-xs font-semibold' : 'text-stone-600'
                }`}
              >
                Nhà trai
              </button>
              <button
                onClick={() => setFilterSide('bride')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterSide === 'bride' ? 'bg-white text-rose-600 shadow-xs font-semibold' : 'text-stone-600'
                }`}
              >
                Nhà gái
              </button>
            </div>

            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:border-rose-500 focus:outline-hidden"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="attending">Có tham dự 🎉</option>
              <option value="tentative">Chưa chắc chắn 🤔</option>
              <option value="not_attending">Vắng mặt 💌</option>
              <option value="pending">Chưa trả lời ⏳</option>
            </select>
          </div>
        </div>

        {/* 3. GUEST TABLE */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Tên Khách Mời</th>
                  <th className="py-3.5 px-4">Phía</th>
                  <th className="py-3.5 px-4">Trạng Thái RSVP</th>
                  <th className="py-3.5 px-4">Số Lượng</th>
                  <th className="py-3.5 px-4">Ghi Chú &amp; Lời Chúc</th>
                  <th className="py-3.5 px-4">Đã Gửi Thiệp</th>
                  <th className="py-3.5 px-4 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      Không tìm thấy khách mời nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-stone-900">{guest.name}</div>
                        {guest.phone && (
                          <div className="text-[11px] text-stone-400 flex items-center space-x-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            <span>{guest.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            guest.side === 'groom'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {guest.side === 'groom' ? 'Nhà trai' : 'Nhà gái'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={guest.attendingStatus}
                          onChange={(e) =>
                            onUpdateGuestStatus(
                              guest.id,
                              e.target.value as 'attending' | 'not_attending' | 'tentative' | 'pending'
                            )
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                            guest.attendingStatus === 'attending'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : guest.attendingStatus === 'tentative'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : guest.attendingStatus === 'not_attending'
                              ? 'bg-stone-100 text-stone-600 border-stone-300'
                              : 'bg-stone-50 text-stone-400 border-stone-200'
                          }`}
                        >
                          <option value="attending">Có tham dự</option>
                          <option value="tentative">Chưa chắc</option>
                          <option value="not_attending">Vắng mặt</option>
                          <option value="pending">Chưa gửi phản hồi</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 font-bold text-stone-900">
                        {guest.attendingStatus === 'attending' ? `${guest.guestCount} người` : '0'}
                      </td>
                      <td className="py-4 px-4 max-w-xs truncate">
                        {guest.dietaryNotes && (
                          <div className="text-[11px] text-amber-700 flex items-center space-x-1 mb-0.5">
                            <Utensils className="w-3 h-3 shrink-0" />
                            <span>{guest.dietaryNotes}</span>
                          </div>
                        )}
                        {guest.wishes ? (
                          <span className="text-[11px] text-stone-500 italic">
                            "{guest.wishes}"
                          </span>
                        ) : (
                          <span className="text-stone-300">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => onToggleSent(guest.id)}
                          className={`px-2 py-1 rounded text-[10px] font-semibold border ${
                            guest.sent
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-stone-100 text-stone-500 border-stone-200'
                          }`}
                        >
                          {guest.sent ? '✓ Đã gửi thiệp' : 'Chưa gửi'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleCopyLink(guest)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-stone-100"
                            title="Sao chép link thiệp có tên khách này"
                          >
                            {copiedId === guest.id ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => onDeleteGuest(guest.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-stone-100"
                            title="Xóa khách này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD GUEST MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
            <h3 className="text-lg font-bold text-stone-900 font-display mb-1">
              Thêm Khách Mời Mới
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Điền thông tin khách mời để tạo link thiệp riêng và theo dõi phản hồi.
            </p>

            <form onSubmit={handleSaveNewGuest} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tên khách mời <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Anh Nam & Bạn gái, Gia đình Chú Sáu..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="09..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phía gia đình
                  </label>
                  <select
                    value={newSide}
                    onChange={(e) => setNewSide(e.target.value as 'groom' | 'bride' | 'mutual')}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:border-rose-500 focus:outline-hidden"
                  >
                    <option value="groom">Nhà trai</option>
                    <option value="bride">Nhà gái</option>
                    <option value="mutual">Chung cả hai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Trạng thái tham gia
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) =>
                      setNewStatus(
                        e.target.value as 'attending' | 'not_attending' | 'tentative' | 'pending'
                      )
                    }
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:border-rose-500 focus:outline-hidden"
                  >
                    <option value="pending">Chờ phản hồi</option>
                    <option value="attending">Có tham dự</option>
                    <option value="tentative">Chưa chắc chắn</option>
                    <option value="not_attending">Vắng mặt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Số người dự tính
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newCount}
                    onChange={(e) => setNewCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ghi chú đặc biệt (món ăn, chỗ ngồi...)
                </label>
                <input
                  type="text"
                  value={newDiet}
                  onChange={(e) => setNewDiet(e.target.value)}
                  placeholder="Ví dụ: Ăn chay, người già đi lại khó..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs"
                >
                  Thêm vào danh sách
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
