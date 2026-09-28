import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Search, Tag, Share2, Heart } from 'lucide-react';
import { BlogPost, ViewMode } from '../types';
import { BLOG_POSTS } from '../data/weddingToolsData';

interface BlogPageProps {
  onNavigate: (view: ViewMode) => void;
  lang: 'vi' | 'en';
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'Kinh nghiệm mời cưới', label: 'Kinh nghiệm mời cưới' },
    { id: 'Ngân sách cưới', label: 'Ngân sách cưới' },
    { id: 'Kế hoạch cưới', label: 'Kế hoạch cưới' },
    { id: 'Văn hóa cưới hỏi', label: 'Văn hóa cưới hỏi' },
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Detail Modal if Reading */}
        {readingPost && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative">
              <button
                onClick={() => setReadingPost(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 p-2 rounded-full hover:bg-stone-100 text-lg font-bold"
              >
                &times;
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                {readingPost.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-3 mb-2 leading-tight">
                {readingPost.title}
              </h2>

              <div className="flex items-center space-x-4 text-xs text-stone-400 mb-6 pb-4 border-b border-stone-100">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{readingPost.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readingPost.readTime}</span>
                </span>
                <span>Tác giả: Ban Biên Tập Chung Đôi</span>
              </div>

              <div className="rounded-2xl overflow-hidden mb-6 h-64 sm:h-80 bg-stone-100">
                <img
                  src={readingPost.coverImage}
                  alt={readingPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-body">
                {readingPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* In-article CTA */}
              <div className="mt-8 p-6 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Sẵn sàng tạo thiệp cưới online cho ngày vui của bạn?
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Hơn 400+ mẫu thiệp đẹp chuẩn Zalo, nhận tiền mừng VietQR và RSVP miễn phí.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReadingPost(null);
                    onNavigate('builder');
                  }}
                  className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shrink-0 shadow-xs"
                >
                  Tạo thiệp ngay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Cẩm Nang Cưới Hỏi Việt Nam
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-3">
            Kinh Nghiệm &amp; Bí Quyết Tổ Chức Đám Cưới
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-body">
            Tổng hợp các hướng dẫn chi tiết từ thủ tục ăn hỏi, cách viết thiệp cưới đúng lễ nghi, dự toán chi phí thông minh đến kinh nghiệm mời cưới qua Zalo tinh tế nhất.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm bài viết kinh nghiệm..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-full bg-white shadow-xs focus:border-rose-500 focus:outline-hidden"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setReadingPost(post)}
            >
              <div className="relative h-60 overflow-hidden bg-stone-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-rose-600 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-stone-400 mb-2">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2 font-body leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-rose-600">
                  <span>Đọc tiếp bài viết</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
