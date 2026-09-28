import React, { useState } from 'react';
import {
  User,
  Heart,
  Calendar,
  Image as ImageIcon,
  Clock,
  QrCode,
  Palette,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Share2,
  Save,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Upload,
} from 'lucide-react';
import { WeddingData, WeddingTemplate } from '../types';
import { WEDDING_TEMPLATES, BANK_OPTIONS } from '../data/mockData';
import { InvitationView } from './InvitationView';

interface WeddingBuilderProps {
  weddingData: WeddingData;
  onUpdateWeddingData: (data: WeddingData) => void;
  onPreviewFull: () => void;
  onOpenShareModal: () => void;
  lang: 'vi' | 'en';
}

type TabType =
  | 'couple'
  | 'venue'
  | 'story'
  | 'gallery'
  | 'schedule'
  | 'banking'
  | 'theme'
  | 'personalized-link';

export const WeddingBuilder: React.FC<WeddingBuilderProps> = ({
  weddingData,
  onUpdateWeddingData,
  onPreviewFull,
  onOpenShareModal,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('couple');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [customGuestName, setCustomGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper to update root properties
  const updateData = (updates: Partial<WeddingData>) => {
    onUpdateWeddingData({ ...weddingData, ...updates });
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const samplePhotoUrls = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80',
  ];

  const handleAddPhoto = () => {
    const randomUrl = samplePhotoUrls[Math.floor(Math.random() * samplePhotoUrls.length)];
    const newImage = {
      id: `gal-${Date.now()}`,
      url: randomUrl,
      caption: 'Khoảnh khắc yêu thương',
    };
    updateData({ gallery: [...weddingData.gallery, newImage] });
  };

  const handleRemovePhoto = (id: string) => {
    updateData({ gallery: weddingData.gallery.filter((g) => g.id !== id) });
  };

  const handleAddStory = () => {
    const newStory = {
      id: `story-${Date.now()}`,
      date: '01/01/2026',
      title: 'Kỷ niệm mới',
      description: 'Cùng nhau tạo nên những ký ức không thể nào quên.',
      image: samplePhotoUrls[1],
    };
    updateData({ loveStory: [...weddingData.loveStory, newStory] });
  };

  const handleRemoveStory = (id: string) => {
    updateData({ loveStory: weddingData.loveStory.filter((s) => s.id !== id) });
  };

  const generatedCustomUrl = customGuestName.trim()
    ? `${window.location.origin}/?guest=${encodeURIComponent(customGuestName.trim())}`
    : `${window.location.origin}/`;

  const copyCustomLink = () => {
    navigator.clipboard.writeText(generatedCustomUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const tabs: Array<{ id: TabType; labelVi: string; icon: React.ReactNode }> = [
    { id: 'couple', labelVi: 'Cặp Đôi & Gia Đình', icon: <User className="w-4 h-4" /> },
    { id: 'venue', labelVi: 'Thời Gian & Địa Điểm', icon: <Calendar className="w-4 h-4" /> },
    { id: 'story', labelVi: 'Chuyện Tình Yêu', icon: <Heart className="w-4 h-4" /> },
    { id: 'gallery', labelVi: 'Album Ảnh Cưới', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'schedule', labelVi: 'Lịch Trình & Dress Code', icon: <Clock className="w-4 h-4" /> },
    { id: 'banking', labelVi: 'Hộp Mừng Cưới (VietQR)', icon: <QrCode className="w-4 h-4" /> },
    { id: 'theme', labelVi: 'Giao Diện & Hiệu Ứng', icon: <Palette className="w-4 h-4" /> },
    { id: 'personalized-link', labelVi: 'Tạo Link Tên Khách Riêng', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col">
      {/* Top Action Bar */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-30 shadow-xs">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-base font-bold text-stone-900 flex items-center space-x-2">
              <span>Trình Thiết Kế Thiệp Cưới Chung Đôi</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                Đang trực tuyến
              </span>
            </h1>
            <p className="text-xs text-stone-500">
              {weddingData.groom.shortName} &amp; {weddingData.bride.shortName} &bull;{' '}
              {weddingData.mainCeremony.date}
            </p>
          </div>
        </div>

        {/* Center device toggle (for preview container) */}
        <div className="hidden lg:flex items-center space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === 'mobile' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Điện thoại</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === 'tablet' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Máy tính bảng</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === 'desktop' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Máy tính</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPreviewFull}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4 text-rose-500" />
            <span>Xem toàn màn hình</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
          >
            <Share2 className="w-4 h-4 text-stone-600" />
            <span>Chia sẻ &amp; Mã QR</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Đã lưu!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace (Split View) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: Controls & Editor */}
        <div className="w-full lg:w-[480px] xl:w-[520px] bg-white border-r border-stone-200 flex flex-col h-[calc(100vh-120px)] overflow-hidden">
          {/* Scrollable Tabs Bar */}
          <div className="flex overflow-x-auto border-b border-stone-200 p-2 space-x-1 shrink-0 bg-stone-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-rose-600 font-semibold shadow-xs border border-stone-200/60'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                {tab.icon}
                <span>{tab.labelVi}</span>
              </button>
            ))}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. COUPLE & PARENTS TAB */}
            {activeTab === 'couple' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 mb-1">Lời ngỏ mời cưới</h3>
                  <textarea
                    rows={3}
                    value={weddingData.invitationMessage}
                    onChange={(e) => updateData({ invitationMessage: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
                  />
                </div>

                {/* Groom Info */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                    Thông tin Chú Rể
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Họ &amp; Tên đầy đủ
                      </label>
                      <input
                        type="text"
                        value={weddingData.groom.name}
                        onChange={(e) =>
                          updateData({
                            groom: { ...weddingData.groom, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Tên gọi thân mật
                      </label>
                      <input
                        type="text"
                        value={weddingData.groom.shortName}
                        onChange={(e) =>
                          updateData({
                            groom: { ...weddingData.groom, shortName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Đôi nét về chú rể
                    </label>
                    <textarea
                      rows={2}
                      value={weddingData.groom.bio}
                      onChange={(e) =>
                        updateData({
                          groom: { ...weddingData.groom, bio: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Thân phụ (Bố chú rể)
                      </label>
                      <input
                        type="text"
                        value={weddingData.groom.fatherName}
                        onChange={(e) =>
                          updateData({
                            groom: { ...weddingData.groom, fatherName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Thân mẫu (Mẹ chú rể)
                      </label>
                      <input
                        type="text"
                        value={weddingData.groom.motherName}
                        onChange={(e) =>
                          updateData({
                            groom: { ...weddingData.groom, motherName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Bride Info */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                    Thông tin Cô Dâu
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Họ &amp; Tên đầy đủ
                      </label>
                      <input
                        type="text"
                        value={weddingData.bride.name}
                        onChange={(e) =>
                          updateData({
                            bride: { ...weddingData.bride, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Tên gọi thân mật
                      </label>
                      <input
                        type="text"
                        value={weddingData.bride.shortName}
                        onChange={(e) =>
                          updateData({
                            bride: { ...weddingData.bride, shortName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Đôi nét về cô dâu
                    </label>
                    <textarea
                      rows={2}
                      value={weddingData.bride.bio}
                      onChange={(e) =>
                        updateData({
                          bride: { ...weddingData.bride, bio: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Thân phụ (Bố cô dâu)
                      </label>
                      <input
                        type="text"
                        value={weddingData.bride.fatherName}
                        onChange={(e) =>
                          updateData({
                            bride: { ...weddingData.bride, fatherName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Thân mẫu (Mẹ cô dâu)
                      </label>
                      <input
                        type="text"
                        value={weddingData.bride.motherName}
                        onChange={(e) =>
                          updateData({
                            bride: { ...weddingData.bride, motherName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. VENUE & TIME TAB */}
            {activeTab === 'venue' && (
              <div className="space-y-6">
                {/* Main Ceremony */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                    Tiệc Cưới Chính (Thành Hôn)
                  </span>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Tên buổi tiệc
                    </label>
                    <input
                      type="text"
                      value={weddingData.mainCeremony.name}
                      onChange={(e) =>
                        updateData({
                          mainCeremony: { ...weddingData.mainCeremony, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Ngày cưới (Dương lịch)
                      </label>
                      <input
                        type="date"
                        value={weddingData.mainCeremony.date}
                        onChange={(e) =>
                          updateData({
                            mainCeremony: { ...weddingData.mainCeremony, date: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Giờ đón khách
                      </label>
                      <input
                        type="time"
                        value={weddingData.mainCeremony.time}
                        onChange={(e) =>
                          updateData({
                            mainCeremony: { ...weddingData.mainCeremony, time: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Ngày Âm lịch (Truyền thống)
                    </label>
                    <input
                      type="text"
                      value={weddingData.mainCeremony.lunarDate}
                      onChange={(e) =>
                        updateData({
                          mainCeremony: { ...weddingData.mainCeremony, lunarDate: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Tên Trung tâm tiệc cưới / Nhà hàng
                    </label>
                    <input
                      type="text"
                      value={weddingData.mainCeremony.venueName}
                      onChange={(e) =>
                        updateData({
                          mainCeremony: { ...weddingData.mainCeremony, venueName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Địa chỉ chi tiết (Sảnh, Số nhà, Đường, Quận/Huyện)
                    </label>
                    <input
                      type="text"
                      value={weddingData.mainCeremony.venueAddress}
                      onChange={(e) =>
                        updateData({
                          mainCeremony: {
                            ...weddingData.mainCeremony,
                            venueAddress: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                {/* Tea Ceremony (Vu Quy) */}
                {weddingData.teaCeremony && (
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      Lễ Vu Quy (Nhà Gái)
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                          Giờ làm lễ
                        </label>
                        <input
                          type="time"
                          value={weddingData.teaCeremony.time}
                          onChange={(e) =>
                            updateData({
                              teaCeremony: {
                                ...weddingData.teaCeremony!,
                                time: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                          Địa điểm tư gia
                        </label>
                        <input
                          type="text"
                          value={weddingData.teaCeremony.venueName}
                          onChange={(e) =>
                            updateData({
                              teaCeremony: {
                                ...weddingData.teaCeremony!,
                                venueName: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. LOVE STORY TAB */}
            {activeTab === 'story' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900">Các cột mốc tình yêu</h3>
                  <button
                    onClick={handleAddStory}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm cột mốc</span>
                  </button>
                </div>

                {weddingData.loveStory.map((story, idx) => (
                  <div
                    key={story.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2 relative"
                  >
                    <button
                      onClick={() => handleRemoveStory(story.id)}
                      className="absolute top-3 right-3 text-stone-400 hover:text-rose-500 p-1"
                      title="Xóa cột mốc này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[10px] font-bold text-stone-500 uppercase">
                      Cột mốc #{idx + 1}
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={story.date}
                        placeholder="Ngày tháng..."
                        onChange={(e) => {
                          const updated = weddingData.loveStory.map((s) =>
                            s.id === story.id ? { ...s, date: e.target.value } : s
                          );
                          updateData({ loveStory: updated });
                        }}
                        className="px-2.5 py-1.5 text-xs border border-stone-300 rounded bg-white"
                      />
                      <input
                        type="text"
                        value={story.title}
                        placeholder="Tiêu đề..."
                        onChange={(e) => {
                          const updated = weddingData.loveStory.map((s) =>
                            s.id === story.id ? { ...s, title: e.target.value } : s
                          );
                          updateData({ loveStory: updated });
                        }}
                        className="px-2.5 py-1.5 text-xs border border-stone-300 rounded bg-white"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={story.description}
                      placeholder="Mô tả kỷ niệm..."
                      onChange={(e) => {
                        const updated = weddingData.loveStory.map((s) =>
                          s.id === story.id ? { ...s, description: e.target.value } : s
                        );
                        updateData({ loveStory: updated });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded bg-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 4. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900">
                    Bộ sưu tập ảnh ({weddingData.gallery.length} ảnh)
                  </h3>
                  <button
                    onClick={handleAddPhoto}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm ảnh mẫu</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {weddingData.gallery.map((img) => (
                    <div
                      key={img.id}
                      className="relative h-28 rounded-xl overflow-hidden border border-stone-200 group"
                    >
                      <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemovePhoto(img.id)}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                        title="Xoá ảnh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SCHEDULE & DRESS CODE TAB */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 mb-2">Lịch trình chi tiết</h3>
                  <div className="space-y-2">
                    {weddingData.timeline.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5"
                      >
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.time}
                            onChange={(e) => {
                              const updated = [...weddingData.timeline];
                              updated[idx].time = e.target.value;
                              updateData({ timeline: updated });
                            }}
                            className="w-24 px-2 py-1 text-xs border border-stone-300 rounded bg-white font-bold"
                          />
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...weddingData.timeline];
                              updated[idx].title = e.target.value;
                              updateData({ timeline: updated });
                            }}
                            className="flex-1 px-2 py-1 text-xs border border-stone-300 rounded bg-white font-semibold"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...weddingData.timeline];
                            updated[idx].description = e.target.value;
                            updateData({ timeline: updated });
                          }}
                          className="w-full px-2 py-1 text-xs border border-stone-300 rounded bg-white text-stone-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Gợi ý trang phục (Dress Code)
                  </h4>
                  <textarea
                    rows={2}
                    value={weddingData.dressCode.note}
                    onChange={(e) =>
                      updateData({
                        dressCode: { ...weddingData.dressCode, note: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            )}

            {/* 6. BANKING & VIETQR TAB */}
            {activeTab === 'banking' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Cấu hình Hộp Mừng Cưới &amp; VietQR</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Hệ thống tự động sinh mã VietQR chuẩn mọi ngân hàng Việt Nam. Tiền chuyển thẳng về tài khoản cá nhân.
                  </p>
                </div>

                {/* Groom Bank */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                    Tài khoản Chú Rể ({weddingData.groom.shortName})
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Ngân hàng
                    </label>
                    <select
                      value={weddingData.groom.bank.bankCode}
                      onChange={(e) => {
                        const bank = BANK_OPTIONS.find((b) => b.code === e.target.value);
                        updateData({
                          groom: {
                            ...weddingData.groom,
                            bank: {
                              ...weddingData.groom.bank,
                              bankCode: e.target.value,
                              bankName: bank ? bank.name : e.target.value,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    >
                      {BANK_OPTIONS.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Số tài khoản ngân hàng
                    </label>
                    <input
                      type="text"
                      value={weddingData.groom.bank.accountNumber}
                      onChange={(e) =>
                        updateData({
                          groom: {
                            ...weddingData.groom,
                            bank: {
                              ...weddingData.groom.bank,
                              accountNumber: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Tên chủ tài khoản (in hoa không dấu)
                    </label>
                    <input
                      type="text"
                      value={weddingData.groom.bank.accountHolder}
                      onChange={(e) =>
                        updateData({
                          groom: {
                            ...weddingData.groom,
                            bank: {
                              ...weddingData.groom.bank,
                              accountHolder: e.target.value.toUpperCase(),
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white uppercase font-bold"
                    />
                  </div>
                </div>

                {/* Bride Bank */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                    Tài khoản Cô Dâu ({weddingData.bride.shortName})
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Ngân hàng
                    </label>
                    <select
                      value={weddingData.bride.bank.bankCode}
                      onChange={(e) => {
                        const bank = BANK_OPTIONS.find((b) => b.code === e.target.value);
                        updateData({
                          bride: {
                            ...weddingData.bride,
                            bank: {
                              ...weddingData.bride.bank,
                              bankCode: e.target.value,
                              bankName: bank ? bank.name : e.target.value,
                            },
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                    >
                      {BANK_OPTIONS.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Số tài khoản ngân hàng
                    </label>
                    <input
                      type="text"
                      value={weddingData.bride.bank.accountNumber}
                      onChange={(e) =>
                        updateData({
                          bride: {
                            ...weddingData.bride,
                            bank: {
                              ...weddingData.bride.bank,
                              accountNumber: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Tên chủ tài khoản (in hoa không dấu)
                    </label>
                    <input
                      type="text"
                      value={weddingData.bride.bank.accountHolder}
                      onChange={(e) =>
                        updateData({
                          bride: {
                            ...weddingData.bride,
                            bank: {
                              ...weddingData.bride.bank,
                              accountHolder: e.target.value.toUpperCase(),
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white uppercase font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 7. THEME & EFFECTS TAB */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 mb-2">Đổi mẫu giao diện thiệp</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {WEDDING_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() =>
                          updateData({
                            theme: {
                              ...weddingData.theme,
                              templateId: tpl.id,
                              primaryColor: tpl.themeColor,
                            },
                          })
                        }
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          weddingData.theme.templateId === tpl.id
                            ? 'border-rose-500 bg-rose-50/70 font-semibold ring-1 ring-rose-300'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          {tpl.name}
                        </span>
                        <span className="text-[10px] text-stone-500">{tpl.styleLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Hiệu ứng lãng mạn bay
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {(['petals', 'hearts', 'sparkles', 'none'] as const).map((eff) => (
                      <button
                        key={eff}
                        type="button"
                        onClick={() =>
                          updateData({
                            theme: { ...weddingData.theme, effect: eff },
                          })
                        }
                        className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all ${
                          weddingData.theme.effect === eff
                            ? 'bg-rose-500 text-white border-rose-500 font-semibold'
                            : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        {eff === 'petals'
                          ? '🌸 Cánh hoa'
                          : eff === 'hearts'
                          ? '💖 Tim bay'
                          : eff === 'sparkles'
                          ? '✨ Ánh sao'
                          : 'Tắt'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Bật / Tắt Khối Tính Năng
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-xs text-stone-700">
                      <span>Khối Xác nhận tham dự (RSVP)</span>
                      <input
                        type="checkbox"
                        checked={weddingData.theme.enableRsvp}
                        onChange={(e) =>
                          updateData({
                            theme: { ...weddingData.theme, enableRsvp: e.target.checked },
                          })
                        }
                        className="rounded text-rose-500 focus:ring-rose-500"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-stone-700">
                      <span>Khối Hộp mừng cưới &amp; VietQR</span>
                      <input
                        type="checkbox"
                        checked={weddingData.theme.enableGiftBox}
                        onChange={(e) =>
                          updateData({
                            theme: { ...weddingData.theme, enableGiftBox: e.target.checked },
                          })
                        }
                        className="rounded text-rose-500 focus:ring-rose-500"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-stone-700">
                      <span>Sổ lưu bút chúc phúc</span>
                      <input
                        type="checkbox"
                        checked={weddingData.theme.enableGuestbook}
                        onChange={(e) =>
                          updateData({
                            theme: { ...weddingData.theme, enableGuestbook: e.target.checked },
                          })
                        }
                        className="rounded text-rose-500 focus:ring-rose-500"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 8. PERSONALIZED LINK TAB */}
            {activeTab === 'personalized-link' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Tạo link thiệp mang tên từng khách mời
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Khách mở ra sẽ thấy ngay tên mình được in trang trọng trên phong bì thiệp cưới
                    (ví dụ: "Kính gửi: Anh Hoàng Nam &amp; Bạn gái").
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <label className="block text-xs font-semibold text-stone-700">
                    Nhập tên hoặc danh xưng vị khách:
                  </label>
                  <input
                    type="text"
                    value={customGuestName}
                    onChange={(e) => setCustomGuestName(e.target.value)}
                    placeholder="Ví dụ: Anh Hoàng Nam & Bạn gái"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:border-rose-500 focus:outline-hidden"
                  />

                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                    <span className="text-[11px] font-bold text-stone-500 block uppercase">
                      Đường link riêng được tạo ra:
                    </span>
                    <p className="text-xs font-mono text-rose-600 break-all bg-rose-50/50 p-2 rounded">
                      {generatedCustomUrl}
                    </p>
                    <button
                      onClick={copyCustomLink}
                      className="w-full py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã sao chép link!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép link gửi Zalo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Live Preview Frame */}
        <div className="flex-1 bg-stone-100/80 p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
          <div
            className={`transition-all duration-300 bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-300/80 ${
              deviceMode === 'mobile'
                ? 'w-[375px] h-[700px]'
                : deviceMode === 'tablet'
                ? 'w-[640px] h-[780px]'
                : 'w-full max-w-2xl h-[820px]'
            }`}
          >
            {/* Embedded Live Preview Container */}
            <div className="w-full h-full overflow-y-auto relative">
              <InvitationView
                weddingData={weddingData}
                guestName={customGuestName || undefined}
                wishes={[]}
                onAddRsvp={() => {}}
                onAddWish={() => {}}
                onLikeWish={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
