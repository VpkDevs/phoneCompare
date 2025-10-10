
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Share2, Heart, ExternalLink, Smartphone, Cpu, Camera, Battery, Ruler, Wifi, Shield } from 'lucide-react';
import { getPhoneDetails, PhoneSpec } from '@/lib/phoneApi';

export default function PhoneDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [phone, setPhone] = useState<PhoneSpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'network'>('specs');

  useEffect(() => {
    async function loadPhone() {
      setLoading(true);
      setError(null);
      try {
        const data = await getPhoneDetails(slug);
        if (!data) {
          setError('Phone not found');
        } else {
          setPhone(data);
        }
      } catch (err) {
        setError('Failed to load phone details');
        console.error('Error loading phone:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPhone();
  }, [slug]);

  const handleAddToCompare = () => {
    router.push(`/compare?add=${slug}`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = 'Link copied to clipboard!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">Loading phone details...</p>
        </div>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            {error || 'Phone not found'}
          </h2>
          <Link
            href="/phones"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Phones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/phones"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all phones
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
              {phone.phone_images && phone.phone_images.length > 0 ? (
                <img
                  src={phone.phone_images[0]}
                  alt={phone.phone_name}
                  className="w-full h-80 object-contain mb-6"
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone className="w-20 h-20 text-gray-400" />
                </div>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {phone.phone_name}
              </h1>
              
              {phone.brand && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {phone.brand}
                </p>
              )}

              {phone.misc?.price && (
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                  {phone.misc.price}
                </div>
              )}

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAddToCompare}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                  <Plus className="w-5 h-5" />
                  Compare
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-semibold transition"
                  aria-label="Share phone"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-semibold transition"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {phone.release_date && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Released: {phone.release_date}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'specs'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'features'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab('network')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'network'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Network
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'specs' && (
                  <div className="space-y-6">
                    {phone.display && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Display</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.display.size && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Size</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.display.size}</div>
                            </div>
                          )}
                          {phone.display.resolution && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Resolution</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.display.resolution}</div>
                            </div>
                          )}
                          {phone.display.type && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.display.type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {phone.platform && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Cpu className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Performance</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.platform.chipset && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Chipset</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.platform.chipset}</div>
                            </div>
                          )}
                          {phone.platform.cpu && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">CPU</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.platform.cpu}</div>
                            </div>
                          )}
                          {phone.platform.gpu && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">GPU</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.platform.gpu}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {phone.memory && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Ruler className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Memory</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.memory.ram && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">RAM</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.memory.ram}</div>
                            </div>
                          )}
                          {phone.memory.internal && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Storage</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.memory.internal}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {(phone.main_camera || phone.selfie_camera) && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Camera className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Camera</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.main_camera && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Main Camera</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {phone.main_camera.join(', ')}
                              </div>
                            </div>
                          )}
                          {phone.selfie_camera && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Selfie Camera</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {phone.selfie_camera.join(', ')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {phone.battery && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Battery className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Battery</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.battery.type && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Capacity</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.battery.type}</div>
                            </div>
                          )}
                          {phone.battery.charging && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Charging</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.battery.charging}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6">
                    {phone.body && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Build & Design</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.body.dimensions && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Dimensions</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.body.dimensions}</div>
                            </div>
                          )}
                          {phone.body.weight && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Weight</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.body.weight}</div>
                            </div>
                          )}
                          {phone.body.build && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Build</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.body.build}</div>
                            </div>
                          )}
                          {phone.body.sim && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">SIM</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.body.sim}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {phone.comms && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Wifi className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Connectivity</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phone.comms.wlan && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">WLAN</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.comms.wlan}</div>
                            </div>
                          )}
                          {phone.comms.bluetooth && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Bluetooth</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.comms.bluetooth}</div>
                            </div>
                          )}
                          {phone.comms.nfc && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">NFC</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.comms.nfc}</div>
                            </div>
                          )}
                          {phone.comms.usb && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400">USB</div>
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.comms.usb}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {phone.features?.sensors && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sensors</h3>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="text-lg text-gray-900 dark:text-white">{phone.features.sensors}</div>
                        </div>
                      </div>
                    )}

                    {phone.os && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Operating System</h3>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.os}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'network' && phone.network && (
                  <div className="space-y-4">
                    {phone.network.technology && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Technology</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.network.technology}</div>
                      </div>
                    )}
                    {phone.network['2g_bands'] && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">2G Bands</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.network['2g_bands']}</div>
                      </div>
                    )}
                    {phone.network['3g_bands'] && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">3G Bands</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.network['3g_bands']}</div>
                      </div>
                    )}
                    {phone.network['4g_bands'] && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">4G Bands</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.network['4g_bands']}</div>
                      </div>
                    )}
                    {phone.network['5g_bands'] && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">5G Bands</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{phone.network['5g_bands']}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {phone.misc?.colors && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Available Colors</h3>
                <p className="text-gray-700 dark:text-gray-300">{phone.misc.colors}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
