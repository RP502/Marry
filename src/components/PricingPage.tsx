import React from 'react';
import { Check, Sparkles, Heart, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { ViewMode } from '../types';

interface PricingPageProps {
  onNavigate: (view: ViewMode) => void;
  lang: 'vi' | 'en';
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, lang }) => {
  const plans = [
    {
      id: 'free',
      name: 'Trải Nghiệm Miễn Phí',
      price: '0đ',
      period: 'trải nghiệm không giới hạn',
      badge: null,
      description: 'Dành cho các cặp đôi muốn tạo thử thiệp cưới online và trải nghiệm tính năng.',
      highlight: false,
      features: [
        'Chọn tất cả mẫu thiệp cơ bản',
        'Tải lên tối đa 6 ảnh cưới',
        'Thông tin lễ cưới & Nhà hàng tiệc cưới',
        'Bản đồ chỉ đường Google Maps 1 chạm',
        'Đếm ngược ngày cưới thời gian thực',
        'Thời gian lưu trữ 14 ngày',
      ],
      ctaText: 'Bắt đầu miễn phí',
      ctaAction: () => onNavigate('builder'),
    },
    {
      id: 'pro',
      name: 'Gói Hạnh Phúc',
      price: '199.000đ',
      period: 'thanh toán 1 lần duy nhất',
      badge: 'Được Chọn Nhiều Nhất',
      description: 'Lựa chọn hoàn hảo cho 95% cặp đôi Việt Nam, đầy đủ mọi tiện ích hiện đại.',
      highlight: true,
      features: [
        'Mở khóa toàn bộ 400+ mẫu thiệp cao cấp',
        'Tải lên không giới hạn ảnh cưới sắc nét HD',
        'Hộp mừng cưới & Mã VietQR tự động',
        'Thu thập xác nhận tham dự (RSVP) không giới hạn',
        'Sổ lưu bút & Lời chúc phúc tương tác',
        'Nhạc nền cưới piano lãng mạn tự động phát',
        'Tạo link thiệp in tên riêng từng vị khách',
        'Lưu trữ website 1 năm sau ngày cưới',
        'Hỗ trợ kỹ thuật 24/7 qua Zalo',
      ],
      ctaText: 'Chọn gói Hạnh Phúc',
      ctaAction: () => onNavigate('builder'),
    },
    {
      id: 'vip',
      name: 'Gói Vĩnh Cửu VIP',
      price: '399.000đ',
      period: 'lưu giữ kỷ niệm trọn đời',
      badge: 'Trọn Đời Kỷ Niệm',
      description: 'Trang web kỷ niệm tình yêu lưu giữ vĩnh viễn cùng tên miền riêng theo yêu cầu.',
      highlight: false,
      features: [
        'Tất cả tính năng của gói Hạnh Phúc',
        'Lưu trữ website tình yêu VĨNH VIỄN trọn đời',
        'Tên miền riêng ngắn gọn (vd: trietvy.chungdoi.vn)',
        'Xuất file mã QR vector chuẩn in ấn lên thiệp giấy',
        'Gói quà tặng: Trọn bộ công cụ tính ngân sách & checklist',
        'Hỗ trợ chỉnh sửa và thêm hiệu ứng riêng theo yêu cầu',
        'Không hiển thị bất kỳ logo quảng cáo nào',
      ],
      ctaText: 'Chọn gói Vĩnh Cửu',
      ctaAction: () => onNavigate('builder'),
    },
  ];

  const faqs = [
    {
      q: 'Tôi có thể sửa đổi thông tin sau khi xuất bản thiệp không?',
      a: 'Hoàn toàn được! Bạn có thể chỉnh sửa mọi thông tin (ảnh cưới, giờ đón khách, sảnh tiệc, số tài khoản ngân hàng) bất kỳ lúc nào. Khách mời mở link ra sẽ luôn thấy thông tin mới nhất mà bạn không cần phải gửi lại link mới.',
    },
    {
      q: 'Tiền mừng cưới qua VietQR có bị trừ phí hay qua trung gian không?',
      a: 'Chung Đôi KHÔNG giữ tiền và KHÔNG thu bất kỳ % phí giao dịch nào. Khi khách quét mã VietQR, tiền sẽ chuyển thẳng 100% vào tài khoản ngân hàng cá nhân của cô dâu hoặc chú rể qua hệ thống Napas 24/7.',
    },
    {
      q: 'Tôi thanh toán gói dịch vụ như thế nào?',
      a: 'Chung Đôi hỗ trợ thanh toán siêu nhanh qua chuyển khoản ngân hàng quét mã QR (VietQR) hoặc ví điện tử MoMo. Sau khi thanh toán, hệ thống sẽ tự động kích hoạt tài khoản chỉ sau 10 giây.',
    },
    {
      q: 'Người lớn tuổi trong gia đình có dễ xem thiệp không?',
      a: 'Rất dễ dàng! Thiệp được thiết kế tối ưu với cỡ chữ rõ ràng, bố cục trang trọng, nút bấm to và tự động hiển thị mượt mà trên mọi dòng điện thoại thông minh (iPhone, Samsung, Oppo, Xiaomi...).',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Bảng Giá Minh Bạch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-3">
            Bảng Giá Dịch Vụ Thiệp Cưới &amp; Website Chung Đôi
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-body">
            Chi phí chỉ bằng 1/10 so với in thiệp giấy truyền thống. Tiết kiệm hàng triệu đồng cho
            đám cưới của bạn mà vẫn mang lại trải nghiệm thiệp mời sang trọng, hiện đại.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlight
                  ? 'bg-white border-2 border-rose-500 shadow-2xl shadow-rose-100 scale-105 z-10'
                  : 'bg-white/80 border border-stone-200 shadow-xs hover:shadow-xl'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-rose-500 to-amber-500 text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold font-display text-stone-900">{plan.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{plan.description}</p>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 block mt-1">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-stone-100">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-stone-100">
                <button
                  onClick={plan.ctaAction}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5 ${
                    plan.highlight
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200 hover:shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-display text-stone-900 text-center mb-8">
            Câu Hỏi Thường Gặp Về Dịch Vụ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs">
                <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed pl-6 font-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
