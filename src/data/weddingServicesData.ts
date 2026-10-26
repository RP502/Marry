export type WeddingServiceCategory = 'all' | 'bride' | 'groom' | 'photo' | 'accessories';

export interface WeddingService {
  id: string;
  category: Exclude<WeddingServiceCategory, 'all'>;
  categoryLabel: string;
  name: string;
  description: string;
  price: string;
  location: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const WEDDING_SERVICES: WeddingService[] = [
  {
    id: 'bride-lace',
    category: 'bride',
    categoryLabel: 'Váy cô dâu',
    name: 'Váy cưới ren thanh lịch',
    description: 'Phom A-line nhẹ nhàng, ren cao cấp và có thể chỉnh sửa theo số đo.',
    price: 'Từ 1.500.000đ / ngày',
    location: 'Hà Nội · Đà Nẵng · TP. HCM',
    image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=900&q=85',
    tags: ['Váy cưới', 'A-line', 'Ren cao cấp'],
    featured: true,
  },
  {
    id: 'bride-princess',
    category: 'bride',
    categoryLabel: 'Váy cô dâu',
    name: 'Váy cưới công chúa cổ điển',
    description: 'Thiết kế bồng xòe nổi bật cho lễ cưới và những khoảnh khắc bước vào lễ đường.',
    price: 'Từ 2.200.000đ / ngày',
    location: 'TP. HCM · Bình Dương',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=85',
    tags: ['Ball gown', 'Cổ điển', 'Có khăn voan'],
  },
  {
    id: 'groom-tuxedo',
    category: 'groom',
    categoryLabel: 'Vest chú rể',
    name: 'Vest tuxedo đen sang trọng',
    description: 'Trọn bộ áo vest, sơ mi, nơ và giày; hỗ trợ thử và chỉnh form trước ngày cưới.',
    price: 'Từ 900.000đ / ngày',
    location: 'Hà Nội · Đà Nẵng · TP. HCM',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85',
    tags: ['Tuxedo', 'Trọn bộ', 'Chỉnh số đo'],
    featured: true,
  },
  {
    id: 'photo-combo',
    category: 'photo',
    categoryLabel: 'Combo chụp ảnh',
    name: 'Combo ảnh cưới ngoại cảnh',
    description: '01 buổi chụp, 02 concept, trang phục cô dâu chú rể và 200 ảnh chỉnh màu.',
    price: 'Từ 8.900.000đ / combo',
    location: 'Đà Nẵng · Hội An',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85',
    tags: ['Ảnh cưới', 'Ngoại cảnh', '2 concept'],
    featured: true,
  },
  {
    id: 'photo-studio',
    category: 'photo',
    categoryLabel: 'Combo chụp ảnh',
    name: 'Combo studio tối giản',
    description: 'Không gian studio tinh tế, make-up cô dâu và album mini lưu giữ câu chuyện của hai bạn.',
    price: 'Từ 5.900.000đ / combo',
    location: 'Toàn quốc · Đặt lịch trước',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85',
    tags: ['Studio', 'Make-up', 'Album mini'],
  },
  {
    id: 'accessories-set',
    category: 'accessories',
    categoryLabel: 'Phụ kiện cưới',
    name: 'Bộ phụ kiện cô dâu',
    description: 'Khăn voan, vương miện, hoa cầm tay và giày cưới phối theo mẫu váy bạn chọn.',
    price: 'Từ 350.000đ / bộ',
    location: 'Nhận giao tận nơi',
    image: 'https://images.unsplash.com/photo-1546167884-7f6c0d0e6f4a?auto=format&fit=crop&w=900&q=85',
    tags: ['Voan', 'Hoa cưới', 'Vương miện'],
  },
];
