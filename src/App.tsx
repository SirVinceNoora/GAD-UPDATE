import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Target, TrendingUp, BookOpen, Heart, LogIn } from 'lucide-react';
import dvLogo from './assets/dvlogo.png';
import { LoginModal } from './components/LoginModal';
import { CustomizationPage } from './components/CustomizationPage';

const genderData = [
  { name: 'Boys', participation: 65 },
  { name: 'Girls', participation: 85 },
];

const diversityData = [
  { name: 'Ethnic A', value: 40, color: '#f97316' },
  { name: 'Ethnic B', value: 30, color: '#ffffff' },
  { name: 'Ethnic C', value: 20, color: '#1e40af' },
  { name: 'Other', value: 10, color: '#f59e0b' },
];

const progressData = [
  { year: '2020', progress: 20 },
  { year: '2021', progress: 35 },
  { year: '2022', progress: 50 },
  { year: '2023', progress: 70 },
  { year: '2024', progress: 85 },
];

function GADCorner() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [photoSlide, setPhotoSlide] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [carouselSlides, setCarouselSlides] = useState([
    {
      title: "Gender Equality Workshop",
      description: "Interactive session on gender stereotypes and equality in education",
      date: "March 25, 2024",
      participants: "150+ students"
    },
    {
      title: "Diversity Inclusion Program",
      description: "Celebrating cultural diversity and promoting inclusive practices",
      date: "April 10, 2024",
      participants: "200+ participants"
    },
    {
      title: "Leadership Development",
      description: "Empowering young leaders for gender equality advocacy",
      date: "April 15, 2024",
      participants: "80+ students"
    },
    {
      title: "Anti-Bullying Campaign",
      description: "Creating safe spaces and promoting respectful interactions",
      date: "May 5, 2024",
      participants: "300+ students"
    }
  ]);

  const [photoSlides, setPhotoSlides] = useState([
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      title: "Student Workshop",
      caption: "Engaging students in gender equality discussions"
    },
    {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      title: "Diversity Celebration",
      caption: "Celebrating cultural diversity in our community"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      title: "Leadership Training",
      caption: "Empowering young leaders for change"
    },
    {
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop",
      title: "Community Outreach",
      caption: "Reaching out to promote inclusivity"
    }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Sticky Header - Purple Main with Orange Highlight */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 border-b-4 border-orange-500 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white flex items-center gap-2">
              GAD Corner
              <span className="inline-block w-1 h-1 bg-orange-500 rounded-full"></span>
            </h1>
            <p className="text-sm text-purple-100 mt-1">Gender and Development Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-semibold transition-all border-2 border-purple-400 hover:border-orange-500"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden sm:inline">Login</span>
            </button>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">Department of Education</p>
              <p className="text-xs text-purple-100">Gender & Development</p>
            </div>
            <img src={dvLogo} alt="Department of Education Logo" className="h-16 w-16 object-contain" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold mb-4 text-orange-500 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                GAD Advocacy
              </h2>
              <p className="text-gray-700 mb-4">
                Promoting gender equality and inclusivity in education. Our programs focus on creating a safe, equitable environment for all students.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Anti-discrimination initiatives
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Diversity awareness campaigns
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Inclusive education policies
                </div>
              </div>
            </div>

            {/* Photo Carousel */}
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-lg overflow-hidden">
              <h3 className="text-lg font-semibold mb-4 text-orange-500 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                GAD in Action
              </h3>

              <div className="relative h-64 overflow-hidden rounded-lg">
                <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${photoSlide * 100}%)` }}>
                  {photoSlides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 h-full relative">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h4 className="text-white font-semibold text-lg mb-1">{slide.title}</h4>
                        <p className="text-gray-200 text-sm">{slide.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Photo Navigation Buttons */}
                <button
                  onClick={prevPhotoSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={nextPhotoSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  ›
                </button>

                {/* Photo Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {photoSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPhotoSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === photoSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* GAD Programs Carousel */}
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
                        <div className="flex justify-between text-sm text-gray-600">
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

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all"
                >
                  ›
                </button>

                {/* Dots Indicator */}
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
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold mb-4 text-orange-500 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Programs & Announcements
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-medium text-gray-900">Gender Sensitivity Training</h3>
                  <p className="text-sm text-gray-600">Scheduled for next month - All faculty required</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-medium text-gray-900">Student Leadership Program</h3>
                  <p className="text-sm text-gray-600">Applications open - Focus on inclusivity</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-medium text-gray-900">Diversity Day Celebration</h3>
                  <p className="text-sm text-gray-600">March 15th - Join the festivities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gender Participation Chart */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold mb-4 text-orange-500 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Gender Participation
            </h3>
            {loading ? (
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <BarChart width={300} height={250} data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                <Legend />
                <Bar dataKey="participation" fill="#f97316" />
              </BarChart>
            )}
          </div>

          {/* Diversity Chart */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold mb-4 text-orange-500 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Diversity Overview
            </h3>
            {loading ? (
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <PieChart width={300} height={250}>
                <Pie
                  data={diversityData}
                  cx={150}
                  cy={125}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {diversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
              </PieChart>
            )}
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-orange-500 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Program Growth
            </h3>
            {loading ? (
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <LineChart width={300} height={250} data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #f97316' }} />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#f97316" strokeWidth={3} />
              </LineChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GADCorner;
