import React, { useState } from 'react';
import {
  Heart,
  Eye,
  Users,
  MessageSquare,
  QrCode,
  Edit3,
  BarChart3,
  Share2,
  Crown,
  Settings,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';
import { ViewMode, UserAccount, WeddingData, Guest, WishItem } from '../types';

interface UserDashboardProps {
  user: UserAccount | null;
  weddingData: WeddingData;
  guests: Guest[];
  wishes: WishItem[];
  onNavigate: (view: ViewMode) => void;
  onOpenShareModal: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  weddingData,
  guests,
  wishes,
  onNavigate,
  onOpenShareModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const weddingUrl = `${window.location.origin}/?guest=`;
  const liveSlugUrl = `${window.location.origin}/invitation`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveSlugUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const attendingGuests = guests.filter((g) => g.attendingStatus === 'attending');
  const totalAccompanying = attendingGuests.reduce((sum, g) => sum + (g.accompanyingGuests || 0), 0);
  const totalConfirmedPeople = attendingGuests.length + totalAccompanying;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Top Banner & Couple Header */}
      <div className="bg-white border-b border-stone-200/80 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  Trung Tâm Quản Lý Thiệp Cưới
                </span>
                {user?.plan === 'vip' ? (
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-amber-600" />
                    <span>Gói Vĩnh Cửu VIP</span>
                  </span>
                ) : user?.plan === 'pro' ? (
                  <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-300 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-rose-600" />
                    <span>Gói Hạnh Phúc Pro</span>
                  </span>
                ) : (
                  <span className="bg-stone-100 text-stone-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-stone-300">
                    Gói Miễn Phí
                  </span>
                )}
                {user?.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className="bg-stone-900 text-white hover:bg-rose-600 text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors"
                  >
                    Vào Master Admin &rarr;
                  </button>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                {weddingData.groom.fullName} &amp; {weddingData.bride.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>
                  Ngày cưới:{' '}
                  <strong>{weddingData.events.ceremony.date}</strong> (
                  {weddingData.events.ceremony.lunarDate})
                </span>
                <span>&bull;</span>
                <span>{weddingData.events.ceremony.venue}</span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate('builder')}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh Sửa Thiệp</span>
              </button>

              <button
                onClick={() => onNavigate('invitation')}
                className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem Thiệp Trực Tiếp</span>
              </button>

              <button
                onClick={() => onNavigate('share')}
                className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia Sẻ &amp; Mã QR</span>
              </button>
            </div>
          </div>

          {/* Link Copier Box */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                  Đường dẫn thiệp cưới của bạn
                </span>
                <div className="text-xs font-mono font-medium text-stone-900 truncate">
                  {liveSlugUrl}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Sao chép link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('payment')}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-2xs flex items-center space-x-1"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Nâng cấp VIP</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats and Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div
            onClick={() => onNavigate('public-analytics')}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-rose-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Lượt Xem Thiệp
              </span>
              <Eye className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              1,420
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              +18% trong 24 giờ qua
            </p>
          </div>

          <div
            onClick={() => onNavigate('xem-khach')}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-rose-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Khách Xác Nhận Đến
              </span>
              <Users className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              {totalConfirmedPeople} người
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Từ {attendingGuests.length} phản hồi RSVP
            </p>
          </div>

          <div
            onClick={() => onNavigate('invitation')}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-rose-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Lời Chúc Lưu Bút
              </span>
              <MessageSquare className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              {wishes.length}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Đầy ắp tình cảm bạn bè</p>
          </div>

          <div
            onClick={() => onNavigate('payment')}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-rose-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Gói Tài Khoản
              </span>
              <Crown className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-rose-600">
              {user?.plan === 'vip' ? 'Vĩnh Cửu VIP' : user?.plan === 'pro' ? 'Hạnh Phúc Pro' : 'Bản Miễn Phí'}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Hiệu lực trọn đời không giới hạn</p>
          </div>
        </div>

        {/* Shortcuts Navigation Grid */}
        <div className="mb-10">
          <h3 className="text-base font-bold text-stone-900 mb-4 font-display">
            Các Chức Năng Quản Trị Của Bạn
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigate('builder')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Chỉnh Sửa Thiệp Cưới</h4>
                  <p className="text-xs text-stone-500">Thay ảnh, sảnh cưới, nhạc nền, VietQR</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onNavigate('xem-khach')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Danh Sách Khách &amp; RSVP</h4>
                  <p className="text-xs text-stone-500">Xem ai tham dự, ai đi cùng, xuất Excel</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onNavigate('public-analytics')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Thống Kê Lượt Xem Thiệp</h4>
                  <p className="text-xs text-stone-500">Nguồn khách vào (Zalo, FB), thiết bị</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onNavigate('share')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Chia Sẻ &amp; Tải Mã QR</h4>
                  <p className="text-xs text-stone-500">In lên thiệp giấy, gửi Zalo hàng loạt</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onNavigate('payment')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Gia Hạn &amp; Nâng Cấp Gói</h4>
                  <p className="text-xs text-stone-500">Mở khoá toàn bộ tính năng VIP cao cấp</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onNavigate('account')}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Cài Đặt Tài Khoản</h4>
                  <p className="text-xs text-stone-500">Email, số điện thoại, đổi mật khẩu</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

        {/* Recent RSVPs and Wishes preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Guests RSVP */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-900 font-display">
                Khách Mới Phản Hồi RSVP Gần Đây
              </h3>
              <button
                onClick={() => onNavigate('xem-khach')}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Xem tất cả ({guests.length}) &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {guests.slice(0, 4).map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{g.name}</div>
                    <div className="text-[11px] text-stone-500">
                      {g.relationship} {g.accompanyingGuests ? `&bull; Đi cùng: +${g.accompanyingGuests} người` : ''}
                    </div>
                  </div>
                  <div>
                    {g.attendingStatus === 'attending' ? (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Tham dự
                      </span>
                    ) : g.attendingStatus === 'not_attending' ? (
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Bận việc
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Chưa rõ
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Wishes */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-900 font-display">
                Lời Chúc Mới Nhất Trong Sổ Lưu Bút
              </h3>
              <button
                onClick={() => onNavigate('invitation')}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Xem sổ lưu bút ({wishes.length}) &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {wishes.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{w.name}</span>
                    <span className="text-[10px] text-stone-400">{w.createdAt}</span>
                  </div>
                  <p className="text-xs text-stone-600 italic line-clamp-2">"{w.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
