import React, { useState, useEffect } from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Clock,
  QrCode,
  Copy,
  Check,
  Send,
  X,
  Share2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gift,
  Smile,
  ArrowLeft,
  CalendarPlus,
} from 'lucide-react';
import { WeddingData, Guest, WishItem } from '../types';
import { weddingAudio } from '../utils/audioPlayer';

interface InvitationViewProps {
  weddingData: WeddingData;
  guestName?: string;
  onBackToHome?: () => void;
  onBackToStudio?: () => void;
  onAddRsvp: (guest: Omit<Guest, 'id' | 'createdAt' | 'sent'>) => void;
  onAddWish: (wish: Omit<WishItem, 'id' | 'createdAt' | 'likes'>) => void;
  wishes: WishItem[];
  onLikeWish: (wishId: string) => void;
}

export const InvitationView: React.FC<InvitationViewProps> = ({
  weddingData,
  guestName,
  onBackToHome,
  onBackToStudio,
  onAddRsvp,
  onAddWish,
  wishes,
  onLikeWish,
}) => {
  // Envelope opening state
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Lightbox for photo gallery
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName || '');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpSide, setRsvpSide] = useState<'groom' | 'bride'>('groom');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not_attending' | 'tentative'>('attending');
  const [rsvpGuestCount, setRsvpGuestCount] = useState(1);
  const [rsvpDiet, setRsvpDiet] = useState('');
  const [rsvpWish, setRsvpWish] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wishbook Form State
  const [wishAuthor, setWishAuthor] = useState(guestName || '');
  const [wishContent, setWishContent] = useState('');
  const [wishSide, setWishSide] = useState<'groom' | 'bride'>('bride');
  const [wishSent, setWishSent] = useState(false);

  // VietQR copy toast
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(`${weddingData.mainCeremony.date}T${weddingData.mainCeremony.time}:00`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingData.mainCeremony.date, weddingData.mainCeremony.time]);

  // Handle music toggle
  const toggleMusic = () => {
    const status = weddingAudio.toggle();
    setIsPlayingMusic(status);
  };

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    // Start audio if not already playing
    if (!isPlayingMusic) {
      weddingAudio.playWeddingMelody();
      setIsPlayingMusic(true);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(key);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    onAddRsvp({
      name: rsvpName.trim(),
      phone: rsvpPhone.trim(),
      side: rsvpSide,
      attendingStatus: rsvpStatus,
      guestCount: rsvpStatus === 'attending' ? Number(rsvpGuestCount) : 0,
      dietaryNotes: rsvpDiet.trim(),
      wishes: rsvpWish.trim(),
    });

    if (rsvpWish.trim()) {
      onAddWish({
        guestName: rsvpName.trim(),
        content: rsvpWish.trim(),
        side: rsvpSide,
      });
    }

    setRsvpSubmitted(true);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishAuthor.trim() || !wishContent.trim()) return;

    onAddWish({
      guestName: wishAuthor.trim(),
      content: wishContent.trim(),
      side: wishSide,
    });

    setWishContent('');
    setWishSent(true);
    setTimeout(() => setWishSent(false), 3000);
  };

  // Google Calendar link builder
  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(weddingData.title);
    const details = encodeURIComponent(
      `Hôn lễ của ${weddingData.groom.name} & ${weddingData.bride.name}.\nĐịa điểm: ${weddingData.mainCeremony.venueName}, ${weddingData.mainCeremony.venueAddress}`
    );
    const location = encodeURIComponent(`${weddingData.mainCeremony.venueName}, ${weddingData.mainCeremony.venueAddress}`);
    const dateFormatted = weddingData.mainCeremony.date.replace(/-/g, '');
    const timeFormatted = weddingData.mainCeremony.time.replace(/:/g, '') + '00';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T${timeFormatted}/${dateFormatted}T220000Z&details=${details}&location=${location}`;
  };

  // ----------------------------------------------------
  // 1. ENVELOPE OPENING OVERLAY
  // ----------------------------------------------------
  if (!isOpened) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-100/40 text-center flex flex-col items-center">
          {/* Top Stamp Ornament */}
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-900/20 mb-4 border-2 border-white">
            <Heart className="w-8 h-8 fill-white" />
          </div>

          <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
            Thiệp Cưới Kỹ Thuật Số
          </span>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mt-2">
            Lễ Thành Hôn
          </h2>

          <div className="text-3xl sm:text-4xl font-script text-rose-600 mt-2">
            {weddingData.groom.shortName} &amp; {weddingData.bride.shortName}
          </div>

          <div className="w-24 h-px bg-stone-300 my-4" />

          {/* Salutation */}
          <div className="bg-white/80 rounded-xl px-4 py-3 border border-stone-200/80 w-full mb-6">
            <p className="text-xs text-stone-500 uppercase font-medium">Trân trọng kính mời</p>
            <p className="text-base sm:text-lg font-bold text-stone-800 mt-0.5">
              {guestName ? guestName : 'Quý Khách & Người Thương'}
            </p>
          </div>

          <p className="text-xs text-stone-600 mb-6 italic max-w-xs">
            "Cùng chúng mình chứng kiến khoảnh khắc chung đôi thiêng liêng nhất cuộc đời!"
          </p>

          {/* Open Button */}
          <button
            id="open-envelope-btn"
            onClick={handleOpenEnvelope}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-base shadow-lg shadow-rose-200 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Chạm để mở thiệp cưới</span>
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="mt-4 text-xs text-stone-400 hover:text-stone-600 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang chủ Chung Đôi</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. MAIN DIGITAL INVITATION PAGE
  // ----------------------------------------------------
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-stone-800 font-body">
      {/* Floating Top Controls (Music & Home) */}
      <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
        {/* Play/Pause Music Pill */}
        <button
          id="music-toggle-btn"
          onClick={toggleMusic}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full shadow-lg backdrop-blur-md transition-all ${
            isPlayingMusic
              ? 'bg-rose-500/90 text-white ring-2 ring-rose-300'
              : 'bg-white/90 text-stone-700 hover:bg-white'
          }`}
          title={isPlayingMusic ? 'Tắt nhạc cưới' : 'Bật giai điệu cưới'}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span className="text-xs font-semibold hidden sm:inline">Đang phát nhạc</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">Phát nhạc</span>
            </>
          )}
        </button>

        {onBackToStudio && (
          <button
            onClick={onBackToStudio}
            className="px-3 py-2 rounded-full bg-white/90 backdrop-blur-md text-stone-700 text-xs font-medium shadow-lg hover:bg-white transition-colors"
          >
            Chỉnh sửa thiệp
          </button>
        )}
      </div>

      {/* Main Container Card (Designed to look like a high-end luxury digital card) */}
      <div className="max-w-2xl mx-auto shadow-2xl bg-white border-x border-stone-200/60 overflow-hidden min-h-screen">
        {/* 1. HERO SECTION */}
        <div className="relative min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 text-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={weddingData.gallery[0]?.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'}
              alt={weddingData.title}
              className="w-full h-full object-cover brightness-95"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/85" />
          </div>

          {/* Top Text */}
          <div className="relative z-10 pt-6">
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold px-4 py-1 rounded-full bg-black/30 backdrop-blur-xs border border-amber-200/20">
              Save Our Date
            </span>
          </div>

          {/* Center Couple Names */}
          <div className="relative z-10 my-auto py-8">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-200 font-medium mb-2">
              Chúng Mình Sắp Cưới
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-script text-white drop-shadow-md leading-tight">
              {weddingData.groom.shortName} <br />
              <span className="text-amber-200 text-3xl sm:text-4xl font-serif">&amp;</span> <br />
              {weddingData.bride.shortName}
            </h1>
            <div className="w-16 h-0.5 bg-amber-200/80 mx-auto my-4" />
            <p className="text-sm sm:text-base text-stone-200 font-medium">
              {new Date(weddingData.mainCeremony.date).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-xs text-amber-200/90 italic mt-0.5">
              (Nhằm {weddingData.mainCeremony.lunarDate})
            </p>
          </div>

          {/* Bottom Countdown Card */}
          <div className="relative z-10">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-white/60">
              <p className="text-[11px] uppercase font-bold text-rose-600 tracking-wider mb-2">
                Đếm ngược đến ngày chung đôi
              </p>
              <div className="grid grid-cols-4 gap-2 text-stone-800">
                <div className="bg-stone-50 rounded-xl py-2 border border-stone-100">
                  <span className="text-xl sm:text-2xl font-bold font-display block text-stone-900">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase font-medium">Ngày</span>
                </div>
                <div className="bg-stone-50 rounded-xl py-2 border border-stone-100">
                  <span className="text-xl sm:text-2xl font-bold font-display block text-stone-900">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase font-medium">Giờ</span>
                </div>
                <div className="bg-stone-50 rounded-xl py-2 border border-stone-100">
                  <span className="text-xl sm:text-2xl font-bold font-display block text-stone-900">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase font-medium">Phút</span>
                </div>
                <div className="bg-stone-50 rounded-xl py-2 border border-stone-100">
                  <span className="text-xl sm:text-2xl font-bold font-display block text-stone-900">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase font-medium">Giây</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. INVITATION LETTER & PARENTS */}
        <section className="p-6 sm:p-10 text-center bg-[#FCFAF7] border-b border-stone-200/80">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Thư Mời Chung Vui
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
              "{weddingData.invitationMessage}"
            </p>

            {/* Parents Information */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              {/* Groom's Parents */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                  Nhà Trai
                </span>
                <p className="text-xs font-bold text-stone-800">
                  Ông: {weddingData.groom.fatherName}
                </p>
                <p className="text-xs font-bold text-stone-800">
                  Bà: {weddingData.groom.motherName}
                </p>
                <p className="text-[11px] text-stone-500">Thứ nam</p>
                <p className="text-sm font-bold text-stone-900">{weddingData.groom.name}</p>
              </div>

              {/* Bride's Parents */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                  Nhà Gái
                </span>
                <p className="text-xs font-bold text-stone-800">
                  Ông: {weddingData.bride.fatherName}
                </p>
                <p className="text-xs font-bold text-stone-800">
                  Bà: {weddingData.bride.motherName}
                </p>
                <p className="text-[11px] text-stone-500">Út nữ</p>
                <p className="text-sm font-bold text-stone-900">{weddingData.bride.name}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. GROOM & BRIDE PROFILE */}
        <section className="p-6 sm:p-10 bg-white border-b border-stone-200/80">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Nhân Vật Chính
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Cô Dâu &amp; Chú Rể
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Groom Card */}
            <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/80 text-center flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                <img
                  src={weddingData.groom.avatar}
                  alt={weddingData.groom.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Chú Rể
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                {weddingData.groom.name}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {weddingData.groom.bio}
              </p>
            </div>

            {/* Bride Card */}
            <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/80 text-center flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                <img
                  src={weddingData.bride.avatar}
                  alt={weddingData.bride.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                Cô Dâu
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-display">
                {weddingData.bride.name}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {weddingData.bride.bio}
              </p>
            </div>
          </div>
        </section>

        {/* 4. LOVE STORY MILESTONES */}
        {weddingData.theme.enableLoveStory && (
          <section className="p-6 sm:p-10 bg-[#FCFAF7] border-b border-stone-200/80">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Hành Trình Yêu Thương
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                Câu Chuyện Tình Yêu
              </h2>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-rose-200/80">
              {weddingData.loveStory.map((story, idx) => (
                <div
                  key={story.id}
                  className={`relative flex items-center ${
                    idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-xs z-10" />

                  {/* Content card */}
                  <div className="w-full sm:w-[46%] bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
                    {story.image && (
                      <div className="h-36 rounded-xl overflow-hidden mb-3">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {story.date}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 mt-1">{story.title}</h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. CEREMONY & VENUE DETAILS */}
        <section className="p-6 sm:p-10 bg-white border-b border-stone-200/80">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Thời Gian &amp; Địa Điểm
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Sự Kiện Trọng Đại
            </h2>
          </div>

          <div className="space-y-6">
            {/* Main Reception Card */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border-2 border-rose-200 shadow-sm relative overflow-hidden">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-500 text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                Tiệc Cưới Chính
              </span>

              <h3 className="text-xl font-bold text-stone-900 font-display">
                {weddingData.mainCeremony.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>
                    <strong>{weddingData.mainCeremony.time}</strong> (Đón khách)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>
                    <strong>{weddingData.mainCeremony.date}</strong>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">
                      {weddingData.mainCeremony.venueName}
                    </strong>
                    <span className="text-stone-500">
                      {weddingData.mainCeremony.venueAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${weddingData.mainCeremony.venueName}, ${weddingData.mainCeremony.venueAddress}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Chỉ đường Google Maps</span>
                </a>

                <a
                  href={createGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-rose-500" />
                  <span>Lưu vào lịch</span>
                </a>
              </div>
            </div>

            {/* Tea Ceremony (Vu Quy) Card */}
            {weddingData.teaCeremony && (
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-stone-200 text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Lễ Gia Tiên
                </span>
                <h4 className="text-base font-bold text-stone-900">
                  {weddingData.teaCeremony.name}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Vào lúc <strong>{weddingData.teaCeremony.time}</strong> ngày{' '}
                  <strong>{weddingData.teaCeremony.date}</strong> ({weddingData.teaCeremony.lunarDate})
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Tại: {weddingData.teaCeremony.venueName} - {weddingData.teaCeremony.venueAddress}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 6. WEDDING TIMELINE */}
        {weddingData.theme.enableTimeline && (
          <section className="p-6 sm:p-10 bg-[#FCFAF7] border-b border-stone-200/80">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Lịch Trình
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                Kế Hoạch Buổi Lễ
              </h2>
            </div>

            <div className="space-y-3">
              {weddingData.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs"
                >
                  <div className="w-16 shrink-0 font-bold text-sm text-rose-600 font-display">
                    {item.time}
                  </div>
                  <div className="w-px h-8 bg-stone-200 mx-3 shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">{item.title}</h4>
                    <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. DRESS CODE */}
        {weddingData.theme.enableDressCode && (
          <section className="p-6 sm:p-8 bg-white border-b border-stone-200/80 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Trang Phục Tham Dự
            </span>
            <h3 className="text-xl font-bold font-display text-stone-900 mt-1">Dress Code Gợi Ý</h3>
            <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto italic">
              {weddingData.dressCode.note}
            </p>

            <div className="flex items-center justify-center space-x-3 mt-4">
              {weddingData.dressCode.colors.map((c, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-stone-200 shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[10px] text-stone-600 mt-1 font-medium">{c.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. PHOTO GALLERY & LIGHTBOX */}
        <section className="p-6 sm:p-10 bg-[#FCFAF7] border-b border-stone-200/80">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Khoảnh Khắc Kỷ Niệm
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Album Ảnh Cưới
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {weddingData.gallery.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setActivePhotoIdx(idx)}
                className="relative h-40 sm:h-48 rounded-xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200"
              >
                <img
                  src={img.url}
                  alt={img.caption || 'Ảnh cưới'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                  Xem ảnh
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {activePhotoIdx !== null && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
              <button
                onClick={() => setActivePhotoIdx(null)}
                className="absolute top-4 right-4 text-white hover:text-stone-300 p-2"
              >
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : weddingData.gallery.length - 1
                  )
                }
                className="absolute left-4 text-white hover:text-stone-300 p-2"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="max-w-3xl max-h-[85vh] flex flex-col items-center">
                <img
                  src={weddingData.gallery[activePhotoIdx]?.url}
                  alt="Ảnh cưới phóng to"
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
                />
                {weddingData.gallery[activePhotoIdx]?.caption && (
                  <p className="text-white/80 text-xs sm:text-sm mt-3 text-center">
                    {weddingData.gallery[activePhotoIdx]?.caption}
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) =>
                    prev !== null && prev < weddingData.gallery.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-4 text-white hover:text-stone-300 p-2"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          )}
        </section>

        {/* 9. RSVP ATTENDANCE CONFIRMATION FORM */}
        {weddingData.theme.enableRsvp && (
          <section id="rsvp-section" className="p-6 sm:p-10 bg-white border-b border-stone-200/80">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Xác Nhận Tham Dự
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                Sự Hiện Diện Của Bạn
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Kính mong bạn phản hồi sớm để chúng mình chuẩn bị chu đáo nhất!
              </p>
            </div>

            {rsvpSubmitted ? (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-900">
                  Gửi xác nhận thành công!
                </h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Cảm ơn <strong>{rsvpName}</strong> đã phản hồi. Chúng mình rất mong chờ được đón tiếp
                  bạn trong ngày trọng đại!
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-emerald-800 underline"
                >
                  Thay đổi câu trả lời
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tên của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Ví dụ: Anh Hoàng Nam, Chị Lan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="0912..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Khách của ai
                    </label>
                    <select
                      value={rsvpSide}
                      onChange={(e) => setRsvpSide(e.target.value as 'groom' | 'bride')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-rose-500 focus:outline-hidden bg-white"
                    >
                      <option value="groom">Nhà Trai (Chú rể)</option>
                      <option value="bride">Nhà Gái (Cô dâu)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Bạn sẽ tham gia chứ? <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('attending')}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        rsvpStatus === 'attending'
                          ? 'bg-rose-50 border-rose-500 text-rose-700'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      Chắc chắn đến 🎉
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('tentative')}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        rsvpStatus === 'tentative'
                          ? 'bg-amber-50 border-amber-500 text-amber-700'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      Chưa chắc 🤔
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('not_attending')}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        rsvpStatus === 'not_attending'
                          ? 'bg-stone-200 border-stone-400 text-stone-800'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      Rất tiếc vắng 💌
                    </button>
                  </div>
                </div>

                {rsvpStatus === 'attending' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số lượng người tham dự (bao gồm bạn)
                    </label>
                    <select
                      value={rsvpGuestCount}
                      onChange={(e) => setRsvpGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-rose-500 focus:outline-hidden bg-white"
                    >
                      <option value={1}>1 người (Mình đi 1 mình)</option>
                      <option value={2}>2 người (Đi cùng người thương / bạn)</option>
                      <option value={3}>3 người (Gia đình 3 người)</option>
                      <option value={4}>4 người (Gia đình 4 người)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ghi chú món ăn (Ăn chay, dị ứng...)
                  </label>
                  <input
                    type="text"
                    value={rsvpDiet}
                    onChange={(e) => setRsvpDiet(e.target.value)}
                    placeholder="Không bắt buộc..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Lời chúc gửi đến cô dâu chú rể
                  </label>
                  <textarea
                    rows={2}
                    value={rsvpWish}
                    onChange={(e) => setRsvpWish(e.target.value)}
                    placeholder="Gửi lời chúc hạnh phúc..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-200 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Xác nhận tham dự</span>
                </button>
              </form>
            )}
          </section>
        )}

        {/* 10. WEDDING GIFT BOX & VIETQR */}
        {weddingData.theme.enableGiftBox && (
          <section className="p-6 sm:p-10 bg-[#FCFAF7] border-b border-stone-200/80">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Hộp Mừng Cưới
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                Gửi Quà Mừng &amp; Lì Xì
              </h2>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Sự hiện diện của bạn là niềm vinh hạnh lớn nhất. Nếu không thể đến dự hoặc muốn gửi quà
                chúc mừng từ xa, bạn có thể quét mã VietQR bên dưới.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Groom's Bank */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col items-center text-center">
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full mb-2">
                  Mừng Chú Rể ({weddingData.groom.shortName})
                </span>

                {/* QR Image */}
                <div className="w-40 h-40 bg-stone-50 rounded-xl overflow-hidden p-2 border border-stone-100 mb-3 shadow-inner">
                  <img
                    src={weddingData.groom.bank.qrUrl || `https://api.vietqr.io/image/${weddingData.groom.bank.bankCode}-${weddingData.groom.bank.accountNumber}-compact2.jpg`}
                    alt="VietQR Chú Rể"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-xs font-bold text-stone-900">
                  {weddingData.groom.bank.bankName}
                </p>
                <div className="flex items-center space-x-1.5 mt-1 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-800">
                    {weddingData.groom.bank.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(weddingData.groom.bank.accountNumber, 'groom')}
                    className="text-stone-500 hover:text-rose-600"
                    title="Sao chép số tài khoản"
                  >
                    {copiedBank === 'groom' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 uppercase font-medium">
                  {weddingData.groom.bank.accountHolder}
                </p>
              </div>

              {/* Bride's Bank */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col items-center text-center">
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full mb-2">
                  Mừng Cô Dâu ({weddingData.bride.shortName})
                </span>

                {/* QR Image */}
                <div className="w-40 h-40 bg-stone-50 rounded-xl overflow-hidden p-2 border border-stone-100 mb-3 shadow-inner">
                  <img
                    src={weddingData.bride.bank.qrUrl || `https://api.vietqr.io/image/${weddingData.bride.bank.bankCode}-${weddingData.bride.bank.accountNumber}-compact2.jpg`}
                    alt="VietQR Cô Dâu"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-xs font-bold text-stone-900">
                  {weddingData.bride.bank.bankName}
                </p>
                <div className="flex items-center space-x-1.5 mt-1 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-800">
                    {weddingData.bride.bank.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(weddingData.bride.bank.accountNumber, 'bride')}
                    className="text-stone-500 hover:text-rose-600"
                    title="Sao chép số tài khoản"
                  >
                    {copiedBank === 'bride' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 uppercase font-medium">
                  {weddingData.bride.bank.accountHolder}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 11. GUESTBOOK / SỔ LƯU BÚT */}
        {weddingData.theme.enableGuestbook && (
          <section className="p-6 sm:p-10 bg-white">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Sổ Lưu Bút Kỷ Niệm
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
                Gửi Lời Chúc Phúc
              </h2>
            </div>

            {/* Submit wish form */}
            <form onSubmit={handleWishSubmit} className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-stone-200 mb-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={wishAuthor}
                  onChange={(e) => setWishAuthor(e.target.value)}
                  placeholder="Tên của bạn..."
                  className="px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-rose-500 focus:outline-hidden bg-white"
                />
                <select
                  value={wishSide}
                  onChange={(e) => setWishSide(e.target.value as 'groom' | 'bride')}
                  className="px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-rose-500 focus:outline-hidden bg-white"
                >
                  <option value="groom">Bạn chú rể</option>
                  <option value="bride">Bạn cô dâu</option>
                </select>
              </div>
              <textarea
                required
                rows={2}
                value={wishContent}
                onChange={(e) => setWishContent(e.target.value)}
                placeholder="Viết lời chúc ngọt ngào gửi gắm đến đôi uyên ương..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-rose-500 focus:outline-hidden bg-white"
              />
              <div className="flex justify-between items-center">
                {wishSent ? (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Đã gửi lời chúc!
                  </span>
                ) : <span />}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi lời chúc</span>
                </button>
              </div>
            </form>

            {/* List of wishes */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-stone-900">{w.guestName}</span>
                      <span className="text-[10px] bg-rose-100/70 text-rose-700 px-1.5 py-0.2 rounded font-medium">
                        {w.side === 'groom' ? 'Nhà trai' : 'Nhà gái'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400">{w.createdAt}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-body">
                    "{w.content}"
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onLikeWish(w.id)}
                      className="flex items-center space-x-1 text-[11px] text-rose-500 hover:text-rose-600"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{w.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. FOOTER & THANK YOU */}
        <footer className="p-8 bg-[#FAF5F0] border-t border-stone-200 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Heart className="w-4 h-4 fill-rose-600" />
          </div>
          <h3 className="text-xl font-script text-stone-800">
            Minh Triết &amp; Thảo Vy
          </h3>
          <p className="text-xs text-stone-500 italic">
            Chân thành cảm ơn sự hiện diện và những lời chúc phúc của quý khách!
          </p>
          <div className="pt-4 text-[10px] text-stone-400">
            Được tạo bởi nền tảng thiệp cưới trực tuyến <strong>ChungDoi.com</strong>
          </div>
        </footer>
      </div>
    </div>
  );
};
