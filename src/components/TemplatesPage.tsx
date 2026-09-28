import React, { useState } from 'react';
import { Palette, Eye, ArrowRight, Check, Sparkles, Filter } from 'lucide-react';
import { WeddingTemplate, ViewMode } from '../types';
import { WEDDING_TEMPLATES } from '../data/mockData';

interface TemplatesPageProps {
  onSelectTemplate: (template: WeddingTemplate) => void;
  onNavigate: (view: ViewMode) => void;
  lang: 'vi' | 'en';
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onSelectTemplate,
  onNavigate,
  lang,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<WeddingTemplate | null>(null);

  const filterStyles = [
    { id: 'all', label: 'Tất cả (6)' },
    { id: 'floral', label: 'Lãng mạn & Pastel' },
    { id: 'luxury', label: 'Hoàng gia & Sang trọng' },
    { id: 'modern', label: 'Tối giản & Hiện đại' },
    { id: 'traditional', label: 'Truyền thống Á Đông' },
    { id: 'vintage', label: 'Vintage & Cổ điển' },
    { id: 'korean', label: 'Phong cách Hàn Quốc' },
  ];

  const filtered =
    selectedStyle === 'all'
      ? WEDDING_TEMPLATES
      : WEDDING_TEMPLATES.filter((t) => t.style === selectedStyle);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Kho Thiết Kế Chung Đôi
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-3">
            Bộ Sưu Tập Mẫu Thiệp Cưới &amp; Website Online
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-body">
            Khám phá hơn 400+ mẫu thiệp được chăm chút từng đường nét, màu sắc và typography. Dễ dàng
            tùy biến thông tin, ảnh cưới và nhạc nền chỉ trong tích tắc.
          </p>

          {/* Style Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {filterStyles.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedStyle(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedStyle === item.id
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative h-80 overflow-hidden bg-stone-100">
                <img
                  src={tpl.coverImage}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {tpl.badge && (
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-xs rounded-full text-[11px] font-bold text-rose-600 shadow-xs">
                      {tpl.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[11px] text-white font-medium">
                    {tpl.styleLabel}
                  </span>
                </div>

                {/* Color Dot */}
                <div
                  className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: tpl.themeColor }}
                  title="Tone màu chủ đạo"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      onSelectTemplate(tpl);
                      onNavigate('invitation');
                    }}
                    className="px-4 py-2.5 rounded-full bg-white text-stone-900 text-xs font-semibold shadow-lg hover:bg-stone-50 transition-colors flex items-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-rose-500" />
                    <span>Xem thử thiệp</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectTemplate(tpl);
                      onNavigate('builder');
                    }}
                    className="px-4 py-2.5 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-lg hover:bg-rose-600 transition-colors flex items-center space-x-1.5"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Dùng mẫu này</span>
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-body">
                    {tpl.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Miễn phí khởi tạo
                  </span>

                  <button
                    onClick={() => {
                      onSelectTemplate(tpl);
                      onNavigate('builder');
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                  >
                    <span>Bắt đầu sửa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
