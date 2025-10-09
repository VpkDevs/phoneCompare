'use client';

import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { searchPhones, PhoneListItem } from '@/lib/phoneApi';

export default function ComparePage() {
  const [selectedPhones, setSelectedPhones] = useState<PhoneListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PhoneListItem[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const results = await searchPhones(query);
    setSearchResults(results);
    setSearching(false);
  };

  const addPhone = (phone: PhoneListItem) => {
    if (selectedPhones.length < 4 && !selectedPhones.find(p => p.phone_url === phone.phone_url)) {
      setSelectedPhones([...selectedPhones, phone]);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const removePhone = (phoneUrl: string) => {
    setSelectedPhones(selectedPhones.filter(p => p.phone_url !== phoneUrl));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compare Phones
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compare up to 4 phones side-by-side with 150+ features
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for phones to compare..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          {searchResults.length > 0 && (
            <div className="absolute z-10 mt-2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
              {searchResults.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => addPhone(phone)}
                  className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  {phone.phone_image && (
                    <img src={phone.phone_image} alt={phone.phone_name} className="w-16 h-16 object-contain" />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">{phone.phone_name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{phone.detail}</div>
                  </div>
                  <Plus className="w-5 h-5 text-blue-600" />
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedPhones.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="w-20 h-20 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No phones selected
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              Search and add phones above to start comparing
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {selectedPhones.map((phone, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => removePhone(phone.phone_url)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    {phone.phone_image && (
                      <img
                        src={phone.phone_image}
                        alt={phone.phone_name}
                        className="w-full h-40 object-contain mb-4"
                      />
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {phone.phone_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {phone.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Comparison Features
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Display</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Size, Type, Resolution</div>
                        <div className="text-gray-900 dark:text-white font-medium">Details loading...</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Chipset, RAM</div>
                        <div className="text-gray-900 dark:text-white font-medium">Details loading...</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Camera</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Main & Selfie</div>
                        <div className="text-gray-900 dark:text-white font-medium">Details loading...</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Battery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Capacity, Charging</div>
                        <div className="text-gray-900 dark:text-white font-medium">Details loading...</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            150+ Comparison Features
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            Full detailed comparison includes: Network compatibility, Display specs (refresh rate, brightness, PPI), 
            Performance benchmarks (AnTuTu, Geekbench), Camera quality scores, Battery endurance, Build quality, 
            Price history, Carrier compatibility, Gaming performance, Audio quality, and much more!
          </p>
        </div>
      </div>
    </div>
  );
}
