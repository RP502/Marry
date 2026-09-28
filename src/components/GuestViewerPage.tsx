import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Download,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { ViewMode, Guest, WeddingData } from '../types';

interface GuestViewerPageProps {
  guests: Guest[];
  weddingData: WeddingData;
  onNavigate: (view: ViewMode) => void;
  onAddGuest: (guest: Omit<Guest, 'id' | 'createdAt'>) => void;
  onUpdateGuestStatus: (
    id: string,
    status: 'attending' | 'not_attending' | 'tentative' | 'pending'
  ) => void;
  onDeleteGuest: (id: string) => void;
  onToggleSent: (id: string) => void;
}

export const GuestViewerPage: React.FC<GuestViewerPageProps> = ({
  guests,
  weddingData,
  onNavigate,
  onAddGuest,
  onUpdateGuestStatus,
  onDeleteGuest,
  onToggleSent,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'attending' | 'not_attending' | 'pending'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New guest form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelationship, setNewRelationship] = useState('Bạn Chú Rể');
  const [newAccompanying, setNewAccompanying] = useState(0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddGuest({
      name: newName,
      phone: newPhone,
      relationship: newRelationship,
      attendingStatus: 'pending',
      accompanyingGuests: newAccompanying,
      wishes: '',
    });
    setNewName('');
    setNewPhone('');
    setNewAccompanying(0);
    setIsAddModalOpen(false);
  };

  const handleCopyPersonalLink = (guest: Guest) => {
    const personalUrl = `${window.location.origin}/?guest=${encodeURIComponent(guest.name)}`;
    navigator.clipboard.writeText(personalUrl);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Họ và Tên', 'Số Điện Thoại', 'Quan Hệ', 'Trạng Thái Tham Dự', 'Số Người Đi Cùng', 'Ghi Chú'];
    const rows = guests.map((g) => [
      `"${g.name}"`,
      `"${g.phone || ''}"`,
      `"${g.relationship}"`,
      `"${g.attendingStatus}"`,
      g.accompanyingGuests || 0,
      `"${g.wishes || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `danh_sach_khach_moi_${weddingData.groom.name}_${weddingData.bride.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guests.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.phone && g.phone.includes(search)) ||
      g.relationship.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || g.attendingStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const attendingCount = guests.filter((g) => g.attendingStatus === 'attending').length;
  const notAttendingCount = guests.filter((g) => g.attendingStatus === 'not_attending').length;
  const pendingCount = guests.filter((g) => g.attendingStatus === 'pending' || g.attendingStatus === 'tentative').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-rose-600 transition-colors flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Dashboard</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-stone-800">Quản Lý Khách Mời &amp; RSVP (/xem-khach)</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Hệ Thống Xem Khách Mời
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-2">
              Danh Sách Khách &amp; Phản Hồi Tham Dự
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Gửi thiệp cá nhân hoá theo tên và theo dõi phản hồi đi cùng của từng vị khách.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel/CSV</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Khách Mời</span>
            </button>
          </div>
        </div>

        {/* Status Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div
            onClick={() => setFilterStatus('all')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-800 border-stone-200'
            }`}
          >
            <span className="text-[11px] font-bold block uppercase opacity-75">Tổng Khách Mời</span>
            <span className="text-2xl font-bold font-display">{guests.length}</span>
          </div>

          <div
            onClick={() => setFilterStatus('attending')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filterStatus === 'attending'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-stone-800 border-stone-200'
            }`}
          >
            <span className="text-[11px] font-bold block uppercase opacity-75 text-emerald-600">
              Sẽ Tham Dự
            </span>
            <span className="text-2xl font-bold font-display text-emerald-600">{attendingCount}</span>
          </div>

          <div
            onClick={() => setFilterStatus('not_attending')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filterStatus === 'not_attending'
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-white text-stone-800 border-stone-200'
            }`}
          >
            <span className="text-[11px] font-bold block uppercase opacity-75 text-rose-600">
              Bận Việc / Tiếc Nuối
            </span>
            <span className="text-2xl font-bold font-display text-rose-600">{notAttendingCount}</span>
          </div>

          <div
            onClick={() => setFilterStatus('pending')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filterStatus === 'pending'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-stone-800 border-stone-200'
            }`}
          >
            <span className="text-[11px] font-bold block uppercase opacity-75 text-amber-600">
              Chưa Phản Hồi
            </span>
            <span className="text-2xl font-bold font-display text-amber-600">{pendingCount}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên khách mời, số điện thoại, mối quan hệ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-rose-500"
            />
          </div>
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200/80 uppercase text-[10px] font-bold tracking-wider text-stone-500">
                <tr>
                  <th className="px-5 py-3.5">Khách Mời</th>
                  <th className="px-5 py-3.5">Quan Hệ</th>
                  <th className="px-5 py-3.5">Trạng Thái Đến</th>
                  <th className="px-5 py-3.5">Đi Cùng</th>
                  <th className="px-5 py-3.5">Thiệp Cá Nhân Hoá</th>
                  <th className="px-5 py-3.5 text-right">Đã Gửi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-stone-400 text-xs">
                      Không tìm thấy khách mời nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-stone-900 text-sm">{guest.name}</div>
                        {guest.phone && (
                          <div className="text-[11px] text-stone-400 flex items-center space-x-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            <span>{guest.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                          {guest.relationship}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={guest.attendingStatus}
                          onChange={(e) =>
                            onUpdateGuestStatus(guest.id, e.target.value as any)
                          }
                          className={`text-xs font-bold rounded-lg px-2 py-1 border focus:outline-none ${
                            guest.attendingStatus === 'attending'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : guest.attendingStatus === 'not_attending'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="attending">Sẽ tham dự</option>
                          <option value="not_attending">Không tham dự</option>
                          <option value="tentative">Chưa chắc chắn</option>
                          <option value="pending">Chờ phản hồi</option>
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-stone-800">
                          {guest.accompanyingGuests ? `+${guest.accompanyingGuests} người` : 'Đi một mình'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCopyPersonalLink(guest)}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold transition-colors flex items-center space-x-1"
                            title="Sao chép link thiệp khắc tên"
                          >
                            {copiedId === guest.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-stone-500" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>

                          <a
                            href={`/?guest=${encodeURIComponent(guest.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-stone-400 hover:text-rose-600"
                            title="Mở xem thử"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <input
                          type="checkbox"
                          checked={guest.sent}
                          onChange={() => onToggleSent(guest.id)}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-stone-300 cursor-pointer"
                          title="Đánh dấu đã gửi thiệp qua Zalo/SMS"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold font-display text-stone-900 mb-4">
              Thêm Khách Mời Mới
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Họ và tên khách mời *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Nguyễn Văn Hoàng"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Số điện thoại (Zalo)
                </label>
                <input
                  type="tel"
                  placeholder="0912 345 678"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mối quan hệ
                </label>
                <select
                  value={newRelationship}
                  onChange={(e) => setNewRelationship(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-rose-500 bg-white"
                >
                  <option value="Bạn Chú Rể">Bạn Chú Rể</option>
                  <option value="Bạn Cô Dâu">Bạn Cô Dâu</option>
                  <option value="Đồng Nghiệp">Đồng Nghiệp</option>
                  <option value="Họ Nhà Trai">Họ Nhà Trai</option>
                  <option value="Họ Nhà Gái">Họ Nhà Gái</option>
                  <option value="Bạn Học">Bạn Học</option>
                  <option value="Khách Quý VIP">Khách Quý VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Dự kiến số người đi cùng
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  value={newAccompanying}
                  onChange={(e) => setNewAccompanying(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-rose-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-xs"
                >
                  Lưu Khách Mời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
