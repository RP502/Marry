import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Download, Share2, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingData: WeddingData;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  weddingData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=FAF8F5&color=1C1917`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareZalo = () => {
    window.open(
      `https://sp.zalo.me/share_inline?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-stone-900">
            Chia Sẻ Thiệp Cưới Online
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Gửi thiệp cưới điện tử của {weddingData.groom.shortName} &amp;{' '}
            {weddingData.bride.shortName} đến người thân &amp; bạn bè.
          </p>
        </div>

        {/* QR Code preview */}
        <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 flex flex-col items-center mb-6">
          <div className="w-48 h-48 bg-white p-3 rounded-xl border border-stone-200 shadow-xs mb-3">
            <img
              src={qrCodeUrl}
              alt="Mã QR Thiệp Cưới"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Quét mã QR bằng camera điện thoại để mở thiệp
          </span>
        </div>

        {/* Link Copy Bar */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200 rounded-xl p-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-stone-700 flex-1 outline-hidden px-2 font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shrink-0 flex items-center space-x-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShareZalo}
            className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-blue-200"
          >
            <span>Gửi qua Zalo</span>
          </button>

          <button
            onClick={handleShareFacebook}
            className="py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-indigo-200"
          >
            <span>Chia sẻ Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
