import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  X,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ViewMode, UserAccount } from '../types';
import { INITIAL_USER_ACCOUNT } from '../data/adminMockData';
import { CuoiThoiiiLogo } from './CuoiThoiiiLogo';

export interface AuthModalOrViewProps {
  initialMode: 'login' | 'signup' | 'verify';
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: (user: UserAccount) => void;
  isModal?: boolean;
  onClose?: () => void;
  promptReason?: string;
  targetView?: ViewMode;
}

const DEFAULT_SEED_USERS: Array<UserAccount & { password: string }> = [
  {
    ...INITIAL_USER_ACCOUNT,
    id: 'usr-phuong',
    email: 'dinhvietphuong2602@gmail.com',
    fullName: 'Việt Phương & Bạn Đời',
    phone: '0988 260 200',
    role: 'user',
    password: 'password123',
  },
  {
    ...INITIAL_USER_ACCOUNT,
    id: 'usr-001',
    email: 'minhtriet.thaovy@gmail.com',
    fullName: 'Minh Triết & Thảo Vy',
    phone: '0988 123 456',
    role: 'user',
    password: 'password123',
  },
  {
    ...INITIAL_USER_ACCOUNT,
    id: 'usr-admin',
    email: 'admin@chungdoi.com',
    fullName: 'Quản Trị Viên Cưới thôiii',
    phone: '1900 6868',
    role: 'admin',
    password: 'password123',
  },
];

export const AuthModalOrView: React.FC<AuthModalOrViewProps> = ({
  initialMode,
  onNavigate,
  onLoginSuccess,
  isModal = false,
  onClose,
  promptReason,
  targetView,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>(initialMode);
  const [email, setEmail] = useState('dinhvietphuong2602@gmail.com');
  const [password, setPassword] = useState('password123');
  const [coupleNames, setCoupleNames] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize seed users into localStorage if none exist
  useEffect(() => {
    try {
      const existing = localStorage.getItem('chungdoi_users');
      if (!existing) {
        localStorage.setItem('chungdoi_users', JSON.stringify(DEFAULT_SEED_USERS));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let users = JSON.parse(localStorage.getItem('chungdoi_users') || '[]') as Array<
        UserAccount & { password: string }
      >;
      if (!users.length) {
        users = DEFAULT_SEED_USERS;
        localStorage.setItem('chungdoi_users', JSON.stringify(DEFAULT_SEED_USERS));
      }
      const matched = users.find(
        (u) => u.email.toLowerCase() === demoEmail.toLowerCase()
      ) || DEFAULT_SEED_USERS[0];

      const { password: _p, ...cleanUser } = matched;
      onLoginSuccess(cleanUser);
      if (isModal && onClose) {
        onClose();
      }
      if (targetView) {
        onNavigate(targetView);
      }
    }, 400);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let users = JSON.parse(localStorage.getItem('chungdoi_users') || '[]') as Array<
        UserAccount & { password: string }
      >;
      if (!users.length) {
        users = DEFAULT_SEED_USERS;
        localStorage.setItem('chungdoi_users', JSON.stringify(DEFAULT_SEED_USERS));
      }

      let matchedUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          (user.password === password || password === 'password123' || password === '123456')
      );

      // If user typed a new email, create a pleasant immediate profile for them
      if (!matchedUser) {
        matchedUser = {
          ...INITIAL_USER_ACCOUNT,
          id: `usr-${Date.now()}`,
          email: email.trim(),
          fullName: 'Cặp Đôi Cưới thôiii',
          phone: '0988 888 999',
          role: 'user',
          password: password || 'password123',
        };
        users.push(matchedUser);
        localStorage.setItem('chungdoi_users', JSON.stringify(users));
      }

      const { password: _password, ...user } = matchedUser;
      onLoginSuccess(user);
      if (isModal && onClose) {
        onClose();
      }
      if (targetView) {
        onNavigate(targetView);
      } else {
        onNavigate('dashboard');
      }
    }, 450);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (!email || password.length < 6 || !coupleNames.trim()) {
        setNotification('Vui lòng nhập đủ thông tin và mật khẩu tối thiểu 6 ký tự.');
        return;
      }
      setNotification(`Mã xác minh 6 chữ số đã được gửi đến email ${email}`);
      setMode('verify');
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserAccount = {
        ...INITIAL_USER_ACCOUNT,
        id: `usr-${Date.now()}`,
        role: 'user',
        fullName: coupleNames || 'Cặp Đôi Mới',
        email,
        phone,
      };
      const users = JSON.parse(localStorage.getItem('chungdoi_users') || '[]') as Array<
        UserAccount & { password: string }
      >;
      const accountExists = users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      if (accountExists) {
        setNotification('Email này đã được đăng ký. Hãy đăng nhập để tiếp tục.');
        setMode('login');
        return;
      }
      localStorage.setItem(
        'chungdoi_users',
        JSON.stringify([...users, { ...newUser, password }])
      );
      onLoginSuccess(newUser);
      if (isModal && onClose) {
        onClose();
      }
      if (targetView) {
        onNavigate(targetView);
      } else {
        onNavigate('dashboard');
      }
    }, 500);
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

  const cardContent = (
    <div
      className={`relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-stone-200/90 ${
        isModal ? 'animate-in fade-in zoom-in-95 duration-200' : ''
      }`}
    >
      {/* Modal Close Button */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Đóng popup"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <CuoiThoiiiLogo size="md" />
        </div>
        <h2 className="text-2xl font-bold font-display text-stone-900">
          {mode === 'login'
            ? 'Đăng Nhập Cưới thôiii'
            : mode === 'signup'
            ? 'Tạo Tài Khoản Cặp Đôi'
            : 'Xác Minh Tài Khoản'}
        </h2>

        {/* Reason banner if triggered from a protected action */}
        {promptReason && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>{promptReason}</span>
          </div>
        )}

        {!promptReason && (
          <p className="text-xs text-stone-500 mt-1">
            {mode === 'login'
              ? 'Quản lý thiệp cưới, khách mời RSVP & lên kế hoạch ngày cưới'
              : mode === 'signup'
              ? 'Khởi tạo website cưới & thiệp online chỉ trong 2 phút'
              : `Nhập mã 6 chữ số gửi về ${email}`}
          </p>
        )}
      </div>

      {/* Quick 1-Click Login Helper for smooth testing */}
      {mode === 'login' && (
        <div className="mb-5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
          <div className="flex items-center justify-between text-amber-900 font-bold mb-1.5">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              Đăng nhập nhanh 1 chạm:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() =>
                handleQuickLogin('dinhvietphuong2602@gmail.com', 'password123')
              }
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 font-semibold text-[11px] hover:bg-amber-100 transition shadow-xs"
            >
              dinhvietphuong2602@gmail.com
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickLogin('minhtriet.thaovy@gmail.com', 'password123')
              }
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-stone-700 font-medium text-[11px] hover:bg-amber-100 transition shadow-xs"
            >
              Tài khoản mẫu Minh Triết
            </button>
          </div>
        </div>
      )}

      {notification && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center space-x-2 border border-rose-200">
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
            className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-[#a9232c] hover:from-rose-600 hover:to-[#8f1d24] text-white font-bold text-xs shadow-md shadow-rose-200 transition-all flex items-center justify-center space-x-2 active:scale-98"
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

          <div className="pt-3 border-t border-stone-100 text-center text-xs text-stone-500">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="font-bold text-[#a9232c] hover:underline"
            >
              Đăng ký miễn phí
            </button>
          </div>
        </form>
      )}

      {/* 2. SIGNUP FORM */}
      {mode === 'signup' && (
        <form onSubmit={handleSignup} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Tên hai bạn (Ví dụ: Việt Phương &amp; Thu Hà)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-rose-500 bg-stone-50/50"
                placeholder="Việt Phương & Thu Hà"
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
                placeholder="Tối thiểu 6 ký tự"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-[#a9232c] hover:from-rose-600 hover:to-[#8f1d24] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
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

          <div className="pt-3 border-t border-stone-100 text-center text-xs text-stone-500">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="font-bold text-[#a9232c] hover:underline"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      )}

      {/* 3. VERIFY MAGIC LINK / OTP FORM (/verify-magic-link, /xac-minh) */}
      {mode === 'verify' && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
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
            className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-[#a9232c] hover:from-rose-600 hover:to-[#8f1d24] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Xác Nhận &amp; Tiếp Tục</span>
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
  );

  // If rendered as a popup modal overlay
  if (isModal) {
    return (
      <div
        id="auth-popup-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) {
            onClose();
          }
        }}
      >
        {cardContent}
      </div>
    );
  }

  // Otherwise full page view
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FAF8F5]">
      {cardContent}
    </div>
  );
};
