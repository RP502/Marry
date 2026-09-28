import React from 'react';
import {
  BarChart3,
  Eye,
  Users,
  QrCode,
  ArrowLeft,
  Smartphone,
  Laptop,
  Tablet,
  TrendingUp,
  Share2,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { ViewMode, PublicAnalyticsData } from '../types';
import { INITIAL_PUBLIC_ANALYTICS } from '../data/adminMockData';

interface PublicAnalyticsViewProps {
  onNavigate: (view: ViewMode) => void;
  analyticsData?: PublicAnalyticsData;
}

export const PublicAnalyticsView: React.FC<PublicAnalyticsViewProps> = ({
  onNavigate,
  analyticsData = INITIAL_PUBLIC_ANALYTICS,
}) => {
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
          <span className="font-semibold text-stone-800">Thống Kê Lượt Xem &amp; Tương Tác</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                Báo Cáo Phân Tích Thực Tế
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-2">
                Thống Kê Truy Cập Website Thiệp Cưới
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Theo dõi số lượng bạn bè mở thiệp, kênh gửi thiệp hiệu quả nhất và tỷ lệ xác nhận tham dự.
              </p>
            </div>

            <button
              onClick={() => onNavigate('share')}
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-2 self-start sm:self-auto"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Gửi Thêm Cho Bạn Bè</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Tổng Lượt Xem
              </span>
              <Eye className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              {analyticsData.totalPageViews.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24% so với tuần trước</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Khách Xem Riêng Biệt
              </span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              {analyticsData.uniqueVisitors.toLocaleString()}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Khách mời mở thiệp trên thiết bị cá nhân
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Tỷ Lệ Phản Hồi RSVP
              </span>
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-600">
              {analyticsData.rsvpConversionRate}%
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Rất cao so với mức trung bình 65%
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Quét Mã QR Thiệp In
              </span>
              <QrCode className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              {analyticsData.qrScans}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">Từ mã QR trên phong bì giấy</p>
          </div>
        </div>

        {/* Daily Views Bar Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Biểu Đồ Lượt Truy Cập Theo Ngày
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Số lượt mở thiệp và phản hồi RSVP hàng ngày</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-500"></span>
                <span className="text-stone-600">Lượt xem</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
                <span className="text-stone-600">Khách RSVP</span>
              </span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-2 sm:gap-6 pt-6 border-b border-stone-100">
            {analyticsData.dailyViews.map((day, idx) => {
              const maxViews = 420;
              const viewHeight = (day.views / maxViews) * 100;
              const rsvpHeight = (day.rsvps / 50) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full max-w-[40px] flex items-end justify-center gap-1 h-full">
                    {/* View bar */}
                    <div
                      style={{ height: `${viewHeight}%` }}
                      className="w-1/2 bg-rose-400 hover:bg-rose-500 rounded-t-md transition-all relative group-hover:scale-y-105"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {day.views} xem
                      </div>
                    </div>
                    {/* RSVP bar */}
                    <div
                      style={{ height: `${rsvpHeight}%` }}
                      className="w-1/2 bg-emerald-400 hover:bg-emerald-500 rounded-t-md transition-all relative group-hover:scale-y-105"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {day.rsvps} RSVP
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 mt-2 block">
                    {day.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown by Referral Sources & Devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traffic Sources */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-1 font-display">
              Nguồn Bạn Bè Mở Thiệp
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Kênh chia sẻ mang lại số lượng người xem thiệp lớn nhất
            </p>

            <div className="space-y-4">
              {analyticsData.referrers.map((ref, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-stone-700">{ref.source}</span>
                    <span className="text-stone-900 font-bold">
                      {ref.count} lượt ({ref.percent}%)
                    </span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0
                          ? 'bg-rose-500'
                          : idx === 1
                          ? 'bg-blue-500'
                          : idx === 2
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${ref.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-1 font-display">
              Thiết Bị Khách Mời Sử Dụng
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Tỷ lệ mở thiệp trên điện thoại thông minh so với máy tính
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Điện Thoại Di Động</h4>
                    <p className="text-[11px] text-stone-500">iOS iPhone, Android Samsung, Xiaomi</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-rose-600">
                    {analyticsData.deviceBreakdown.mobile}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Máy Tính Để Bàn &amp; Laptop</h4>
                    <p className="text-[11px] text-stone-500">Màn hình rộng, độ phân giải cao</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-stone-800">
                    {analyticsData.deviceBreakdown.desktop}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Tablet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Máy Tính Bảng (iPad / Tablet)</h4>
                    <p className="text-[11px] text-stone-500">Màn hình cảm ứng khổ vừa</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-stone-800">
                    {analyticsData.deviceBreakdown.tablet}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
