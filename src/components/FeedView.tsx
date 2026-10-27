import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  Send,
  Sparkles,
  Calendar,
  Compass,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { Post, INITIAL_POSTS, SEVALAL_UPDESH } from '../data/banjaraData';
import { soundEngine } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';

import { NavTab } from './Header';
import { Users, UserPlus } from 'lucide-react';

interface FeedViewProps {
  onNavigateToTab: (tab: NavTab) => void;
  onOpenApkModal?: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ onNavigateToTab, onOpenApkModal }) => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [filter, setFilter] = useState<string>('all');
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<Post['category']>('संस्कृति');
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Status highlights
  const stories = [
    { id: 's1', title: 'पोहरादेवी दर्शन', author: 'वाशिम पीठ', icon: '🛕', color: 'from-amber-600 to-red-700' },
    { id: 's2', title: 'तीज महोत्सव', author: 'कन्या मंडल', icon: '🌾', color: 'from-emerald-600 to-teal-800' },
    { id: 's3', title: 'लंबानी कसीदाकारी', author: 'हम्पी क्राफ्ट', icon: '🪡', color: 'from-purple-600 to-indigo-800' },
    { id: 's4', title: 'लेंगी लोकनृत्य', author: 'युवा दल', icon: '🥁', color: 'from-red-600 to-rose-900' },
    { id: 's5', title: '22 दिव्य वचन', author: 'सत्संग सभा', icon: '📜', color: 'from-orange-600 to-amber-800' },
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    soundEngine.playDholBeat();
    const newPost: Post = {
      id: `user-post-${Date.now()}`,
      author: 'आप (गौर बंजारा बंधु)',
      tanda: 'मेरा तांडा',
      role: 'समाज सदस्य',
      avatar: '🌟',
      timeAgo: 'अभी-अभी',
      category: newPostCategory,
      content: newPostText.trim(),
      likes: 1,
      hasLiked: true,
      commentsCount: 0,
      comments: [],
      shares: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleLike = (postId: string) => {
    soundEngine.playDholBeat();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    soundEngine.playChime(659.25);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: 'आप',
            text,
            time: 'अभी',
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postId: string) => {
    soundEngine.playChime();
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, shares: p.shares + 1 } : p))
    );
    setCopiedNotification(postId);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleListenPost = (text: string) => {
    soundEngine.speak(text);
  };

  const filteredPosts =
    filter === 'all'
      ? posts
      : posts.filter((p) => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Quick Samaj Connect Banner */}
      <div className="mb-6 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 text-2xl shadow-inner">
            🤝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-amber-100">
                अखिल भारतीय बंजारा समाज नेटवर्क
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-['Rozha_One',serif] text-white mt-0.5">
              सारे गौरमाटी बंधु आपस में सीधे जुड़ें (Connect Hub)
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 mt-0.5">
              महाराष्ट्र, तेलंगाना, कर्नाटक, राजस्थान, गुजरात व अन्य राज्यों के तांडों के भाइयों से 1-on-1 चैट करें, व्हाट्सऐप पर जुड़ें व डिजिटल समाज ID बनाएं!
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full sm:w-auto">
          {onOpenApkModal && (
            <button
              onClick={() => {
                soundEngine.playDholBeat();
                onOpenApkModal();
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-amber-950/40 hover:bg-amber-950/60 text-amber-100 font-extrabold text-xs sm:text-sm rounded-xl border border-amber-300/40 shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm"
            >
              <span>📱 APK / ॲप</span>
            </button>
          )}
          <button
            onClick={() => {
              soundEngine.playChime(659.25);
              onNavigateToTab('connect');
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-red-700 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>बंधुओं से जुड़ें (Explore & Connect)</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Stories / Highlights Carousel */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-3 min-w-max">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => {
                soundEngine.playChime();
                if (story.id === 's1' || story.id === 's5') onNavigateToTab('dharohar');
                else if (story.id === 's2' || story.id === 's4') onNavigateToTab('reels');
                else onNavigateToTab('videos');
              }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white border border-stone-200 hover:border-amber-400 transition-all group w-24"
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-tr ${story.color} p-0.5 flex items-center justify-center ring-2 ring-amber-300 group-hover:scale-105 transition-transform shadow-xs`}
              >
                <div className="w-full h-full rounded-full bg-stone-900/40 backdrop-blur-xs flex items-center justify-center text-2xl">
                  {story.icon}
                </div>
              </div>
              <span className="text-xs font-semibold text-stone-800 text-center truncate w-full">
                {story.title}
              </span>
              <span className="text-[10px] text-stone-500 truncate w-full text-center">
                {story.author}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Create Post Card (Facebook style) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white text-lg font-bold shadow-xs">
                🚩
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {t.createPostTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.dailyTeachingSubtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder={t.createPostPlaceholder}
                rows={3}
                className="w-full p-3 text-sm text-stone-800 bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Category Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  <span className="text-stone-500 font-medium">{t.categoryLabel}</span>
                  {(['संस्कृति', 'इतिहास', 'उत्सव', 'उपदेश', 'समाचार'] as Post['category'][]).map(
                    (cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setNewPostCategory(cat)}
                        className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                          newPostCategory === cat
                            ? 'bg-amber-100 text-amber-950 font-semibold'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.postButton}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Interactive Filter Tabs (Zero-pill discipline: segmented control buttons) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100/90 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: t.allPosts },
              { id: 'उपदेश', label: t.santTeachings },
              { id: 'इतिहास', label: t.history },
              { id: 'संस्कृति', label: t.cultureAndArt },
              { id: 'उत्सव', label: t.festivals },
              { id: 'समाचार', label: t.tandaNews },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playChime();
                  setFilter(tab.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shadow-inner">
                      {post.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                        {post.author}
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <span>{post.tanda}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.role}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean unboxed category metadata (Zero-pill rule: unboxed text with separator) */}
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{post.category}</span>
                  </div>
                </div>

                {/* Post Title & Content */}
                <div className="px-4 sm:px-5 pb-3">
                  {post.title && (
                    <h3 className="text-base sm:text-lg font-bold text-stone-950 mb-2 leading-snug">
                      {post.title}
                    </h3>
                  )}
                  <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Cultural Graphic Card Banner */}
                <div className="mx-4 sm:mx-5 mb-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 via-stone-50 to-red-50 border border-amber-200/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-900 flex items-center justify-center text-lg font-bold">
                      🚩
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-950">
                        गौरमाटी गौरव संदेश
                      </p>
                      <p className="text-[11px] text-stone-600">
                        जय सेवालाल · जय लखीशाह · जय मेरमा यादी
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleListenPost(post.content)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 shadow-xs transition-colors cursor-pointer"
                    title="पोस्ट को बोलकर सुनें"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>सुनें</span>
                  </button>
                </div>

                {/* Engagement Stats (Clean tabular figures) */}
                <div className="px-4 sm:px-5 py-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                  <span className="font-mono tabular-nums">
                    ❤️ {post.likes} लोगों को पसंद आया
                  </span>
                  <div className="flex items-center gap-3 font-mono tabular-nums">
                    <span>{post.commentsCount} टिप्पणियां</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.shares} बार साझा किया</span>
                  </div>
                </div>

                {/* Action Buttons Bar */}
                <div className="px-4 sm:px-5 py-2.5 border-t border-stone-100 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      post.hasLiked
                        ? 'text-red-600 bg-red-50'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        post.hasLiked ? 'fill-red-600 stroke-red-600' : ''
                      }`}
                    />
                    <span>पसंद (Like)</span>
                  </button>

                  <button
                    onClick={() =>
                      setOpenCommentsPostId(
                        openCommentsPostId === post.id ? null : post.id
                      )
                    }
                    className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>टिप्पणी ({post.commentsCount})</span>
                  </button>

                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer relative"
                  >
                    {copiedNotification === post.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">साझा हुआ!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>साझा करें</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Expandable Comments Drawer */}
                {openCommentsPostId === post.id && (
                  <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
                    <h5 className="text-xs font-bold text-stone-800">
                      टिप्पणियां ({post.comments.length})
                    </h5>

                    {post.comments.length > 0 ? (
                      <div className="space-y-2">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-stone-900">
                                {comment.author}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {comment.time}
                              </span>
                            </div>
                            <p className="text-stone-700">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-stone-400 italic">
                        अभी कोई टिप्पणी नहीं है। पहली टिप्पणी लिखें!
                      </p>
                    )}

                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        placeholder="जय सेवालाल! अपनी टिप्पणी लिखें..."
                        className="flex-1 px-3 py-2 text-xs bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        भेजें
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Saint Sevalal Wisdom & Cultural Calendar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sant Sevalal Maharaj Sacred Wisdom Card (No 24-Hour Restriction) */}
          <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 text-white rounded-2xl p-5 shadow-sm border border-amber-800/40 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>संत सेवालाल महाराज पावन विचार</span>
            </div>
            <h4 className="font-['Rozha_One',serif] text-xl text-amber-100 font-bold mb-2">
              {SEVALAL_UPDESH[0].title}
            </h4>
            <p className="text-amber-200/90 text-sm italic font-serif mb-2 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-amber-800/40">
              "{SEVALAL_UPDESH[0].devanagari}"
            </p>
            <p className="text-stone-300 text-xs leading-relaxed mb-4">
              {SEVALAL_UPDESH[0].meaning}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-amber-800/50">
              <button
                onClick={() => soundEngine.speak(SEVALAL_UPDESH[0].devanagari)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>वचन सुनें</span>
              </button>
              <button
                onClick={() => onNavigateToTab('dharohar')}
                className="text-xs text-amber-300 hover:text-white underline ml-auto font-medium"
              >
                सभी 22 वचन पढ़ें →
              </button>
            </div>
          </div>

          {/* Upcoming Cultural Festivals */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>आगामी बंजारा पर्व एवं तिथियां</span>
              </h4>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-950">संत सेवालाल जयंती</span>
                  <span className="text-red-700 font-mono font-bold">15 फरवरी</span>
                </div>
                <p className="text-xs text-stone-600">
                  पोहरादेवी एवं देश-विदेश के समस्त तांडों में विशाल जन्मोत्सव, ध्वजारोहण एवं महाप्रसाद।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-emerald-950">पवित्र तीज महोत्सव</span>
                  <span className="text-emerald-700 font-mono font-bold">श्रावण मास (अगस्त)</span>
                </div>
                <p className="text-xs text-stone-600">
                  कुंवारी कन्याओं का 9 दिवसीय गेहूं ज्वारे पूजन, ढमोली, लेंगी व भाई-बहन स्नेह पर्व।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-rose-950">बंजारा गेर एवं फाग (होली)</span>
                  <span className="text-rose-700 font-mono font-bold">फाल्गुन पूर्णिमा</span>
                </div>
                <p className="text-xs text-stone-600">
                  पारंपरिक नगाड़ा वादन, ढाल-तलवार नृत्य और तांडा-तांडा में फाग गीतों की धूम।
                </p>
              </div>
            </div>
          </div>

          {/* Quick Cultural Access */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-red-600" />
              <span>सांस्कृतिक केंद्र त्वरित पहुंच</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateToTab('chat')}
                className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-800 text-left transition-colors cursor-pointer"
              >
                <div className="text-lg mb-1">💬</div>
                <div className="font-bold">तांडा चौपाल</div>
                <div className="text-[10px] text-stone-500">लाइव समूह चर्चा</div>
              </button>

              <button
                onClick={() => onNavigateToTab('reels')}
                className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-800 text-left transition-colors cursor-pointer"
              >
                <div className="text-lg mb-1">🎬</div>
                <div className="font-bold">सांस्कृतिक झलक</div>
                <div className="text-[10px] text-stone-500">लेंगी व तीज रील्स</div>
              </button>

              <button
                onClick={() => onNavigateToTab('videos')}
                className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-800 text-left transition-colors cursor-pointer"
              >
                <div className="text-lg mb-1">📺</div>
                <div className="font-bold">वीडियो दर्शन</div>
                <div className="text-[10px] text-stone-500">आरती व इतिहास</div>
              </button>

              <button
                onClick={() => onNavigateToTab('dharohar')}
                className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-800 text-left transition-colors cursor-pointer"
              >
                <div className="text-lg mb-1">📖</div>
                <div className="font-bold">गौर बोली कोश</div>
                <div className="text-[10px] text-stone-500">शब्दकोश व ऑडियो</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
