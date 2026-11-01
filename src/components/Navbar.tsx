import React, { useState } from 'react';
import {
  Sparkles,
  Home,
  ClipboardCheck,
  Compass,
  Bot,
  User,
  ShieldAlert,
  Globe,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { ViewMode, Language, UserAccount } from '../types';
import { CuoiThoiiiLogo } from './CuoiThoiiiLogo';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  lang: Language;
  onToggleLang: () => void;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
  onOpenAuthModal?: (
    mode?: 'login' | 'signup',
    targetView?: ViewMode,
    reason?: string
  ) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  currentUser,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 5 main navigation items: Trang chủ, Chuẩn bị, Khám phá, Hỏi Hoa (AI), Của tôi
  const navItems = [
    {
      id: 'landing' as ViewMode,
      labelVi: 'Trang chủ',
      labelEn: 'Home',
      icon: Home,
      isActive: (v: ViewMode) => v === 'landing',
    },
    {
      id: 'tools' as ViewMode,
      labelVi: 'Chuẩn bị',
      labelEn: 'Preparation',
      icon: ClipboardCheck,
      isActive: (v: ViewMode) =>
        [
          'tools',
          'wedding-plan',
          'budget-calc',
          'invitation-messages',
          'speeches',
          'save-the-date',
          'compress-image',
          'seating-chart',
          'lunar-converter',
          'templates',
        ].includes(v),
    },
    {
      id: 'kham-pha' as ViewMode,
      labelVi: 'Khám phá',
      labelEn: 'Explore',
      icon: Compass,
      isActive: (v: ViewMode) => ['kham-pha', 'services'].includes(v),
    },
    {
      id: 'customs' as ViewMode,
      labelVi: 'Hỏi Hoa (AI)',
      labelEn: 'Ask Hoa (AI)',
      icon: Bot,
      isAi: true,
      isActive: (v: ViewMode) => v === 'customs',
    },
    {
      id: 'dashboard' as ViewMode,
      labelVi: 'Của tôi',
      labelEn: 'My Wedding',
      icon: User,
      isActive: (v: ViewMode) =>
        ['dashboard', 'account', 'rsvp-dashboard', 'xem-khach', 'login', 'signup'].includes(v),
    },
  ];

  // Intercept navigation for protected views when not logged in
  const handleNavClick = (itemId: ViewMode) => {
    if (itemId === 'tools' && !currentUser) {
      if (onOpenAuthModal) {
        onOpenAuthModal('login', 'tools', 'Vui lòng đăng nhập để mở tính năng Chuẩn bị');
      } else {
        onNavigate('login');
      }
      return;
    }

    if (itemId === 'customs' && !currentUser) {
      if (onOpenAuthModal) {
        onOpenAuthModal('login', 'customs', 'Vui lòng đăng nhập để trò chuyện cùng Hỏi Hoa (AI)');
      } else {
        onNavigate('login');
      }
      return;
    }

    if (itemId === 'dashboard' && !currentUser) {
      if (onOpenAuthModal) {
        onOpenAuthModal('login', 'dashboard', 'Vui lòng đăng nhập để xem thông tin Đám cưới của bạn');
      } else {
        onNavigate('login');
      }
      return;
    }

    onNavigate(itemId);
  };

  // Intercept "Tạo thiệp" actions when not logged in -> Open login popup / navigate to login
  const handleCreateInvitationClick = () => {
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

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#fbf8f3]/95 backdrop-blur-md border-b border-[#e9dfd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo Đặc Biệt & Font chữ Cưới thôiii */}
            <div id="brand-logo" className="shrink-0">
              <CuoiThoiiiLogo
                size="md"
                variant="dark"
                onClick={() => onNavigate('landing')}
              />
            </div>

            {/* Desktop 5 Navigation Items */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const active = item.isActive(currentView);
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-rose-50 text-[#a9232c] font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 transition-transform ${
                        active ? 'text-[#a9232c] scale-105' : 'text-stone-500'
                      }`}
                    />
                    <span>{lang === 'vi' ? item.labelVi : item.labelEn}</span>
                    {item.isAi && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-linear-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-xs">
                        <Sparkles className="w-2.5 h-2.5" />
                        AI
                      </span>
                    )}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#a9232c] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Switcher */}
              <button
                id="lang-toggle-btn"
                onClick={onToggleLang}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
                title="Chuyển ngôn ngữ / Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
              </button>

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentView === 'admin'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-stone-900 text-rose-300 hover:bg-rose-700 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              )}

              {/* Primary CTA: Tạo thiệp ngay (Nếu chưa đăng nhập -> mở popup đăng nhập) */}
              <button
                id="header-create-btn"
                onClick={handleCreateInvitationClick}
                className="px-4 py-2 rounded-full bg-linear-to-r from-rose-500 to-[#a9232c] hover:from-rose-600 hover:to-[#8f1d24] text-white text-sm font-semibold shadow-sm shadow-rose-200 hover:shadow-md transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{lang === 'vi' ? 'Tạo thiệp ngay' : 'Create Invitation'}</span>
              </button>
            </div>

            {/* Mobile Header Actions (Tạo thiệp + Language + Menu) */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={handleCreateInvitationClick}
                className="px-3 py-1.5 rounded-full bg-[#a9232c] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {lang === 'vi' ? 'Tạo thiệp' : 'Create'}
              </button>
              <button
                onClick={onToggleLang}
                className="p-1.5 text-stone-600 rounded-lg hover:bg-stone-100 text-xs font-bold border border-stone-200"
              >
                {lang === 'vi' ? 'VI' : 'EN'}
              </button>
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-3 pt-1">
              Điều hướng chính
            </div>
            {navItems.map((item) => {
              const active = item.isActive(currentView);
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-rose-50 text-[#a9232c] font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent
                      className={`w-5 h-5 ${active ? 'text-[#a9232c]' : 'text-stone-500'}`}
                    />
                    <span>{lang === 'vi' ? item.labelVi : item.labelEn}</span>
                  </div>
                  {item.isAi ? (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-linear-to-r from-rose-500 to-amber-500 text-white">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-stone-300" />
                  )}
                </button>
              );
            })}

            {/* Extra Admin link if admin */}
            {currentUser?.role === 'admin' && (
              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('admin');
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-white bg-stone-900 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Hệ Thống Admin Master</span>
                </button>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCreateInvitationClick();
                }}
                className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-[#a9232c] text-white font-semibold text-center shadow-sm cursor-pointer"
              >
                {lang === 'vi' ? 'Bắt đầu tạo thiệp miễn phí' : 'Start Creating for Free'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (5 tabs) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-safe"
      >
        <div className="grid grid-cols-5 h-[58px] items-center px-1">
          {navItems.map((item) => {
            const active = item.isActive(currentView);
            const IconComponent = item.icon;
            return (
              <button
                key={`mobile-bottom-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center h-full relative py-1 transition-all cursor-pointer ${
                  active ? 'text-[#a9232c]' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <div className="relative">
                  <IconComponent
                    className={`w-5 h-5 transition-transform ${
                      active ? 'scale-110 stroke-[2.4]' : 'stroke-[1.7]'
                    }`}
                  />
                  {item.isAi && (
                    <span className="absolute -top-1 -right-2.5 px-1 py-0.2 rounded-full text-[8px] font-extrabold bg-linear-to-r from-rose-500 to-amber-500 text-white leading-none">
                      AI
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 tracking-tight truncate max-w-[64px] ${
                    active ? 'font-bold text-[#a9232c]' : 'font-medium'
                  }`}
                >
                  {item.labelVi}
                </span>
                {active && (
                  <span className="absolute bottom-0.5 w-6 h-0.5 bg-[#a9232c] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
