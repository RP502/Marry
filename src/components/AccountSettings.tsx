import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Crown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Save,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { ViewMode, UserAccount, WeddingData } from '../types';

interface AccountSettingsProps {
  user: UserAccount | null;
  weddingData: WeddingData;
  onNavigate: (view: ViewMode) => void;
  onUpdateUser: (updatedUser: UserAccount) => void;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({
  user,
  weddingData,
  onNavigate,
  onUpdateUser,
}) => {
  const [fullName, setFullName] = useState(user?.fullName || `${weddingData.groom.fullName} & ${weddingData.bride.fullName}`);
  const [email, setEmail] = useState(user?.email || 'minhtriet.thaovy@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '0988 123 456');
  const [weddingDate, setWeddingDate] = useState(user?.weddingDate || weddingData.events.ceremony.date);
  const [toast, setToast] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onUpdateUser({
        ...user,
        fullName,
        email,
        phone,
        weddingDate,
      });
    }
    showToast('Đã lưu thông tin tài khoản thành công!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không trùng khớp!');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Đã đổi mật khẩu thành công!');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 pt-8">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <span className="font-semibold text-stone-800">Cài Đặt Tài Khoản</span>
        </div>

        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Cài Đặt Tài Khoản &amp; Gói Dịch Vụ
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Quản lý thông tin liên hệ của cặp đôi, mật khẩu và chi tiết đăng ký dịch vụ Chung Đôi.
            </p>
          </div>

          {/* Subscription Status Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-stone-900">
                      {user?.plan === 'vip' ? 'Gói Vĩnh Cửu VIP' : user?.plan === 'pro' ? 'Gói Hạnh Phúc Pro' : 'Gói Miễn Phí'}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Đang Hoạt Động
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Hiệu lực đến ngày: <strong>28/11/2027</strong> &bull; Không giới hạn số lượng khách mời
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('payment')}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nâng Cấp Gói VIP</span>
              </button>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[11px]">Dung lượng lưu trữ ảnh</span>
                <strong className="text-stone-800 font-semibold">Không giới hạn ảnh cưới HD</strong>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[11px]">Hộp mừng cưới VietQR</span>
                <strong className="text-stone-800 font-semibold">Tự động nhận tiền 24/7</strong>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block text-[11px]">Nhạc nền tuỳ chọn</span>
                <strong className="text-stone-800 font-semibold">Đầy đủ kho 100+ bản tình ca</strong>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-6 font-display">
              Thông Tin Đại Diện Cặp Đôi
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tên hiển thị của cặp đôi
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ngày tổ chức hôn lễ
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email nhận thông báo RSVP
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Số điện thoại liên hệ
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-6 font-display">
              Đổi Mật Khẩu Bảo Mật
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Cập Nhật Mật Khẩu</span>
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200">
            <h3 className="text-base font-bold text-rose-900 mb-2 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Khu Vực Nguy Hiểm</span>
            </h3>
            <p className="text-xs text-rose-700 mb-4 leading-relaxed">
              Xoá website cưới sẽ ẩn hoàn toàn link thiệp, xóa các phản hồi RSVP và lưu bút chúc phúc của khách mời. Thao tác này không thể hoàn tác.
            </p>
            <button
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn đặt lại dữ liệu thiệp cưới về mặc định không?')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="px-4 py-2 rounded-xl bg-white border border-rose-300 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors"
            >
              Đặt Lại Toàn Bộ Dữ Liệu Thiệp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
