import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  ThumbsUp,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Send,
  Radio,
  BookOpen
} from 'lucide-react';
import { VideoItem, INITIAL_VIDEOS } from '../data/banjaraData';
import { soundEngine } from '../utils/audioSynth';

export const VideoHubView: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(INITIAL_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(4820);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isDroneOn, setIsDroneOn] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'संत सेवाभाया के 22 उपदेश आज पूरी दुनिया के लिए मार्गदर्शक हैं। जय सेवालाल!',
    'पोहरादेवी धाम की पावन भूमि पर जाकर जो शांति मिलती है, वो अवर्णनीय है।',
    'लखीशाह बंजारा जी का त्याग इतिहास का सबसे बड़ा बलिदान है। कोटि-कोटि नमन!',
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Simulated playback timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    soundEngine.playDholBeat();
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    soundEngine.playDholBeat();
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const toggleSubscribe = () => {
    soundEngine.playChime(659.25);
    setIsSubscribed(!isSubscribed);
  };

  const handleShare = () => {
    soundEngine.playChime();
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    soundEngine.playChime(659.25);
    setComments([`आप: ${newCommentInput.trim()}`, ...comments]);
    setNewCommentInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Intro Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-['Rozha_One',serif] text-stone-900 flex items-center gap-2">
            <span>गौर दर्शन (GorDarshan)</span>
            <span className="text-xs font-sans font-normal bg-red-100 text-red-900 px-2 py-0.5 rounded-full">
              यूट्यूब स्टाइल वीडियो व सत्संग
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            संत सेवालाल महाराज के उपदेश, पोहरादेवी आरती, बंजारा इतिहास व लोककला के प्रामाणिक वीडियो
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Video Player Column */}
        <div className="lg:col-span-8 space-y-4">
          {/* Video Player Canvas */}
          <div className="relative aspect-video bg-stone-950 rounded-2xl overflow-hidden shadow-md border border-stone-800 flex flex-col justify-between group">
            {/* Visual backdrop simulation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-amber-950/80 to-red-950/90 flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-4xl mb-3 shadow-lg">
                🚩
              </div>
              <h3 className="font-['Rozha_One',serif] text-xl sm:text-2xl font-bold text-amber-100 max-w-xl line-clamp-2">
                {selectedVideo.title}
              </h3>
              <p className="text-xs text-amber-300/80 mt-1">
                {selectedVideo.channel} · HD 1080p
              </p>

              {/* Central Play/Pause Big Button */}
              <button
                onClick={togglePlay}
                className="mt-4 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>
            </div>

            {/* Top Video Overlay */}
            <div className="relative z-10 p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>गौर दर्शन एचडी</span>
              </span>
              <span className="bg-stone-800/80 px-2 py-0.5 rounded text-[11px] font-mono">
                {selectedVideo.duration}
              </span>
            </div>

            {/* Bottom Scrubber & Controls Bar */}
            <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 to-transparent space-y-2">
              {/* Progress Slider */}
              <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="bg-red-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  <span className="font-mono text-[11px] text-stone-300">
                    {Math.floor((progress * 17) / 60)}:
                    {((progress * 17) % 60).toString().padStart(2, '0')} /{' '}
                    {selectedVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const active = soundEngine.toggleDevotionalDrone((state) =>
                        setIsDroneOn(state)
                      );
                      setIsDroneOn(active);
                    }}
                    className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 cursor-pointer transition-colors ${
                      isDroneOn
                        ? 'bg-red-600 text-white'
                        : 'bg-stone-800 text-stone-300 hover:text-white'
                    }`}
                  >
                    {isDroneOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    <span>तानपुरा संगत</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Title & Primary Meta */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {selectedVideo.title}
            </h1>

            {/* Channel Lockup & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-xl shadow-xs">
                  {selectedVideo.channelAvatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    {selectedVideo.channel}
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 fill-amber-100" />
                  </h4>
                  <p className="text-xs text-stone-500 font-mono tabular-nums">
                    {selectedVideo.views} · {selectedVideo.uploadDate}
                  </p>
                </div>

                <button
                  onClick={toggleSubscribe}
                  className={`ml-2 px-4 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    isSubscribed
                      ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                  }`}
                >
                  {isSubscribed ? 'सदस्यता ली (Subscribed)' : 'सदस्य बनें (Subscribe)'}
                </button>
              </div>

              {/* Engagement Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    hasLiked
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-600' : ''}`} />
                  <span className="font-mono tabular-nums">{likesCount}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedShare ? 'लिंक कॉपी हुआ!' : 'साझा करें'}</span>
                </button>
              </div>
            </div>

            {/* Description Box */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
              <p className="font-medium text-stone-900 mb-1">विवरण (Description):</p>
              <p>{selectedVideo.description}</p>
            </div>

            {/* Video Updesh / Lyrics Section if available */}
            {selectedVideo.lyrics && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h5 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>वीडियो में वर्णित मुख्य उपदेश व सूत्र:</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-800">
                  {selectedVideo.lyrics.map((line, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 p-1.5 rounded-md hover:bg-white/80 transition-colors"
                    >
                      <button
                        onClick={() => soundEngine.speak(line)}
                        className="text-amber-800 hover:text-red-700 shrink-0 mt-0.5 cursor-pointer"
                        title="बोलकर सुनें"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comments Section */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold text-stone-900">
                टिप्पणियां ({comments.length})
              </h4>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newCommentInput}
                  onChange={(e) => setNewCommentInput(e.target.value)}
                  placeholder="जय सेवालाल! अपनी राय या अनुभव लिखें..."
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
                <button
                  type="submit"
                  disabled={!newCommentInput.trim()}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>भेजें</span>
                </button>
              </form>

              <div className="space-y-2 pt-1">
                {comments.map((comment, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800"
                  >
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Recommended Playlists */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>अनुशंसित वीडियो व सत्संग</span>
            </h3>

            <div className="space-y-3">
              {videos.map((vid) => {
                const isCurrent = vid.id === selectedVideo.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      soundEngine.playChime(587.33);
                      setSelectedVideo(vid);
                      setProgress(0);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-50 border border-amber-300 ring-1 ring-amber-300/50'
                        : 'hover:bg-stone-50 border border-transparent'
                    }`}
                  >
                    <div className="w-24 aspect-video bg-stone-900 rounded-lg shrink-0 flex items-center justify-center text-white text-lg relative overflow-hidden">
                      <span>{vid.channelAvatar}</span>
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 rounded text-[9px] font-mono">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-xs font-bold line-clamp-2 leading-snug ${
                          isCurrent ? 'text-amber-950 font-bold' : 'text-stone-900'
                        }`}
                      >
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 truncate">
                        {vid.channel}
                      </p>
                      <p className="text-[10px] text-stone-400 font-mono tabular-nums">
                        {vid.views}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pohradevi Shrine Highlights */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-amber-950 flex items-center gap-2 mb-2">
              <span className="text-lg">🛕</span>
              <span>पोहरादेवी तीर्थ (वाशिम, महाराष्ट्र)</span>
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed mb-3">
              पोहरादेवी बंजारा समाज का सर्वोच्च श्रद्धा केंद्र है। यहाँ संत सेवालाल महाराज की मुख्य समाधि एवं जगदम्बा मेरमा यादी का प्राचीन शक्तिपीठ स्थित है।
            </p>
            <div className="text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
              <span>वार्षिक मेला:</span>
              <span className="text-stone-600 font-normal">रामनवमी एवं संत सेवालाल जयंती</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
