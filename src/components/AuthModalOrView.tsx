import React, { useState } from 'react';
import {
  Heart,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  RefreshCw,
} from 'lucide-react';
import { ViewMode, UserAccount } from '../types';
import { INITIAL_USER_ACCOUNT } from '../data/adminMockData';

interface AuthModalOrViewProps {
  initialMode: 'login' | 'signup' | 'verify';
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModalOrView: React.FC<AuthModalOrViewProps> = ({
  initialMode,
  onNavigate,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>(initialMode);
  const [email, setEmail] = useState('minhtriet.thaovy@gmail.com');
  const [password, setPassword] = useState('chungdoi@2026');
  const [coupleNames, setCoupleNames] = useState('Minh Triết & Thảo Vy');
  const [phone, setPhone] = useState('0988 123 456');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(INITIAL_USER_ACCOUNT);
      onNavigate('dashboard');
    }, 600);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNotification(`Mã xác minh 6 chữ số đã được gửi đến email ${email}`);
      setMode('verify');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserAccount = {
        ...INITIAL_USER_ACCOUNT,
        fullName: coupleNames,
        email,
        phone,
      };
      onLoginSuccess(newUser);
      onNavigate('dashboard');
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200/80">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold font-display text-stone-900">
            {mode === 'login'
              ? 'Đăng Nhập Chung Đôi'
              : mode === 'signup'
              ? 'Tạo Tài Khoản Cặp Đôi'
              : 'Xác Minh Tài Khoản'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {mode === 'login'
              ? 'Quản lý thiệp cưới, khách mời RSVP & hộp mừng cưới của bạn'
              : mode === 'signup'
              ? 'Khởi tạo website cưới miễn phí chỉ trong 2 phút'
              : `Nhập mã 6 chữ số gửi về ${email}`}
          </p>
        </div>

        {notification && (
          <div className="mb-6 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center space-x-2 border border-rose-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email đăng ký
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                  placeholder="nhap.email@cuoi.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">Mật khẩu</label>
                <button
                  type="button"
                  onClick={() => {
                    setNotification(`Đường link đăng nhập Magic Link đã được gửi tới ${email}`);
                    setMode('verify');
                  }}
                  className="text-[11px] text-rose-600 hover:underline"
                >
                  Đăng nhập qua Magic Link?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Đăng Nhập Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  onLoginSuccess({
                    ...INITIAL_USER_ACCOUNT,
                    role: 'admin',
                  });
                  onNavigate('admin');
                }}
                className="text-[11px] text-stone-400 hover:text-stone-700 underline"
              >
                Đăng nhập nhanh với quyền Master Admin (/admin)
              </button>
            </div>

            <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-rose-600 hover:underline"
              >
                Đăng ký miễn phí
              </button>
            </div>
          </form>
        )}

        {/* 2. SIGNUP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tên hai bạn (Ví dụ: Minh Triết &amp; Thảo Vy)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                  placeholder="Minh Triết & Thảo Vy"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                  placeholder="0988 123 456"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email tài khoản
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                  placeholder="nhap.email@cuoi.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Tạo Tài Khoản &amp; Bắt Đầu</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-rose-600 hover:underline"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        )}

        {/* 3. VERIFY MAGIC LINK / OTP FORM (/verify-magic-link, /xac-minh) */}
        {mode === 'verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-stone-200 focus:border-rose-500 focus:outline-none bg-stone-50"
                />
              ))}
            </div>

            <div className="text-center">
              <span className="text-xs text-stone-500">Gợi ý mã thử nghiệm: </span>
              <button
                type="button"
                onClick={() => setOtpCode(['8', '8', '8', '8', '8', '8'])}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Điền nhanh 888888
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Xác Nhận &amp; Vào Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
