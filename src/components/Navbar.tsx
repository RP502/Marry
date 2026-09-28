import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Layout,
  Eye,
  Users,
  PlusCircle,
  Globe,
  Menu,
  X,
  Wrench,
  BookOpen,
  Tag,
  LayoutDashboard,
  ShieldAlert,
  User,
  LogOut,
} from 'lucide-react';
import { ViewMode, Language, UserAccount } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  lang: Language;
  onToggleLang: () => void;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: ViewMode; labelVi: string; labelEn: string; icon: React.ReactNode }> = [
    {
      id: 'landing',
      labelVi: 'Trang chủ',
      labelEn: 'Home',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: 'templates',
      labelVi: 'Kho mẫu thiệp',
      labelEn: 'Templates',
      icon: <Layout className="w-3.5 h-3.5" />,
    },
    {
      id: 'builder',
      labelVi: 'Tạo thiệp cưới',
      labelEn: 'Wedding Studio',
      icon: <PlusCircle className="w-3.5 h-3.5" />,
    },
    {
      id: 'tools',
      labelVi: 'Công cụ cưới',
      labelEn: 'Wedding Tools',
      icon: <Wrench className="w-3.5 h-3.5" />,
    },
    {
      id: 'rsvp-dashboard',
      labelVi: 'Khách & RSVP',
      labelEn: 'RSVP Manager',
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      id: 'pricing',
      labelVi: 'Bảng giá',
      labelEn: 'Pricing',
      icon: <Tag className="w-3.5 h-3.5" />,
    },
    {
      id: 'blog',
      labelVi: 'Cẩm nang',
      labelEn: 'Guides & Blog',
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      id: 'invitation',
      labelVi: 'Xem thiệp mẫu',
      labelEn: 'Demo',
      icon: <Eye className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            id="brand-logo"
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-sm shadow-rose-200 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-display">
                  Chung Đôi
                </span>
                <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest px-1.5 py-0.5 bg-rose-50 rounded">
                  .vn
                </span>
              </div>
              <p className="text-[10px] text-stone-700 hidden sm:block -mt-0.5">
                Thiệp cưới &amp; Website đám cưới online
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span className={isActive ? 'text-rose-600' : 'text-stone-700'}>
                    {item.icon}
                  </span>
                  <span>{lang === 'vi' ? item.labelVi : item.labelEn}</span>
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
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
              title="Chuyển ngôn ngữ / Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-700" />
              <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                {currentUser.role === 'admin' && (
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

                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => onNavigate('account')}
                  className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-rose-400 transition-all"
                  title="Cài đặt tài khoản"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
              >
                Đăng nhập
              </button>
            )}

            {/* Primary CTA */}
            <button
              id="header-create-btn"
              onClick={() => onNavigate('builder')}
              className="px-4 py-2 rounded-full bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-sm font-medium shadow-sm shadow-rose-200 hover:shadow-md transition-all active:scale-95"
            >
              {lang === 'vi' ? 'Tạo thiệp ngay' : 'Create Invitation'}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onToggleLang}
              className="p-2 text-stone-600 rounded-md hover:bg-stone-100 text-xs font-bold"
            >
              {lang === 'vi' ? 'VI' : 'EN'}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                currentView === item.id
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span className="text-rose-500">{item.icon}</span>
              <span>{lang === 'vi' ? item.labelVi : item.labelEn}</span>
            </button>
          ))}
          {/* Additional Admin & User links in mobile drawer */}
          <div className="pt-2 border-t border-stone-100 space-y-1">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 bg-rose-50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Trang Quản Lý (Dashboard)</span>
                </button>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-bold text-white bg-stone-900"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Hệ Thống Admin Master</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onNavigate('account');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  <User className="w-4 h-4 text-stone-500" />
                  <span>Cài Đặt Tài Khoản</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
              >
                <User className="w-4 h-4 text-stone-500" />
                <span>Đăng nhập / Đăng ký</span>
              </button>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('builder');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-rose-500 text-white font-semibold text-center shadow-sm"
            >
              {lang === 'vi' ? 'Bắt đầu tạo thiệp miễn phí' : 'Start Creating for Free'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
