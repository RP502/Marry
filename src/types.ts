export type Language = 'vi' | 'en';

export type ViewMode =
  | 'landing'
  | 'builder'
  | 'invitation'
  | 'rsvp-dashboard'
  | 'templates'
  | 'tools'
  | 'wedding-plan'
  | 'budget-calc'
  | 'invitation-messages'
  | 'speeches'
  | 'save-the-date'
  | 'compress-image'
  | 'lunar-converter'
  | 'seating-chart'
  | 'blog'
  | 'pricing'
  | 'reviews'
  | 'admin'
  | 'dashboard'
  | 'login'
  | 'signup'
  | 'verify-magic-link'
  | 'xac-minh'
  | 'account'
  | 'payment'
  | 'xem-khach'
  | 'public-analytics'
  | 'share';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'vip';
  weddingTitle: string;
  weddingSlug: string;
  weddingDate: string;
  createdAt: string;
  expiresAt?: string;
  paidAt?: string;
}

export interface AdminWeddingRecord {
  id: string;
  coupleNames: string;
  email: string;
  phone: string;
  weddingDate: string;
  templateName: string;
  plan: 'free' | 'pro' | 'vip';
  status: 'active' | 'draft' | 'expired';
  views: number;
  rsvps: number;
  createdAt: string;
}

export interface PublicAnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  rsvpConversionRate: number;
  wishesCount: number;
  qrScans: number;
  referrers: { source: string; count: number; percent: number }[];
  dailyViews: { date: string; views: number; rsvps: number }[];
  deviceBreakdown: { mobile: number; desktop: number; tablet: number };
}

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  notes?: string;
}

export interface ChecklistTask {
  id: string;
  phase: '6months' | '3months' | '1month' | '2weeks' | 'weddingDay' | 'afterWedding';
  phaseLabel: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export interface InvitationMessageTemplate {
  id: string;
  target: 'close_friends' | 'school_friends' | 'colleagues' | 'boss' | 'elders' | 'announcement_only';
  targetLabel: string;
  title: string;
  content: string;
}

export interface SpeechTemplate {
  id: string;
  category: 'dam_ngo' | 'an_hoi' | 'vu_quy' | 'thanh_hon' | 'cam_on';
  categoryLabel: string;
  speaker: 'groom_rep' | 'bride_rep' | 'groom' | 'bride';
  speakerLabel: string;
  title: string;
  content: string;
  tips: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  coverImage: string;
}

export interface SeatingTable {
  id: string;
  name: string;
  side: 'groom' | 'bride' | 'mutual' | 'vip';
  capacity: number;
  assignedGuests: string[];
  notes?: string;
}

export interface BankAccount {
  bankName: string;
  bankCode: string; // e.g. 'VCB', 'MB', 'TCB'
  accountNumber: string;
  accountHolder: string;
  qrUrl?: string;
}

export interface PersonInfo {
  name: string;
  shortName: string;
  role: 'groom' | 'bride';
  bio: string;
  fatherName: string;
  motherName: string;
  avatar: string;
  bank: BankAccount;
}

export interface WeddingEventLocation {
  name: string;
  type: 'ceremony' | 'reception' | 'engagement' | 'afterparty';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  lunarDate: string;
  venueName: string;
  venueAddress: string;
  mapQuery: string;
  mapEmbedUrl?: string;
}

export interface LoveStoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DressCode {
  colors: Array<{ name: string; hex: string }>;
  note: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  melodyKey: 'canon' | 'canthelp' | 'perfect' | 'untilfound' | 'ido';
  autoPlay: boolean;
}

export interface WeddingThemeConfig {
  templateId: string;
  primaryColor: string; // hex
  secondaryColor: string;
  fontFamily: 'serif-wedding' | 'display' | 'script' | 'modern';
  effect: 'petals' | 'hearts' | 'sparkles' | 'none';
  enableGuestbook: boolean;
  enableRsvp: boolean;
  enableGiftBox: boolean;
  enableLoveStory: boolean;
  enableTimeline: boolean;
  enableDressCode: boolean;
}

export interface WeddingData {
  id: string;
  title: string;
  slug: string;
  invitationMessage: string;
  groom: PersonInfo;
  bride: PersonInfo;
  mainCeremony: WeddingEventLocation;
  teaCeremony?: WeddingEventLocation;
  loveStory: LoveStoryMilestone[];
  gallery: GalleryImage[];
  timeline: TimelineEvent[];
  dressCode: DressCode;
  music: MusicTrack;
  theme: WeddingThemeConfig;
}

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  side: 'groom' | 'bride' | 'mutual';
  attendingStatus: 'attending' | 'not_attending' | 'tentative' | 'pending';
  guestCount: number;
  dietaryNotes?: string;
  wishes?: string;
  customSalutation?: string; // e.g. "Anh", "Chị", "Bạn", "Gia đình"
  sent: boolean;
  createdAt: string;
}

export interface WishItem {
  id: string;
  guestName: string;
  content: string;
  createdAt: string;
  likes: number;
  side?: 'groom' | 'bride' | 'mutual';
}

export interface WeddingTemplate {
  id: string;
  name: string;
  style: 'modern' | 'luxury' | 'traditional' | 'floral' | 'vintage' | 'korean';
  styleLabel: string;
  tagline: string;
  coverImage: string;
  previewImages: string[];
  themeColor: string;
  badge?: string;
}
