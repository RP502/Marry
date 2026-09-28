import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  CreditCard,
  BarChart3,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Eye,
  Settings,
  Sparkles,
  ArrowUpRight,
  Filter,
  Check,
  Crown,
  Database,
  RefreshCw,
  LogOut,
  LayoutDashboard,
  Lock,
} from 'lucide-react';
import { ViewMode, AdminWeddingRecord, UserAccount } from '../types';
import { ADMIN_WEDDINGS_LIST } from '../data/adminMockData';

interface AdminPortalProps {
  onNavigate: (view: ViewMode) => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onNavigate,
  currentUser,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'weddings' | 'users' | 'transactions' | 'analytics' | 'system'>('weddings');
  const [weddings, setWeddings] = useState<AdminWeddingRecord[]>(ADMIN_WEDDINGS_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setWeddings((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'expired' : 'active' }
          : w
      )
    );
    showToast('Đã cập nhật trạng thái website thành công');
  };

  const handleChangePlan = (id: string, newPlan: 'free' | 'pro' | 'vip') => {
    setWeddings((prev) =>
      prev.map((w) => (w.id === id ? { ...w, plan: newPlan } : w))
    );
    showToast(`Đã nâng cấp gói thành ${newPlan.toUpperCase()}`);
  };

  const filteredWeddings = weddings.filter((w) => {
    const matchQuery =
      w.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.phone.includes(searchQuery);
    const matchPlan = filterPlan === 'all' || w.plan === filterPlan;
    return matchQuery && matchPlan;
  });

  const totalRevenue = weddings.reduce((sum, w) => {
    if (w.plan === 'pro') return sum + 199000;
    if (w.plan === 'vip') return sum + 399000;
    return sum;
  }, 14500000);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-stone-950 border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
              CĐ
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white font-display text-base tracking-wide">
                  Chung Đôi Master Admin
                </span>
                <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
                  SuperAdmin
                </span>
              </div>
              <p className="text-[11px] text-stone-400">Khu vực quản trị hệ thống bí mật</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>User Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem Website</span>
            </button>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-5">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Tổng Website Cưới</span>
              <Database className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white font-display">1,842</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +14% tháng này
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Đang hoạt động trên máy chủ</p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-5">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Doanh Thu Nền Tảng</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white font-display">
                {totalRevenue.toLocaleString('vi-VN')} đ
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +28%
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Gói Hạnh Phúc &amp; Vĩnh Cửu VIP</p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-5">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Lượt Xác Nhận RSVP</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white font-display">42,890</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 84% phản hồi
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Từ khách mời toàn quốc</p>
          </div>

          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-5">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Tình Trạng Hệ Thống</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-emerald-400 font-display">99.98%</span>
              <span className="text-xs text-stone-400 font-semibold">Uptime</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Băng thông CDN &amp; API êm ái</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 space-x-1 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('weddings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'weddings'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Danh Sách Website Cưới ({weddings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'users'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Quản Lý Người Dùng</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'transactions'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Giao Dịch &amp; Nạp Tiền</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'analytics'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Thống Kê Toàn Nền Tảng</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'system'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Cấu Hình &amp; Bảo Mật</span>
          </button>
        </div>

        {/* TAB 1: WEDDINGS LIST */}
        {activeTab === 'weddings' && (
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl overflow-hidden">
            {/* Search & Filter bar */}
            <div className="p-4 border-b border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm theo tên cặp đôi, email, số ĐT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-rose-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-xs text-stone-400">Gói:</span>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-1.5 focus:outline-rose-500"
                >
                  <option value="all">Tất cả gói</option>
                  <option value="free">Miễn phí (Free)</option>
                  <option value="pro">Hạnh Phúc Pro</option>
                  <option value="vip">Vĩnh Cửu VIP</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-900/60 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-700">
                  <tr>
                    <th className="px-5 py-3.5">Cặp Đôi</th>
                    <th className="px-5 py-3.5">Mẫu &amp; Ngày Cưới</th>
                    <th className="px-5 py-3.5">Gói Dịch Vụ</th>
                    <th className="px-5 py-3.5">Lượt Xem / RSVP</th>
                    <th className="px-5 py-3.5">Trạng Thái</th>
                    <th className="px-5 py-3.5 text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-700/60">
                  {filteredWeddings.map((w) => (
                    <tr key={w.id} className="hover:bg-stone-700/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm">{w.coupleNames}</div>
                        <div className="text-[11px] text-stone-400">{w.email} &bull; {w.phone}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-stone-200 font-medium">{w.templateName}</div>
                        <div className="text-[11px] text-stone-400">{w.weddingDate}</div>
                      </td>
                      <td className="px-5 py-4">
                        {w.plan === 'vip' ? (
                          <span className="inline-flex items-center space-x-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Crown className="w-3 h-3" />
                            <span>VĨNH CỬU VIP</span>
                          </span>
                        ) : w.plan === 'pro' ? (
                          <span className="inline-flex items-center space-x-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            <span>HẠNH PHÚC PRO</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-stone-700 text-stone-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Miễn Phí
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-stone-200 font-bold">{w.views} lượt xem</div>
                        <div className="text-[11px] text-emerald-400">{w.rsvps} khách RSVP</div>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggleStatus(w.id)}
                          className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                            w.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                          }`}
                        >
                          {w.status === 'active' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Hoạt Động</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Đã Tắt / Hết Hạn</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => onNavigate('invitation')}
                          className="px-2.5 py-1 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs transition-colors"
                          title="Xem thiệp cưới"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" />
                          <span>Xem</span>
                        </button>

                        <select
                          value={w.plan}
                          onChange={(e) => handleChangePlan(w.id, e.target.value as any)}
                          className="bg-stone-900 border border-stone-700 text-stone-300 text-[11px] rounded-lg px-2 py-1 focus:outline-rose-500"
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="vip">VIP</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: USERS */}
        {activeTab === 'users' && (
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">Danh Sách Tài Khoản Người Dùng</h3>
            <div className="space-y-3">
              {[
                { name: 'Minh Triết & Thảo Vy', email: 'minhtriet.thaovy@gmail.com', role: 'admin', date: '15/01/2026' },
                { name: 'Thanh Hằng & Quốc Đạt', email: 'hang.dat.wedding@gmail.com', role: 'user', date: '01/02/2026' },
                { name: 'Văn Lâm & Bích Ngọc', email: 'lamngoc2026@gmail.com', role: 'user', date: '10/03/2026' },
                { name: 'Đức Huy & Mai Anh', email: 'huymaianh@yahoo.com', role: 'user', date: '20/01/2026' },
              ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-stone-900/60 rounded-xl border border-stone-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-rose-600/30 text-rose-300 font-bold flex items-center justify-center text-xs">
                      {u.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{u.name}</div>
                      <div className="text-xs text-stone-400">{u.email} &bull; Đăng ký ngày: {u.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      u.role === 'admin' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-stone-700 text-stone-300'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">Lịch Sử Giao Dịch &amp; Nâng Cấp Gói</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-900/60 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-700">
                  <tr>
                    <th className="px-4 py-3">Mã Giao Dịch</th>
                    <th className="px-4 py-3">Khách Hàng</th>
                    <th className="px-4 py-3">Gói Dịch Vụ</th>
                    <th className="px-4 py-3">Số Tiền</th>
                    <th className="px-4 py-3">Phương Thức</th>
                    <th className="px-4 py-3">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-700/60">
                  {[
                    { id: 'TX-94821', couple: 'Minh Triết & Thảo Vy', plan: 'Hạnh Phúc Pro', amount: '199.000 đ', method: 'VietQR Napas', status: 'completed', time: '15/01/2026 14:30' },
                    { id: 'TX-94822', couple: 'Thanh Hằng & Quốc Đạt', plan: 'Vĩnh Cửu VIP', amount: '399.000 đ', method: 'Ví MoMo', status: 'completed', time: '01/02/2026 09:15' },
                    { id: 'TX-94823', couple: 'Đức Huy & Mai Anh', plan: 'Hạnh Phúc Pro', amount: '199.000 đ', method: 'VietQR Napas', status: 'completed', time: '20/01/2026 18:40' },
                    { id: 'TX-94824', couple: 'Tuấn Khải & Phương Oanh', plan: 'Vĩnh Cửu VIP', amount: '399.000 đ', method: 'VietQR Napas', status: 'completed', time: '28/02/2026 21:05' },
                  ].map((tx) => (
                    <tr key={tx.id} className="hover:bg-stone-700/30">
                      <td className="px-4 py-3 font-mono text-stone-400">{tx.id}</td>
                      <td className="px-4 py-3 text-white font-medium">{tx.couple}</td>
                      <td className="px-4 py-3 text-rose-300 font-semibold">{tx.plan}</td>
                      <td className="px-4 py-3 font-bold text-emerald-400">{tx.amount}</td>
                      <td className="px-4 py-3 text-stone-300">{tx.method}</td>
                      <td className="px-4 py-3">
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Thành Công
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PLATFORM ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-6">Xếp Hạng &amp; Thống Kê Nền Tảng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-stone-900/60 p-5 rounded-xl border border-stone-700/50">
                <h4 className="text-xs uppercase font-bold text-stone-400 mb-4">Mẫu Thiệp Được Chọn Nhiều Nhất</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Song Hỷ - Đỏ (Truyền Thống Á Đông)', percent: 38 },
                    { name: 'Thanh Diệp - Xanh (Botanical Pastel)', percent: 24 },
                    { name: 'Baroque - Vàng Kim (Hoàng Gia Sang Trọng)', percent: 18 },
                    { name: 'Mai Lan - Trắng (Minimalist Hàn Quốc)', percent: 12 },
                    { name: 'Hoa Mộc - Hồng & Lâu Đài - Lam', percent: 8 },
                  ].map((tpl, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-stone-300">{tpl.name}</span>
                        <span className="text-rose-400 font-bold">{tpl.percent}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${tpl.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-stone-900/60 p-5 rounded-xl border border-stone-700/50">
                <h4 className="text-xs uppercase font-bold text-stone-400 mb-4">Nguồn Lưu Lượng Truy Cập Thiệp Cưới</h4>
                <div className="space-y-3">
                  {[
                    { source: 'Zalo Messenger (Tin nhắn cá nhân & Nhóm)', percent: 68 },
                    { source: 'Facebook & Messenger', percent: 22 },
                    { source: 'Tin nhắn SMS truyền thống', percent: 7 },
                    { source: 'Quét mã QR thiệp in giấy', percent: 3 },
                  ].map((src, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-stone-300">{src.source}</span>
                        <span className="text-emerald-400 font-bold">{src.percent}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${src.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM */}
        {activeTab === 'system' && (
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">Cấu Hình Máy Chủ &amp; Bảo Mật</h3>
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between p-4 bg-stone-900/60 rounded-xl border border-stone-700/50">
                <div>
                  <div className="text-sm font-bold text-white">Chế Độ Bảo Trì (Maintenance Mode)</div>
                  <div className="text-xs text-stone-400">Tạm dừng tạo website mới trong thời gian nâng cấp máy chủ</div>
                </div>
                <button
                  onClick={() => showToast('Đã đổi trạng thái bảo trì')}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300"
                >
                  TẮT
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-stone-900/60 rounded-xl border border-stone-700/50">
                <div>
                  <div className="text-sm font-bold text-white">Robots.txt &amp; Chặn Đường Dẫn Riêng Tư</div>
                  <div className="text-xs text-stone-400">Đã kích hoạt chặn Disallow: /admin/, /dashboard/, /api/, /account...</div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã Bảo Vệ</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-stone-900/60 rounded-xl border border-stone-700/50">
                <div>
                  <div className="text-sm font-bold text-white">Xoá Bộ Nhớ Đệm CDN (Cache Purge)</div>
                  <div className="text-xs text-stone-400">Cập nhật tài nguyên tĩnh tức thì cho tất cả khách xem thiệp</div>
                </div>
                <button
                  onClick={() => showToast('Đã làm mới toàn bộ bộ nhớ đệm CDN')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white"
                >
                  Làm mới Cache
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
