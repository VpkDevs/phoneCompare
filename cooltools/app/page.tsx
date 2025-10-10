
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Smartphone, TrendingUp, Zap, DollarSign, Shield, Award, BarChart3, ChevronLeft, ChevronRight, Bell, Gamepad2, Camera, Battery, Star } from 'lucide-react';
import { getTopPhones, getLatestPhones, PhoneListItem } from '@/lib/phoneApi';

export default function HomePage() {
  const [trendingPhones, setTrendingPhones] = useState<PhoneListItem[]>([]);
  const [latestPhones, setLatestPhones] = useState<PhoneListItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ phones: 0, features: 0, sources: 0, years: 0 });
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    loadPhones();
    animateStats();
  }, []);

  async function loadPhones() {
    const [trending, latest] = await Promise.all([
      getTopPhones(),
      getLatestPhones()
    ]);
    setTrendingPhones(trending.slice(0, 5));
    setLatestPhones(latest.slice(0, 8));
  }

  function animateStats() {
    const targets = { phones: 10000, features: 150, sources: 25, years: 7 };
    const duration = 2000;
    const steps = 50;
    const increment = duration / steps;

    let current = { phones: 0, features: 0, sources: 0, years: 0 };
    const interval = setInterval(() => {
      current = {
        phones: Math.min(current.phones + targets.phones / steps, targets.phones),
        features: Math.min(current.features + targets.features / steps, targets.features),
        sources: Math.min(current.sources + targets.sources / steps, targets.sources),
        years: Math.min(current.years + targets.years / steps, targets.years)
      };
      setStats({
        phones: Math.floor(current.phones),
        features: Math.floor(current.features),
        sources: Math.floor(current.sources),
        years: Math.floor(current.years)
      });
      if (current.phones >= targets.phones) clearInterval(interval);
    }, increment);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(trendingPhones.length, 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [trendingPhones.length]);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Find phones with 150+ filters including specs, features, and pricing",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed Comparisons",
      description: "Compare up to 4 phones side-by-side with comprehensive spec analysis",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Price Tracking",
      description: "Monitor price drops and get alerts for your favorite phones",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Benchmarks",
      description: "Real-world testing scores including AnTuTu, camera, and battery ratings",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Best Deals",
      description: "Discover the best phone deals across multiple retailers",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Carrier Compatibility",
      description: "Check network compatibility and carrier support for any phone",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Reviews",
      description: "Professional reviews and user ratings to guide your decision",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "7+ Years of Data",
      description: "Comprehensive database of phones from 2018-2025",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const categories = [
    { icon: <Gamepad2 className="w-6 h-6" />, title: "Gaming Phones", link: "/search?category=gaming" },
    { icon: <Camera className="w-6 h-6" />, title: "Camera Champions", link: "/search?category=camera" },
    { icon: <Battery className="w-6 h-6" />, title: "Battery Kings", link: "/search?category=battery" },
    { icon: <Star className="w-6 h-6" />, title: "Flagship Devices", link: "/search?category=flagship" }
  ];

  const quickComparisons = [
    { name: "iPhone 15 Pro vs Galaxy S24 Ultra", phones: "iphone-15-pro,samsung-galaxy-s24-ultra" },
    { name: "Pixel 8 Pro vs OnePlus 12", phones: "google-pixel-8-pro,oneplus-12" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Carousel */}
      <div className={`relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-pulse">
                CoolTools
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                The Ultimate Phone Comparison Platform
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Compare phones from every major brand with 150+ features from GSMArena, Rtings, DXOMARK, and 25+ other top platforms
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                <Link 
                  href="/phones" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
                >
                  Browse Phones
                </Link>
                <Link 
                  href="/compare" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
                >
                  Compare Now
                </Link>
                <Link 
                  href="/search" 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg border-2 border-gray-200 dark:border-gray-700"
                >
                  Advanced Search
                </Link>
              </div>
            </div>

            {/* Trending Phones Carousel */}
            <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔥 Trending Now</h3>
              {trendingPhones.length > 0 ? (
                <div className="relative h-80">
                  {trendingPhones.map((phone, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ${
                        index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      <Link href={`/phones/${phone.phone_url.split('/').pop()}`} className="block">
                        {phone.phone_image && (
                          <img
                            src={phone.phone_image}
                            alt={phone.phone_name}
                            className="w-full h-48 object-contain mb-4"
                          />
                        )}
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{phone.phone_name}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{phone.detail}</p>
                      </Link>
                    </div>
                  ))}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + trendingPhones.length) % trendingPhones.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-600 transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % trendingPhones.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-600 transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {trendingPhones.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition ${
                          index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-110 transition">
              <div className="text-5xl font-bold mb-2">{stats.features}+</div>
              <div className="text-blue-100">Comparison Features</div>
            </div>
            <div className="transform hover:scale-110 transition">
              <div className="text-5xl font-bold mb-2">{stats.phones.toLocaleString()}+</div>
              <div className="text-blue-100">Phone Models</div>
            </div>
            <div className="transform hover:scale-110 transition">
              <div className="text-5xl font-bold mb-2">{stats.sources}+</div>
              <div className="text-blue-100">Data Sources</div>
            </div>
            <div className="transform hover:scale-110 transition">
              <div className="text-5xl font-bold mb-2">{stats.years} Years</div>
              <div className="text-blue-100">Historical Data</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Category Quick Links */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={cat.link}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 flex flex-col items-center text-center group"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Cards with Enhanced Hover Effects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all group overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-4 transform group-hover:scale-110 transition`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Comparison Templates */}
        <div className="mb-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">⚡ Quick Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickComparisons.map((comp, index) => (
              <Link
                key={index}
                href={`/compare?phones=${comp.phones}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:shadow-xl transition transform hover:scale-105 flex items-center justify-between group"
              >
                <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {comp.name}
                </span>
                <BarChart3 className="w-6 h-6 text-blue-600 group-hover:scale-110 transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Phones */}
        {latestPhones.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">🆕 Latest Releases</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestPhones.map((phone, index) => (
                <Link
                  key={index}
                  href={`/phones/${phone.phone_url.split('/').pop()}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  {phone.phone_image && (
                    <img
                      src={phone.phone_image}
                      alt={phone.phone_name}
                      className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700 p-4"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {phone.phone_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {phone.detail}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <Bell className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Get Price Drop Alerts</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be the first to know when your favorite phones go on sale. Join 50,000+ smart shoppers!
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Powered by Industry-Leading Data
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="transform hover:scale-105 transition">
              <h4 className="font-bold text-xl mb-4 text-blue-600 dark:text-blue-400">Technical Specs</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Display: Size, Resolution, Type, Refresh Rate, Brightness</li>
                <li>✓ Performance: Chipset, CPU, GPU, RAM, Benchmarks</li>
                <li>✓ Camera: Megapixels, Aperture, Features, Video Quality</li>
                <li>✓ Battery: Capacity, Charging Speed, Endurance Rating</li>
                <li>✓ Network: 5G/4G/3G Bands, Carrier Compatibility</li>
              </ul>
            </div>
            <div className="transform hover:scale-105 transition">
              <h4 className="font-bold text-xl mb-4 text-purple-600 dark:text-purple-400">Advanced Features</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Gaming Performance & FPS Benchmarks</li>
                <li>✓ Camera Quality Scores (DXOMARK Style)</li>
                <li>✓ Display Testing (Color, Brightness, Touch)</li>
                <li>✓ Audio Quality Ratings</li>
                <li>✓ Build Quality & Materials Analysis</li>
              </ul>
            </div>
            <div className="transform hover:scale-105 transition">
              <h4 className="font-bold text-xl mb-4 text-pink-600 dark:text-pink-400">Smart Tools</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Price History & Drop Alerts</li>
                <li>✓ Carrier Compatibility Checker</li>
                <li>✓ Phone Finder with AI Recommendations</li>
                <li>✓ Value for Money Calculator</li>
                <li>✓ User Reviews & Expert Ratings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
