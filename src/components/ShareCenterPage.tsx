import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  ArrowLeft,
  Smartphone,
  Printer,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { ViewMode, WeddingData } from '../types';

interface ShareCenterPageProps {
  weddingData: WeddingData;
  onNavigate: (view: ViewMode) => void;
}

export const ShareCenterPage: React.FC<ShareCenterPageProps> = ({
  weddingData,
  onNavigate,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedZaloMsg, setCopiedZaloMsg] = useState(false);

  const weddingUrl = `${window.location.origin}/invitation`;
  const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    weddingUrl
  )}&color=e11d48`;

  const zaloGreeting = `Thân gửi bạn và gia đình! ${weddingData.groom.name} & ${weddingData.bride.name} trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình vào ngày ${weddingData.events.ceremony.date}.\n\nXem chi tiết thiệp cưới, ảnh cưới và sơ đồ đường đi tại: ${weddingUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(weddingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyZaloMsg = () => {
    navigator.clipboard.writeText(zaloGreeting);
    setCopiedZaloMsg(true);
    setTimeout(() => setCopiedZaloMsg(false), 2000);
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
          <span className="font-semibold text-stone-800">Chia Sẻ &amp; Tải Mã QR (/share)</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Trung Tâm Chia Sẻ Thiệp
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-2">
            Chia Sẻ Thiệp Cưới &amp; Tải Mã QR In Thiệp
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Gửi thiệp qua mạng xã hội hoặc tải file mã QR sắc nét chất lượng cao để in lên phong bì thiệp giấy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Link & Message Sharing */}
          <div className="md:col-span-7 space-y-6">
            {/* 1. Direct link box */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900 mb-2">Đường Link Thiệp Cưới Chính Thức</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={weddingUrl}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs text-stone-700 select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5 shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Đã chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* 2. Zalo text message */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Tin Nhắn Mời Cưới Soạn Sẵn Cho Zalo</span>
                </h3>
                <button
                  onClick={handleCopyZaloMsg}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center space-x-1"
                >
                  {copiedZaloMsg ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedZaloMsg ? 'Đã sao chép' : 'Chép tin nhắn'}</span>
                </button>
              </div>

              <textarea
                rows={5}
                readOnly
                value={zaloGreeting}
                className="w-full p-3.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-700 leading-relaxed font-sans"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`https://zalo.me/share?url=${encodeURIComponent(weddingUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <span>Gửi Qua Zalo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(weddingUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <span>Chia sẻ Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 3. Link Social Preview Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-3">
                Xem Trước Khi Gửi Vào Nhóm Chat (Open Graph Preview)
              </span>
              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50 max-w-sm">
                <img
                  src={weddingData.heroImage}
                  alt="Wedding Preview"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-bold text-stone-900 text-xs line-clamp-1">
                    Thiệp Cưới Online: {weddingData.groom.fullName} &amp; {weddingData.bride.fullName}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                    Trân trọng kính mời quý khách đến dự lễ thành hôn vào ngày {weddingData.events.ceremony.date} tại {weddingData.events.ceremony.venue}.
                  </p>
                  <span className="text-[10px] text-stone-400 block mt-1">chungdoi.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Print QR Code */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg text-center sticky top-24">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Mã QR In Thiệp Giấy
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-6">
                In mã này vào mặt sau thiệp mời giấy để khách dùng camera quét xem album ảnh cưới và xác nhận tham dự.
              </p>

              {/* QR display */}
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-rose-200 inline-block shadow-xs mb-6">
                <img
                  src={qrDownloadUrl}
                  alt="Wedding QR Code"
                  className="w-48 h-48 mx-auto object-contain rounded-lg"
                />
                <span className="text-[11px] text-rose-600 font-semibold block mt-2">
                  {weddingData.groom.name} &hearts; {weddingData.bride.name}
                </span>
              </div>

              <div className="space-y-2.5">
                <a
                  href={qrDownloadUrl}
                  download="ma_qr_thiep_cuoi_chungdoi.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Mã QR Về Máy (HD 500x500)</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Thẻ Hướng Dẫn Quét Mã</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
