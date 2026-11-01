import React from 'react';

interface CuoiThoiiiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark'; // 'dark' = dark text for light header; 'light' = white text for dark footer
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * CuoiThoiiiLogo - Logo đặc biệt biểu tượng Nhẫn Cưới Song Hỷ & Kim Cương
 * Thiết kế tinh xảo: Hai chiếc nhẫn cưới vàng & vàng hồng lồng vào nhau tạo hình trái tim vĩnh cửu,
 * đính viên kim cương phát sáng lấp lánh (sparkle diamond).
 * Font chữ: Sự kết hợp hoàn mỹ giữa Playfair Display trang trọng và Cormorant Garamond uyển chuyển.
 * Tuyệt đối không có dòng chữ nhỏ bên dưới theo đúng yêu cầu tối giản, sang trọng.
 */
export const CuoiThoiiiLogo: React.FC<CuoiThoiiiLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[26px]',
    xl: 'text-[32px]',
  };

  const thoiiiSizes = {
    sm: 'text-[20px]',
    md: 'text-[25px]',
    lg: 'text-[30px]',
    xl: 'text-[36px]',
  };

  const isLight = variant === 'light';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Biểu tượng Logo đặc biệt: Cặp nhẫn đính ước & Kim Cương phát sáng */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 ${
          onClick ? 'group-hover:scale-105' : ''
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(169,35,44,0.22)]"
        >
          <defs>
            {/* Gradient nền huy hiệu sang trọng: Ruby đỏ rượu champagne */}
            <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c5283d" />
              <stop offset="50%" stopColor="#9e1828" />
              <stop offset="100%" stopColor="#670d18" />
            </linearGradient>

            {/* Gradient nhẫn vàng Gold (Chú rể) */}
            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff3c4" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            {/* Gradient nhẫn vàng hồng Rose Gold (Cô dâu) */}
            <linearGradient id="roseRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="30%" stopColor="#fb7185" />
              <stop offset="75%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            {/* Ánh kim cương phát sáng */}
            <radialGradient id="sparkleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>

            {/* Viền ngoài ánh kim */}
            <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>

          {/* Vòng nền tròn cách điệu hoa văn cưới hoàng gia */}
          <circle cx="50" cy="50" r="48" fill="url(#badgeGrad)" />
          <circle
            cx="50"
            cy="50"
            r="46.5"
            stroke="url(#rimGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#ffffff"
            strokeWidth="0.6"
            strokeOpacity="0.25"
            strokeDasharray="2 3"
          />

          {/* Hào quang trung tâm nhẹ */}
          <circle cx="50" cy="46" r="26" fill="#ffffff" fillOpacity="0.08" filter="blur(4px)" />

          {/* NHẪN 1: Nhẫn Vàng Hoàng Gia (Groom Band) */}
          <circle
            cx="40"
            cy="52"
            r="19"
            stroke="url(#goldRing)"
            strokeWidth="4.8"
            fill="none"
          />
          {/* Lớp bóng highlight tạo độ cong 3D cho nhẫn vàng */}
          <path
            d="M 24 50 A 19 19 0 0 1 40 33"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* NHẪN 2: Nhẫn Vàng Hồng Nữ Tính (Bride Band) lồng xuyên qua nhẫn vàng */}
          <circle
            cx="60"
            cy="52"
            r="19"
            stroke="url(#roseRing)"
            strokeWidth="4.8"
            fill="none"
          />
          {/* Lớp bóng highlight cho nhẫn vàng hồng */}
          <path
            d="M 60 33 A 19 19 0 0 1 76 50"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Phần đan lồng (Overlap bridge) chân thực giữa 2 nhẫn tạo hình trái tim trung tâm */}
          <path
            d="M 47.5 40 A 19 19 0 0 1 53 44"
            stroke="url(#goldRing)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 47.5 64 A 19 19 0 0 0 53 60"
            stroke="url(#roseRing)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Trái tim hồng ngọc nhỏ ở giao điểm tình yêu của 2 chiếc nhẫn */}
          <path
            d="M 50 51.5 C 50 48.5, 45.5 48.5, 45.5 52 C 45.5 55, 50 58.5, 50 58.5 C 50 58.5, 54.5 55, 54.5 52 C 54.5 48.5, 50 48.5, 50 51.5 Z"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* VIÊN KIM CƯƠNG SOLITAIRE ĐỈNH NHẪN (Diamond Solitaire) */}
          {/* Chấu kim cương 4 chấu hoàng gia */}
          <path
            d="M 56 33 L 60 27 L 64 33 Z"
            fill="url(#goldRing)"
          />
          {/* Viên đá giác cắt Brilliant Cut hình thoi */}
          <polygon
            points="60,20 65,26 60,31 55,26"
            fill="#ffffff"
            stroke="#fef08a"
            strokeWidth="0.8"
          />
          <polygon
            points="60,20 62,26 60,31 58,26"
            fill="#dbeafe"
            opacity="0.6"
          />

          {/* Ánh sao lấp lánh 4 cánh (Brilliant 4-point Diamond Starburst) */}
          <path
            d="M 60 14 Q 60 24 50 24 Q 60 24 60 34 Q 60 24 70 24 Q 60 24 60 14 Z"
            fill="url(#sparkleGlow)"
          />
          <circle cx="60" cy="24" r="2.2" fill="#ffffff" />

          {/* Tia sáng phụ tinh khôi lấp lánh */}
          <path
            d="M 27 28 Q 27 32 23 32 Q 27 32 27 36 Q 27 32 31 32 Q 27 32 27 28 Z"
            fill="#fef08a"
            opacity="0.9"
          />
          <circle cx="73" cy="69" r="1.3" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>

      {/* Font chữ Cưới thôiii đặc biệt - Không có dòng chữ nhỏ bên dưới */}
      {showText && (
        <div className="flex items-baseline tracking-tight">
          <span
            className={`font-['Playfair_Display',Georgia,serif] font-bold ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-[#381f23]'
            } transition-colors`}
          >
            Cưới
          </span>
          <span
            className={`font-['Cormorant_Garamond',serif] italic font-bold ml-1.5 ${thoiiiSizes[size]} bg-linear-to-r ${
              isLight
                ? 'from-rose-300 via-pink-200 to-amber-200'
                : 'from-[#b91c1c] via-[#c2410c] to-[#e11d48]'
            } bg-clip-text text-transparent`}
          >
            thôiii
          </span>
          {/* Dấu chấm đính ngọc lấp lánh đặc trưng */}
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-linear-to-tr from-rose-500 to-amber-400 ml-0.5 mb-1 shadow-xs"
            title="Cưới thôiii"
          />
        </div>
      )}
    </div>
  );
};
