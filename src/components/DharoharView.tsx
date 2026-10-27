import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  HelpCircle,
  Award,
  RotateCcw,
  Music,
  Share2
} from 'lucide-react';
import {
  SEVALAL_UPDESH,
  GOTRA_INFO,
  GOR_DICTIONARY,
  BANJARA_QUIZ,
  DictionaryWord
} from '../data/banjaraData';
import { soundEngine } from '../utils/audioSynth';

export const DharoharView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'sevalal' | 'history' | 'gotra' | 'culture' | 'dictionary' | 'quiz'
  >('sevalal');

  // Dictionary search & filter
  const [dictSearch, setDictSearch] = useState('');
  const [dictCategory, setDictCategory] = useState<string>('all');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Aarti devotional player
  const [isAartiPlaying, setIsAartiPlaying] = useState(false);

  const toggleAartiMusic = () => {
    soundEngine.playDholBeat();
    const active = soundEngine.toggleDevotionalDrone((state) => {
      setIsAartiPlaying(state);
    });
    setIsAartiPlaying(active);
  };

  const handlePronounce = (word: string) => {
    soundEngine.playChime(523.25);
    soundEngine.speak(word);
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const submitQuizAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === BANJARA_QUIZ[currentQuizIndex].correctIndex) {
      soundEngine.playDholBeat();
      setQuizScore((prev) => prev + 1);
    } else {
      soundEngine.playChime(392);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex + 1 < BANJARA_QUIZ.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  const filteredDictionary = GOR_DICTIONARY.filter((w) => {
    const matchesSearch =
      w.gorWord.toLowerCase().includes(dictSearch.toLowerCase()) ||
      w.hindiMeaning.toLowerCase().includes(dictSearch.toLowerCase()) ||
      w.englishMeaning.toLowerCase().includes(dictSearch.toLowerCase());
    const matchesCat = dictCategory === 'all' || w.category === dictCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Title & Vision */}
      <div className="bg-gradient-to-r from-amber-950 via-red-950 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-800/40 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>अमूल्य सांस्कृतिक विरासत एवं इतिहास</span>
          </div>
          <h1 className="font-['Rozha_One',serif] text-2xl sm:text-4xl font-bold text-amber-100 mb-3 leading-tight">
            गौरमाटी धरोहर एवं संत सेवालाल उपदेश
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
            बंजारा समाज का 3000 वर्षों का गौरवशाली कारवां इतिहास, संत सेवालाल महाराज के 22 दिव्य वचन, चार गोत्र प्रणाली, लंबानी हस्तकला और गौर बोली का संपूर्ण डिजिटल संकलन।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleAartiMusic}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isAartiPlaying
                  ? 'bg-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>{isAartiPlaying ? 'भक्ति तानपुरा सक्रिय' : 'आरती सेवाभाया री धुन'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Segmented Section Navigator (Zero-pill discipline: clear functional buttons) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl overflow-x-auto">
        {[
          { id: 'sevalal', label: 'संत सेवालाल उपदेश', icon: '🚩' },
          { id: 'history', label: 'गौरवशाली इतिहास', icon: '⚔️' },
          { id: 'gotra', label: 'चार गोत्र व्यवस्था', icon: '🌳' },
          { id: 'culture', label: 'वेशभूषा व कला', icon: '🪡' },
          { id: 'dictionary', label: 'गौर बोली शब्दकोश', icon: '🗣️' },
          { id: 'quiz', label: 'बंजारा प्रश्नोत्तरी', icon: '🏆' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              soundEngine.playChime();
              setActiveSection(sec.id as typeof activeSection);
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeSection === sec.id
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>{sec.icon}</span>
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1: संत सेवालाल महाराज & उपदेश */}
      {activeSection === 'sevalal' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Biography Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="text-xs font-bold text-amber-800">
                  सद्गुरु एवं समाज सुधारक (1739 - 1806)
                </span>
                <h2 className="font-['Rozha_One',serif] text-2xl font-bold text-stone-950">
                  संत सेवालाल महाराज: जीवन एवं आध्यात्मिक यात्रा
                </h2>
                <p className="text-sm text-stone-700 leading-relaxed">
                  संत सेवालाल महाराज का जन्म 15 फरवरी 1739 (संवत 1795) को शिवगढ़ (वर्तमान कर्नाटक के गुट्टी प्रांत) में भीमा नायक कुल के रामजी नायक और धर्मिणी माता (यादी) के घर हुआ था। वे बाल्यकाल से ही अत्यंत तेजस्वी, अहिंसावादी और मां जगदम्बा (मेरमा यादी) के अनन्य भक्त थे।
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  उन्होंने तत्कालीन समाज में फैली कुरीतियों, अंधविश्वास, पशु-बलि, व्यसन और आपसी फूट का कड़ा विरोध किया। उन्होंने बंजारा समाज को 22 दिव्य उपदेश और 7 जीवन सूत्र दिए। महाराष्ट्र के वाशिम जिले में स्थित 'पोहरादेवी' में उन्होंने समाधि ली, जो आज देश-विदेश के 12 करोड़ बंजारा समाज की पावन 'काशी' कहलाती है।
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-600 font-mono">
                  <span>जन्म: 15 फरवरी 1739</span>
                  <span>·</span>
                  <span>समाधि धाम: पोहरादेवी (वाशिम, महाराष्ट्र)</span>
                  <span>·</span>
                  <span>आराध्य शक्ति: मेरमा यादी (माता जगदम्बा)</span>
                </div>
              </div>

              <div className="md:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-300/60 text-center">
                <div className="text-6xl mb-2">🚩</div>
                <h4 className="font-['Rozha_One',serif] text-lg font-bold text-amber-950">
                  जय सेवाभाया री
                </h4>
                <p className="text-xs text-stone-600 mt-1 mb-3">
                  "सत्य री वाट चालो, दया सबसूं मोटो धर्म छ"
                </p>
                <button
                  onClick={() => soundEngine.speak('सत्य री वाट चालो, दया सबसूं मोटो धर्म छ। जय सेवालाल महाराज!')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>वचन उच्चारण सुनें</span>
                </button>
              </div>
            </div>
          </div>

          {/* 22 Divine Teachings Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-900">
                  संत सेवालाल महाराज के दिव्य उपदेश (22 वचन)
                </h3>
                <p className="text-xs text-stone-500">
                  मानव कल्याण, समाज सुधार और आध्यात्मिक उन्नति के शाश्वत नियम
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEVALAL_UPDESH.map((updesh) => (
                <div
                  key={updesh.number}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
                        वचन {updesh.number}
                      </span>
                      <button
                        onClick={() => handlePronounce(updesh.devanagari)}
                        className="p-1.5 text-stone-400 hover:text-amber-700 rounded-lg transition-colors cursor-pointer"
                        title="बोलकर सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 mb-1">
                      {updesh.title}
                    </h4>
                    <p className="text-sm font-serif italic text-amber-950 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 mb-2 leading-relaxed">
                      "{updesh.devanagari}"
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {updesh.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aarti Sevalal Maharaj */}
          <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Rozha_One',serif] text-xl font-bold text-amber-950 flex items-center gap-2">
                <span>🪕 श्री सेवाभाया री आरती</span>
              </h3>
              <button
                onClick={toggleAartiMusic}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Music className="w-3.5 h-3.5" />
                <span>{isAartiPlaying ? 'तानपुरा बंद करें' : 'तानपुरा के साथ गाएं'}</span>
              </button>
            </div>

            <div className="p-4 bg-white rounded-xl border border-amber-200/60 font-serif text-sm text-stone-800 leading-loose space-y-2 text-center max-w-2xl mx-auto">
              <p className="font-bold text-amber-900">
                आरती कीजे श्री सेवाभाया री, जगदम्बा मेरमा यादी री।
              </p>
              <p>
                रामजी नायक कुल अवतारा, धर्मिणी माता रो दुलारा।
              </p>
              <p>
                शिवगढ़ नगरी जनम लियो छ, सत्य अहिंसा ज्ञान दियो छ।
              </p>
              <p>
                रुई-पोहरादेवी धाम विराज्या, कोटि-कोटि गौरमाटी तार्या।
              </p>
              <p>
                सदा सुखी राखो तांडा परिवार, सेवाभाया थांने बारम्बार प्रणाम।
              </p>
              <p className="font-bold text-red-700 pt-2">
                ॥ बोलो संत सेवालाल महाराज की जय ॥
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: गौरवशाली इतिहास (History & Great Figures) */}
      {activeSection === 'history' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Baba Lakhi Shah Banjara Feature */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>अद्वितीय शहादत एवं राष्ट्रसेवा</span>
            </div>
            <h2 className="font-['Rozha_One',serif] text-2xl font-bold text-stone-950 mb-3">
              बाबा लखीशाह बंजारा: गुरु तेग बहादुर जी के पावन शरीर का सम्मान
            </h2>
            <div className="space-y-3 text-sm text-stone-700 leading-relaxed">
              <p>
                11 नवंबर 1675 को जब मुगल बादशाह औरंगजेब के आदेश पर दिल्ली के चांदनी चौक पर सिखों के नवें गुरु श्री गुरु तेग बहादुर जी को शीश काटकर शहीद कर दिया गया, तब किसी में भी उनका शरीर उठाने का साहस नहीं था।
              </p>
              <p>
                उस समय बंजारा समाज के महाधनी व्यापारी और मुखिया <strong>बाबा लखीशाह बंजारा</strong> (लक्खी शाह) अपने पुत्रों निगाहीया, हेमा और हाड़ू के साथ चांदनी चौक पहुंचे। अंधेरा और धूल का बवंडर उठते ही वे गुरु साहिब के पावन धड़ को अपनी बैलगाड़ी में छिपाकर अपने रायसीना स्थित आवास पर लाए।
              </p>
              <p>
                मुगल सैनिकों के आने के डर से उन्होंने बाहर चिता न बनाकर <strong>अपनी संपूर्ण हवेली को ही आग लगा दी</strong> और गुरु तेग बहादुर जी के पावन पार्थिव शरीर का ससम्मान दाह संस्कार किया। आज वही स्थान नई दिल्ली में <strong>गुरुद्वारा रकाब गंज साहिब</strong> के रूप में पूरी दुनिया में पूजनीय है।
              </p>
            </div>
          </div>

          {/* Historic Caravans and Trade Network */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950 mb-3">
              बंजारा लादनी कारवां: भारत की प्राचीन आर्थिक जीवनरेखा
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              'बंजारा' शब्द की उत्पत्ति 'वाणिज्यकारा' (व्यापारी) से मानी जाती है। सदियों तक बंजारा समाज भारत के हर कोने—कश्मीर से कन्याकुमारी और गुजरात से असम तक—लाखों सुसज्जित बैलों के काफिले (लादनी) के साथ नमक, अनाज, गुड़, मसाले और धातु की आपूर्ति करता था।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">लादनी कारवां</h4>
                <p className="text-stone-600">
                  हजारों बैलों की कतार, जिनके सींगों पर पीतल के छल्ले और घंटियां बंधी होती थीं।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">नाईक एवं पंचायत</h4>
                <p className="text-stone-600">
                  तांडा का अनुशासन नाईक, कारभारी और डाओ द्वारा निष्पक्ष न्याय के साथ चलाया जाता था।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1">स्वाभिमान एवं निष्ठा</h4>
                <p className="text-stone-600">
                  व्यापार में ईमानदारी के लिए बंजारा वचन पत्थर की लकीर माना जाता था।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: गोत्र एवं कुलव्यवस्था (Gotra System) */}
      {activeSection === 'gotra' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h2 className="font-['Rozha_One',serif] text-2xl font-bold text-stone-950 mb-2">
              बंजारा (गौरमाटी) समाज की चार मुख्य गोत्र व्यवस्था
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              बंजारा समाज में सामाजिक समरसता और रक्त संबंध की पवित्रता बनाए रखने के लिए प्राचीन काल से चार मुख्य गोत्रों में कुल विभाजन है। सगोत्र विवाह वर्जित होता है।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOTRA_INFO.map((gotra) => (
                <div
                  key={gotra.name}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-stone-900">
                      {gotra.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {gotra.branches}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-amber-700 mb-2">
                    {gotra.symbol}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {gotra.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: पारंपरिक वेशभूषा, तीज एवं लेंगी (Culture & Art) */}
      {activeSection === 'culture' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Lambani Craft Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700">
              <Sparkles className="w-4 h-4" />
              <span>भौगोलिक संकेतक (GI Tag) प्राप्त विश्व प्रसिद्ध धरोहर</span>
            </div>
            <h2 className="font-['Rozha_One',serif] text-2xl font-bold text-stone-950">
              लंबानी कसीदाकारी (Lambani Embroidery) एवं पारंपरिक वेशभूषा
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              बंजारा महिलाओं द्वारा तैयार की जाने वाली पारंपरिक वेशभूषा रंगों, ज्यामितीय आकारों और प्रकृति का सजीव रूप है। इसमें लाल, नीले और पीले वस्त्रों पर दर्पण (Mirrors), कौड़ियां (Cowrie shells), चांदी के सिक्के और 14 अनूठे टांकों (Stitches) का बारीक काम होता है।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                <h4 className="font-bold text-rose-950 mb-1">फेटीया (Phetiya)</h4>
                <p className="text-stone-600 leading-relaxed">
                  विशाल घेरेदार कशीदाकारी घाघरा, जिसमें सैकड़ों छोटे दर्पण और कौड़ियां हाथ से सिली होती हैं।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-950 mb-1">काचोळी (Kaacholi)</h4>
                <p className="text-stone-600 leading-relaxed">
                  पारंपरिक रंगबिरंगी चोली, जो आगे से अत्यंत बारीक कढ़ाई और सिक्कों से सजी होती है।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                <h4 className="font-bold text-indigo-950 mb-1">चांटिया व आभूषण</h4>
                <p className="text-stone-600 leading-relaxed">
                  सिर पर ओढ़ने वाला दुपट्टा (चांटिया), चांदी के भारी कड़े (कासल्या), नथ और हांसली।
                </p>
              </div>
            </div>
          </div>

          {/* Teej and Lengi Festivals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <span className="text-2xl mb-2 block">🌾</span>
              <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950 mb-2">
                तीज महोत्सव (Teej)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                श्रावण मास में मनाया जाने वाला 9 दिवसीय महापर्व। कुंवारी कन्याएं बांस की टोकरियों में गेहूं के ज्वारे सींचती हैं। 9वें दिन 'ढमोली' (सामूहिक प्रीतिभोज) और नदी में ज्वारों का विसर्जन भाई-बहन के पवित्र प्रेम और प्रकृति की पूजा का प्रतीक है।
              </p>
              <button
                onClick={() => soundEngine.speak('तीज बंजारा समाज की कन्याओं और प्रकृति पूजन का महापर्व है।')}
                className="text-xs font-semibold text-amber-800 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>विवरण सुनें</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <span className="text-2xl mb-2 block">🥁</span>
              <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950 mb-2">
                लेंगी नृत्य (Lengi Folk Dance)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                होली और उत्सवों पर नगाड़े और डफ की थाप पर किया जाने वाला पारंपरिक लाठी नृत्य। इसमें वीरता, शौर्य और प्रेम के ऐतिहासिक लोकगीत गाए जाते हैं, जो नई पीढ़ी को अपनी संस्कृति से जोड़ते हैं।
              </p>
              <button
                onClick={() => soundEngine.speak('लेंगी नृत्य बंजारा समाज का पारंपरिक सामूहिक वीरता नृत्य है।')}
                className="text-xs font-semibold text-amber-800 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>विवरण सुनें</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: गौर बोली शब्दकोश (Gor Boli Dictionary with TTS) */}
      {activeSection === 'dictionary' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-['Rozha_One',serif] text-2xl font-bold text-stone-950">
                  गौर बोली (Gor Boli) डिजिटल शब्दकोश
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  दैनिक बोलचाल के शब्द, मुहावरे और ऑडियो उच्चारण सहायता
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {(['all', 'अभिवादन', 'रिश्ते', 'दैनिक', 'संस्कृति'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDictCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      dictCategory === cat
                        ? 'bg-amber-100 text-amber-950 font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat === 'all' ? 'सभी शब्द' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                value={dictSearch}
                onChange={(e) => setDictSearch(e.target.value)}
                placeholder="गौर बोली, हिंदी या अंग्रेजी में शब्द खोजें (उदा: केन छस, यादी, तांडो)..."
                className="w-full px-4 py-3 text-xs sm:text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {/* Words Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDictionary.map((w, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-300 transition-all shadow-2xs flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-amber-950 font-sans">
                        {w.gorWord}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-medium">
                        · {w.category}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-stone-900">
                      हिंदी अर्थ: <span className="font-normal text-stone-700">{w.hindiMeaning}</span>
                    </p>
                    <p className="text-[11px] text-stone-500">
                      English: {w.englishMeaning}
                    </p>
                    <p className="text-[11px] text-amber-900/80 italic pt-1 font-serif">
                      प्रयोग: "{w.exampleSentence}"
                    </p>
                  </div>

                  <button
                    onClick={() => handlePronounce(w.gorWord)}
                    className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors shrink-0 cursor-pointer"
                    title="उच्चारण सुनें (Text-to-Speech)"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: बंजारा ज्ञान प्रश्नोत्तरी (Quiz for Youth) */}
      {activeSection === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                बंजारा ज्ञान प्रश्नोत्तरी (Youth Heritage Quiz)
              </span>
              <span className="text-xs font-mono font-bold text-stone-500">
                स्कोर: {quizScore}/{BANJARA_QUIZ.length}
              </span>
            </div>

            {!isQuizCompleted ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span>प्रश्न {currentQuizIndex + 1} / {BANJARA_QUIZ.length}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {BANJARA_QUIZ[currentQuizIndex].question}
                </h3>

                <div className="space-y-2.5">
                  {BANJARA_QUIZ[currentQuizIndex].options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === BANJARA_QUIZ[currentQuizIndex].correctIndex;

                    let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-50 border-red-400 text-red-950';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleQuizAnswer(optIdx)}
                        className={`w-full p-3.5 text-left text-xs sm:text-sm rounded-xl border transition-all cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-stone-800 leading-relaxed">
                    <p className="font-bold text-amber-950 mb-1">विस्तृत व्याख्या:</p>
                    <p>{BANJARA_QUIZ[currentQuizIndex].explanation}</p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={submitQuizAnswer}
                      disabled={selectedOption === null}
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      उत्तर जांचें
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      {currentQuizIndex + 1 < BANJARA_QUIZ.length ? 'अगला प्रश्न →' : 'परिणाम देखें 🏆'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-3xl mx-auto">
                  🏆
                </div>
                <h3 className="font-['Rozha_One',serif] text-2xl font-bold text-stone-900">
                  प्रश्नोत्तरी पूर्ण हुई!
                </h3>
                <p className="text-sm text-stone-600">
                  आपका अंतिम स्कोर: <strong className="text-amber-800 font-mono text-base">{quizScore} / {BANJARA_QUIZ.length}</strong>
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {quizScore === BANJARA_QUIZ.length
                    ? 'अद्भुत! आपको बंजारा संस्कृति और इतिहास का गहरा ज्ञान है। जय सेवालाल!'
                    : 'बहुत बढ़िया प्रयास! बंजारा धरोहर को जानने के लिए अन्य अनुभागों को अवश्य पढ़ें।'}
                </p>
                <button
                  onClick={resetQuiz}
                  className="mt-2 px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>पुनः खेलें</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
