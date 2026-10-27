import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Music2,
  Sparkles,
  ChevronUp,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { ReelItem, INITIAL_REELS } from '../data/banjaraData';
import { soundEngine } from '../utils/audioSynth';

export const ReelsView: React.FC = () => {
  const [reels, setReels] = useState<ReelItem[]>(INITIAL_REELS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReelIds, setLikedReelIds] = useState<Set<string>>(new Set());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [commentList, setCommentList] = useState<Record<string, string[]>>({
    'reel-1': ['लेंगी नृत्य की ऊर्जा अद्भुत है!', 'जय सेवालाल भाई! हमारे तांडा में भी यही जोश है।'],
    'reel-2': ['हमारी तीज संस्कृति दुनिया में अद्वितीय है।', 'जय मेरमा यादी!'],
    'reel-3': ['लंबानी कसीदाकारी का जीआई टैग हमारे समाज का गौरव है।', 'फेटीया की सुंदरता लाजवाब है!'],
    'reel-4': ['पोहरादेवी धाम की पावन मिट्टी को मेरा नमन। 🙏', 'बोलो संत सेवालाल महाराज की जय!'],
  });
  const [newComment, setNewComment] = useState('');

  const currentReel = reels[currentIndex];
  const isLiked = likedReelIds.has(currentReel.id);

  const handleNext = () => {
    soundEngine.playChime(587.33);
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    soundEngine.playChime(587.33);
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const toggleLike = () => {
    soundEngine.playDholBeat();
    const newSet = new Set(likedReelIds);
    if (newSet.has(currentReel.id)) {
      newSet.delete(currentReel.id);
      setReels((prev) =>
        prev.map((r, i) => (i === currentIndex ? { ...r, likes: r.likes - 1 } : r))
      );
    } else {
      newSet.add(currentReel.id);
      setReels((prev) =>
        prev.map((r, i) => (i === currentIndex ? { ...r, likes: r.likes + 1 } : r))
      );
    }
    setLikedReelIds(newSet);
  };

  const toggleSound = () => {
    soundEngine.playDholBeat();
    if (isPlayingAudio) {
      soundEngine.stopDrone();
      setIsPlayingAudio(false);
    } else {
      soundEngine.toggleDevotionalDrone((active) => setIsPlayingAudio(active));
    }
  };

  const handleShare = () => {
    soundEngine.playChime();
    setReels((prev) =>
      prev.map((r, i) => (i === currentIndex ? { ...r, shares: r.shares + 1 } : r))
    );
    setShareNotice('रील लिंक कॉपी हो गया!');
    setTimeout(() => setShareNotice(null), 2500);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    soundEngine.playChime(659.25);
    const reelId = currentReel.id;
    setCommentList((prev) => ({
      ...prev,
      [reelId]: [...(prev[reelId] || []), `आप: ${newComment.trim()}`],
    }));
    setReels((prev) =>
      prev.map((r, i) => (i === currentIndex ? { ...r, comments: r.comments + 1 } : r))
    );
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-['Rozha_One',serif] text-stone-900 flex items-center justify-center gap-2">
          <span>सांस्कृतिक झलक (GorReels)</span>
          <span className="text-xs font-sans font-normal bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full">
            इंस्टाग्राम रील्स स्टाइल
          </span>
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          बंजारा समाज के पारंपरिक नृत्य, तीज उत्सव, लंबानी कला और धाम दर्शन की लघु वीडियो झलक
        </p>
      </div>

      {/* Main Reels Container */}
      <div className="relative max-w-sm sm:max-w-md mx-auto aspect-[9/16] max-h-[640px] rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-950 flex flex-col justify-between">
        {/* Animated Background Simulation */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${currentReel.bgGradient} opacity-90 transition-all duration-700`}
        />

        {/* Traditional Visual Motif Backdrop */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center select-none">
          <div className="w-32 h-32 rounded-full border-4 border-amber-300/40 border-dashed flex items-center justify-center text-7xl animate-[spin_20s_linear_infinite] mb-4">
            {currentReel.previewEmoji}
          </div>
          <h3 className="font-['Rozha_One',serif] text-2xl sm:text-3xl font-bold text-white tracking-wide text-balance drop-shadow-md">
            {currentReel.title}
          </h3>
          <p className="text-xs text-amber-200 mt-2 font-medium tracking-wide">
            {currentReel.tanda}
          </p>

          {/* Equalizer animation bars if audio is playing */}
          <div className="flex items-end gap-1 mt-6 h-8">
            <span
              className={`w-1.5 bg-amber-400 rounded-full transition-all ${
                isPlayingAudio ? 'h-6 animate-pulse' : 'h-2'
              }`}
            />
            <span
              className={`w-1.5 bg-red-400 rounded-full transition-all ${
                isPlayingAudio ? 'h-8 animate-bounce' : 'h-3'
              }`}
            />
            <span
              className={`w-1.5 bg-amber-300 rounded-full transition-all ${
                isPlayingAudio ? 'h-5 animate-pulse' : 'h-2'
              }`}
            />
            <span
              className={`w-1.5 bg-white rounded-full transition-all ${
                isPlayingAudio ? 'h-7 animate-bounce' : 'h-4'
              }`}
            />
            <span
              className={`w-1.5 bg-amber-400 rounded-full transition-all ${
                isPlayingAudio ? 'h-4 animate-pulse' : 'h-2'
              }`}
            />
          </div>
        </div>

        {/* Top Header Bar inside Reel */}
        <div className="relative z-20 p-4 flex items-center justify-between text-white bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              गोरमाटी रील्स
            </span>
            <span className="text-xs text-stone-300 font-mono">
              ({currentIndex + 1}/{reels.length})
            </span>
          </div>

          <button
            onClick={toggleSound}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isPlayingAudio ? 'bg-red-600 text-white' : 'bg-black/50 text-stone-200'
            }`}
            title="पारंपरिक धुन"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Up / Down Navigation Controls (Overlay) */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
            title="पिछली रील"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
            title="अगली रील"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Right Interaction Rail (Heart, Comment, Share, Sound Disc) */}
        <div className="relative z-20 self-end mr-3 mb-16 flex flex-col items-center gap-5 text-white">
          {/* Like */}
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all group-hover:scale-110 ${
                isLiked ? 'bg-red-600 text-white' : 'bg-black/40 text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[11px] font-bold font-mono tabular-nums">
              {currentReel.likes.toLocaleString('en-IN')}
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold font-mono tabular-nums">
              {currentReel.comments.toLocaleString('en-IN')}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold font-mono tabular-nums">
              {currentReel.shares.toLocaleString('en-IN')}
            </span>
          </button>

          {/* Rotating Sound Disc */}
          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full border-2 border-amber-300 p-1 bg-stone-900 animate-[spin_6s_linear_infinite] flex items-center justify-center cursor-pointer"
          >
            <Music2 className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        {/* Bottom Reel Caption & Creator Info */}
        <div className="relative z-20 p-4 pb-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-stone-900 font-bold flex items-center justify-center text-sm shadow-xs">
              {currentReel.creatorAvatar}
            </span>
            <span className="text-xs font-bold">{currentReel.creator}</span>
            <span className="text-[10px] text-amber-300">· {currentReel.tanda}</span>
          </div>

          <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed mb-2 font-medium">
            {currentReel.caption}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-amber-300">
            <Music2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{currentReel.soundName}</span>
          </div>
        </div>

        {/* Share notification toast */}
        {shareNotice && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>{shareNotice}</span>
          </div>
        )}

        {/* Slide-up Comments Drawer */}
        {showComments && (
          <div className="absolute inset-x-0 bottom-0 top-1/3 z-30 bg-stone-900/95 backdrop-blur-md rounded-t-3xl p-4 flex flex-col border-t border-stone-700 text-white animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h4 className="text-xs font-bold text-amber-300">
                टिप्पणियां ({currentReel.comments})
              </h4>
              <button
                onClick={() => setShowComments(false)}
                className="text-stone-400 hover:text-white text-xs px-2 py-0.5 rounded cursor-pointer"
              >
                बंद करें ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
              {(commentList[currentReel.id] || []).map((cmt, idx) => (
                <div key={idx} className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <p className="text-stone-200">{cmt}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddComment();
                }}
                placeholder="जय सेवालाल! अपनी टिप्पणी लिखें..."
                className="flex-1 bg-stone-800 px-3 py-2 rounded-lg text-xs text-white border border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={handleAddComment}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                भेजें
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
