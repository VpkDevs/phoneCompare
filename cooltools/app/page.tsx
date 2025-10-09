import Link from 'next/link';
import { Search, Smartphone, TrendingUp, Zap, DollarSign, Shield, Award, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Find phones with 150+ filters including specs, features, and pricing"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed Comparisons",
      description: "Compare up to 4 phones side-by-side with comprehensive spec analysis"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Price Tracking",
      description: "Monitor price drops and get alerts for your favorite phones"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Benchmarks",
      description: "Real-world testing scores including AnTuTu, camera, and battery ratings"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Best Deals",
      description: "Discover the best phone deals across multiple retailers"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Carrier Compatibility",
      description: "Check network compatibility and carrier support for any phone"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Reviews",
      description: "Professional reviews and user ratings to guide your decision"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "7+ Years of Data",
      description: "Comprehensive database of phones from 2018-2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            CoolTools
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            The Ultimate Phone Comparison Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Compare phones from every major brand with 150+ features from GSMArena, Rtings, DXOMARK, and 25+ other top platforms
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/phones" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
            >
              Browse Phones
            </Link>
            <Link 
              href="/compare" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
            >
              Compare Now
            </Link>
            <Link 
              href="/search" 
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
            >
              Advanced Search
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Comparison Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Phone Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Data Sources</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7 Years</div>
              <div className="text-blue-100">Historical Data</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Powered by Industry-Leading Data
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Technical Specs</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Display: Size, Resolution, Type, Refresh Rate, Brightness</li>
                <li>✓ Performance: Chipset, CPU, GPU, RAM, Benchmarks</li>
                <li>✓ Camera: Megapixels, Aperture, Features, Video Quality</li>
                <li>✓ Battery: Capacity, Charging Speed, Endurance Rating</li>
                <li>✓ Network: 5G/4G/3G Bands, Carrier Compatibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Advanced Features</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Gaming Performance & FPS Benchmarks</li>
                <li>✓ Camera Quality Scores (DXOMARK Style)</li>
                <li>✓ Display Testing (Color, Brightness, Touch)</li>
                <li>✓ Audio Quality Ratings</li>
                <li>✓ Build Quality & Materials Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Smart Tools</h4>
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
