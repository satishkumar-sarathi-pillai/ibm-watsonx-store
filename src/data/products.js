export const products = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    tagline: 'Titanium. So strong. So light. So Pro.',
    category: 'flagship',
    badge: 'Best Seller',
    badgeColor: '#0062ff',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&q=80',
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: {
      display: '6.1" Super Retina XDR OLED, 120Hz ProMotion',
      chip: 'A17 Pro chip',
      camera: '48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto',
      battery: 'Up to 23 hours video playback',
      os: 'iOS 17'
    },
    plans: [
      { id: 'p1', name: 'WatsonX Essential', data: '10GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 45, upfrontCost: 29, contractMonths: 24 },
      { id: 'p2', name: 'WatsonX Smart', data: '50GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 55, upfrontCost: 0, contractMonths: 24 },
      { id: 'p3', name: 'WatsonX Unlimited', data: 'Unlimited', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 65, upfrontCost: 0, contractMonths: 24 }
    ],
    rating: 4.8,
    reviews: 1284
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    tagline: 'Galaxy AI is here. Experience the future.',
    category: 'flagship',
    badge: 'AI Powered',
    badgeColor: '#8a3ffc',
    image: 'https://images.unsplash.com/photo-1577925879125-0ed7d8d7e4dd?w=400&h=400&fit=crop&q=80',
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    storage: ['256GB', '512GB', '1TB'],
    specs: {
      display: '6.8" Dynamic AMOLED 2X, 120Hz',
      chip: 'Snapdragon 8 Gen 3',
      camera: '200MP Main + 12MP Ultra Wide + 50MP 5x + 10MP 3x',
      battery: '5000mAh, 45W fast charging',
      os: 'Android 14, One UI 6.1'
    },
    plans: [
      { id: 'p1', name: 'WatsonX Essential', data: '10GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 48, upfrontCost: 49, contractMonths: 24 },
      { id: 'p2', name: 'WatsonX Smart', data: '50GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 58, upfrontCost: 0, contractMonths: 24 },
      { id: 'p3', name: 'WatsonX Unlimited', data: 'Unlimited', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 68, upfrontCost: 0, contractMonths: 24 }
    ],
    rating: 4.7,
    reviews: 968
  },
  {
    id: 'google-pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    tagline: 'The most helpful phone, powered by Google AI.',
    category: 'flagship',
    badge: 'Google AI',
    badgeColor: '#24a148',
    image: 'https://images.unsplash.com/photo-1696446701796-da61daa34f73?w=400&h=400&fit=crop&q=80',
    colors: ['Obsidian', 'Porcelain', 'Bay', 'Mint'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: {
      display: '6.7" LTPO OLED, 1-120Hz',
      chip: 'Google Tensor G3',
      camera: '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto',
      battery: '5050mAh, 30W wired + 23W wireless',
      os: 'Android 14'
    },
    plans: [
      { id: 'p1', name: 'WatsonX Essential', data: '10GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 42, upfrontCost: 0, contractMonths: 24 },
      { id: 'p2', name: 'WatsonX Smart', data: '50GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 52, upfrontCost: 0, contractMonths: 24 },
      { id: 'p3', name: 'WatsonX Unlimited', data: 'Unlimited', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 60, upfrontCost: 0, contractMonths: 24 }
    ],
    rating: 4.6,
    reviews: 756
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    tagline: 'A total powerhouse. Now with Dynamic Island.',
    category: 'mid-range',
    badge: 'Popular',
    badgeColor: '#ff832b',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&q=80',
    colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
    storage: ['128GB', '256GB', '512GB'],
    specs: {
      display: '6.1" Super Retina XDR OLED',
      chip: 'A16 Bionic chip',
      camera: '48MP Main + 12MP Ultra Wide',
      battery: 'Up to 20 hours video playback',
      os: 'iOS 17'
    },
    plans: [
      { id: 'p1', name: 'WatsonX Essential', data: '10GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 35, upfrontCost: 0, contractMonths: 24 },
      { id: 'p2', name: 'WatsonX Smart', data: '50GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 45, upfrontCost: 0, contractMonths: 24 },
      { id: 'p3', name: 'WatsonX Unlimited', data: 'Unlimited', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 55, upfrontCost: 0, contractMonths: 24 }
    ],
    rating: 4.7,
    reviews: 2103
  },
  {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    tagline: 'Galaxy AI features, all-day battery life.',
    category: 'mid-range',
    badge: 'New',
    badgeColor: '#0062ff',
    image: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400&h=400&fit=crop&q=80',
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    storage: ['128GB', '256GB'],
    specs: {
      display: '6.2" Dynamic AMOLED 2X, 120Hz',
      chip: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 12MP Ultra Wide + 10MP 3x',
      battery: '4000mAh, 25W charging',
      os: 'Android 14, One UI 6.1'
    },
    plans: [
      { id: 'p1', name: 'WatsonX Essential', data: '10GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 32, upfrontCost: 0, contractMonths: 24 },
      { id: 'p2', name: 'WatsonX Smart', data: '50GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 42, upfrontCost: 0, contractMonths: 24 },
      { id: 'p3', name: 'WatsonX Unlimited', data: 'Unlimited', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 52, upfrontCost: 0, contractMonths: 24 }
    ],
    rating: 4.5,
    reviews: 642
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    tagline: 'The fastest charging flagship. Ever.',
    category: 'flagship',
    badge: 'Fast Charge',
    badgeColor: '#da1e28',
    image: 'https://images.unsplash.com/photo-1574920162043-b872873f19bc?w=400&h=400&fit=crop&q=80',
    colors: ['Silky Black', 'Flowy Emerald'],
    storage: ['256GB', '512GB'],
    specs: {
      display: '6.82" LTPO AMOLED, 1-120Hz',
      chip: 'Snapdragon 8 Gen 3',
      camera: '50MP Hasselblad Main + 48MP Ultra Wide + 64MP 3x',
      battery: '5400mAh, 100W SUPERVOOC',
      os: 'Android 14, OxygenOS 14'
    },
    plans: [
      { id: 'p1', name: 'WatsonX Essential', data: '10GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 38, upfrontCost: 0, contractMonths: 24 },
      { id: 'p2', name: 'WatsonX Smart', data: '50GB', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 48, upfrontCost: 0, contractMonths: 24 },
      { id: 'p3', name: 'WatsonX Unlimited', data: 'Unlimited', calls: 'Unlimited', texts: 'Unlimited', monthlyPrice: 56, upfrontCost: 0, contractMonths: 24 }
    ],
    rating: 4.6,
    reviews: 489
  }
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const categories = [
  { id: 'all', label: 'All Phones' },
  { id: 'flagship', label: 'Flagship' },
  { id: 'mid-range', label: 'Mid-Range' }
];
export const brands = ['All', 'Apple', 'Samsung', 'Google', 'OnePlus'];
