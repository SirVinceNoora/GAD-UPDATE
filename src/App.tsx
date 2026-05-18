import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Users, Target, TrendingUp, BookOpen, Heart, LogIn, X } from 'lucide-react';
import dvLogo from './assets/dvlogo.png';
import { LoginModal } from './components/LoginModal';
import { CustomizationPage } from './components/CustomizationPage';

const genderData = [
  { name: 'Girls', participation: 88, target: 100, eligible: 118, change: 4 },
  { name: 'Boys', participation: 72, target: 90, eligible: 105, change: 6 },
  { name: 'Non-binary', participation: 54, target: 70, eligible: 70, change: 12 },
];

const diversityData = [
  { name: 'Awareness', value: 35, color: '#f97316', description: 'Gender sensitivity and rights orientation programs.' },
  { name: 'Support', value: 25, color: '#60a5fa', description: 'Counseling, mentoring, and community networks.' },
  { name: 'Training', value: 20, color: '#1e40af', description: 'Capacity building for teachers and school leaders.' },
  { name: 'Community', value: 20, color: '#f59e0b', description: 'Stakeholder engagement for inclusive school culture.' },
];

const progressData = [
  { year: '2020', progress: 20, programs: 5, coverage: 12 },
  { year: '2021', progress: 35, programs: 9, coverage: 16 },
  { year: '2022', progress: 50, programs: 12, coverage: 22 },
  { year: '2023', progress: 70, programs: 16, coverage: 28 },
  { year: '2024', progress: 85, programs: 21, coverage: 34 },
];

function GADCorner() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [photoSlide, setPhotoSlide] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [expandedChart, setExpandedChart] = useState<null | 'gender' | 'diversity' | 'progress'>(null);
  const [chartModalVisible, setChartModalVisible] = useState(false);
  const [chartModalClosing, setChartModalClosing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [carouselSlides, setCarouselSlides] = useState([
    {
      title: "Catarman GAD Corner Launch",
      description: "Based on OM 10, 2026, this workshop created the GAD Corner for the Division website.",
      date: "March 2026",
      participants: "Division GAD team"
    },
    {
      title: "GAD Planning & Budget",
      description: "Division memo DM 179, 2026 focuses on GAD planning and budgeting for FY 2027.",
      date: "April 2026",
      participants: "District GAD coordinators"
    },
    {
      title: "Inclusive School Leadership",
      description: "Equity ambassadors in Catarman schools champion gender diversity and safe classrooms.",
      date: "May 2026",
      participants: "120 educators"
    },
    {
      title: "Safe and Respectful Learning",
      description: "Programs aligned with NACC and DSWD GAD Corner frameworks for child-friendly schools.",
      date: "June 2026",
      participants: "300+ learners"
    }
  ].map((slide, index) => ({ ...slide, id: `program-${index}` })));

  const [photoSlides, setPhotoSlides] = useState([
    {
      image: "https://northernsamar.deped.gov.ph/wp-content/uploads/2026/01/leftear-4.png",
      title: "Division GAD Launch",
      caption: "Catarman Division Office GAD Corner initiative from the Northern Samar DepEd website."
    },
    {
      image: "https://northernsamar.deped.gov.ph/wp-content/uploads/2025/12/gaudencio2-840x280.jpg",
      title: "Local GAD Workshop",
      caption: "Northern Samar GAD coordinators and educators shaping gender-responsive programs."
    },
    {
      image: "https://northernsamar.deped.gov.ph/wp-content/uploads/2026/01/DepEd-CO-PAAC-CCB-Hotlines-Web-Banner-03-03-03-03-03-1-2048x785-1-840x280.png",
      title: "Community Support",
      caption: "Partnering with local stakeholders to strengthen GAD and child welfare services."
    },
    {
      image: "https://northernsamar.deped.gov.ph/wp-content/uploads/2024/01/EDUKALIDAD-840x280.png",
      title: "Education First",
      caption: "Catarman schools advancing gender-sensitive education for all learners."
    }
  ].map((slide, index) => ({ ...slide, id: `photo-${index}` })));

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (chartModalVisible) {
      const timeout = window.setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 120);
      return () => window.clearTimeout(timeout);
    }
  }, [chartModalVisible]);

  const openChartModal = (chart: 'gender' | 'diversity' | 'progress') => {
    setExpandedChart(chart);
    setChartModalVisible(true);
    setChartModalClosing(false);
  };

  const closeChartModal = () => {
    setChartModalClosing(true);
    window.setTimeout(() => {
      setChartModalVisible(false);
      setExpandedChart(null);
      setChartModalClosing(false);
    }, 220);
  };

  // Auto-play for programs carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  // Auto-play for photo carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoSlide((prev) => (prev + 1) % photoSlides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [photoSlides.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleUpdateSlides = (newPhotoSlides: typeof photoSlides, newCarouselSlides: typeof carouselSlides) => {
    setPhotoSlides(newPhotoSlides);
    setCarouselSlides(newCarouselSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const nextPhotoSlide = () => {
    setPhotoSlide((prev) => (prev + 1) % photoSlides.length);
  };

  const prevPhotoSlide = () => {
    setPhotoSlide((prev) => (prev - 1 + photoSlides.length) % photoSlides.length);
  };

  // If user is logged in, show customization page
  if (isAdmin) {
    return (
      <CustomizationPage
        photoSlides={photoSlides}
        carouselSlides={carouselSlides}
        onLogout={handleLogout}
        onUpdate={handleUpdateSlides}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Sticky Header - Title and logo */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 border-b-4 border-orange-500 px-3 py-2 sm:px-4 sm:py-3 shadow-md">
        <div className="max-w-[1600px] mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">GAD Corner</h1>
            <p className="mt-2 max-w-full sm:max-w-[65%] md:max-w-[60%] lg:max-w-[55%] text-left break-words pr-4 text-[11px] sm:text-[12px] md:text-sm lg:text-sm text-orange-100 leading-5 sm:leading-6 hidden sm:block">
              Dashboard for Catarman Division’s gender and development programs, measuring participation, community reach, and inclusive learning progress.
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
            <img src={dvLogo} alt="Department of Education Logo" className="h-12 w-12 sm:h-14 sm:w-14 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full border-2 border-white/30 bg-white/10 p-1 sm:p-2 object-contain" />
            <div className="text-right">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">DepEd Northern Samar</p>
              <p className="mt-1 text-[10px] sm:text-[11px] md:text-[12px] lg:text-sm text-purple-100">Catarman Division</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation bar below header */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-sm font-semibold text-slate-700">
            <a href="#overview" className="rounded-full px-3 py-2 sm:px-4 sm:py-2 hover:bg-orange-50 transition">Overview</a>
            <a href="#programs" className="rounded-full px-3 py-2 sm:px-4 sm:py-2 hover:bg-orange-50 transition">Programs</a>
            <a href="#reports" className="rounded-full px-3 py-2 sm:px-4 sm:py-2 hover:bg-orange-50 transition">Reports</a>
            <a href="#partners" className="rounded-full px-3 py-2 sm:px-4 sm:py-2 hover:bg-orange-50 transition">Partners</a>
            <a href="#guidelines" className="rounded-full px-3 py-2 sm:px-4 sm:py-2 hover:bg-orange-50 transition">Guidelines</a>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-2 text-[11px] sm:text-xs font-semibold text-white shadow-sm transition-opacity duration-200 opacity-0 hover:opacity-100 focus:opacity-100"
            aria-label="Open admin login"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 space-y-6">
        <div className="space-y-6">
          {/* Photo Carousel */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-gray-200 shadow-lg overflow-hidden">
            <div className="relative h-[360px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-[32px]">
              <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${photoSlide * 100}%)` }}>
                {photoSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 h-full relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h4 className="text-xl sm:text-2xl font-semibold mb-1">{slide.title}</h4>
                      <p className="text-sm sm:text-base text-white/80">{slide.caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevPhotoSlide}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/25 p-3 text-white shadow-lg hover:bg-black/40 transition"
              >
                ‹
              </button>
              <button
                onClick={nextPhotoSlide}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/25 p-3 text-white shadow-lg hover:bg-black/40 transition"
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {photoSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPhotoSlide(index)}
                    className={`h-2 w-2 rounded-full ${index === photoSlide ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-slate-700 border border-slate-200">
              <h3 className="text-2xl sm:text-3xl font-semibold text-orange-600 mb-2">GAD in Action</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Highlighted programs from Catarman Division Office framed in an inclusive, community-focused presentation.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-4 text-orange-500 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Gender Diversity Advocacy
            </h2>
            <p className="text-gray-700 mb-4">
              Built from NACC and DSWD GAD Corner guidance, our Catarman Division Office initiative supports inclusive education, gender-responsive policy, and safer learning spaces for all students.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Division Office Catarman GAD Corner rollout
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                GAD planning and budgeting for FY 2027
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Inclusive leadership and safe-space programs
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-orange-500 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Featured Programs
            </h3>

            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border-l-4 border-orange-400">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{slide.title}</h4>
                      <p className="text-gray-700 mb-3">{slide.description}</p>
                      <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:justify-between">
                        <span>📅 {slide.date}</span>
                        <span>👥 {slide.participants}</span>
                      </div>
                      <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-md hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-md hover:bg-white"
              >
                ›
              </button>

              <div className="flex justify-center mt-4 space-x-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-700 via-fuchsia-700 to-orange-500 text-white shadow-2xl shadow-orange-200/20 border border-white/20 overflow-hidden relative">
            <div className="absolute -right-16 -top-8 h-40 w-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 bottom-0 h-36 w-36 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-white">
              <BookOpen className="w-5 h-5" />
              Programs & Announcements
            </h2>
            <p className="text-sm text-orange-100 mb-6">A curated snapshot of Catarman Division Office GAD milestones, designed with community, policy, and inclusion in mind.</p>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">OM 10, s. 2026 Workshop</h3>
                    <p className="text-sm text-orange-100">Integrated workshop for the GAD Corner launch in the Division website.</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/85">Launch</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">DM 179, s. 2026 Planning</h3>
                    <p className="text-sm text-orange-100">GAD planning and budgeting for FY 2027 in Catarman schools.</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/85">Policy</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">Catarman GAD Corner Rollout</h3>
                    <p className="text-sm text-orange-100">Continuing gender-responsive programs grounded in national gender equity guidance.</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/85">Community</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Reference Links</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>
                <a href="https://aics.dswd.gov.ph/gender-and-development-gad-corner/" target="_blank" rel="noreferrer" className="text-purple-700 hover:text-orange-500 underline">DSWD Gender and Development GAD Corner</a>
              </li>
              <li>
                <a href="https://www.nacc.gov.ph/gad-corner/" target="_blank" rel="noreferrer" className="text-purple-700 hover:text-orange-500 underline">NACC GAD Corner</a>
              </li>
              <li>
                <a href="https://northernsamar.deped.gov.ph/om-10-2026-integrated-workshop-on-the-creation-of-the-gad-corner-in-the-division-website-and-automation-of-accounting-transactions-and-document-tracking-system/" target="_blank" rel="noreferrer" className="text-purple-700 hover:text-orange-500 underline">DepEd Northern Samar OM 10, 2026</a>
              </li>
            </ul>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 bg-gradient-to-br from-white via-orange-50 to-orange-100 border border-orange-200 shadow-xl">
            <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-2xl bg-orange-500 text-white shadow-lg">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Inclusive Communities</h3>
            <p className="text-sm text-orange-700/80">Design activities and learning spaces that welcome all genders and identities in Catarman classrooms.</p>
          </div>
          <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700 text-white border border-white/10 shadow-2xl">
            <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-2xl bg-white/10 text-white shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Data-Driven Equity</h3>
            <p className="text-sm text-white/80">Use participation and program metrics to guide safer, gender-responsive decisions for the division.</p>
          </div>
          <div className="rounded-3xl p-6 bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 text-slate-900 border border-slate-200 shadow-xl">
            <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-2xl bg-white text-slate-900 shadow-lg">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Empowered Youth</h3>
            <p className="text-sm text-slate-900/80">Create youth-led actions and child-friendly policies rooted in inclusive school culture.</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gender Participation Chart */}
          <div
            className={`bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all ${!isMobile ? 'cursor-pointer' : ''}`}
            onClick={() => !isMobile && openChartModal('gender')}
            title={isMobile ? 'Chart expansion disabled on mobile; tap the chart for tooltips.' : 'Tap to expand chart details.'}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-500 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Gender Participation
              </h3>
              <span className="rounded-full bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1">
                {isMobile ? 'Touch chart for tooltip' : 'Tap to expand'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Participation rates by gender group, compared against divisional targets.</p>
            {loading ? (
              <div className="min-h-[180px] bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={genderData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} domain={[0, 110]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="participation" fill="#f97316" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {genderData.map((item) => (
                <div key={item.name} className="rounded-2xl bg-orange-50 p-3 text-sm text-gray-700">
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.participation}% participation</p>
                  <p className="text-xs text-gray-500">Target {item.target}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diversity Chart */}
          <div
            className={`bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all ${!isMobile ? 'cursor-pointer' : ''}`}
            onClick={() => !isMobile && openChartModal('diversity')}
            title={isMobile ? 'Chart expansion disabled on mobile; tap the chart for tooltips.' : 'Tap to expand chart details.'}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-500 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Diversity Overview
              </h3>
              <span className="rounded-full bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1">
                {isMobile ? 'Touch chart for tooltip' : 'Tap to expand'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Program focus areas showing how GAD work is spread across awareness, support, training, and community.</p>
            {loading ? (
              <div className="min-h-[180px] bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={diversityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                    label={false}
                    labelLine={false}
                    paddingAngle={4}
                  >
                    {diversityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {diversityData.map((item) => (
                <div key={item.name} className="flex items-center gap-3 rounded-2xl bg-orange-50 p-3 text-sm text-gray-700">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.value}% focus</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div
            className={`bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all md:col-span-2 lg:col-span-1 ${!isMobile ? 'cursor-pointer' : ''}`}
            onClick={() => !isMobile && openChartModal('progress')}
            title={isMobile ? 'Chart expansion disabled on mobile; tap the chart for tooltips.' : 'Tap to expand chart details.'}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-500 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Program Growth
              </h3>
              <span className="rounded-full bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1">
                {isMobile ? 'Touch chart for tooltip' : 'Tap to expand'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Track progress across year-on-year coverage and program rollout in Catarman Division.</p>
            {loading ? (
              <div className="min-h-[180px] bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={progressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} domain={[0, 110]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                  <Legend verticalAlign="bottom" height={36} />
                  <Line type="monotone" dataKey="progress" stroke="#f97316" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {progressData.slice(-2).map((item) => (
                <div key={item.year} className="rounded-2xl bg-orange-50 p-3 text-sm text-gray-700">
                  <p className="font-semibold">{item.year}</p>
                  <p>{item.programs} GAD programs</p>
                  <p className="text-xs text-gray-500">Reach {item.coverage} schools</p>
                </div>
              ))}
            </div>
          </div>

          {(chartModalVisible || chartModalClosing) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6 transition-opacity duration-200 ease-out" style={{ opacity: chartModalClosing ? 0 : 1 }}>
              <div className={`relative w-full max-w-6xl max-h-[calc(100vh-3rem)] rounded-3xl bg-white shadow-2xl border border-white/60 overflow-hidden transform transition-all duration-200 ease-out ${chartModalClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                <button
                  onClick={closeChartModal}
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                  aria-label="Close chart details"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex h-full flex-col overflow-hidden p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 capitalize">{expandedChart ? expandedChart.replace(/^[a-z]/, (c) => c.toUpperCase()) : 'Chart'} chart details</h2>
                      <p className="mt-2 text-sm text-slate-600">Expanded insights and full data breakdown for the selected GAD Corner chart.</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">Full details</span>
                  </div>

                  <div className="mt-6 grid h-full gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 overflow-y-auto max-h-[calc(100vh-15rem)]">
                      {expandedChart === 'gender' && (
                        <>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">Participation breakdown</h3>
                          <ul className="space-y-3 text-sm text-slate-700">
                            {genderData.map((item) => (
                              <li key={item.name} className="rounded-2xl bg-white p-4 shadow-sm">
                                <p className="font-semibold text-slate-900">{item.name}</p>
                                <p>Current participation: <span className="font-semibold text-orange-600">{item.participation}%</span></p>
                                <p>Target: {item.target}%</p>
                                <p>Eligible learners: {item.eligible}</p>
                                <p>Year-over-year growth: +{item.change}%</p>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {expandedChart === 'diversity' && (
                        <>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">Program focus categories</h3>
                          <ul className="space-y-3 text-sm text-slate-700">
                            {diversityData.map((item) => (
                              <li key={item.name} className="rounded-2xl bg-white p-4 shadow-sm">
                                <p className="font-semibold text-slate-900">{item.name}</p>
                                <p>{item.value}% of focus</p>
                                <p className="text-slate-500">{item.description}</p>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {expandedChart === 'progress' && (
                        <>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">Growth metrics</h3>
                          <ul className="space-y-3 text-sm text-slate-700">
                            {progressData.map((item) => (
                              <li key={item.year} className="rounded-2xl bg-white p-4 shadow-sm">
                                <p className="font-semibold text-slate-900">{item.year}</p>
                                <p>Progress index: <span className="font-semibold text-orange-600">{item.progress}%</span></p>
                                <p>{item.programs} active programs</p>
                                <p>Coverage: {item.coverage} schools</p>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex-1 overflow-hidden">
                      <div className="h-full min-h-[320px] max-h-[calc(100vh-15rem)]">
                        {expandedChart === 'gender' && (
                          <ResponsiveContainer width="100%" height={320} key="gender-modal-chart">
                            <BarChart data={genderData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="name" stroke="#6b7280" />
                              <YAxis stroke="#6b7280" />
                              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                              <Bar dataKey="participation" fill="#f97316" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                        {expandedChart === 'diversity' && (
                          <ResponsiveContainer width="100%" height={320} key="diversity-modal-chart">
                            <PieChart>
                              <Pie
                                data={diversityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={110}
                                dataKey="value"
                                label={false}
                                labelLine={false}
                                paddingAngle={4}
                              >
                                {diversityData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                              <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                        {expandedChart === 'progress' && (
                          <ResponsiveContainer width="100%" height={320} key="progress-modal-chart">
                            <LineChart data={progressData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="year" stroke="#6b7280" />
                              <YAxis stroke="#6b7280" />
                              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                              <Legend />
                              <Line type="monotone" dataKey="progress" stroke="#f97316" strokeWidth={4} dot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GADCorner;
