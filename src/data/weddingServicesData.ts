export type WeddingVendorCategory =
  | 'all'
  | 'venue'
  | 'photo'
  | 'bride_dress'
  | 'groom_suit'
  | 'makeup'
  | 'decor'
  | 'jewelry'
  | 'tray'
  | 'car';

export interface VendorPackage {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface WeddingVendor {
  id: string;
  category: Exclude<WeddingVendorCategory, 'all'>;
  categoryLabel: string;
  name: string;
  tagline: string;
  description: string;
  priceStarting: string;
  priceStartingNum: number; // for filtering
  priceType: 'bàn' | 'gói' | 'ngày' | 'cặp' | 'chiếc';
  city: 'TP. Hồ Chí Minh' | 'Hà Nội' | 'Đà Nẵng' | 'Cần Thơ' | 'Toàn quốc';
  district: string;
  address: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  tags: string[];
  badge?: string; // "Đối tác xác thực", "Ưu đãi độc quyền", "Top Bình Chọn"
  featured?: boolean;
  hotline: string;
  zalo: string;
  perks: string[];
  packages: VendorPackage[];
  verified: boolean;
}

export const VENDOR_CATEGORIES: Array<{
  id: WeddingVendorCategory;
  label: string;
  iconName: string;
  count: number;
  desc: string;
}> = [
  { id: 'all', label: 'Tất cả dịch vụ', iconName: 'Compass', count: 24, desc: 'Tất cả nhà cung cấp cưới uy tín' },
  { id: 'venue', label: 'Nhà hàng tiệc cưới', iconName: 'Building2', count: 5, desc: 'Sảnh tiệc lộng lẫy, sức chứa lớn' },
  { id: 'photo', label: 'Studio & Phóng sự', iconName: 'Camera', count: 4, desc: 'Ghi lại khoảnh khắc hạnh phúc trọn đời' },
  { id: 'bride_dress', label: 'Váy cưới & Áo dài', iconName: 'Shirt', count: 3, desc: 'Thiết kế tôn vinh vẻ đẹp cô dâu' },
  { id: 'groom_suit', label: 'Vest chú rể', iconName: 'UserCheck', count: 2, desc: 'Lịch lãm, may đo theo số đo chuẩn' },
  { id: 'makeup', label: 'Trang điểm cô dâu', iconName: 'Sparkles', count: 3, desc: 'Phong cách tự nhiên, trong trẻo hoặc sắc sảo' },
  { id: 'decor', label: 'Trang trí & Gia tiên', iconName: 'Flower2', count: 3, desc: 'Lễ gia tiên hoa tươi, backdrop tinh tế' },
  { id: 'jewelry', label: 'Nhẫn cưới & Trang sức', iconName: 'Gem', count: 2, desc: 'Kỷ vật tình yêu vĩnh cửu vàng 18K/Kim cương' },
  { id: 'tray', label: 'Tráp & Mâm quả cưới', iconName: 'Gift', count: 2, desc: 'Lễ vật trọn vẹn, rồng phượng trang trọng' },
  { id: 'car', label: 'Xe hoa cưới', iconName: 'Car', count: 2, desc: 'Xe rước dâu sang trọng, kết hoa tươi cao cấp' },
];

export const WEDDING_VENDORS: WeddingVendor[] = [
  // --- 1. NHÀ HÀNG & TRUNG TÂM TIỆC CƯỚI (VENUES) ---
  {
    id: 'venue-white-palace',
    category: 'venue',
    categoryLabel: 'Nhà hàng tiệc cưới',
    name: 'White Palace Luxury Convention',
    tagline: 'Kiến trúc biểu tượng, dịch vụ ẩm thực yến tiệc 5 sao',
    description:
      'Tọa lạc tại vị trí đắc địa với các sảnh tiệc trần cao không cột, White Palace là địa điểm tổ chức hôn lễ sang trọng bậc nhất dành cho các cặp đôi yêu thích sự thanh lịch và đẳng cấp.',
    priceStarting: '5.800.000đ',
    priceStartingNum: 5800000,
    priceType: 'bàn',
    city: 'TP. Hồ Chí Minh',
    district: 'Phú Nhuận',
    address: '194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. HCM',
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Sảnh lớn 1500 khách', 'Trần cao không cột', 'Menu Fusion', 'Âm thanh ánh sáng chuẩn concert'],
    badge: 'Đối tác Plan Cưới',
    featured: true,
    hotline: '0909 999 194',
    zalo: '0909999194',
    perks: ['Tặng gói bia nước ngọt suốt tiệc', 'Tặng màn hình LED P3', 'Giảm 10% khi đặt trước 6 tháng'],
    packages: [
      {
        name: 'Gói Tiệc Bạc (Silver)',
        price: '5.800.000đ / bàn',
        features: ['Thực đơn 6 món cao cấp', 'Bia & nước ngọt 2.5 giờ', 'Trang trí hoa bàn tiệc tiêu chuẩn'],
      },
      {
        name: 'Gói Tiệc Vàng (Gold)',
        price: '7.500.000đ / bàn',
        features: ['Thực đơn 7 món sơn hào hải vị', 'Bia Heineken không giới hạn', 'Trang trí hoa tươi lối đi & sân khấu', 'MC dẫn chương trình & ban nhạc'],
        isPopular: true,
      },
      {
        name: 'Gói Kim Cương (Diamond Luxury)',
        price: '10.500.000đ / bàn',
        features: ['Ẩm thực thượng hạng chuẩn Chef 5 sao', 'Trọn gói decor hoa tươi concept riêng', 'Màn hình LED toàn sảnh & hiệu ứng ánh sáng vòm'],
      },
    ],
    verified: true,
  },
  {
    id: 'venue-gem-center',
    category: 'venue',
    categoryLabel: 'Nhà hàng tiệc cưới',
    name: 'GEM Center Saigon',
    tagline: 'Không gian nghệ thuật đương đại, biến mọi ý tưởng cưới thành hiện thực',
    description:
      'Trung tâm sự kiện và tiệc cưới đa năng với kiến trúc gỗ trầm ấm kết hợp kính hiện đại. Khả năng biến hóa không gian theo phong cách Rustic, Futuristic hay Cổ tích thần tiên.',
    priceStarting: '8.200.000đ',
    priceStartingNum: 8200000,
    priceType: 'bàn',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    address: '8 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, TP. HCM',
    rating: 5.0,
    reviewCount: 428,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Trung tâm Quận 1', 'Kiến trúc độc bản', 'Sân thượng ngoài trời', 'VIP Luxury'],
    badge: 'Top 1 Bình Chọn',
    featured: true,
    hotline: '028 3911 7070',
    zalo: '0901234567',
    perks: ['Miễn phí sảnh đón khách riêng biệt', 'Phục vụ riêng từng bàn (Fine Dining)', 'Tặng phòng trăng mật khách sạn 5 sao'],
    packages: [
      {
        name: 'Gói The Grand Hall',
        price: '8.200.000đ / bàn',
        features: ['Set menu 6 món cao cấp', 'Trang trí bàn lễ tân & photobooth nghệ thuật', 'Bia tươi Tiger & vang đỏ chào mừng'],
      },
      {
        name: 'Gói The Royal Dream',
        price: '12.000.000đ / bàn',
        features: ['Set menu Hải sâm & Bò Wagyu', 'Toàn bộ hoa tươi nhập khẩu Hà Lan', 'Đạo diễn sân khấu & kịch bản cưới độc quyền'],
        isPopular: true,
      },
    ],
    verified: true,
  },
  {
    id: 'venue-trong-dong-palace',
    category: 'venue',
    categoryLabel: 'Nhà hàng tiệc cưới',
    name: 'Trống Đồng Palace Hà Nội',
    tagline: 'Chuỗi trung tâm tiệc cưới uy tín số 1 Thủ đô với hơn 10 chi nhánh',
    description:
      'Hệ sinh thái sảnh tiệc phong cách châu Âu lãng mạn, vị trí thuận tiện giao thông khắp các quận Hà Nội, mức giá hợp lý và chính sách tặng kèm hấp dẫn cho cặp đôi trẻ.',
    priceStarting: '3.600.000đ',
    priceStartingNum: 3600000,
    priceType: 'bàn',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    address: 'Trống Đồng Palace Cảnh Hồ - 173B Trường Chinh / 48 Trần Đăng Ninh, Cầu Giấy, Hà Nội',
    rating: 4.8,
    reviewCount: 285,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Chi phí hợp lý', '10+ cơ sở Hà Nội', 'Sảnh ngoài trời & trong nhà', 'Chuyên nghiệp'],
    badge: 'Ưu đãi mùa cưới',
    featured: false,
    hotline: '0964 257 766',
    zalo: '0964257766',
    perks: ['Tặng trọn gói âm thanh ánh sáng', 'Tặng 1 bàn tiệc khi đặt từ 20 bàn', 'Miễn phí xe hoa nội thành'],
    packages: [
      {
        name: 'Gói Cưới Ấm Cúng',
        price: '3.600.000đ / bàn',
        features: ['Thực đơn 10 món truyền thống Hà Nội', 'Trang trí bàn đón khách hoa lụa cao cấp', 'MC & kịch bản lễ cưới'],
      },
      {
        name: 'Gói Cưới Hoàng Gia',
        price: '4.800.000đ / bàn',
        features: ['Thực đơn 11 món đặc sắc', 'Trang trí hoa tươi bàn tiệc & tháp ly', 'Nước ngọt & bia Hà Nội suốt tiệc'],
        isPopular: true,
      },
    ],
    verified: true,
  },
  {
    id: 'venue-asiana-plaza',
    category: 'venue',
    categoryLabel: 'Nhà hàng tiệc cưới',
    name: 'Asiana Plaza Convention Center',
    tagline: 'Tuyệt tác kiến trúc Tân Cổ Điển, tráng lệ và ấm áp',
    description:
      'Nổi bật với phong cách kiến trúc hoàng gia Pháp, mỗi sảnh tiệc mang tên một loài đá quý. Đội ngũ đầu bếp kinh nghiệm trên 20 năm mang đến hương vị tiệc cưới trọn vẹn.',
    priceStarting: '4.500.000đ',
    priceStartingNum: 4500000,
    priceType: 'bàn',
    city: 'TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    address: '45-47 Phan Đăng Lưu, Phường 3, Bình Thạnh, TP. HCM',
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Tân Cổ Điển', 'Ẩm thực Á-Âu', 'Sảnh Violet / Rose', 'Bãi đỗ xe ô tô rộng'],
    badge: 'Xác thực 100%',
    featured: false,
    hotline: '0901 080 080',
    zalo: '0901080080',
    perks: ['Tặng gói trang trí hoa tươi sảnh tiệc', 'Giảm 50% phí dịch vụ rượu ngoại mang vào', 'Tặng bánh cưới 3 tầng thật'],
    packages: [
      {
        name: 'Gói Tiệc Ruby',
        price: '4.500.000đ / bàn',
        features: ['6 món chính chuẩn vị yến tiệc', 'Bia Sapporo / Tiger theo giờ', 'Hoa trang trí lối đi sân khấu'],
      },
    ],
    verified: true,
  },
  {
    id: 'venue-furama-danang',
    category: 'venue',
    categoryLabel: 'Nhà hàng tiệc cưới',
    name: 'Furama Resort & Beach Wedding Đà Nẵng',
    tagline: 'Lễ cưới bãi biển nhiệt đới lãng mạn hàng đầu Việt Nam',
    description:
      'Tổ chức hôn lễ bên bờ cát trắng và biển xanh Mỹ Khê. Thích hợp cho các cặp đôi mơ ước đám cưới phong cách Destination Wedding cùng người thân và bạn bè thân thiết.',
    priceStarting: '9.000.000đ',
    priceStartingNum: 9000000,
    priceType: 'bàn',
    city: 'Đà Nẵng',
    district: 'Ngũ Hành Sơn',
    address: '105 Võ Nguyên Giáp, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng',
    rating: 4.9,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Đám cưới biển', 'Resort 5 sao', 'Hoàng hôn lãng mạn', 'Private Party'],
    badge: 'Điểm Đến Cưới Hot',
    featured: true,
    hotline: '0236 3847 333',
    zalo: '0912345678',
    perks: ['Tặng 01 đêm villa có hồ bơi riêng', 'Buffet nướng hải sản cao cấp', 'Ban nhạc Acoustic biểu diễn bãi biển'],
    packages: [
      {
        name: 'Gói Sunset Beach Wedding',
        price: '9.000.000đ / bàn',
        features: ['Cổng hoa tươi bãi biển', 'Ghế Tiffany & hoa cầm tay cô dâu', 'Tiệc cocktail nhẹ trước giờ làm lễ'],
        isPopular: true,
      },
    ],
    verified: true,
  },

  // --- 2. STUDIO ẢNH CƯỚI & PHÓNG SỰ (PHOTO & VIDEO) ---
  {
    id: 'photo-tuart',
    category: 'photo',
    categoryLabel: 'Studio & Phóng sự',
    name: 'TuArt Wedding & Media',
    tagline: 'Thương hiệu chụp ảnh cưới số 1 Việt Nam, phong cách đa dạng cảm xúc',
    description:
      'Hơn 12 năm kinh nghiệm với chuỗi studio trải dài khắp cả nước. Sở hữu phim trường độc quyền phong cách Hàn Quốc và châu Âu, thiết bị máy ảnh máy quay điện ảnh tiên tiến nhất.',
    priceStarting: '8.500.000đ',
    priceStartingNum: 8500000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Hoàn Kiếm',
    address: '160 Phố Huế, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội / Chi nhánh toàn quốc',
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Phim trường độc quyền', 'Màu ảnh tự nhiên', 'Váy cưới Bella đi kèm', 'Chụp phóng sự cưới'],
    badge: 'Thương hiệu Quốc gia',
    featured: true,
    hotline: '0888 606 888',
    zalo: '0888606888',
    perks: ['Tặng ảnh cổng tráng gương 60x90cm', 'Tặng 02 váy cưới ngày tiệc cao cấp', 'Không chụp ghép cặp đôi'],
    packages: [
      {
        name: 'Gói Studio Hàn Quốc',
        price: '8.500.000đ / gói',
        features: ['01 buổi chụp studio phim trường', '02 váy cưới + 02 vest chú rể + 01 trang phục tự do', 'Make-up & làm tóc suốt buổi', 'Album Photobook cao cấp 30 trang'],
        isPopular: true,
      },
      {
        name: 'Gói Ngoại Cảnh Hà Nội / Đà Nẵng / Đà Lạt',
        price: '14.500.000đ / gói',
        features: ['Chụp 3-4 điểm ngoại cảnh đẹp nhất', '03 váy Luxury + 03 vest', 'Bao gồm chi phí xe di chuyển', 'Toàn bộ file gốc & 50 ảnh chỉnh màu chuyên sâu'],
      },
      {
        name: 'Gói Phóng Sự Cưới Trọn Gói (Photo + Video Highlight 4K)',
        price: '12.000.000đ / gói',
        features: ['02 thợ chụp + 02 thợ quay flycam', 'Bắt trọn khoảnh khắc xúc động ăn hỏi và ngày cưới', 'Video teaser 1 phút đăng mạng xã hội + video full 4K'],
      },
    ],
    verified: true,
  },
  {
    id: 'photo-nupakachi',
    category: 'photo',
    categoryLabel: 'Studio & Phóng sự',
    name: 'Nupakachi Studio Saigon',
    tagline: 'Chụp ảnh cưới cảm xúc tự nhiên, nghệ thuật ánh sáng tinh tế',
    description:
      'Nổi tiếng với phong cách chụp ảnh cưới "Chân thực - Lãng mạn - Tinh tế". Nupakachi tôn vinh nụ cười và ánh mắt tự nhiên nhất của hai bạn, không tạo dáng gượng gạo.',
    priceStarting: '9.900.000đ',
    priceStartingNum: 9900000,
    priceType: 'gói',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 3',
    address: '351/55 Lê Văn Sỹ, Phường 13, Quận 3, TP. HCM',
    rating: 5.0,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Ảnh cưới tự nhiên', 'Không gượng gạo', 'Chụp ngoại cảnh', 'Phóng sự cưới điện ảnh'],
    badge: 'Chụp Cảm Xúc Nhất',
    featured: false,
    hotline: '0385 279 999',
    zalo: '0385279999',
    perks: ['Giao toàn bộ file ảnh gốc ngay sau buổi chụp', 'Miễn phí make-up thử trước buổi chụp', 'Hỗ trợ đạo cụ hoa tươi tự nhiên'],
    packages: [
      {
        name: 'Gói Story of Love (Studio + Cà phê Sài Gòn)',
        price: '9.900.000đ / gói',
        features: ['Chụp studio tone tối giản & dạo phố Sài Gòn', '02 layout make-up thời thượng', 'Album mở phẳng cao cấp nhập khẩu Đức'],
      },
    ],
    verified: true,
  },
  {
    id: 'photo-kim-tuyen',
    category: 'photo',
    categoryLabel: 'Studio & Phóng sự',
    name: 'Kim Tuyến Bridal & Wedding Photo',
    tagline: 'Gói cưới trọn gói A-Z: Chụp ảnh, váy cưới, trang điểm hàng đầu miền Nam',
    description:
      'Hơn 20 năm đồng hành cùng hàng vạn cặp đôi Sài Gòn. Kim Tuyến cung cấp giải pháp trọn gói tiết kiệm thời gian và chi phí với chất lượng cam kết hàng đầu.',
    priceStarting: '7.900.000đ',
    priceStartingNum: 7900000,
    priceType: 'gói',
    city: 'TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    address: '80A Hồ Văn Huê, Phường 9, Phú Nhuận, TP. HCM',
    rating: 4.8,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Trọn gói A-Z', 'Hồ Văn Huê nổi tiếng', 'Váy cưới nhập khẩu', 'Giá cạnh tranh'],
    badge: 'Đối tác Plan Cưới',
    featured: false,
    hotline: '0901 63 63 65',
    zalo: '0901636365',
    perks: ['Tặng áo dài bưng quả cho đội bê tráp', 'Giảm 2.000.000đ khi đặt trọn gói chụp ảnh + ngày cưới', 'Miễn phí xe đưa đón'],
    packages: [
      {
        name: 'Gói Tiết Kiệm Trọn Gói',
        price: '7.900.000đ / gói',
        features: ['Chụp album studio phim trường', 'Trọn bộ trang phục chụp ảnh', '1 ảnh lớn tráng gương 60x90'],
      },
    ],
    verified: true,
  },
  {
    id: 'photo-lou-studio',
    category: 'photo',
    categoryLabel: 'Studio & Phóng sự',
    name: 'Lou Studio Hà Nội',
    tagline: 'Thời trang cưới thanh lịch mang hơi thở Paris giữa lòng Hà Nội',
    description:
      'Chuyên các bộ ảnh cưới mang phong cách thời trang nghệ thuật (Editorial Wedding). Thích hợp cho những cô dâu chú rể cá tính, yêu thích phong cách high-fashion hiện đại.',
    priceStarting: '11.500.000đ',
    priceStartingNum: 11500000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Tây Hồ',
    address: '106 Mai Hắc Đế, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội',
    rating: 4.9,
    reviewCount: 190,
    image: 'https://images.unsplash.com/photo-1545232979-fbf6774640d9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545232979-fbf6774640d9?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Thời trang cao cấp', 'Editorial Wedding', 'Tone màu Tây', 'Nghệ thuật'],
    badge: 'Xu Hướng 2026',
    featured: false,
    hotline: '024 3633 4186',
    zalo: '0912234567',
    perks: ['Stylist riêng lên concept theo câu chuyện tình yêu', 'Make-up chuyên nghiệp từ các chuyên gia showbiz'],
    packages: [
      {
        name: 'Gói The Editorial Chic',
        price: '11.500.000đ / gói',
        features: ['01 ngày chụp concept thời trang', '03 thiết kế váy thiết kế độc quyền', 'Tạp chí ảnh cưới riêng khổ lớn'],
      },
    ],
    verified: true,
  },

  // --- 3. VÁY CƯỚI & ÁO DÀI CÔ DÂU (BRIDE DRESS) ---
  {
    id: 'bride-nicole-bridal',
    category: 'bride_dress',
    categoryLabel: 'Váy cưới & Áo dài',
    name: 'Nicole Bridal Haute Couture',
    tagline: 'Váy cưới tối giản, may đo chuẩn xác tôn đường cong thuần khiết',
    description:
      'Nicole Bridal nổi tiếng với các thiết kế may đo cao cấp, sử dụng chất liệu lụa Mikado, ren Chantilly và voan tơ tằm mềm mại. Dáng váy ôm trọn vóc dáng giúp cô dâu tự tin tỏa sáng.',
    priceStarting: '3.500.000đ',
    priceStartingNum: 3500000,
    priceType: 'ngày',
    city: 'TP. Hồ Chí Minh',
    district: 'Phú Nhuận',
    address: '51 Hồ Văn Huê, Phường 9, Phú Nhuận, TP. HCM / Chi nhánh Hà Nội',
    rating: 4.9,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['May đo theo số đo', 'Thuê váy cao cấp', 'Ren Chantilly Pháp', 'Thiết kế độc quyền'],
    badge: 'Được Yêu Thích Nhất',
    featured: true,
    hotline: '0902 640 490',
    zalo: '0902640490',
    perks: ['Thử váy miễn phí không giới hạn mẫu', 'Chỉnh sửa theo số đo trong 48h', 'Tặng phụ kiện voan cài tóc & găng tay ren'],
    packages: [
      {
        name: 'Thuê Váy Dáng A-line / Mermaid Tối Giản',
        price: '3.500.000đ - 6.500.000đ / ngày',
        features: ['Phom váy nhẹ nhàng, dễ di chuyển chào bàn', 'Tặng kèm phụ kiện voan cài tóc, trang sức phối váy'],
        isPopular: true,
      },
      {
        name: 'Thuê Váy Xòe Công Chúa Luxury Đính Pha Lê Swarovski',
        price: '8.000.000đ - 18.000.000đ / ngày',
        features: ['Hàng nghìn hạt pha lê Swarovski thủ công', 'Lộng lẫy khi bước vào lễ đường dưới ánh đèn sân khấu'],
      },
      {
        name: 'May Đo Váy Cưới Thiết Kế Riêng Mang Về',
        price: 'Từ 15.000.000đ / chiếc',
        features: ['Thiết kế bản vẽ riêng độc bản theo sở thích cô dâu', 'Sở hữu vĩnh viễn chiếc váy kỷ niệm ngày cưới'],
      },
    ],
    verified: true,
  },
  {
    id: 'bride-ao-dai-cung-dinh',
    category: 'bride_dress',
    categoryLabel: 'Váy cưới & Áo dài',
    name: 'Áo Dài Cưới Truyền Thống Cung Đình',
    tagline: 'Nét đẹp thuần phong mỹ tục, thêu tay rồng phượng tinh xảo',
    description:
      'Chuyên áo dài lễ ăn hỏi, lễ đính hôn và lễ rước dâu. Chất liệu gấm dệt hoa chìm, tơ tằm Bảo Lộc và nhung the cao cấp thêu họa tiết Song Hỷ, Hoa Sen, Rồng Phượng sum vầy.',
    priceStarting: '1.200.000đ',
    priceStartingNum: 1200000,
    priceType: 'ngày',
    city: 'Hà Nội',
    district: 'Hoàn Kiếm',
    address: '42 Phố Hàng Bông, Hoàn Kiếm, Hà Nội',
    rating: 4.8,
    reviewCount: 175,
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['Áo dài cưới đỏ', 'Gấm tơ tằm', 'Thêu tay thủ công', 'Cặp đôi cô dâu chú rể'],
    badge: 'Nghệ nhân thêu tay',
    featured: false,
    hotline: '0988 567 890',
    zalo: '0988567890',
    perks: ['Đầy đủ mấn đội đầu truyền thống', 'Đồng bộ áo dài cặp cô dâu chú rể', 'Có sẵn áo dài bưng quả trọn bộ'],
    packages: [
      {
        name: 'Thuê Áo Dài Cặp Đôi Ăn Hỏi',
        price: '1.800.000đ / cặp',
        features: ['Áo dài cô dâu + áo dài cách tân chú rể', 'Chất liệu lụa tơ tằm mềm mại', 'Mấn đội đầu đính kết ngọc trai'],
        isPopular: true,
      },
    ],
    verified: true,
  },
  {
    id: 'bride-chung-thanh-phong',
    category: 'bride_dress',
    categoryLabel: 'Váy cưới & Áo dài',
    name: 'Chung Thanh Phong Bridal',
    tagline: 'Váy cưới Haute Couture đẳng cấp ngôi sao hàng đầu Việt Nam',
    description:
      'Thương hiệu váy cưới của NTK Chung Thanh Phong được đông đảo nghệ sĩ, người nổi tiếng lựa chọn. Thiết kế tôn dáng chuẩn mực, kỹ thuật nẹp corset tôn eo con kiến độc quyền.',
    priceStarting: '15.000.000đ',
    priceStartingNum: 15000000,
    priceType: 'ngày',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    address: '189/1B Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP. HCM',
    rating: 5.0,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1546167884-7f6c0d0e6f4a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1546167884-7f6c0d0e6f4a?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['Haute Couture', 'Corset siết eo 8-12cm', 'Pha lê Swarovski', 'Thương hiệu ngôi sao'],
    badge: 'Luxury VIP',
    featured: true,
    hotline: '0938 999 050',
    zalo: '0938999050',
    perks: ['Trực tiếp NTK tư vấn form dáng', 'Phòng fitting riêng tư chuẩn VIP', 'Chuyên viên hỗ trợ mặc váy tận nơi ngày cưới'],
    packages: [
      {
        name: 'Thuê Váy Cưới Limited Collection',
        price: '15.000.000đ - 35.000.000đ / ngày',
        features: ['Thiết kế trong bộ sưu tập runway mới nhất', 'Kỹ thuật nẹp eo độc quyền', 'Bộ trang sức & vương miện đính đá đi kèm'],
      },
    ],
    verified: true,
  },

  // --- 4. VEST CHÚ RỂ (GROOM SUIT) ---
  {
    id: 'groom-adam-store',
    category: 'groom_suit',
    categoryLabel: 'Vest chú rể',
    name: 'Adam Store Bespoke Suit',
    tagline: 'Thương hiệu vest cưới may sẵn và may đo số 1 Việt Nam',
    description:
      'Với hơn 70 showroom toàn quốc, Adam Store mang lại các mẫu Tuxedo, suit cưới phong cách Ý và Hàn Quốc trẻ trung. Phom dáng vừa vặn hoàn hảo với vóc dáng đàn ông Việt Nam.',
    priceStarting: '900.000đ',
    priceStartingNum: 900000,
    priceType: 'ngày',
    city: 'Toàn quốc',
    district: '70+ chi nhánh',
    address: 'Hệ thống 70 showroom tại Hà Nội, TP. HCM, Đà Nẵng, Hải Phòng...',
    rating: 4.9,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['70+ Showroom', 'Tuxedo chú rể', 'Vải len lông cừu Ý', 'May đo & Thuê'],
    badge: 'Thương hiệu phổ biến nhất',
    featured: true,
    hotline: '0938 888 835',
    zalo: '0938888835',
    perks: ['Tặng áo sơ mi trắng cao cấp + nơ cài cổ', 'Chỉnh sửa vạt áo và gấu quần miễn phí lấy ngay', 'Đổi trả linh hoạt'],
    packages: [
      {
        name: 'Gói Thuê Vest Chú Rể Tiêu Chuẩn',
        price: '900.000đ - 1.500.000đ / ngày',
        features: ['Trọn bộ áo vest + quần âu + nơ / cà vạt', 'Form dáng slim-fit trẻ trung', 'Hỗ trợ thử đồ tại bất kỳ chi nhánh'],
        isPopular: true,
      },
      {
        name: 'Mua Đứt Trọn Bộ Suit Cưới May Đo',
        price: 'Từ 3.500.000đ - 6.500.000đ / bộ',
        features: ['Sở hữu bộ suit chất liệu Wool Ý', 'Thêu tên cô dâu chú rể & ngày cưới vào vạt áo kỷ niệm'],
      },
    ],
    verified: true,
  },
  {
    id: 'groom-mon-amie',
    category: 'groom_suit',
    categoryLabel: 'Vest chú rể',
    name: 'Mon Amie Veston Hoàng Gia',
    tagline: 'May đo veston phong cách Hoàng gia châu Âu từ 1991',
    description:
      'Hơn 30 năm tuổi nghề tại Sài Gòn, Mon Amie sở hữu đội ngũ thợ may lành nghề chuyên chất liệu vải nhập khẩu từ Ý, Anh, Pháp. Cung cấp dịch vụ may gấp trong 24 giờ.',
    priceStarting: '1.200.000đ',
    priceStartingNum: 1200000,
    priceType: 'ngày',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 5',
    address: '357 Nguyễn Trãi, Phường 7, Quận 5, TP. HCM',
    rating: 4.8,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['May đo truyền thống', 'Vải Ý Cerruti 1881', 'May gấp 24h', 'Phom dáng chuẩn'],
    badge: '30 năm uy tín',
    featured: false,
    hotline: '0968 111 118',
    zalo: '0968111118',
    perks: ['Bảo hành đường may và chỉnh size miễn phí 3 năm', 'Tặng giày tây da bò khi mua trọn gói vest cưới'],
    packages: [
      {
        name: 'Combo Chú Rể Lịch Lãm',
        price: '3.800.000đ / bộ (Mua đứt)',
        features: ['Suit cưới vải cashmere Hàn Quốc', 'Áo sơ mi may đo cao cấp', 'Cà vạt lụa tơ tằm'],
      },
    ],
    verified: true,
  },

  // --- 5. TRANG ĐIỂM & LÀM ĐẸP (MAKEUP & BEAUTY) ---
  {
    id: 'makeup-quach-anh',
    category: 'makeup',
    categoryLabel: 'Trang điểm cô dâu',
    name: 'Quách Ánh Makeup Studio',
    tagline: 'Phù thủy trang điểm cô dâu với lớp nền mỏng nhẹ như sương mai',
    description:
      'Chuyên phong cách makeup trong trẻo, tự nhiên (Glass Skin) nhưng vẫn che khuyết điểm hoàn hảo và giữ tone bền suốt 12 tiếng tiệc cưới dài. Sản phẩm mỹ phẩm 100% High-end.',
    priceStarting: '2.500.000đ',
    priceStartingNum: 2500000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Đống Đa',
    address: '20 Mạc Thái Tổ, Yên Hòa, Cầu Giấy, Hà Nội',
    rating: 5.0,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['Lớp nền mỏng nhẹ', 'Mỹ phẩm High-end', 'Make-up tại nhà', 'Tự nhiên trong veo'],
    badge: 'Top Makeup Hà Nội',
    featured: true,
    hotline: '0979 999 789',
    zalo: '0979999789',
    perks: ['Tặng dặm phấn & đổi kiểu tóc trước giờ đãi tiệc', 'Tặng dưỡng ẩm chuyên sâu trước makeup', 'Dụng cụ tiệt trùng vệ sinh tuyệt đối'],
    packages: [
      {
        name: 'Gói Makeup Lễ Ăn Hỏi',
        price: '2.500.000đ / lần',
        features: ['Makeup tone nhẹ nhàng truyền thống', 'Làm tóc cô dâu cài hoa tươi hoặc trâm ngọc', 'Đến tận nhà cô dâu'],
      },
      {
        name: 'Gói Makeup Ngày Cưới (Tại nhà + Tiệc tối)',
        price: '4.500.000đ / ngày',
        features: ['Trang điểm lễ rước dâu buổi sáng', 'Dặm lại & đổi kiểu tóc lộng lẫy cho tiệc tối', 'Có chuyên viên đi cùng suốt buổi lễ'],
        isPopular: true,
      },
    ],
    verified: true,
  },
  {
    id: 'makeup-tee-le',
    category: 'makeup',
    categoryLabel: 'Trang điểm cô dâu',
    name: 'Tee Le Beauty Studio Saigon',
    tagline: 'Biến hóa diện mạo thần thái kiêu sa, quyến rũ bậc nhất',
    description:
      'Chuyên viên trang điểm Tee Le là cái tên quen thuộc đằng sau vẻ đẹp lộng lẫy của các mỹ nhân showbiz Việt. Phong cách sắc nét, nhấn sâu đôi mắt hút hồn và thần thái sang trọng.',
    priceStarting: '3.500.000đ',
    priceStartingNum: 3500000,
    priceType: 'gói',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    address: '189 Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP. HCM',
    rating: 4.9,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['Makeup sắc sảo', 'Sang trọng quý phái', 'Showbiz tone', 'Đẳng cấp'],
    badge: 'Chuyên gia Showbiz',
    featured: false,
    hotline: '0938 123 456',
    zalo: '0938123456',
    perks: ['Makeup test trước ngày cưới giảm 50%', 'Tặng dịch vụ trang điểm mẹ cô dâu'],
    packages: [
      {
        name: 'Gói Cô Dâu Tỏa Sáng',
        price: '3.500.000đ / lần',
        features: ['Tone makeup Tây sang trọng hoặc Hàn Quốc thanh thuần', 'Tạo kiểu tóc nghệ thuật theo khuôn mặt', 'Mỹ phẩm Tom Ford, Chanel, Dior'],
      },
    ],
    verified: true,
  },
  {
    id: 'makeup-mai-do',
    category: 'makeup',
    categoryLabel: 'Trang điểm cô dâu',
    name: 'Mai Đỗ Make Up Academy',
    tagline: 'Tôn vinh đường nét tự nhiên, trẻ trung và rạng ngời',
    description:
      'Với kỹ thuật tạo khối và đánh nền độc quyền, Mai Đỗ Make Up giúp cô dâu giữ được nét trẻ trung, nhẹ nhàng và tự nhiên nhất trong ngày vui trọng đại.',
    priceStarting: '2.000.000đ',
    priceStartingNum: 2000000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Hai Bà Trưng',
    address: '25 Trương Hán Siêu, Hoàn Kiếm, Hà Nội',
    rating: 4.8,
    reviewCount: 165,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
    ],
    tags: ['Tự nhiên thanh lịch', 'Giá hợp lý', 'Làm tóc đẹp', 'Đội ngũ tận tâm'],
    badge: 'Được đánh giá cao',
    featured: false,
    hotline: '0912 345 678',
    zalo: '0912345678',
    perks: ['Bao gồm phụ kiện cài tóc hoa tươi hoặc vương miện', 'Tặng dưỡng môi chống khô nứt'],
    packages: [
      {
        name: 'Gói Tiệc Cưới Cơ Bản',
        price: '2.000.000đ / lần',
        features: ['Trang điểm & làm tóc cô dâu ngày cưới', 'Mỹ phẩm chính hãng 100%', 'Phục vụ tận nhà nội thành'],
      },
    ],
    verified: true,
  },

  // --- 6. TRANG TRÍ TIỆC CƯỚI & GIA TIÊN (DECOR & FLORAL) ---
  {
    id: 'decor-phi-diep',
    category: 'decor',
    categoryLabel: 'Trang trí & Gia tiên',
    name: 'Phi Điệp Wedding & Event Decoration',
    tagline: 'Chuyên gia thiết kế không gian cưới hoa tươi nghệ thuật hàng đầu',
    description:
      'Phi Điệp Wedding sở hữu hơn 10 năm kinh nghiệm biến mọi sảnh tiệc, lễ gia tiên thành tác phẩm nghệ thuật hoa tươi lộng lẫy, cá nhân hóa theo câu chuyện tình yêu của từng cặp đôi.',
    priceStarting: '12.000.000đ',
    priceStartingNum: 12000000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Ba Đình',
    address: '13/11 Đội Cấn, Ba Đình, Hà Nội / Chi nhánh TP. HCM',
    rating: 4.9,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1519225438865-1d48c82eb5e7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519225438865-1d48c82eb5e7?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Hoa tươi 100%', 'Lễ gia tiên truyền thống', 'Photobooth check-in 3D', 'Thiết kế concept riêng'],
    badge: 'Nghệ Thuật Hoa Tươi',
    featured: true,
    hotline: '0983 037 083',
    zalo: '0983037083',
    perks: ['Miễn phí khảo sát nhà và địa điểm tiệc cưới', 'Lên bản vẽ 3D phối cảnh trước khi thi công', 'Tặng hoa cầm tay cô dâu + hoa cài áo chú rể'],
    packages: [
      {
        name: 'Gói Trang Trí Lễ Gia Tiên Hoa Tươi',
        price: '12.000.000đ - 22.000.000đ / gói',
        features: ['Bàn thờ gia tiên hoa tươi sang trọng', 'Bàn 2 họ 12 ghế Tiffany lụa cao cấp', 'Bộ ấm chén & đĩa 3 tầng đựng bánh', 'Cổng hoa tươi đón khách trước cửa nhà'],
        isPopular: true,
      },
      {
        name: 'Gói Trang Trí Sảnh Tiệc Nhà Hàng (Photobooth + Gallery + Lối Đi)',
        price: 'Từ 35.000.000đ / gói',
        features: ['Backdrop chụp ảnh hoa tươi khổ lớn thiết kế 3D', 'Bàn gallery trưng bày ảnh cưới lung linh', 'Con đường hoa tươi dẫn lên sân khấu'],
      },
    ],
    verified: true,
  },
  {
    id: 'decor-7799-storyteller',
    category: 'decor',
    categoryLabel: 'Trang trí & Gia tiên',
    name: '7799 Wedding Storyteller',
    tagline: 'Kể câu chuyện tình yêu của hai bạn bằng ngôn ngữ của hoa và ánh sáng',
    description:
      'Tiên phong xu hướng trang trí cưới hiện đại, tối giản nhưng vô cùng tinh tế. Các concept của 7799 luôn bắt kịp xu hướng màu sắc thế giới như Sage Green, Dusty Rose, Champagne Gold.',
    priceStarting: '9.500.000đ',
    priceStartingNum: 9500000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Hai Bà Trưng',
    address: '69 Tuệ Tĩnh, Hai Bà Trưng, Hà Nội',
    rating: 4.8,
    reviewCount: 240,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Concept hiện đại', 'Hoa lụa kết hợp hoa tươi', 'Bảng màu pastel', 'Tối ưu ngân sách'],
    badge: 'Đối tác Plan Cưới',
    featured: false,
    hotline: '0904 597 799',
    zalo: '0904597799',
    perks: ['Gói hoa lụa cao cấp tiết kiệm đến 40% chi phí', 'Tặng bảng tên cô dâu chú rể mica tráng gương'],
    packages: [
      {
        name: 'Gói Gia Tiên Tinh Khôi (Hoa lụa cao cấp 95% như hoa tươi)',
        price: '9.500.000đ / gói',
        features: ['Trang trí trọn bộ bàn thờ gia tiên & bàn hai họ', 'Cổng hoa phong cách Hàn Quốc', 'Bộ ấm chén & chân nến pha lê'],
      },
    ],
    verified: true,
  },
  {
    id: 'decor-je-taime',
    category: 'decor',
    categoryLabel: 'Trang trí & Gia tiên',
    name: "Je T'aime Art Wedding Design",
    tagline: 'Không gian cưới phong cách lãng mạn châu Âu cổ điển và hiện đại',
    description:
      'Được sáng lập bởi các kiến trúc sư và nghệ nhân cắm hoa, Je T\'aime Art mang lại các không gian tiệc cưới đầy chất thơ, tinh tế đến từng chi tiết nhỏ nhất như thực đơn, nến thơm, khăn ăn.',
    priceStarting: '18.000.000đ',
    priceStartingNum: 18000000,
    priceType: 'gói',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 2',
    address: '28 Thảo Điền, Quận 2, TP. Thủ Đức, TP. HCM',
    rating: 4.9,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Phong cách châu Âu', 'Thảo Điền cao cấp', 'Hoa tươi nhập khẩu', 'Độc bản'],
    badge: 'Sang trọng độc bản',
    featured: false,
    hotline: '0937 666 888',
    zalo: '0937666888',
    perks: ['Tặng thiết kế thiệp cưới và thiệp cảm ơn đồng bộ concept hoa', 'Ánh sáng nến lung linh miễn phí'],
    packages: [
      {
        name: 'Gói Rustic & Botanical Wedding',
        price: '18.000.000đ - 45.000.000đ / gói',
        features: ['Cổng hoa vòm nghệ thuật kết hợp lá khuynh diệp và hoa hồng Ecuador', 'Trang trí bàn tiệc dài Long Table chuẩn tiệc cưới Âu'],
      },
    ],
    verified: true,
  },

  // --- 7. NHẪN CƯỚI & TRANG SỨC (JEWELRY) ---
  {
    id: 'jewelry-pnj',
    category: 'jewelry',
    categoryLabel: 'Nhẫn cưới & Trang sức',
    name: 'PNJ Wedding Collection (Vàng Bạc Đá Quý Phú Nhuận)',
    tagline: 'Tín vật trăm năm, minh chứng cho lời hẹn ước chung đôi trọn vẹn',
    description:
      'Thương hiệu trang sức số 1 Việt Nam với hàng trăm mẫu nhẫn cưới vàng 18K, 14K, vàng trắng đính kim cương tự nhiên chuẩn GIA. Chính sách bảo hành trọn đời và hệ thống rộng khắp toàn quốc.',
    priceStarting: '6.500.000đ',
    priceStartingNum: 6500000,
    priceType: 'cặp',
    city: 'Toàn quốc',
    district: 'Hơn 400 cửa hàng',
    address: 'Hệ thống 400+ trung tâm kim hoàn PNJ trên toàn quốc',
    rating: 4.9,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['400+ Cửa hàng', 'Kim cương GIA', 'Vàng 18K/14K', 'Bảo hành trọn đời'],
    badge: 'Thương hiệu Quốc gia',
    featured: true,
    hotline: '1800 54 54 57',
    zalo: '0909123456',
    perks: ['Miễn phí khắc tên & ngày cưới bên trong lòng nhẫn', 'Làm mới, đánh bóng và chỉnh ni tay miễn phí trọn đời', 'Tặng hộp đựng nhẫn nhung cao cấp'],
    packages: [
      {
        name: 'Cặp Nhẫn Cưới Vàng Vàng 18K Khắc Khắc Ý',
        price: '6.500.000đ - 11.000.000đ / cặp',
        features: ['Vàng 18K chuẩn tuổi', 'Họa tiết đan chéo thanh lịch', 'Bảo hành làm sáng trọn đời'],
        isPopular: true,
      },
      {
        name: 'Cặp Nhẫn Cưới Kim Cương Tự Nhiên (BST Chung Đôi)',
        price: '12.000.000đ - 28.000.000đ / cặp',
        features: ['Mỗi chiếc đính 1 viên kim cương chủ tự nhiên', 'Vàng trắng 14K/18K sang trọng', 'Kèm chứng thư kiểm định chất lượng'],
      },
    ],
    verified: true,
  },
  {
    id: 'jewelry-huy-thanh',
    category: 'jewelry',
    categoryLabel: 'Nhẫn cưới & Trang sức',
    name: 'Huy Thanh Jewelry',
    tagline: 'Nhẫn cưới trẻ trung phong cách Hàn Quốc, giá xuất xưởng tốt nhất',
    description:
      'Huy Thanh Jewelry là điểm đến quen thuộc của các cặp đôi trẻ thế hệ Gen Z & Millennials. Thiết kế thanh mảnh, hiện đại, bắt kịp xu hướng trang sức cưới Seoul và Tokyo.',
    priceStarting: '4.200.000đ',
    priceStartingNum: 4200000,
    priceType: 'cặp',
    city: 'Hà Nội',
    district: 'Hà Nội & TP. HCM',
    address: 'Hệ thống 25 showroom tại Hà Nội, Đà Nẵng, TP. HCM',
    rating: 4.8,
    reviewCount: 450,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Phong cách Hàn Quốc', 'Giá tận xưởng', 'Vàng 10K/14K/18K', 'Gen Z yêu thích'],
    badge: 'Giá tốt nhất',
    featured: false,
    hotline: '1900 633 428',
    zalo: '1900633428',
    perks: ['Bảo hành chỉnh size tay trọn đời', 'Khắc laser tên cô dâu chú rể miễn phí', 'Tặng voucher 500k mua kiềng vàng hồi môn'],
    packages: [
      {
        name: 'Cặp Nhẫn Cưới Minimalist Hàn Quốc',
        price: '4.200.000đ - 8.000.000đ / cặp',
        features: ['Thiết kế trơn hoặc đính đá Cubic Zirconia lấp lánh', 'Bản nhẫn thanh mảnh đeo êm tay hàng ngày'],
        isPopular: true,
      },
    ],
    verified: true,
  },

  // --- 8. TRÁP CƯỚI & MÂM QUẢ (BETROTHAL TRAYS) ---
  {
    id: 'tray-song-hy',
    category: 'tray',
    categoryLabel: 'Tráp & Mâm quả cưới',
    name: 'Tráp Cưới Rồng Phượng Phúc Lộc Thọ',
    tagline: 'Nghệ thuật kết tráp rồng phượng truyền thống và mâm quả sơn mài cao cấp',
    description:
      'Chuyên cung cấp bộ tráp ăn hỏi miền Bắc (5 tráp, 7 tráp, 9 tráp) và mâm quả cưới miền Nam (6 quả, 8 quả). Trầu cau tuyển chọn Buôn Mê Thuột, bánh cốm Nguyên Ninh Hàng Than, trà sen Tây Hồ.',
    priceStarting: '3.800.000đ',
    priceStartingNum: 3800000,
    priceType: 'gói',
    city: 'Hà Nội',
    district: 'Hoàn Kiếm',
    address: '11 Hàng Than, Ba Đình, Hà Nội / Chi nhánh Quận 10, TP. HCM',
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Tráp rồng phượng', 'Trầu cau tươi nguyên buồng', 'Bánh cốm Hàng Than', 'Chuẩn nghi lễ'],
    badge: 'Chuẩn nghi lễ 3 miền',
    featured: true,
    hotline: '0915 888 222',
    zalo: '0915888222',
    perks: ['Miễn phí cho thuê đội bê tráp nam thanh nữ tú trang phục đẹp', 'Giao tráp tận nhà đúng giờ hoàng đạo', 'Tặng bao lì xì duyên may mắn'],
    packages: [
      {
        name: 'Bộ 7 Tráp Truyền Thống Miền Bắc',
        price: '4.800.000đ / bộ',
        features: ['Tráp trầu cau buồng 105 quả', 'Tráp rượu vang & thuốc lá', 'Tráp hoa quả tươi', 'Tráp bánh cốm', 'Tráp bánh phu thê', 'Tráp chè sen', 'Tráp hạt sen ninh hương'],
        isPopular: true,
      },
      {
        name: 'Bộ Tráp Rồng Phượng Hoa Tươi Nghệ Thuật',
        price: '8.500.000đ / bộ',
        features: ['Cặp Rồng Phượng kết từ ớt quả, dứa thơm và hoa tươi cầu kỳ', 'Mâm sơn mài son thiếp vàng sang trọng', 'Lễ vật thượng hạng chuẩn lễ ăn hỏi hoàng gia'],
      },
    ],
    verified: true,
  },
  {
    id: 'tray-sai-gon-phu-the',
    category: 'tray',
    categoryLabel: 'Tráp & Mâm quả cưới',
    name: 'Mâm Quả Cưới Hỏi Sài Gòn Xưa',
    tagline: 'Mâm quả cưới Nam Bộ trọn vẹn nghĩa tình phu thê',
    description:
      'Chuyên mâm quả sơn mài đỏ, tráp lục giác hiện đại miền Nam: Mâm trầu cau xòe cánh quạt, mâm bánh phu thê lá dừa, mâm xôi gấc Song Hỷ trái tim cùng gà luộc ngậm hoa hồng.',
    priceStarting: '3.200.000đ',
    priceStartingNum: 3200000,
    priceType: 'gói',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 10',
    address: '382 Cách Mạng Tháng 8, Phường 10, Quận 3, TP. HCM',
    rating: 4.8,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1519225438865-1d48c82eb5e7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519225438865-1d48c82eb5e7?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Mâm quả Nam Bộ', 'Bánh phu thê lá dừa', 'Xôi gấc Song Hỷ', 'Đúng phong tục'],
    badge: 'Đối tác Plan Cưới',
    featured: false,
    hotline: '0903 555 777',
    zalo: '0903555777',
    perks: ['Tặng khay rượu lễ đón dâu và 2 ly rượu rước dâu', 'Hỗ trợ đổi trả mâm quả linh hoạt'],
    packages: [
      {
        name: 'Gói 6 Mâm Quả Trọn Vẹn',
        price: '3.200.000đ - 5.500.000đ / bộ',
        features: ['Trầu cau 105 quả', 'Trà rượu Ô Long', 'Bánh phu thê 105 cái', 'Trái cây ngũ quả cao cấp', 'Xôi gấc trái tim + gà ta', 'Bánh kem cưới Song Hỷ'],
      },
    ],
    verified: true,
  },

  // --- 9. XE HOA CƯỚI & XE ĐÓN DÂU (WEDDING CARS) ---
  {
    id: 'car-mercedes-amg',
    category: 'car',
    categoryLabel: 'Xe hoa cưới',
    name: 'Dịch Vụ Xe Hoa Mercedes & Maybach VIP',
    tagline: 'Xe rước dâu đời mới, tài xế lịch sự, kết hoa tươi thiết kế sang trọng',
    description:
      'Đội ngũ xe hoa Mercedes C-Class, E-Class, S-Class và Maybach trắng tinh khôi đời 2024-2026. Lái xe đồng phục vest lịch thiệp, thông thạo cung đường và luôn đúng giờ đón rước dâu.',
    priceStarting: '2.500.000đ',
    priceStartingNum: 2500000,
    priceType: 'chiếc',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    address: 'Bãi xe tại Quận 1, Tân Bình, TP. HCM & Cầu Giấy, Hà Nội',
    rating: 5.0,
    reviewCount: 330,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Mercedes trắng', 'Tài xế mặc vest', 'Hoa tươi ngoại nhập', 'Đúng giờ 100%'],
    badge: 'Cam kết đúng giờ',
    featured: true,
    hotline: '0908 123 789',
    zalo: '0908123789',
    perks: ['Tặng hoa tươi gắn mui xe & nơ tay nắm cửa', 'Tặng biển tên Just Married mica', 'Miễn phí nước suối & khăn lạnh'],
    packages: [
      {
        name: 'Xe Hoa Mercedes C-Class Trắng (4 tiếng nội thành)',
        price: '2.500.000đ / ca',
        features: ['Lộ trình: Nhà trai -> Nhà gái -> Nhà trai -> Nhà hàng tiệc cưới', 'Hoa tươi thiết kế trên nắp capo', 'Bao gồm xăng xe, cầu đường, tài xế'],
        isPopular: true,
      },
      {
        name: 'Xe Hoa Mercedes E-Class / S-Class Luxury',
        price: '4.500.000đ - 8.000.000đ / ca',
        features: ['Nội thất da cao cấp, cửa sổ trời toàn cảnh', 'Hoa lan hồ điệp & hoa hồng Ecuador', 'Phong thái lịch lãm chuẩn VIP'],
      },
    ],
    verified: true,
  },
  {
    id: 'car-volkswagen-vintage',
    category: 'car',
    categoryLabel: 'Xe hoa cưới',
    name: 'Xe Hoa Cổ Điển Volkswagen Mui Trần',
    tagline: 'Độc đáo, lãng mạn phong cách Retro cho bộ ảnh rước dâu triệu like',
    description:
      'Dành cho cặp đôi yêu thích phong cách Vintage cổ điển. Dòng xe Volkswagen mui trần màu kem hoặc xanh pastel kết hoa tươi rực rỡ, tạo điểm nhấn nổi bật trên mọi con phố.',
    priceStarting: '3.800.000đ',
    priceStartingNum: 3800000,
    priceType: 'chiếc',
    city: 'Hà Nội',
    district: 'Hà Nội & TP. HCM',
    address: 'Phục vụ nội thành Hà Nội, TP. HCM & Đà Nẵng',
    rating: 4.9,
    reviewCount: 170,
    image: 'https://images.unsplash.com/photo-1527244917462-817bf4cb0039?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527244917462-817bf4cb0039?auto=format&fit=crop&w=1000&q=80',
    ],
    tags: ['Xe cổ mui trần', 'Vintage Retro', 'Chụp ảnh nổi bật', 'Độc lạ'],
    badge: 'Check-in Hot Nhất',
    featured: false,
    hotline: '0919 777 999',
    zalo: '0919777999',
    perks: ['Hỗ trợ mở mui xe chụp ảnh lưu niệm cùng hai bên gia đình', 'Tặng chùm bóng bay lãng mạn'],
    packages: [
      {
        name: 'Gói Rước Dâu Vintage Mui Trần',
        price: '3.800.000đ / ca',
        features: ['Thời gian 4 tiếng nội thành', 'Gắn hoa tươi dã quỳ / baby vintage', 'Tài xế phong cách quý ông cổ điển'],
      },
    ],
    verified: true,
  },
];

// Backwards compatibility alias
export const WEDDING_SERVICES = WEDDING_VENDORS;
export type WeddingService = WeddingVendor;

