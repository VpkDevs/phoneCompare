'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { searchPhones, getPhoneDetails, PhoneListItem, PhoneSpec } from '@/lib/phoneApi';

export default function ComparePage() {
  const [selectedPhones, setSelectedPhones] = useState<PhoneListItem[]>([]);
  const [phoneDetails, setPhoneDetails] = useState<Record<string, PhoneSpec>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PhoneListItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    async function loadPhoneDetails() {
      const slugsToLoad = selectedPhones
        .map(phone => phone.phone_url.split('/').pop())
        .filter((slug): slug is string => !!slug && !phoneDetails[slug]);
      
      if (slugsToLoad.length === 0) return;
      
      setLoadingDetails(true);
      try {
        const results = await Promise.allSettled(
          slugsToLoad.map(slug => getPhoneDetails(slug))
        );
        
        const newDetails: Record<string, PhoneSpec> = {};
        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value) {
            newDetails[slugsToLoad[index]] = result.value;
          }
        });
        
        if (Object.keys(newDetails).length > 0) {
          setPhoneDetails(prev => ({ ...prev, ...newDetails }));
        }
      } catch (error) {
        console.error('Failed to load phone details:', error);
      } finally {
        setLoadingDetails(false);
      }
    }
    loadPhoneDetails();
  }, [selectedPhones, phoneDetails]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      setSearching(true);
      const results = await searchPhones(searchQuery);
      setSearchResults(results);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addPhone = (phone: PhoneListItem) => {
    if (selectedPhones.find(p => p.phone_url === phone.phone_url)) {
      return; // Already added
    }
    if (selectedPhones.length >= 4) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
      toast.textContent = 'Maximum 4 phones can be compared';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      return;
    }
    setSelectedPhones([...selectedPhones, phone]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removePhone = (phoneUrl: string) => {
    setSelectedPhones(selectedPhones.filter(p => p.phone_url !== phoneUrl));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhones.length > 0) {
        setSelectedPhones([]);
      }
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhones]);

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
          <div className="flex gap-4 mb-4">
            {selectedPhones.length > 0 && (
              <button
                onClick={() => {
                  const slugs = selectedPhones.map(p => p.phone_url.split('/').pop()).join(',');
                  navigator.clipboard.writeText(`${window.location.origin}/compare?phones=${slugs}`);
                  const toast = document.createElement('div');
                  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                  toast.textContent = 'Comparison link copied!';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2000);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                Share Comparison
              </button>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search for phones to compare..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label="Search phones to compare"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
          </div>
          {searchQuery.length >= 2 && (
            <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
              {searching ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">No phones found</div>
              ) : (
                searchResults.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => addPhone(phone)}
                  className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  aria-label={`Add ${phone.phone_name} to compare`}
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
              )))}
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
                    aria-label={`Remove ${phone.phone_name} from comparison`}
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Comparison Features
                </h3>
                {loadingDetails && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Loading details...</span>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Display</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => {
                      const slug = phone.phone_url.split('/').pop() || '';
                      const details = phoneDetails[slug];
                      return (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Display</div>
                          <div className="text-gray-900 dark:text-white font-medium text-sm">
                            {details?.display?.size || 'N/A'}<br/>
                            {details?.display?.type || 'N/A'}<br/>
                            {details?.display?.resolution || 'N/A'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => {
                      const slug = phone.phone_url.split('/').pop() || '';
                      const details = phoneDetails[slug];
                      return (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
                          <div className="text-gray-900 dark:text-white font-medium text-sm">
                            {details?.platform?.chipset || 'N/A'}<br/>
                            {details?.memory?.ram || 'N/A'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Camera</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => {
                      const slug = phone.phone_url.split('/').pop() || '';
                      const details = phoneDetails[slug];
                      return (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Camera</div>
                          <div className="text-gray-900 dark:text-white font-medium text-sm">
                            Main: {details?.main_camera?.[0] || 'N/A'}<br/>
                            Selfie: {details?.selfie_camera?.[0] || 'N/A'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Battery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedPhones.map((phone, index) => {
                      const slug = phone.phone_url.split('/').pop() || '';
                      const details = phoneDetails[slug];
                      return (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Battery</div>
                          <div className="text-gray-900 dark:text-white font-medium text-sm">
                            {details?.battery?.type || 'N/A'}<br/>
                            {details?.battery?.charging || 'N/A'}
                          </div>
                        </div>
                      );
                    })}
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