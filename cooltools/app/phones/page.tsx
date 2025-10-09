'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { getAllBrands, getLatestPhones, PhoneListItem, PhoneBrand } from '@/lib/phoneApi';

export default function PhonesPage() {
  const [phones, setPhones] = useState<PhoneListItem[]>([]);
  const [brands, setBrands] = useState<PhoneBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [phonesData, brandsData] = await Promise.all([
        getLatestPhones(),
        getAllBrands()
      ]);
      setPhones(phonesData);
      setBrands(brandsData);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredPhones = phones.filter(phone =>
    phone.phone_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading phones...</p>
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
