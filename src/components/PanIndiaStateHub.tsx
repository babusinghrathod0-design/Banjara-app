import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Phone,
  Users,
  Building,
  GraduationCap,
  Heart,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import {
  PAN_INDIA_STATES,
  PAN_INDIA_TANDAS,
  PAN_INDIA_YOUTH_RESOURCES,
  PAN_INDIA_MATRIMONIAL_SAMPLE,
  PanIndiaTanda,
  StateBanjaraInfo
} from '../data/panIndiaData';
import { soundEngine } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';

interface PanIndiaStateHubProps {
  onNavigateToConnect?: () => void;
}

export const PanIndiaStateHub: React.FC<PanIndiaStateHubProps> = ({ onNavigateToConnect }) => {
  const { t } = useLanguage();
  const [selectedStateId, setSelectedStateId] = useState<string>('all');
  const [tandaSearch, setTandaSearch] = useState<string>('');
  const [tandasList, setTandasList] = useState<PanIndiaTanda[]>(PAN_INDIA_TANDAS);
  const [activeTab, setActiveTab] = useState<'states' | 'tandas' | 'youth' | 'matrimonial'>('states');

  // Register Tanda Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [newTandaForm, setNewTandaForm] = useState({
    name: '',
    district: '',
    state: 'महाराष्ट्र',
    naik: '',
    population: '',
    specialty: '',
    contact: ''
  });
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegisterTanda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTandaForm.name || !newTandaForm.district) return;

    soundEngine.playDholBeat();
    const newTandaItem: PanIndiaTanda = {
      id: `tanda-${Date.now()}`,
      tandaName: newTandaForm.name,
      district: newTandaForm.district,
      state: newTandaForm.state,
      naikName: newTandaForm.naik || 'तांडा प्रमुख',
      population: newTandaForm.population || '5,000+',
      specialty: newTandaForm.specialty || 'समरसता एवं संस्कृति',
      contact: newTandaForm.contact || 'पंजीकृत सदस्य'
    };

    setTandasList([newTandaItem, ...tandasList]);
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setIsRegisterModalOpen(false);
      setNewTandaForm({
        name: '',
        district: '',
        state: 'महाराष्ट्र',
        naik: '',
        population: '',
        specialty: '',
        contact: ''
      });
    }, 2000);
  };

  const filteredStates =
    selectedStateId === 'all'
      ? PAN_INDIA_STATES
      : PAN_INDIA_STATES.filter((s) => s.id === selectedStateId);

  const filteredTandas = tandasList.filter((item) => {
    const matchesSearch =
      item.tandaName.toLowerCase().includes(tandaSearch.toLowerCase()) ||
      item.district.toLowerCase().includes(tandaSearch.toLowerCase()) ||
      item.state.toLowerCase().includes(tandaSearch.toLowerCase()) ||
      item.naikName.toLowerCase().includes(tandaSearch.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Pan-India Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-700/50 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>अखिल भारतीय एकता · 12 करोड़ बंजारा बंधु</span>
          </div>
          <h1 className="font-['Rozha_One',serif] text-2xl sm:text-4xl font-bold text-amber-100 mb-2 leading-tight">
            {t.panIndiaTitle}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-5">
            {t.panIndiaSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playChime();
                setIsRegisterModalOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.registerTandaButton}</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playChime();
                setActiveTab('tandas');
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              तांडा खोजें व सूची
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      {onNavigateToConnect && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤝</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-950">
                क्या आप अन्य राज्यों और गोत्रों के बंधुओं से सीधे जुड़ना और चैट करना चाहते हैं?
              </p>
              <p className="text-[11px] sm:text-xs text-amber-800">
                सर्च करें, सीधे 1-on-1 संदेश भेजें, व्हाट्सऐप पर कनेक्ट करें या अपनी डिजिटल समाज ID बनाएं।
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playChime(659.25);
              onNavigateToConnect();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>गौर संगम (Connect Members) खोलें</span>
            <span>→</span>
          </button>
        </div>
      )}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl overflow-x-auto">
        {[
          { id: 'states', label: 'राज्य डायरेक्टरी (States)', icon: '🗺️' },
          { id: 'tandas', label: 'मेरा तांडा खोजक (Tandas)', icon: '🛖' },
          { id: 'youth', label: 'शिक्षा, हॉस्टल व कोचिंग (Youth)', icon: '📚' },
          { id: 'matrimonial', label: 'तांडा विवाह व परिचय (Matrimonial)', icon: '💍' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundEngine.playChime();
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: States Directory */}
      {activeTab === 'states' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* State Quick Filter Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => {
                soundEngine.playChime();
                setSelectedStateId('all');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedStateId === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {t.allStates} ({PAN_INDIA_STATES.length})
            </button>
            {PAN_INDIA_STATES.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  soundEngine.playChime();
                  setSelectedStateId(st.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedStateId === st.id
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {st.stateNameHindi}
              </button>
            ))}
          </div>

          {/* State Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStates.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-amber-400 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {st.badge}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        {st.stateNameEnglish}
                      </span>
                    </div>
                    <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950">
                      {st.stateNameHindi}
                    </h3>
                    <p className="text-xs text-amber-900 font-semibold mt-0.5">
                      स्थानीय नाम: {st.regionalName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-stone-900 block">
                      {st.populationEstimate}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {st.tandasCount}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {st.description}
                </p>

                {/* Key Shrines */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-800 block">
                    {t.shrinesLabel}
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-600">
                    {st.keyShrines.map((shrine, i) => (
                      <span key={i} className="inline-block bg-white px-2 py-0.5 rounded border border-stone-200">
                        🚩 {shrine}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prominent Districts */}
                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-700">{t.prominentDistrictsLabel} </span>
                  <span>{st.prominentDistricts.join(', ')}</span>
                </div>

                {/* State Helpline */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>{st.helplineContact}</span>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playChime();
                      setActiveTab('tandas');
                      setTandaSearch(st.stateNameHindi);
                    }}
                    className="text-amber-800 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>तांडे देखें</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Tanda Directory & Search */}
      {activeTab === 'tandas' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950">
                  अखिल भारतीय तांडा डायरेक्टरी
                </h3>
                <p className="text-xs text-stone-500">
                  देश भर के तांडों की सूची, नाईक प्रमुख एवं विशेषताएं
                </p>
              </div>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ अपना तांडा जोड़ें</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={tandaSearch}
                onChange={(e) => setTandaSearch(e.target.value)}
                placeholder={t.findTandaPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            {/* Tandas List Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredTandas.map((tanda) => (
                <div
                  key={tanda.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-300 transition-all shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {tanda.tandaName}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{tanda.district}, {tanda.state}</span>
                      </div>
                    </div>

                    <span className="text-[10px] bg-stone-100 text-stone-700 font-mono px-2 py-0.5 rounded">
                      आबादी: {tanda.population}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 bg-stone-50 p-2 rounded-lg">
                    ✨ {tanda.specialty}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-medium text-stone-700">
                      नाईक: {tanda.naikName}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px]">
                      {tanda.contact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Youth, Hostels & Coaching */}
      {activeTab === 'youth' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950">
                {t.youthAndHostels}
              </h3>
              <p className="text-xs text-stone-500">
                देश भर के बंजारा समाज के विद्यार्थियों के लिए छात्रावास, प्रशासनिक सेवा कोचिंग व मार्गदर्शन
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {PAN_INDIA_YOUTH_RESOURCES.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-amber-300 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {res.category}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {res.location}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 leading-snug">
                    {res.title}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-mono">
                      {res.state}
                    </span>
                    <span className="font-bold text-red-700 font-mono">
                      {res.actionUrlOrPhone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Matrimonial & Youth Connect */}
      {activeTab === 'matrimonial' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-['Rozha_One',serif] text-xl font-bold text-stone-950">
                  {t.matrimonialSection}
                </h3>
                <p className="text-xs text-stone-500">
                  गोत्र (राठौड़, पंवार, चौहान, जाधव) एवं पाड़ा मर्यादा अनुसार अखिल भारतीय संबंध
                </p>
              </div>

              <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% सत्यापित समाज बंधु</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {PAN_INDIA_MATRIMONIAL_SAMPLE.map((prof) => (
                <div
                  key={prof.id}
                  className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition-all shadow-xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm">
                      {prof.name}
                    </span>
                    <span className="font-mono text-stone-500">{prof.age} वर्ष</span>
                  </div>

                  <p className="text-amber-800 font-semibold">
                    गोत्र: {prof.gotra}
                  </p>
                  <p className="text-stone-700">
                    शिक्षा: {prof.education}
                  </p>
                  <p className="text-stone-600">
                    पेशा: {prof.profession}
                  </p>
                  <p className="text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{prof.city}, {prof.state}</span>
                  </p>

                  <button
                    onClick={() => {
                      soundEngine.playChime(659.25);
                      alert(`जय सेवालाल! ${prof.name} के परिवार से संपर्क हेतु तांडा समिति से सत्यापन अनुरोध भेजा गया है।`);
                    }}
                    className="w-full mt-2 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    परिचय अनुरोध भेजें
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Register Tanda Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-['Rozha_One',serif] text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>🛖 अपना तांडा पंजीकृत करें</span>
              </h3>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            {registeredSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">
                  तांडा सफलतापूर्वक पंजीकृत हुआ!
                </h4>
                <p className="text-xs text-stone-500">
                  जय सेवालाल! आपका तांडा अखिल भारतीय डायरेक्टरी में जोड़ दिया गया है।
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterTanda} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    तांडे का नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTandaForm.name}
                    onChange={(e) =>
                      setNewTandaForm({ ...newTandaForm, name: e.target.value })
                    }
                    placeholder="उदा: पोहरादेवी तांडा, रामजी नगर तांडा..."
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      राज्य (State) *
                    </label>
                    <select
                      value={newTandaForm.state}
                      onChange={(e) =>
                        setNewTandaForm({ ...newTandaForm, state: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      <option value="महाराष्ट्र">महाराष्ट्र</option>
                      <option value="तेलंगाना">तेलंगाना</option>
                      <option value="कर्नाटक">कर्नाटक</option>
                      <option value="आंध्र प्रदेश">आंध्र प्रदेश</option>
                      <option value="राजस्थान">राजस्थान</option>
                      <option value="मध्य प्रदेश">मध्य प्रदेश</option>
                      <option value="गुजरात">गुजरात</option>
                      <option value="दिल्ली">दिल्ली</option>
                      <option value="हरियाणा">हरियाणा</option>
                      <option value="पंजाब">पंजाब</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      जिला (District) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTandaForm.district}
                      onChange={(e) =>
                        setNewTandaForm({ ...newTandaForm, district: e.target.value })
                      }
                      placeholder="उदा: वाशिम, यवतमाल, महबूबनगर..."
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      नाईक / सरपंच का नाम
                    </label>
                    <input
                      type="text"
                      value={newTandaForm.naik}
                      onChange={(e) =>
                        setNewTandaForm({ ...newTandaForm, naik: e.target.value })
                      }
                      placeholder="नाईक नाम..."
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      संपर्क नंबर
                    </label>
                    <input
                      type="text"
                      value={newTandaForm.contact}
                      onChange={(e) =>
                        setNewTandaForm({ ...newTandaForm, contact: e.target.value })
                      }
                      placeholder="+91..."
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    तांडे की विशेषता (तीर्थ, कला, हस्तशिल्प)
                  </label>
                  <input
                    type="text"
                    value={newTandaForm.specialty}
                    onChange={(e) =>
                      setNewTandaForm({ ...newTandaForm, specialty: e.target.value })
                    }
                    placeholder="उदा: भव्य तीज उत्सव, लंबानी कशीदाकारी..."
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    पंजीकृत करें
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
