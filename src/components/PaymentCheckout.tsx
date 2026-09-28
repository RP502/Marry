import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  Crown,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Clock,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { ViewMode, UserAccount } from '../types';

interface PaymentCheckoutProps {
  user: UserAccount | null;
  onNavigate: (view: ViewMode) => void;
  onPaymentSuccess: (plan: 'pro' | 'vip') => void;
}

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  user,
  onNavigate,
  onPaymentSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'vip'>('pro');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'momo'>('vietqr');
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const orderCode = 'CD-89215';
  const amount = selectedPlan === 'pro' ? 199000 : 399000;
  const transferContent = `${orderCode} ${user?.phone?.replace(/\s/g, '') || '0988123456'}`;

  // VietQR URL format
  const qrUrl = `https://img.vietqr.io/image/970436-1028888999-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=CONG%20TY%20CHUNG%20DOI%20VIETNAM`;

  const handleCopyAcc = () => {
    navigator.clipboard.writeText('1028888999');
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(transferContent);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  const handleConfirmPaid = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsPaidSuccess(true);
      onPaymentSuccess(selectedPlan);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 pt-8">
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
          <span className="font-semibold text-stone-800">Thanh Toán &amp; Nâng Cấp Gói</span>
        </div>

        {isPaidSuccess ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 shadow-xl max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold font-display text-stone-900">
              Kích Hoạt Gói Thành Công!
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Cảm ơn hai bạn! Gói <strong>{selectedPlan === 'pro' ? 'Hạnh Phúc Pro' : 'Vĩnh Cửu VIP'}</strong> đã
              được kích hoạt cho website cưới của bạn. Toàn bộ tính năng cao cấp đã sẵn sàng sử dụng.
            </p>
            <div className="mt-8 flex justify-center space-x-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
              >
                Về Trang Quản Lý
              </button>
              <button
                onClick={() => onNavigate('invitation')}
                className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
              >
                Xem Thiệp Cưới
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Plan selector & Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                  Nâng Cấp Gói Dịch Vụ Chung Đôi
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Thanh toán 1 lần duy nhất, kích hoạt ngay lập tức với công nghệ VietQR Napas 24/7.
                </p>
              </div>

              {/* Package selector */}
              <div className="space-y-3">
                <div
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'pro'
                      ? 'border-rose-500 bg-rose-50/40 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === 'pro' ? 'border-rose-500 bg-rose-500' : 'border-stone-300'
                      }`}
                    >
                      {selectedPlan === 'pro' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-stone-900">Gói Hạnh Phúc Pro</span>
                        <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Phổ Biến Nhất
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Xoá watermark, hộp mừng VietQR, không giới hạn khách mời &amp; RSVP
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-stone-900">199.000 đ</span>
                    <span className="block text-[10px] text-stone-400 line-through">399.000 đ</span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPlan('vip')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'vip'
                      ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === 'vip' ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
                      }`}
                    >
                      {selectedPlan === 'vip' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-stone-900">Gói Vĩnh Cửu VIP</span>
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                          <Crown className="w-3 h-3 text-amber-600" />
                          <span>VIP Trọn Đời</span>
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Tất cả tính năng Pro + Lưu trữ video 4K, hỗ trợ tạo thiệp riêng qua Zalo 24/7
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-amber-700">399.000 đ</span>
                    <span className="block text-[10px] text-stone-400 line-through">799.000 đ</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-3">
                  Chọn Phương Thức Thanh Toán
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                      paymentMethod === 'vietqr'
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 font-bold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-rose-600" />
                    <div>
                      <div className="text-xs">Chuyển Khoản VietQR</div>
                      <div className="text-[10px] text-stone-500 font-normal">Quét mã mọi ngân hàng</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-rose-500 bg-rose-50/50 text-rose-900 font-bold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-pink-600" />
                    <div>
                      <div className="text-xs">Ví Điện Tử MoMo</div>
                      <div className="text-[10px] text-stone-500 font-normal">Xác nhận nhanh 5s</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex items-center space-x-4 text-xs text-stone-500">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bảo mật chuẩn ngân hàng</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Kích hoạt tự động 24/7</span>
                </div>
              </div>
            </div>

            {/* Right: VietQR Code Box & Transfer Info */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-lg sticky top-24">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                    Mã Thanh Toán QR Code
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 mt-1">
                    Mở Ứng Dụng Ngân Hàng Để Quét Mã
                  </h3>
                </div>

                {/* QR Display */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col items-center justify-center mb-5">
                  <img
                    src={qrUrl}
                    alt="VietQR Chung Doi"
                    className="w-52 h-52 object-contain rounded-xl shadow-xs"
                  />
                  <span className="text-[10px] text-stone-400 mt-2 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Mã thanh toán có hiệu lực trong 15 phút</span>
                  </span>
                </div>

                {/* Bank Details */}
                <div className="space-y-2.5 text-xs text-stone-700 mb-6">
                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Ngân hàng:</span>
                    <strong className="text-stone-900">Vietcombank (VCB)</strong>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Số tài khoản:</span>
                    <div className="flex items-center space-x-2">
                      <strong className="text-stone-900 font-mono text-xs">1028888999</strong>
                      <button
                        onClick={handleCopyAcc}
                        className="text-rose-600 hover:text-rose-700"
                        title="Sao chép"
                      >
                        {copiedAcc ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Chủ tài khoản:</span>
                    <strong className="text-stone-900 uppercase text-[11px]">CONG TY CHUNG DOI VIETNAM</strong>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Số tiền thanh toán:</span>
                    <strong className="text-rose-600 font-bold text-sm">
                      {amount.toLocaleString('vi-VN')} đ
                    </strong>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Nội dung chuyển:</span>
                    <div className="flex items-center space-x-2">
                      <strong className="text-stone-900 font-mono text-xs bg-amber-50 px-1.5 py-0.5 rounded text-amber-900">
                        {transferContent}
                      </strong>
                      <button
                        onClick={handleCopyContent}
                        className="text-rose-600 hover:text-rose-700"
                        title="Sao chép nội dung"
                      >
                        {copiedContent ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmPaid}
                  disabled={isVerifying}
                  className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang Kiểm Tra Giao Dịch...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tôi Đã Chuyển Khoản Thành Công</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
