import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Star,
  Heart,
  Phone,
  MessageCircle,
  Check,
  CheckCircle2,
  ChevronRight,
  X,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Building2,
  Camera,
  Shirt,
  UserCheck,
  Flower2,
  Gem,
  Gift,
  Car,
  Compass,
  Calendar,
  DollarSign,
  Award,
  ExternalLink,
  Clock,
  ArrowRight,
  Calculator,
  Eye,
  Percent,
} from 'lucide-react';
import { ViewMode } from '../types';
import {
  WEDDING_VENDORS,
  VENDOR_CATEGORIES,
  WeddingVendor,
  WeddingVendorCategory,
} from '../data/weddingServicesData';

interface WeddingServicesPageProps {
  onNavigate: (view: ViewMode) => void;
}

export const WeddingServicesPage: React.FC<WeddingServicesPageProps> = ({ onNavigate }) => {
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<WeddingVendorCategory>('all');
  // City filter
  const [selectedCity, setSelectedCity] = useState<string>('all');
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Price range filter
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  // Sort order
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'reviews'>('rating');
  // Perks filter
  const [onlyPerks, setOnlyPerks] = useState<boolean>(false);

  // Favorites (stored in localStorage)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chungdoi_vendor_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('chungdoi_vendor_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (vendorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  // Selected vendor for details modal
  const [activeVendor, setActiveVendor] = useState<WeddingVendor | null>(null);
  // Selected vendor for quotation modal
  const [quotationVendor, setQuotationVendor] = useState<WeddingVendor | null>(null);

  // Quotation form states
  const [quoteForm, setQuoteForm] = useState({
    coupleName: '',
    phone: '',
    weddingDate: '',
    guestCount: '250',
    budgetEstimate: '100 - 200 triệu',
    notes: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // AI Smart Matcher Quick Tool (Inspired by Plan Cưới)
  const [showSmartMatcher, setShowSmartMatcher] = useState(false);
  const [matcherCity, setMatcherCity] = useState('TP. Hồ Chí Minh');
  const [matcherBudget, setMatcherBudget] = useState('medium');
  const [matcherCategory, setMatcherCategory] = useState<WeddingVendorCategory>('venue');

  // Budget Planner Calculator drawer / state
  const [selectedBudgetVendorIds, setSelectedBudgetVendorIds] = useState<string[]>([
    'venue-white-palace',
    'photo-tuart',
    'bride-nicole-bridal',
    'makeup-quach-anh',
  ]);

  // Filter logic
  const filteredVendors = useMemo(() => {
    let result = [...WEDDING_VENDORS];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    // City
    if (selectedCity !== 'all') {
      result = result.filter((v) => v.city === selectedCity || v.city === 'Toàn quốc');
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.tagline.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.district.toLowerCase().includes(q) ||
          v.address.toLowerCase().includes(q) ||
          v.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Perks
    if (onlyPerks) {
      result = result.filter((v) => v.perks && v.perks.length > 0);
    }

    // Price range
    if (selectedPriceRange === 'under-5m') {
      result = result.filter((v) => v.priceStartingNum < 5000000);
    } else if (selectedPriceRange === '5m-15m') {
      result = result.filter((v) => v.priceStartingNum >= 5000000 && v.priceStartingNum <= 15000000);
    } else if (selectedPriceRange === 'above-15m') {
      result = result.filter((v) => v.priceStartingNum > 15000000);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price-asc') return a.priceStartingNum - b.priceStartingNum;
      if (sortBy === 'price-desc') return b.priceStartingNum - a.priceStartingNum;
      return 0;
    });

    return result;
  }, [selectedCategory, selectedCity, searchQuery, selectedPriceRange, sortBy, onlyPerks]);

  const handleApplySmartMatch = () => {
    setSelectedCity(matcherCity);
    setSelectedCategory(matcherCategory);
    setShowSmartMatcher(false);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  // Render category icon helper
  const renderCategoryIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className={className} />;
      case 'Camera':
        return <Camera className={className} />;
      case 'Shirt':
        return <Shirt className={className} />;
      case 'UserCheck':
        return <UserCheck className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flower2':
        return <Flower2 className={className} />;
      case 'Gem':
        return <Gem className={className} />;
      case 'Gift':
        return <Gift className={className} />;
      case 'Car':
        return <Car className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  // Calculate estimated budget
  const estimatedBudgetTotal = useMemo(() => {
    return selectedBudgetVendorIds.reduce((sum, id) => {
      const vendor = WEDDING_VENDORS.find((v) => v.id === id);
      if (!vendor) return sum;
      // Multiply venue by 25 tables as sample
      if (vendor.category === 'venue') {
        return sum + vendor.priceStartingNum * 25;
      }
      return sum + vendor.priceStartingNum;
    }, 0);
  }, [selectedBudgetVendorIds]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 pb-24">
      {/* 1. HERO HEADER (PLAN CƯỚI STYLE) */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#FFF5F6] via-[#FAF6F3] to-[#FAF8F5] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#F0E6E1]">
        {/* Decorative blur rings */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Plan Cưới Inspiration Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-rose-200 shadow-xs text-rose-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Khám phá dịch vụ cưới chuẩn Plan Cưới &amp; ChungĐôi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
              Khám Phá Nhà Cung Cấp &amp; Dịch Vụ Cưới{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-600 via-rose-500 to-amber-600">
                Uy Tín Hàng Đầu
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-body">
              Tìm kiếm sảnh tiệc lộng lẫy, studio ảnh cưới triệu view, váy cưới may đo và trọn gói trang trí cưới đẹp nhất.
              Nhận báo giá công khai, đối soát minh bạch và nhận đặc quyền ưu đãi độc quyền lên tới 30%.
            </p>

            {/* Quick action buttons & AI matcher trigger */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowSmartMatcher(true)}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-200 transition-all hover:scale-102"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Gợi Ý Nhà Cung Cấp (30 giây)</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('budget-estimator-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                <Calculator className="w-4 h-4 text-rose-600" />
                <span>Dự Toán Ngân Sách Dịch Vụ</span>
              </button>
            </div>

            {/* Trust Bullets */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              {[
                { title: '500+ Đối tác tuyển chọn', desc: 'Kiểm duyệt pháp lý & cơ sở' },
                { title: 'Báo giá minh bạch', desc: 'Không phí ẩn, cam kết chuẩn' },
                { title: 'Ưu đãi độc quyền', desc: 'Quà tặng tới 10 triệu đồng' },
                { title: 'Tư vấn 1-1 miễn phí', desc: 'Hỗ trợ suốt quá trình chuẩn bị' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-stone-200/80 shadow-2xs"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 pl-5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR (LIKE PLANCUOI.COM) */}
      <section className="sticky top-[74px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {VENDOR_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-200'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {renderCategoryIcon(cat.iconName, 'w-3.5 h-3.5')}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN FILTER & SEARCH BAR */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhà hàng, studio ảnh cưới, váy, phong cách..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-rose-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white text-stone-700 focus:outline-hidden focus:border-rose-400 cursor-pointer"
              >
                <option value="all">📍 Toàn quốc (Tất cả khu vực)</option>
                <option value="TP. Hồ Chí Minh">📍 TP. Hồ Chí Minh</option>
                <option value="Hà Nội">📍 Hà Nội</option>
                <option value="Đà Nẵng">📍 Đà Nẵng</option>
                <option value="Cần Thơ">📍 Cần Thơ</option>
              </select>
            </div>

            {/* Price Range Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white text-stone-700 focus:outline-hidden focus:border-rose-400 cursor-pointer"
              >
                <option value="all">💰 Mọi mức giá</option>
                <option value="under-5m">Dưới 5 triệu</option>
                <option value="5m-15m">5 - 15 triệu</option>
                <option value="above-15m">Trên 15 triệu</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white text-stone-700 focus:outline-hidden focus:border-rose-400 cursor-pointer"
              >
                <option value="rating">⭐ Đánh giá cao nhất</option>
                <option value="reviews">💬 Nhiều review nhất</option>
                <option value="price-asc">💵 Giá: Thấp đến Cao</option>
                <option value="price-desc">💎 Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Quick Perks toggle & Results count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyPerks}
                  onChange={(e) => setOnlyPerks(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4 border-stone-300"
                />
                <span className="font-medium text-stone-700 flex items-center space-x-1">
                  <Percent className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chỉ hiện đối tác có Ưu Đãi Độc Quyền</span>
                </span>
              </label>

              {favorites.length > 0 && (
                <button
                  onClick={() => {
                    const favVendors = WEDDING_VENDORS.filter((v) => favorites.includes(v.id));
                    if (favVendors.length > 0) {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedCity('all');
                    }
                  }}
                  className="text-rose-600 hover:underline font-semibold flex items-center space-x-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Đã lưu ({favorites.length})</span>
                </button>
              )}
            </div>

            <p className="text-stone-500 font-medium">
              Tìm thấy <strong className="text-stone-900">{filteredVendors.length}</strong> nhà cung cấp phù hợp
            </p>
          </div>
        </div>

        {/* 4. VENDOR GRID DISPLAY */}
        <section className="mt-8">
          {filteredVendors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 max-w-xl mx-auto space-y-4">
              <Compass className="w-12 h-12 text-rose-400 mx-auto" />
              <h3 className="text-lg font-bold text-stone-900">Không tìm thấy nhà cung cấp nào</h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Thử thay đổi từ khóa tìm kiếm, chọn lại khu vực hoặc bỏ bộ lọc mức giá để xem thêm nhiều lựa chọn.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCity('all');
                  setSelectedPriceRange('all');
                  setSearchQuery('');
                  setOnlyPerks(false);
                }}
                className="px-5 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => {
                const isFav = favorites.includes(vendor.id);
                return (
                  <article
                    key={vendor.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative h-56 overflow-hidden bg-stone-100">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-black/20" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                          {vendor.badge && (
                            <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
                              {vendor.badge}
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs text-white text-[10px] font-medium">
                            {vendor.categoryLabel}
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(vendor.id, e)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-xs"
                          title={isFav ? 'Bỏ lưu' : 'Lưu yêu thích'}
                        >
                          <Heart
                            className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`}
                          />
                        </button>

                        {/* City and Rating floating at bottom of image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <div className="flex items-center space-x-1 drop-shadow-md">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            <span className="font-medium truncate max-w-[180px]">
                              {vendor.district}, {vendor.city}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="font-bold">{vendor.rating}</span>
                            <span className="text-[10px] text-stone-300">({vendor.reviewCount})</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5">
                        <h3
                          onClick={() => setActiveVendor(vendor)}
                          className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          {vendor.name}
                        </h3>

                        <p className="text-xs text-rose-700 font-medium mt-1 line-clamp-1">
                          {vendor.tagline}
                        </p>

                        <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                          {vendor.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {vendor.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Perks Box (Plan Cưới Exclusive Value) */}
                        {vendor.perks && vendor.perks.length > 0 && (
                          <div className="mt-3.5 bg-rose-50/70 border border-rose-100/90 rounded-xl p-2.5 text-[11px] space-y-1">
                            <div className="flex items-center space-x-1 text-rose-700 font-bold">
                              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                              <span>Ưu đãi độc quyền qua ChungĐôi:</span>
                            </div>
                            <p className="text-stone-700 pl-4 font-medium line-clamp-1">
                              &bull; {vendor.perks[0]}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTAs */}
                    <div className="px-5 pb-5 pt-3 border-t border-stone-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs text-stone-500">Giá tham khảo:</span>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-rose-600 font-display">
                            {vendor.priceStarting}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">
                            {' '}
                            / {vendor.priceType}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveVendor(vendor)}
                          className="w-full py-2.5 rounded-xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/50 text-stone-700 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-500" />
                          <span>Xem chi tiết</span>
                        </button>

                        <button
                          onClick={() => {
                            setQuotationVendor(vendor);
                            setQuoteSubmitted(false);
                          }}
                          className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-1"
                        >
                          <span>Nhận báo giá</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* 5. WEDDING BUDGET ESTIMATOR & COMBO (PLAN CƯỚI PLANNER COMPONENT) */}
        <section id="budget-estimator-section" className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Công cụ dự toán dịch vụ cưới 2026</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                Tính Nhanh Ngân Sách &amp; Combo Dịch Vụ
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-body">
                Chọn các đối tác tiêu biểu bạn muốn hợp tác trong ngày cưới. Hệ thống tự động tính tổng
                chi phí dự kiến và áp dụng chiết khấu độc quyền giúp đôi bạn tiết kiệm tối đa.
              </p>

              <div className="pt-2 bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Ước tính tổng chi phí (dành cho tiệc ~250 khách):</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-display">
                  {estimatedBudgetTotal.toLocaleString('vi-VN')} đ
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tiết kiệm ước tính ~12.000.000đ khi đặt trọn gói qua ChungĐôi</span>
                </p>
              </div>

              <button
                onClick={() => {
                  setQuotationVendor(WEDDING_VENDORS[0]);
                  setQuoteSubmitted(false);
                }}
                className="w-full py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Nhận Tư Vấn Trọn Gói Tiết Kiệm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Checkbox item list */}
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Tick chọn các hạng mục cần chuẩn bị:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WEDDING_VENDORS.slice(0, 8).map((vendor) => {
                  const isChecked = selectedBudgetVendorIds.includes(vendor.id);
                  return (
                    <div
                      key={vendor.id}
                      onClick={() => {
                        setSelectedBudgetVendorIds((prev) =>
                          prev.includes(vendor.id)
                            ? prev.filter((id) => id !== vendor.id)
                            : [...prev, vendor.id]
                        );
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 select-none ${
                        isChecked
                          ? 'border-rose-400 bg-rose-50/40 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent onClick
                        className="mt-0.5 rounded text-rose-600 focus:ring-rose-500 w-4 h-4 border-stone-300"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {vendor.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 truncate">{vendor.categoryLabel}</p>
                        <p className="text-xs font-bold text-rose-600 mt-1">
                          {vendor.priceStarting}{' '}
                          <span className="text-[10px] text-stone-400 font-normal">
                            /{vendor.priceType}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. PARTNER WITH US BANNER */}
        <section className="mt-12 bg-linear-to-r from-stone-900 to-stone-800 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
              Dành cho đối tác cung cấp dịch vụ cưới
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Bạn là Nhà hàng, Studio hay Chuyên gia cưới hỏi?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Gia nhập mạng lưới đối tác cùng Plan Cưới &amp; ChungĐôi để tiếp cận hơn 85.000+ cặp đôi cô dâu chú rể sắp tổ chức hôn lễ mỗi năm.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                alert('Vui lòng liên hệ hotline đối tác: 0988 123 456 hoặc gửi hồ sơ về partner@chungdoi.com');
              }}
              className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Đăng Ký Trở Thành Đối Tác
            </button>
            <button
              onClick={() => onNavigate('builder')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Tạo Thiệp Cưới Online
            </button>
          </div>
        </section>
      </main>

      {/* --- MODAL 1: AI SMART MATCHER (30 SECONDS) --- */}
      {showSmartMatcher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <button
              onClick={() => setShowSmartMatcher(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>GỢI Ý TỰ ĐỘNG THEO YÊU CẦU</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-2 font-display">
              Tìm Nhà Cung Cấp Phù Hợp Trong 30 Giây
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Trả lời 3 câu hỏi nhanh, hệ thống sẽ đề xuất danh sách nhà cung cấp tối ưu nhất theo ngân sách và địa điểm của hai bạn.
            </p>

            <div className="mt-6 space-y-4 text-xs">
              {/* Question 1: City */}
              <div>
                <label className="block font-bold text-stone-800 mb-1.5">
                  1. Bạn dự định tổ chức đám cưới ở đâu?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setMatcherCity(city)}
                      className={`py-2 px-3 rounded-xl border font-semibold text-center transition-all ${
                        matcherCity === city
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Category */}
              <div>
                <label className="block font-bold text-stone-800 mb-1.5">
                  2. Dịch vụ bạn đang quan tâm nhất hiện tại?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'venue', label: 'Nhà hàng tiệc cưới' },
                    { id: 'photo', label: 'Studio & Phóng sự' },
                    { id: 'bride_dress', label: 'Váy cưới & Trang phục' },
                    { id: 'decor', label: 'Trang trí & Gia tiên' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMatcherCategory(item.id as WeddingVendorCategory)}
                      className={`py-2 px-3 rounded-xl border font-semibold text-center transition-all ${
                        matcherCategory === item.id
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Budget tier */}
              <div>
                <label className="block font-bold text-stone-800 mb-1.5">
                  3. Mức ngân sách dự kiến của bạn?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'saving', label: 'Tiết kiệm (< 50tr)' },
                    { id: 'medium', label: 'Tiêu chuẩn (50-150tr)' },
                    { id: 'luxury', label: 'Cao cấp (> 150tr)' },
                  ].map((budget) => (
                    <button
                      key={budget.id}
                      type="button"
                      onClick={() => setMatcherBudget(budget.id)}
                      className={`py-2 px-2.5 rounded-xl border font-semibold text-center transition-all ${
                        matcherBudget === budget.id
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowSmartMatcher(false)}
                className="flex-1 py-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleApplySmartMatch}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Xem Nhà Cung Cấp Phù Hợp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: VENDOR DETAIL MODAL --- */}
      {activeVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col">
            {/* Header with image */}
            <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
              <img
                src={activeVendor.image}
                alt={activeVendor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-black/30" />

              <button
                onClick={() => setActiveVendor(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {activeVendor.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
                  {activeVendor.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs mt-1 text-stone-200">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{activeVendor.rating}</span>
                    <span>({activeVendor.reviewCount} đánh giá từ cặp đôi)</span>
                  </div>
                  <span>&bull;</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{activeVendor.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
              {/* Introduction */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">Giới thiệu dịch vụ</h4>
                <p className="text-stone-600 leading-relaxed">{activeVendor.description}</p>
              </div>

              {/* Gallery Photos */}
              {activeVendor.gallery && activeVendor.gallery.length > 0 && (
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-2">Hình ảnh thực tế</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeVendor.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Hình ảnh thực tế"
                        className="rounded-xl h-28 w-full object-cover border border-stone-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Special Perks */}
              {activeVendor.perks && activeVendor.perks.length > 0 && (
                <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4">
                  <h4 className="font-bold text-rose-800 flex items-center space-x-1.5 text-sm mb-2">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Đặc quyền ưu đãi độc quyền qua ChungĐôi &amp; Plan Cưới:</span>
                  </h4>
                  <ul className="space-y-1.5 text-stone-700">
                    {activeVendor.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs">
                        <Check className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Packages List */}
              {activeVendor.packages && activeVendor.packages.length > 0 && (
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-3">Các gói dịch vụ tiêu biểu</h4>
                  <div className="space-y-3">
                    {activeVendor.packages.map((pkg, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border ${
                          pkg.isPopular
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-stone-200 bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 text-xs sm:text-sm">
                            {pkg.name}
                          </span>
                          <span className="font-extrabold text-rose-600 font-display">
                            {pkg.price}
                          </span>
                        </div>
                        <ul className="mt-2.5 space-y-1 text-xs text-stone-600">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center space-x-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact direct */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-100 p-4 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-800">Hotline tư vấn nhanh:</p>
                  <p className="text-sm font-extrabold text-rose-600">{activeVendor.hotline}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${activeVendor.hotline}`}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 flex items-center justify-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gọi điện</span>
                  </a>
                  <a
                    href={`https://zalo.me/${activeVendor.zalo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveVendor(null)}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Đóng
              </button>

              <button
                onClick={() => {
                  setQuotationVendor(activeVendor);
                  setActiveVendor(null);
                  setQuoteSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Yêu Cầu Báo Giá &amp; Đặt Lịch Tư Vấn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: REQUEST QUOTATION & APPOINTMENT --- */}
      {quotationVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <button
              onClick={() => setQuotationVendor(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 font-display">
                  Đã Gửi Yêu Cầu Thành Công!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Đội ngũ đối tác <strong>{quotationVendor.name}</strong> và chuyên viên Plan Cưới sẽ liên hệ lại với bạn qua số điện thoại <strong>{quoteForm.phone || 'của bạn'}</strong> trong vòng 15 phút để gửi báo giá chi tiết và ưu đãi.
                </p>
                <button
                  onClick={() => setQuotationVendor(null)}
                  className="px-6 py-2.5 rounded-full bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Hoàn tất
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                    Báo giá dịch vụ cưới miễn phí
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-1 font-display">
                    Đặt Lịch &amp; Nhận Báo Giá
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Gửi yêu cầu tới <strong>{quotationVendor.name}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tên cô dâu &amp; chú rể <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.coupleName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, coupleName: e.target.value })}
                    placeholder="Ví dụ: Minh Triết & Thảo Vy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-rose-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số điện thoại / Zalo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      placeholder="0988 123 456"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ngày cưới dự kiến
                    </label>
                    <input
                      type="date"
                      value={quoteForm.weddingDate}
                      onChange={(e) => setQuoteForm({ ...quoteForm, weddingDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-rose-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số lượng khách mời
                    </label>
                    <select
                      value={quoteForm.guestCount}
                      onChange={(e) => setQuoteForm({ ...quoteForm, guestCount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-rose-400 bg-white"
                    >
                      <option value="100">Dưới 150 khách</option>
                      <option value="250">200 - 350 khách</option>
                      <option value="500">400 - 600 khách</option>
                      <option value="800">Trên 600 khách</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ngân sách dự kiến
                    </label>
                    <select
                      value={quoteForm.budgetEstimate}
                      onChange={(e) => setQuoteForm({ ...quoteForm, budgetEstimate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-rose-400 bg-white"
                    >
                      <option value="Dưới 50 triệu">Dưới 50 triệu</option>
                      <option value="50 - 100 triệu">50 - 100 triệu</option>
                      <option value="100 - 200 triệu">100 - 200 triệu</option>
                      <option value="Trên 200 triệu">Trên 200 triệu (Luxury)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ghi chú mong muốn riêng
                  </label>
                  <textarea
                    rows={2}
                    value={quoteForm.notes}
                    onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                    placeholder="Ví dụ: Muốn thử váy vào cuối tuần, cần menu chay, sảnh ngoài trời..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-rose-400"
                  />
                </div>

                <p className="text-[11px] text-stone-400 leading-tight">
                  <ShieldCheck className="w-3 h-3 text-emerald-500 inline mr-1" />
                  Thông tin được bảo mật 100%. Cam kết không làm phiền nếu bạn chưa sẵn sàng.
                </p>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setQuotationVendor(null)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
                  >
                    Gửi Yêu Cầu Báo Giá
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
