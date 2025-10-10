'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { getAllBrands, getLatestPhones, PhoneListItem, PhoneBrand } from '@/lib/phoneApi';

export default function PhonesPage() {
  const [phones, setPhones] = useState<PhoneListItem[]>([]);
  const [brands, setBrands] = useState<PhoneBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [phonesData, brandsData] = await Promise.all([
          getLatestPhones(),
          getAllBrands()
        ]);
        setPhones(phonesData);
        setBrands(brandsData);
      } catch (err) {
        setError('Failed to load phones. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const filteredPhones = searchQuery.trim() 
    ? phones.filter(phone =>
        phone.phone_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : phones;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse All Phones
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore phones from {brands.length}+ brands
          </p>
        </div>

        <div className="mb-8 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search phones"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {searchQuery && !isSearching && (
          <div className="mb-4 text-gray-600 dark:text-gray-400">
            Found {filteredPhones.length} {filteredPhones.length === 1 ? 'phone' : 'phones'}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Retry
            </button>
          </div>
        ) : filteredPhones.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {searchQuery ? `No phones found matching "${searchQuery}"` : 'No phones available'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhones.map((phone, index) => (
              <Link
                key={index}
                href={`/phones/${phone.phone_url.split('/').pop()}`}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
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
        )}

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.slice(0, 24).map((brand) => (
              <Link
                key={brand.brand_id}
                href={`/brands/${brand.brand_name.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition text-center"
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {brand.brand_name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {brand.device_count} devices
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
