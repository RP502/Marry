import {
  BudgetItem,
  ChecklistTask,
  InvitationMessageTemplate,
  SpeechTemplate,
  BlogPost,
  SeatingTable,
  WeddingTemplate,
} from '../types';

export const CHUNGDOI_TEMPLATES: WeddingTemplate[] = [
  {
    id: 'song-hy-do',
    name: 'Song Hỷ - Đỏ',
    style: 'traditional',
    styleLabel: 'Truyền Thống Á Đông',
    tagline: 'Sắc đỏ thắm son may mắn biểu trưng cho chữ Hỷ trăm năm hòa hợp',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#DC2626',
    badge: 'Mẫu truyền thống Hot',
  },
  {
    id: 'long-phung-do',
    name: 'Long Phụng - Đỏ',
    style: 'traditional',
    styleLabel: 'Hoàng Tộc & Phúc Lộc',
    tagline: 'Họa tiết Rồng Phượng sum vầy uy nghi mang lại phú quý cát tường',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#B91C1C',
    badge: 'Bán chạy nhất',
  },
  {
    id: 'thanh-diep-xanh',
    name: 'Thanh Diệp - Xanh',
    style: 'floral',
    styleLabel: 'Cây Lá & Thiên Nhiên',
    tagline: 'Tươi mát với gam màu lá bạch đàn olive và hoa trắng thanh khiết',
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#059669',
    badge: 'Mẫu mùa hè',
  },
  {
    id: 'hoa-moc-hong',
    name: 'Hoa Mộc - Hồng',
    style: 'floral',
    styleLabel: 'Lãng Mạn & Pastel',
    tagline: 'Sắc hồng trà thanh nhã kết hợp hoa mẫu đơn cho chuyện tình ngọt ngào',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#E11D48',
    badge: 'Yêu thích nhất',
  },
  {
    id: 'mai-lan-trang',
    name: 'Mai Lan - Trắng',
    style: 'modern',
    styleLabel: 'Tối Giản Hiện Đại',
    tagline: 'Vẻ đẹp tinh tế không lỗi thời với bố cục chữ typography ấn tượng',
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#57534E',
    badge: 'Minimalism',
  },
  {
    id: 'hoang-gia-vang',
    name: 'Baroque - Vàng Kim',
    style: 'luxury',
    styleLabel: 'Hoàng Gia Châu Âu',
    tagline: 'Viền vàng đồng quý phái đính kèm họa tiết hoa văn lâu đài cổ kính',
    coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#D97706',
    badge: 'Luxury Vip',
  },
  {
    id: 'lau-dai-lam',
    name: 'Lâu Đài - Lam',
    style: 'luxury',
    styleLabel: 'Thần Thoại & Cổ Tích',
    tagline: 'Sắc xanh dương hoàng gia sâu thẳm tôn lên nét kiêu sa của nàng dâu',
    coverImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#2563EB',
    badge: 'Mới ra mắt',
  },
  {
    id: 'vuon-xuan-xanh',
    name: 'Vườn Xuân - Xanh',
    style: 'floral',
    styleLabel: 'Khu Vườn Mùa Xuân',
    tagline: 'Muôn hoa khoe sắc nở rộ báo hiệu một khởi đầu viên mãn ấm êm',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80',
    ],
    themeColor: '#10B981',
  },
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  // 1. Tiệc cưới & Nhà hàng
  {
    id: 'b-1',
    category: 'Tiệc cưới & Địa điểm',
    name: 'Bàn tiệc nhà hàng (30 bàn x 4.500.000đ)',
    estimatedCost: 135000000,
    actualCost: 135000000,
    paid: true,
    notes: 'Đã cọc 30% tại White Palace sảnh Grand',
  },
  {
    id: 'b-2',
    category: 'Tiệc cưới & Địa điểm',
    name: 'Nước uống bia, nước ngọt & phí phục vụ',
    estimatedCost: 18000000,
    actualCost: 16500000,
    paid: false,
    notes: 'Thanh toán vào cuối tiệc theo số lon thực tế',
  },
  {
    id: 'b-3',
    category: 'Tiệc cưới & Địa điểm',
    name: 'Âm thanh, ánh sáng & màn hình LED sảnh',
    estimatedCost: 12000000,
    actualCost: 10000000,
    paid: true,
    notes: 'Bao gồm gói hiệu ứng pháo sáng & khói lạnh',
  },

  // 2. Trang phục & Làm đẹp
  {
    id: 'b-4',
    category: 'Trang phục & Trang điểm',
    name: 'Thuê váy cưới cô dâu chính (Lễ & Tiệc)',
    estimatedCost: 18000000,
    actualCost: 16000000,
    paid: true,
    notes: 'Gói 2 váy cao cấp tại Hacchic Couture',
  },
  {
    id: 'b-5',
    category: 'Trang phục & Trang điểm',
    name: 'May/Thuê Vest chú rể (2 bộ)',
    estimatedCost: 8000000,
    actualCost: 7500000,
    paid: true,
    notes: 'Vest đen cổ điển + Vest kem tuxedo',
  },
  {
    id: 'b-6',
    category: 'Trang phục & Trang điểm',
    name: 'Áo dài cưới cô dâu & chú rể ngày lễ ăn hỏi',
    estimatedCost: 5000000,
    actualCost: 4500000,
    paid: true,
    notes: 'Áo dài lụa tơ tằm đỏ thêu hoa sen',
  },
  {
    id: 'b-7',
    category: 'Trang phục & Trang điểm',
    name: 'Trang điểm & làm tóc cô dâu (Ăn hỏi + Tiệc cưới)',
    estimatedCost: 8000000,
    actualCost: 8000000,
    paid: false,
    notes: 'Make-up artist đi cùng dặm phấn trong tiệc',
  },

  // 3. Chụp ảnh & Quay phim
  {
    id: 'b-8',
    category: 'Ảnh cưới & Phim phóng sự',
    name: 'Chụp ảnh Pre-wedding studio + ngoại cảnh',
    estimatedCost: 18000000,
    actualCost: 17000000,
    paid: true,
    notes: 'Đã nhận file gốc và 2 ảnh cổng lớn',
  },
  {
    id: 'b-9',
    category: 'Ảnh cưới & Phim phóng sự',
    name: 'Quay chụp phóng sự cưới ngày cưới chính',
    estimatedCost: 16000000,
    actualCost: 15000000,
    paid: false,
    notes: '2 máy ảnh + 1 máy quay flycam',
  },

  // 4. Lễ vật & Ăn hỏi
  {
    id: 'b-10',
    category: 'Lễ nghi & Lễ vật',
    name: 'Mâm quả tráp cưới rồng phụng (7 tráp truyền thống)',
    estimatedCost: 12000000,
    actualCost: 11500000,
    paid: true,
    notes: 'Tráp trầu cau, trà rượu, bánh phu thê, trái cây rồng phụng',
  },
  {
    id: 'b-11',
    category: 'Lễ nghi & Lễ vật',
    name: 'Tiền nạp tài (Lễ đen) cho nhà gái',
    estimatedCost: 30000000,
    actualCost: 30000000,
    paid: false,
    notes: 'Chuẩn bị phong bao đỏ trước 3 ngày',
  },
  {
    id: 'b-12',
    category: 'Lễ nghi & Lễ vật',
    name: 'Thuê đội bê tráp nam nữ (14 người + lì xì duyên)',
    estimatedCost: 3500000,
    actualCost: 3200000,
    paid: false,
  },

  // 5. Nhẫn cưới & Trang sức
  {
    id: 'b-13',
    category: 'Nhẫn cưới & Trang sức',
    name: 'Cặp nhẫn cưới kim cương vàng 18K',
    estimatedCost: 22000000,
    actualCost: 20500000,
    paid: true,
    notes: 'Khắc tên Triết & Vy bên trong lòng nhẫn',
  },
  {
    id: 'b-14',
    category: 'Nhẫn cưới & Trang sức',
    name: 'Bộ trang sức cưới trao dâu (dây chuyền, bông tai)',
    estimatedCost: 25000000,
    actualCost: 25000000,
    paid: true,
  },

  // 6. Thiệp cưới & Quà tặng
  {
    id: 'b-15',
    category: 'Thiệp mời & Quà cảm ơn',
    name: 'Website đám cưới & Thiệp cưới online Chung Đôi',
    estimatedCost: 399000,
    actualCost: 399000,
    paid: true,
    notes: 'Gói Vĩnh Cửu VIP trọn đời lưu niệm',
  },
  {
    id: 'b-16',
    category: 'Thiệp mời & Quà cảm ơn',
    name: 'In thiệp cưới giấy truyền thống cho người lớn (150 thiệp)',
    estimatedCost: 2500000,
    actualCost: 2250000,
    paid: true,
  },
  {
    id: 'b-17',
    category: 'Thiệp mời & Quà cảm ơn',
    name: 'Quà cảm ơn khách mang về (Hộp nến thơm & mật ong)',
    estimatedCost: 6000000,
    actualCost: 5500000,
    paid: false,
  },

  // 7. Xe hoa & Di chuyển
  {
    id: 'b-18',
    category: 'Xe hoa & Vận chuyển',
    name: 'Thuê xe hoa rước dâu Mercedes mui trần + hoa tươi',
    estimatedCost: 5500000,
    actualCost: 5000000,
    paid: false,
  },
  {
    id: 'b-19',
    category: 'Xe hoa & Vận chuyển',
    name: 'Thuê xe 29 chỗ đưa đón họ hàng hai bên',
    estimatedCost: 4000000,
    actualCost: 3800000,
    paid: false,
  },

  // 8. Quỹ dự phòng
  {
    id: 'b-20',
    category: 'Quỹ dự phòng phát sinh',
    name: 'Chi phí phát sinh lặt vặt ngày cưới',
    estimatedCost: 15000000,
    actualCost: 8000000,
    paid: false,
  },
];

export const INITIAL_CHECKLIST_TASKS: ChecklistTask[] = [
  // 6 tháng trước
  {
    id: 't-1',
    phase: '6months',
    phaseLabel: 'Trước 6 - 9 Tháng',
    title: 'Gặp gỡ hai gia đình & Chọn ngày lành tháng tốt',
    description: 'Thống nhất ngày dạm ngõ, ăn hỏi, lễ vu quy và tiệc thành hôn theo lịch âm dương.',
    completed: true,
  },
  {
    id: 't-2',
    phase: '6months',
    phaseLabel: 'Trước 6 - 9 Tháng',
    title: 'Dự trù ngân sách cưới tổng thể',
    description: 'Xác định số tiền chi tiêu của hai bạn và mức hỗ trợ của phụ mẫu hai bên.',
    completed: true,
  },
  {
    id: 't-3',
    phase: '6months',
    phaseLabel: 'Trước 6 - 9 Tháng',
    title: 'Đặt cọc trung tâm tiệc cưới / Nhà hàng',
    description: 'Sảnh tiệc đẹp thường hết chỗ rất sớm vào các tháng cao điểm mùa cưới.',
    completed: true,
  },
  {
    id: 't-4',
    phase: '6months',
    phaseLabel: 'Trước 6 - 9 Tháng',
    title: 'Lên danh sách khách mời dự kiến ban đầu',
    description: 'Ước lượng số lượng khách nhà trai, nhà gái và bạn bè để chốt số bàn tiệc.',
    completed: true,
  },

  // 3 tháng trước
  {
    id: 't-5',
    phase: '3months',
    phaseLabel: 'Trước 3 - 4 Tháng',
    title: 'Chọn studio & Chụp bộ ảnh cưới Pre-wedding',
    description: 'Chụp sớm để có thời gian chỉnh sửa ảnh chỉn chu và in ảnh cổng phóng to.',
    completed: true,
  },
  {
    id: 't-6',
    phase: '3months',
    phaseLabel: 'Trước 3 - 4 Tháng',
    title: 'Thử váy cưới & Đặt may vest chú rể',
    description: 'Thử phom dáng váy đuôi cá, công chúa hoặc chữ A phù hợp vóc dáng.',
    completed: true,
  },
  {
    id: 't-7',
    phase: '3months',
    phaseLabel: 'Trước 3 - 4 Tháng',
    title: 'Mua nhẫn cưới & Trang sức trao dâu',
    description: 'Khắc tên và ngày cưới bên trong lòng nhẫn để lưu giữ kỷ niệm thiêng liêng.',
    completed: true,
  },
  {
    id: 't-8',
    phase: '3months',
    phaseLabel: 'Trước 3 - 4 Tháng',
    title: 'Tạo website đám cưới & Thiệp cưới online Chung Đôi',
    description: 'Cập nhật câu chuyện tình yêu, album ảnh cưới, lịch trình và cấu hình VietQR.',
    completed: true,
  },

  // 1 tháng trước
  {
    id: 't-9',
    phase: '1month',
    phaseLabel: 'Trước 1 Tháng',
    title: 'Gửi thiệp cưới online qua Zalo & Phát thiệp giấy',
    description: 'Gửi link thiệp kèm tên riêng từng người và kích hoạt xác nhận tham dự (RSVP).',
    completed: false,
  },
  {
    id: 't-10',
    phase: '1month',
    phaseLabel: 'Trước 1 Tháng',
    title: 'Đặt tráp ăn hỏi rồng phụng & Thuê đội bê quả',
    description: 'Thống nhất số lượng mâm quả (5, 7, 9 hoặc 11 tráp tùy vùng miền).',
    completed: false,
  },
  {
    id: 't-11',
    phase: '1month',
    phaseLabel: 'Trước 1 Tháng',
    title: 'Thử trang điểm & Làm tóc cô dâu (Makeup test)',
    description: 'Đảm bảo tone makeup tự nhiên, hợp ánh đèn sân khấu và bền màu suốt tiệc.',
    completed: false,
  },
  {
    id: 't-12',
    phase: '1month',
    phaseLabel: 'Trước 1 Tháng',
    title: 'Đặt xe hoa rước dâu & Xe đưa đón họ hàng',
    description: 'Kiểm tra lộ trình, giờ hoàng đạo xuất phát và cung đường không bị kẹt xe.',
    completed: false,
  },

  // 2 tuần trước
  {
    id: 't-13',
    phase: '2weeks',
    phaseLabel: 'Trước 2 Tuần',
    title: 'Kiểm tra phản hồi RSVP trên Chung Đôi & Chốt số bàn tiệc',
    description: 'Gọi điện nhắc nhở những khách còn lưỡng lự để tránh thừa/thiếu cỗ.',
    completed: false,
  },
  {
    id: 't-14',
    phase: '2weeks',
    phaseLabel: 'Trước 2 Tuần',
    title: 'Xếp sơ đồ bàn tiệc (Seating Chart)',
    description: 'Xếp bạn bè cấp 3, đại học, đồng nghiệp ngồi chung bàn để không khí sôi nổi.',
    completed: false,
  },
  {
    id: 't-15',
    phase: '2weeks',
    phaseLabel: 'Trước 2 Tuần',
    title: 'Duyệt kịch bản MC & Danh sách bài hát phát trong tiệc',
    description: 'Chọn nhạc lúc đón khách, nhạc chú rể tiến vào lễ đường và nhạc cắt bánh.',
    completed: false,
  },

  // Ngày cưới
  {
    id: 't-16',
    phase: 'weddingDay',
    phaseLabel: 'Ngày Hôn Lễ',
    title: 'Kiểm tra nhẫn cưới & Phong bao lì xì duyên',
    description: 'Giao người thân giữ túi nhẫn và phong bì lì xì cho đội bê tráp.',
    completed: false,
  },
  {
    id: 't-17',
    phase: 'weddingDay',
    phaseLabel: 'Ngày Hôn Lễ',
    title: 'Ăn nhẹ trước khi trang điểm & Giữ tinh thần thoải mái',
    description: 'Uống đủ nước, thư giãn và cùng nhau tận hưởng khoảnh khắc hạnh phúc nhất đời!',
    completed: false,
  },
];

export const INVITATION_MESSAGE_TEMPLATES: InvitationMessageTemplate[] = [
  {
    id: 'msg-1',
    target: 'close_friends',
    targetLabel: 'Bạn bè thân thiết / Hội bạn thân',
    title: 'Thân mật, hài hước & ấm cúng',
    content: `Alo bạn thân ơi! Sau chuỗi ngày độc thân bền vững thì cuối cùng tớ cũng đã tìm được bến đỗ cuộc đời rồi đây haha! 

Đám cưới của tụi tớ sẽ diễn ra vào ngày [NGÀY_CƯỚI] tại [ĐỊA_ĐIỂM]. Sự có mặt của cậu là niềm vui siêu to khổng lồ của hai đứa. Nhớ lên đồ thật đẹp và chuẩn bị một chiếc bụng đói để quẩy hết mình cùng tụi tớ nhé!

Cậu mở tấm thiệp cưới online này để xem chi tiết giờ đón khách và chỉ đường nha: [LINK_THIỆP]`,
  },
  {
    id: 'msg-2',
    target: 'school_friends',
    targetLabel: 'Bạn học Cấp 3 / Đại học',
    title: 'Ấm áp & Gợi nhớ kỷ niệm',
    content: `Chào cậu, lâu rồi tụi mình chưa gặp lại nhau!

Nhân dịp ngày vui trọng đại nhất cuộc đời, tớ xin gửi lời mời trân trọng nhất đến cậu đến chung vui trong ngày lễ thành hôn của tớ và [TÊN_VỢ/CHỒNG] vào ngày [NGÀY_CƯỚI] tới đây tại [ĐỊA_ĐIỂM].

Đây cũng là cơ hội tuyệt vời để hội bạn chúng mình tụ họp ôn lại những kỷ niệm đẹp ngày xưa. Cậu xem thông tin chi tiết và xác nhận tham dự giúp tớ qua tấm thiệp online này nha: [LINK_THIỆP]. 

Rất mong được đón tiếp cậu!`,
  },
  {
    id: 'msg-3',
    target: 'colleagues',
    targetLabel: 'Đồng nghiệp trong công ty',
    title: 'Lịch sự, vui tươi & Trang nhã',
    content: `Chào anh/chị/em đồng nghiệp thân mến,

Sắp tới vào ngày [NGÀY_CƯỚI], [TÊN_BẠN] và [TÊN_VỢ/CHỒNG] sẽ tổ chức tiệc cưới tại [ĐỊA_ĐIỂM]. Em/mình rất mong anh/chị/em bớt chút thời gian quý báu đến nâng ly chúc phúc cho hai đứa em.

Chi tiết về thời gian đón khách, sơ đồ địa điểm và thực đơn tiệc cưới được gửi trọn vẹn trong thiệp điện tử tại đây ạ: [LINK_THIỆP]

Sự hiện diện của mọi người là niềm vinh hạnh to lớn của gia đình tụi em!`,
  },
  {
    id: 'msg-4',
    target: 'boss',
    targetLabel: 'Sếp / Cấp trên / Đối tác',
    title: 'Trang trọng & Chu đáo chuẩn mực',
    content: `Kính gửi Anh/Chị [TÊN_SẾP],

Em xin trân trọng kính mời Anh/Chị đến tham dự buổi tiệc cưới của em và gia đình vào ngày [NGÀY_CƯỚI] tại Trung tâm tiệc cưới [ĐỊA_ĐIỂM].

Trong suốt thời gian làm việc, em luôn biết ơn sự dẫn dắt và ủng hộ quý báu từ Anh/Chị. Sự hiện diện của Anh/Chị tại buổi tiệc là niềm vinh hạnh rất lớn đối với em và gia đình hai bên.

Em xin kính gửi thiệp mời điện tử kèm thông tin chi tiết tại liên kết: [LINK_THIỆP]

Em rất mong được đón tiếp Anh/Chị trong ngày vui này!`,
  },
  {
    id: 'msg-5',
    target: 'elders',
    targetLabel: 'Họ hàng / Người lớn tuổi',
    title: 'Kính cẩn, lễ phép & Đúng nghi thức',
    content: `Dạ con/cháu [TÊN_BẠN] xin kính chào Cô/Chú/Bác ạ!

Dạ thưa Cô/Chú, được sự đồng ý và vun vén của hai bên gia đình, hôn lễ của con và cháu [TÊN_VỢ/CHỒNG] sẽ được long trọng tổ chức vào ngày [NGÀY_CƯỚI] (tức ngày [NGÀY_ÂM_LỊCH]) tại [ĐỊA_ĐIỂM].

Ba mẹ con và hai đứa chúng con trân trọng kính mời Cô/Chú cùng toàn thể gia đình bớt chút thời gian quý báu đến tham dự lễ thành hôn, chia vui và chúc phúc cho hai cháu ạ.

Dạ con xin gửi thiệp mời online kèm bản đồ chỉ đường chi tiết tại đây: [LINK_THIỆP]

Gia đình chúng con rất mong được đón tiếp Cô/Chú ạ!`,
  },
  {
    id: 'msg-6',
    target: 'announcement_only',
    targetLabel: 'Báo hỷ / Bạn bè ở xa không tiện dự',
    title: 'Thông báo báo hỷ nhẹ nhàng, tinh tế',
    content: `Chào cậu thân mến,

Vì khoảng cách địa lý xa xôi nên tụi tớ xin phép được gửi tấm thiệp báo hỷ online này đến cậu như một lời thông báo ngày vui chính thức của hai đứa vào ngày [NGÀY_CƯỚI]. 

Dù không thể cùng nhau nâng ly trực tiếp, nhưng tình cảm và những lời chúc phúc từ xa của cậu luôn là món quà vô cùng ý nghĩa đối với tụi tớ. Cậu có thể ghé thăm trang kỷ niệm và để lại vài dòng lưu bút cho hai đứa tại đây nhé: [LINK_THIỆP]

Chúc cậu luôn dồi dào sức khỏe và bình an!`,
  },
];

export const SPEECH_TEMPLATES: SpeechTemplate[] = [
  {
    id: 'sp-1',
    category: 'thanh_hon',
    categoryLabel: 'Lễ Thành Hôn (Tiệc cưới)',
    speaker: 'groom_rep',
    speakerLabel: 'Đại diện nhà trai',
    title: 'Bài phát biểu mừng lễ thành hôn trang trọng của trưởng đoàn nhà trai',
    content: `Kính thưa quan viên hai họ! Kính thưa các cụ, các ông, các bà, các cô, các chú, cùng toàn thể bạn bè, quan khách gần xa đã có mặt đông đủ trong hội trường ngày hôm nay!

Tôi xin tự giới thiệu, tôi là [TÊN_ĐẠI_DIỆN], là [QUAN_HỆ] của chú rể [TÊN_CHÚ_RỂ]. Hôm nay, trong không khí vui tươi, phấn khởi của ngày lành tháng tốt, tôi vô cùng vinh dự được thay mặt cho họ nhà trai gửi tới toàn thể quý vị lời chào trân trọng và lời chúc sức khỏe, hạnh phúc tốt đẹp nhất.

Kính thưa quý vị, trải qua thời gian tìm hiểu, yêu thương và được sự đồng thuận của hai gia đình, hôm nay hai cháu [TÊN_CHÚ_RỂ] và [TÊN_CÔ_DAU] đã chính thức nên duyên vợ chồng. Người xưa có câu "Trai khôn dựng vợ, gái lớn gả chồng", nhìn hai cháu sánh bước bên nhau rạng ngời hôm nay, gia đình chúng tôi vô cùng xúc động và tự hào.

Gia đình nhà trai chúng tôi xin chân thành cảm ơn gia đình nhà gái đã tin tưởng, yêu mến và gả người con gái hiếu thảo, nết na cho cháu [TÊN_CHÚ_RỂ]. Chúng tôi xin hứa sẽ luôn yêu thương, bảo ban và xem cháu [TÊN_CÔ_DAU] như con gái ruột trong gia đình.

Xin kính chúc cho hai cháu "Trăm năm tình viên mãn, bạc đầu nghĩa phu thê". Một lần nữa, xin trân trọng cảm ơn toàn thể quý vị khách quý đã dành thời gian quý báu đến chung vui cùng gia đình chúng tôi!`,
    tips: [
      'Giọng đọc dõng dạc, rõ ràng, mắt nhìn bao quát cả hai bên gia đình.',
      'Thời lượng lý tưởng từ 2 đến 3 phút, tránh quá dài dòng gây loãng chương trình.',
      'Cúi chào quan khách khi bắt đầu và khi kết thúc.',
    ],
  },
  {
    id: 'sp-2',
    category: 'thanh_hon',
    categoryLabel: 'Lễ Thành Hôn (Tiệc cưới)',
    speaker: 'bride_rep',
    speakerLabel: 'Đại diện nhà gái',
    title: 'Lời dặn dò cảm động của đại diện họ nhà gái trao dâu',
    content: `Kính thưa các cụ, các ông bà, cùng toàn thể quý vị quan khách và bà con hai họ!

Tôi là [TÊN_ĐẠI_DIỆN], đại diện cho gia đình họ nhà gái. Lời đầu tiên, cho phép tôi xin gửi tới toàn thể quý vị lời chúc mừng nồng nhiệt và lời cảm ơn sâu sắc nhất vì đã không quản đường sá xa xôi đến đây chúc phúc cho hai cháu.

Hôm nay là ngày vui trọng đại của hai cháu [TÊN_CHÚ_RỂ] và [TÊN_CÔ_DAU]. Cháu gái chúng tôi sinh ra và lớn lên trong sự đùm bọc của gia đình, nay đã trưởng thành và bước sang một trang mới của cuộc đời. Chúng tôi rất yên tâm và vui mừng khi cháu tìm được người bạn đời hiền lành, chín chắn và đầy trách nhiệm như cháu [TÊN_CHÚ_RỂ].

Trước bàn thờ gia tiên và sự chứng kiến của toàn thể hai họ, chúng tôi xin chính thức gửi gắm cháu gái cho gia đình nhà trai. Dù đã khôn lớn nhưng cháu vẫn còn những bỡ ngỡ trong nếp sống mới, mong rằng ông bà thông gia và gia đình sẽ chỉ bảo, dìu dắt để cháu hoàn thành bổn phận của người con dâu thảo, người vợ hiền.

Chúc cho tình thông gia giữa hai gia đình ngày càng bền chặt gắn kết. Chúc hai con luôn yêu thương, nhường nhịn và cùng nhau xây dựng tổ ấm vững bền!`,
    tips: [
      'Thể hiện sự xúc động chân thành nhưng ấm áp, tràn đầy tình thương yêu.',
      'Gửi gắm niềm tin vào chú rể và gia đình nhà trai.',
    ],
  },
  {
    id: 'sp-3',
    category: 'cam_on',
    categoryLabel: 'Lời Cảm Ơn Sau Tiệc Cưới',
    speaker: 'groom',
    speakerLabel: 'Chú rể & Cô dâu',
    title: 'Lời cảm ơn từ đáy lòng của đôi uyên ương gửi cha mẹ và khách quý',
    content: `Kính thưa cha mẹ hai bên, cùng toàn thể cô dì chú bác, anh chị em và bạn bè thân thương!

Hôm nay là ngày hạnh phúc nhất trong cuộc đời của hai đứa con. Đứng tại đây, trước hết con xin gửi lời tri ân sâu sắc nhất đến cha mẹ - những người đã sinh thành, dưỡng dục và hy sinh cả cuộc đời để chúng con có được ngày hôm nay. Chúng con xin hứa sẽ luôn yêu thương nhau, hiếu thảo với cha mẹ để đền đáp công ơn biển trời ấy.

Chúng mình cũng xin gửi lời cảm ơn chân thành đến tất cả các anh chị em, bạn bè đồng nghiệp đã có mặt đông đủ, gửi những lời chúc phúc ngọt ngào và những nụ cười rạng rỡ làm cho ngày cưới của tụi mình trở nên trọn vẹn và đáng nhớ hơn bao giờ hết.

Xin kính chúc toàn thể quý vị một bữa tiệc thật ngon miệng và thật nhiều niềm vui. Tụi con xin chân thành cảm ơn!`,
    tips: [
      'Chú rể hoặc cô dâu có thể cầm tay nhau khi phát biểu để tăng phần gắn kết.',
      'Nhìn về phía cha mẹ khi nói lời cảm ơn đấng sinh thành.',
    ],
  },
  {
    id: 'sp-4',
    category: 'an_hoi',
    categoryLabel: 'Lễ Ăn Hỏi (Đính hôn)',
    speaker: 'groom_rep',
    speakerLabel: 'Đại diện nhà trai',
    title: 'Bài phát biểu xin dâu trong lễ ăn hỏi truyền thống',
    content: `Kính thưa các cụ, các ông, các bà cùng toàn thể gia đình họ nhà gái!

Đoàn nhà trai chúng tôi hôm nay vô cùng phấn khởi khi được gia đình nhà gái tiếp đón nồng hậu, ân tình. Hôm nay, đúng giờ hoàng đạo đã định, họ nhà trai chúng tôi có chuẩn bị cơi trầu mâm quả theo đúng phong tục tập quán cổ truyền của dân tộc.

Xin trân trọng dâng lên trước gia tiên họ nhà gái sính lễ đính hôn, chính thức xin được đính ước cho cháu [TÊN_CHÚ_RỂ] và cháu [TÊN_CÔ_DAU]. Rất mong gia đình nhà gái hoan hỷ chấp thuận để hai cháu sớm ngày nên duyên giai ngẫu. Xin trân trọng cảm ơn!`,
    tips: [
      'Ngắn gọn, trang nghiêm, tôn trọng nghi thức dâng tráp sính lễ.',
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'moi-cuoi-qua-zalo',
    title: "Mời Cưới Qua Zalo: Tại Sao Khách Nói 'Ok' Mà Không Đến (2026)",
    category: 'Kinh nghiệm mời cưới',
    readTime: '4 phút đọc',
    date: '10/02/2026',
    summary:
      'Tại sao gửi tin nhắn mời cưới qua mạng xã hội rất dễ bị lãng quên hoặc hiểu nhầm? Bí quyết gửi thiệp cưới online kèm tên riêng để khách cảm thấy được tôn trọng 100%.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Thời đại 4.0, việc gửi thiệp cưới qua Zalo, Facebook trở nên cực kỳ phổ biến vì tính tiện lợi và tiết kiệm. Tuy nhiên, rất nhiều cặp dâu rể gặp tình trạng “dở khóc dở cười”: Khách trả lời “Ok chúc mừng nhé” nhưng đến ngày cưới thì vắng mặt không lý do.',
      'Nguyên nhân cốt lõi là sự hời hợt khi sao chép một tin nhắn chung gửi hàng loạt (copy-paste). Khách mời cảm thấy họ chỉ là một con số trong danh sách, không có cảm giác được trân trọng đích danh.',
      'Giải pháp tinh tế nhất hiện nay chính là sử dụng Thiệp cưới online cá nhân hoá của Chung Đôi: Trên phong bì thiệp điện tử hiển thị đúng danh xưng “Kính gửi: Anh Hoàng Nam & Bạn gái”, kết hợp tính năng xác nhận tham dự (RSVP) trực tiếp giúp khách cảm thấy trang trọng hệt như nhận tấm thiệp trao tay.',
    ],
  },
  {
    id: 'post-2',
    slug: 'du-toan-chi-phi-dam-cuoi',
    title: 'Dự Toán Chi Phí Đám Cưới Việt 2026: Cắt Đâu, Giữ Đâu Để Không Lỗ',
    category: 'Ngân sách cưới',
    readTime: '6 phút đọc',
    date: '18/01/2026',
    summary:
      'Bảng phân bổ ngân sách cưới chi tiết từ 150 triệu đến 400 triệu cho đám cưới Việt hiện đại. Cách hạn chế các chi phí phát sinh ẩn như hoa tươi, đồ uống, và trang phục.',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Một trong những nỗi lo lớn nhất của các cặp đôi trẻ khi chuẩn bị kết hôn là chi phí cưới bị đội lên gấp đôi so với dự tính ban đầu.',
      'Khoản chi chiếm tỷ trọng lớn nhất (khoảng 50-60%) luôn là Tiệc cưới & Nhà hàng. Mẹo vàng là hãy thương lượng kỹ các chính sách trọn gói nước uống và giờ phát sinh trước khi ký hợp đồng đặt cọc.',
      'Đối với thiệp mời, việc chuyển dịch sang Thiệp cưới online giúp tiết kiệm tới 80% chi phí in ấn và gửi bưu điện, đồng thời cho phép khách mừng cưới quét mã VietQR nhanh chóng, không lo quên phong bì tiền mặt.',
    ],
  },
  {
    id: 'post-3',
    slug: 'checklist-chuan-bi-dam-cuoi',
    title: 'Checklist Chuẩn Bị Đám Cưới: 12 Tuần Cuối Cùng Dành Cho Dâu Rể',
    category: 'Kế hoạch cưới',
    readTime: '5 phút đọc',
    date: '05/01/2026',
    summary:
      'Lộ trình từng bước khoa học giúp cô dâu chú rể thảnh thơi tận hưởng ngày vui mà không bị stress, sót việc hay cuống cuồng vào phút chót.',
    coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Giai đoạn 12 tuần cuối là lúc khối lượng công việc dồn dập nhất. Thay vì ghi nhớ trong đầu, việc sử dụng bảng công việc số hoá sẽ giúp bạn kiểm soát tiến độ hoàn hảo.',
      'Hãy phân chia công việc rõ ràng: Chú rể phụ trách xe cộ, âm thanh, thức uống và công tác hậu cần họ nhà trai; Cô dâu phụ trách hoa tươi, trang phục, makeup và quà cảm ơn.',
    ],
  },
  {
    id: 'post-4',
    slug: 'mung-cuoi-vang-hay-tien',
    title: 'Mừng Cưới Vàng Hay Tiền? Khi Giá Vàng Biến Động Năm 2026',
    category: 'Văn hóa cưới hỏi',
    readTime: '4 phút đọc',
    date: '28/02/2026',
    summary:
      'Góc nhìn tinh tế về phong tục mừng cưới người thân và bạn bè thân thiết: khi nào nên mừng nhẫn chỉ vàng 9999, khi nào nên mừng tiền mặt chuyển khoản VietQR.',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Tặng vàng cưới từ lâu đã là nét văn hóa chúc phúc đẹp đẽ mang tính tích lũy tài sản cho đôi uyên ương mới lập gia đình.',
      'Với anh chị em ruột hoặc bạn nối khố tri kỷ, nửa chỉ hoặc 1 chỉ vàng nhẫn trơn là món quà kỷ niệm vô giá. Còn đối với bạn bè xã giao hay khách mời ở xa, việc quét mã VietQR trực tiếp trên thiệp cưới Chung Đôi là giải pháp vừa văn minh, vừa tế nhị và bảo mật tuyệt đối.',
    ],
  },
];

export const INITIAL_SEATING_TABLES: SeatingTable[] = [
  {
    id: 'tbl-1',
    name: 'Bàn 01: VIP Họ Nhà Trai',
    side: 'vip',
    capacity: 10,
    assignedGuests: ['Ông Nội & Bà Nội chú rể', 'Bác Cả & Bác Gái', 'Cô Út', 'Chú Ba'],
    notes: 'Bàn sát sân khấu chính, gần lối đi cô dâu chú rể',
  },
  {
    id: 'tbl-2',
    name: 'Bàn 02: VIP Họ Nhà Gái',
    side: 'vip',
    capacity: 10,
    assignedGuests: ['Bà Ngoại cô dâu', 'Cậu Hai & Mợ', 'Dì Năm', 'Chú Bảy'],
    notes: 'Bàn danh dự bên cánh phải sân khấu',
  },
  {
    id: 'tbl-3',
    name: 'Bàn 03: Hội Bạn Thân Đại Học Chú Rể',
    side: 'groom',
    capacity: 10,
    assignedGuests: ['Anh Hoàng Nam', 'Quốc Bảo', 'Tuấn Anh & Bạn gái', 'Minh Hải'],
    notes: 'Không gian sôi động, chuẩn bị sẵn bia ướp lạnh',
  },
  {
    id: 'tbl-4',
    name: 'Bàn 04: Hội Chị Em Bạn Dâu',
    side: 'bride',
    capacity: 10,
    assignedGuests: ['Thảo Vy', 'Ngọc Ánh & Chồng', 'Thùy Dương', 'Khánh Linh'],
    notes: 'Gần photobooth chụp ảnh',
  },
  {
    id: 'tbl-5',
    name: 'Bàn 05: Đồng Nghiệp Công Ty',
    side: 'mutual',
    capacity: 10,
    assignedGuests: ['Sếp Tuấn', 'Trưởng phòng Marketing', 'Team Thiết kế (4 bạn)'],
    notes: 'Bàn tròn trang trọng lịch sự',
  },
];
