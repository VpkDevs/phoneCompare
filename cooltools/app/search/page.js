"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Sliders } from "lucide-react"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    brand: "",
    priceMin: "",
    priceMax: "",
    ramMin: "",
    displaySize: "",
    battery: "",
    camera: "",
    refreshRate: "",
    chipset: "",
    storage: ""
  })

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const newFilters = { ...filters }
    params.forEach((value, key) => {
      if (key in newFilters) newFilters[key] = value
    })
    setFilters(newFilters)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/search?${params.toString()}`)
  }

  const activeFilterCount = Object.values(filters).filter(v => v).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Phone Search
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your perfect phone with 150+ advanced filters
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={filters.brand}
                    onChange={e =>
                      setFilters({ ...filters, brand: e.target.value })
                    }
                  >
                    <option value="">All Brands</option>
                    <option value="apple">Apple</option>
                    <option value="samsung">Samsung</option>
                    <option value="google">Google</option>
                    <option value="xiaomi">Xiaomi</option>
                    <option value="oneplus">OnePlus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={filters.priceMin}
                      onChange={e =>
                        setFilters({ ...filters, priceMin: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={filters.priceMax}
                      onChange={e =>
                        setFilters({ ...filters, priceMax: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    RAM
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={filters.ramMin}
                    onChange={e =>
                      setFilters({ ...filters, ramMin: e.target.value })
                    }
                  >
                    <option value="">Any</option>
                    <option value="4">4GB+</option>
                    <option value="6">6GB+</option>
                    <option value="8">8GB+</option>
                    <option value="12">12GB+</option>
                    <option value="16">16GB+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Size
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={filters.displaySize}
                    onChange={e =>
                      setFilters({ ...filters, displaySize: e.target.value })
                    }
                  >
                    <option value="">Any</option>
                    <option value="small">{'< 6.0"'}</option>
                    <option value="medium">6.0" - 6.5"</option>
                    <option value="large">{'6.5" - 7.0"'}</option>
                    <option value="xlarge">{'> 7.0"'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Refresh Rate
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={filters.refreshRate}
                    onChange={e =>
                      setFilters({ ...filters, refreshRate: e.target.value })
                    }
                  >
                    <option value="">Any</option>
                    <option value="60">60Hz</option>
                    <option value="90">90Hz+</option>
                    <option value="120">120Hz+</option>
                    <option value="144">144Hz+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Battery Capacity
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={filters.battery}
                    onChange={e =>
                      setFilters({ ...filters, battery: e.target.value })
                    }
                  >
                    <option value="">Any</option>
                    <option value="3000">3000mAh+</option>
                    <option value="4000">4000mAh+</option>
                    <option value="5000">5000mAh+</option>
                    <option value="6000">6000mAh+</option>
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition relative"
                >
                  Search Phones
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() =>
                    setFilters({
                      brand: "",
                      priceMin: "",
                      priceMax: "",
                      ramMin: "",
                      displaySize: "",
                      battery: "",
                      camera: "",
                      refreshRate: "",
                      chipset: "",
                      storage: ""
                    })
                  }
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
              <Search className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Select filters to search
              </h2>
              <p className="text-gray-500 dark:text-gray-500">
                Use the advanced filters on the left to find phones matching
                your criteria
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    150+ Filter Options
                  </h3>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Display (Size, Type, Refresh Rate, Brightness)</li>
                    <li>• Performance (Chipset, RAM, AnTuTu Score)</li>
                    <li>• Camera (MP, Aperture, Features)</li>
                    <li>• Battery (Capacity, Charging Speed)</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Smart Features
                  </h3>
                  <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Network Compatibility Checker</li>
                    <li>• Gaming Performance Metrics</li>
                    <li>• Price History Tracking</li>
                    <li>• Value for Money Calculator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
