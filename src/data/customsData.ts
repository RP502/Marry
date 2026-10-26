export type WeddingRegion = 'all' | 'bac' | 'trung' | 'nam';

export interface CustomsArticle {
  id: string;
  title: string;
  region: Exclude<WeddingRegion, 'all'>;
  topic: 'Nghi lễ' | 'Lễ vật' | 'Lưu ý';
  summary: string;
  answer: string;
  sources: string[];
  reviewedAt: string;
}

export const CUSTOMS_ARTICLES: CustomsArticle[] = [
  {
    id: 'bac-le-an-hoi',
    title: 'Trình tự lễ ăn hỏi ở miền Bắc',
    region: 'bac',
    topic: 'Nghi lễ',
    summary: 'Các bước cơ bản từ khi đoàn nhà trai đến nhà gái đến lúc lại quả.',
    answer:
      'Thông thường lễ ăn hỏi gồm chào hỏi, trao lễ vật, giới thiệu đại diện hai họ, cô dâu ra mắt, thắp hương gia tiên và nhà gái lại quả. Số tráp và cách tổ chức có thể thay đổi theo địa phương, điều kiện gia đình và thỏa thuận hai bên.',
    sources: ['Tài liệu phong tục cưới hỏi Việt Nam - nguồn nội bộ đã tuyển chọn'],
    reviewedAt: '2026-10-01',
  },
  {
    id: 'trung-le-vat',
    title: 'Lễ vật cưới hỏi miền Trung',
    region: 'trung',
    topic: 'Lễ vật',
    summary: 'Những lễ vật thường gặp và cách thống nhất với gia đình hai bên.',
    answer:
      'Miền Trung thường coi trọng sự trang trọng và phù hợp với nếp nhà. Lễ vật có thể gồm trầu cau, trà rượu, bánh, trái cây và các lễ vật do hai gia đình thống nhất. Không nên áp dụng máy móc một danh sách vì mỗi tỉnh và mỗi gia đình có phong tục khác nhau.',
    sources: ['Sổ tay nghi lễ cưới hỏi miền Trung - nguồn nội bộ đã tuyển chọn'],
    reviewedAt: '2026-10-01',
  },
  {
    id: 'nam-le-cuoi',
    title: 'Nghi thức cưới phổ biến ở miền Nam',
    region: 'nam',
    topic: 'Nghi lễ',
    summary: 'Một số nghi thức thường xuất hiện trong lễ gia tiên và tiệc cưới.',
    answer:
      'Một lễ cưới miền Nam thường có lễ gia tiên, trao nhẫn hoặc quà cưới, mời trà cha mẹ và tiệc mừng. Trình tự cụ thể nên được thống nhất trước với người lớn trong gia đình, đặc biệt khi hai bên khác vùng miền.',
    sources: ['Cẩm nang văn hóa cưới hỏi Nam Bộ - nguồn nội bộ đã tuyển chọn'],
    reviewedAt: '2026-10-01',
  },
  {
    id: 'regional-difference',
    title: 'Khi hai gia đình khác vùng miền',
    region: 'bac',
    topic: 'Lưu ý',
    summary: 'Cách dung hòa phong tục mà vẫn giữ sự tôn trọng với hai bên.',
    answer:
      'Hai bạn nên lập danh sách những nghi thức bắt buộc theo gia đình, những nghi thức có thể giản lược và người chịu trách nhiệm thống nhất. Hãy hỏi trực tiếp đại diện hai họ trước khi chốt lễ vật hoặc trình tự; thông tin trên website chỉ mang tính tham khảo, không thay thế ý kiến gia đình.',
    sources: ['Bộ nguyên tắc tư vấn khác biệt vùng miền - nguồn nội bộ đã tuyển chọn'],
    reviewedAt: '2026-10-01',
  },
];

export const REGION_LABELS: Record<WeddingRegion, string> = {
  all: 'Tất cả vùng miền',
  bac: 'Miền Bắc',
  trung: 'Miền Trung',
  nam: 'Miền Nam',
};
