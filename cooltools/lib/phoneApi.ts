import axios from 'axios';

// Phone Specs API configuration
const API_BASE_URL = 'https://api-mobilespecs.azharimm.dev';

export interface PhoneSpec {
  phone_name: string;
  brand: string;
  phone_images?: string[];
  release_date?: string;
  dimension?: string;
  os?: string;
  storage?: string;
  display?: {
    size?: string;
    resolution?: string;
    type?: string;
  };
  platform?: {
    chipset?: string;
    cpu?: string;
    gpu?: string;
  };
  memory?: {
    internal?: string;
    ram?: string;
  };
  main_camera?: string[];
  selfie_camera?: string[];
  battery?: {
    type?: string;
    charging?: string;
  };
  misc?: {
    colors?: string;
    price?: string;
  };
  network?: {
    technology?: string;
    '2g_bands'?: string;
    '3g_bands'?: string;
    '4g_bands'?: string;
    '5g_bands'?: string;
  };
  body?: {
    dimensions?: string;
    weight?: string;
    build?: string;
    sim?: string;
  };
  comms?: {
    wlan?: string;
    bluetooth?: string;
    positioning?: string;
    nfc?: string;
    radio?: string;
    usb?: string;
  };
  features?: {
    sensors?: string;
  };
}

export interface PhoneBrand {
  brand_id: number;
  brand_name: string;
  device_count: number;
}

export interface PhoneListItem {
  phone_name: string;
  phone_url: string;
  phone_image: string;
  detail: string;
}

// Get all brands
export async function getAllBrands(): Promise<PhoneBrand[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/brands`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

// Get phones by brand
export async function getPhonesByBrand(brandSlug: string, page = 1): Promise<{ phones: PhoneListItem[]; pages: number }> {
  try {
    const response = await axios.get(`${API_BASE_URL}/brands/${brandSlug}`, {
      params: { page }
    });
    return {
      phones: response.data.data?.phones || [],
      pages: response.data.data?.current_page || 1
    };
  } catch (error) {
    console.error('Error fetching phones by brand:', error);
    return { phones: [], pages: 1 };
  }
}

// Get latest phones
export async function getLatestPhones(): Promise<PhoneListItem[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/latest`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching latest phones:', error);
    return [];
  }
}

// Search phones
export async function searchPhones(query: string): Promise<PhoneListItem[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error searching phones:', error);
    return [];
  }
}

// Get phone details
export async function getPhoneDetails(slug: string): Promise<PhoneSpec | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/${slug}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching phone details:', error);
    return null;
  }
}

// Get top phones by interest
export async function getTopPhones(): Promise<PhoneListItem[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/top-by-interest`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching top phones:', error);
    return [];
  }
}
