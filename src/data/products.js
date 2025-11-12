// Product data for Swaad-E-Sehat - Updated with accurate pricing
export const products = [
  {
    id: 1,
    name: 'Aata Dry Fruit Pinni',
    slug: 'aata-dry-fruit-pinni',
    price: 1,
    salePrice: 1,
    images: [
      '/images/MUSCLELADU.jpg'
    ],
    detailedDescription: 'Our signature Aata Dry Fruit Pinni combines traditional flour with premium dry fruits and pure desi ghee. Each bite is packed with natural energy and traditional taste.',
    category: 'sweets',
    subcategory: 'pinni',
    rating: 4.8,
    reviews: 156,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: 50,
    variants: [
      {
        id: '500g',
        name: '500g Pack',
        price: 1,
        originalPrice: 1,
        stock: 25,
        weight: '500g'
      },
      {
        id: '1kg',
        name: '1kg Pack',
        price: 1,
        originalPrice: 1,
        stock: 15,
        weight: '1kg'
      }
    ],
    ingredients: ['Aata (Flour)', 'Dry Fruits', 'Desi Ghee', 'Sugar', 'Cardamom'],
    benefits: [
      'Natural energy booster',
      'Rich in proteins and healthy fats',
      'Traditional recipe',
      'No preservatives',
      'Made with love'
    ],
    nutritionalInfo: {
      calories: '520 kcal per 100g',
      protein: '15g',
      fat: '35g',
      carbs: '45g',
      fiber: '8g'
    },
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place. Refrigerate for extended freshness.',
    tags: ['healthy', 'traditional', 'energy', 'natural', 'premium']
  },
  {
    id: 2,
    name: 'Channa Dry Fruit Pinni',
    slug: 'channa-dry-fruit-pinni',
    price: 1150,
    salePrice: 850,
    images: [
      '/images/CHANA DRYFRUIT PINNI.JPG'
    ],
    detailedDescription: 'Our Channa Dry Fruit Pinni is packed with protein from roasted chickpeas and premium dry fruits. Ideal for fitness enthusiasts and health-conscious individuals.',
    category: 'sweets',
    subcategory: 'protein',
    rating: 4.9,
    reviews: 203,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    stock: 35,
    variants: [
      {
        id: '500g',
        name: '500g Pack',
        price: 575,
        originalPrice: 1210,
        stock: 20,
        weight: '500g'
      },
      {
        id: '1kg',
        name: '1kg Pack',
        price: 1150,
        originalPrice: 1210,
        stock: 10,
        weight: '1kg'
      }
    ],
    ingredients: ['Roasted Channa', 'Dry Fruits', 'Desi Ghee', 'Jaggery', 'Cardamom'],
    benefits: [
      'High protein content',
      'Muscle building support',
      'Natural energy',
      'No artificial additives',
      'Traditional preparation'
    ],
    nutritionalInfo: {
      calories: '480 kcal per 100g',
      protein: '18g',
      fat: '25g',
      carbs: '55g',
      fiber: '12g'
    },
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place. Refrigerate for extended freshness.',
    tags: ['protein', 'fitness', 'muscle', 'natural', 'healthy']
  },
  {
    id: 3,
    name: 'Dry Fruit Laddu / Muscle Laddu',
    slug: 'dry-fruit-laddu',
    price: 1220,
    salePrice: 1220,
    images: [
      '/images/MUSCLELADDU.jpg'
    ],
    detailedDescription: 'Our Dry Fruit Laddu is a perfect blend of premium dry fruits including almonds, cashews, walnuts, and dates. Made with traditional methods and pure ghee.',
    category: 'sweets',
    subcategory: 'laddu',
    rating: 4.7,
    reviews: 89,
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    stock: 40,
    variants: [
      {
        id: '500g',
        name: '500g Pack',
        price: 610,
        originalPrice: 1300,
        stock: 30,
        weight: '500g'
      },
      {
        id: '1kg',
        name: '1kg Pack',
        price: 1220,
        originalPrice: 1300,
        stock: 20,
        weight: '1kg'
      }
    ],
    ingredients: ['Almonds', 'Cashews', 'Walnuts', 'Dates', 'Desi Ghee'],
    benefits: [
      'Rich in healthy fats',
      'Natural protein source',
      'Muscle building support',
      'Traditional taste',
      'No preservatives'
    ],
    nutritionalInfo: {
      calories: '550 kcal per 100g',
      protein: '12g',
      fat: '40g',
      carbs: '40g',
      fiber: '10g'
    },
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place. Refrigerate for extended freshness.',
    tags: ['muscle', 'protein', 'traditional', 'natural', 'premium']
  },
  {
    id: 4,
    name: 'Chocolate Muscle Laddu',
    slug: 'chocolate-muscle-laddu',
    price: 1260,
    salePrice: 1260,
    images: [
      '/images/CHANA DRYFRUIT PINNI.JPG'
    ],
    detailedDescription: 'Our Chocolate Muscle Laddu combines the goodness of premium dry fruits with rich cocoa flavor. A perfect treat for chocolate lovers who want to stay healthy.',
    category: 'sweets',
    subcategory: 'chocolate',
    rating: 4.6,
    reviews: 134,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    stock: 35,
    variants: [
      {
        id: '500g',
        name: '500g Pack',
        price: 630,
        originalPrice: 1340,
        stock: 20,
        weight: '500g'
      },
      {
        id: '1kg',
        name: '1kg Pack',
        price: 1260,
        originalPrice: 1340,
        stock: 10,
        weight: '1kg'
      }
    ],
    ingredients: ['Dry Fruits', 'Cocoa Powder', 'Desi Ghee', 'Jaggery', 'Cardamom'],
    benefits: [
      'Chocolate flavor',
      'Rich in antioxidants',
      'Natural energy',
      'Muscle building',
      'No artificial flavors'
    ],
    nutritionalInfo: {
      calories: '530 kcal per 100g',
      protein: '14g',
      fat: '38g',
      carbs: '30g',
      fiber: '7g'
    },
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place. Refrigerate for extended freshness.',
    tags: ['chocolate', 'muscle', 'antioxidants', 'natural', 'premium']
  },
  {
    id: 5,
    name: 'Energy Bar',
    slug: 'energy-bar',
    price: 1220,
    salePrice: 1220,
    images: [
      '/images/CHANA (2).JPG'
    ],
    detailedDescription: 'Our Energy Bar is packed with premium dry fruits, seeds, and natural sweeteners. Perfect for pre-workout, post-workout, or anytime energy boost.',
    category: 'snacks',
    subcategory: 'energy-bar',
    rating: 4.8,
    reviews: 67,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    stock: 22,
    variants: [
      {
        id: '500g',
        name: '500g Pack',
        price: 610,
        originalPrice: 1310,
        stock: 22,
        weight: '500g'
      },
      {
        id: '1kg',
        name: '1kg Pack',
        price: 1220,
        originalPrice: 1310,
        stock: 12,
        weight: '1kg'
      }
    ],
    ingredients: ['Dry Fruits', 'Seeds', 'Natural Sweeteners', 'Desi Ghee'],
    benefits: [
      'Natural energy boost',
      'Rich in vitamins and minerals',
      'Perfect for active lifestyle',
      'No artificial preservatives',
      'Sustained energy release'
    ],
    nutritionalInfo: {
      calories: '570 kcal per 100g',
      protein: '21g',
      fat: '49g',
      carbs: '22g',
      fiber: '12g'
    },
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place. Refrigerate for extended freshness.',
    tags: ['energy', 'fitness', 'natural', 'premium', 'healthy']
  },
  {
    id: 6,
    name: 'Chocolate Energy Bar',
    slug: 'chocolate-energy-bar',
    price: 1260,
    salePrice: 1260,
    images: [
      '/images/2J1A5029.JPG'
    ],
    detailedDescription: 'Our Chocolate Energy Bar combines the energy-boosting power of premium dry fruits with rich chocolate flavor. Perfect for those who love chocolate but want to stay healthy.',
    category: 'snacks',
    subcategory: 'chocolate-energy',
    rating: 4.9,
    reviews: 98,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    stock: 15,
    variants: [
      {
        id: '500g',
        name: '500g Pack',
        price: 630,
        originalPrice: 1340,
        stock: 15,
        weight: '500g'
      },
      {
        id: '1kg',
        name: '1kg Pack',
        price: 1260,
        originalPrice: 1340,
        stock: 8,
        weight: '1kg'
      }
    ],
    ingredients: ['Dry Fruits', 'Cocoa Powder', 'Natural Sweeteners', 'Desi Ghee'],
    benefits: [
      'Chocolate flavor',
      'Natural energy boost',
      'Rich in antioxidants',
      'Perfect for active lifestyle',
      'No artificial preservatives'
    ],
    nutritionalInfo: {
      calories: '553 kcal per 100g',
      protein: '18g',
      fat: '44g',
      carbs: '30g',
      fiber: '3g'
    },
    shelfLife: '6 months',
    storageInstructions: 'Store in a cool, dry place. Refrigerate for extended freshness.',
    tags: ['chocolate', 'energy', 'fitness', 'natural', 'premium']
  }
];

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Helper function to get product by slug
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Helper function to filter products
export const filterProducts = (products, filters) => {
  let filtered = [...products];
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  if (filters.subcategory && filters.subcategory !== 'all') {
    filtered = filtered.filter(product => product.subcategory === filters.subcategory);
  }
  
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
  }
  
  if (filters.inStock) {
    filtered = filtered.filter(product => product.stock > 0);
  }
  
  if (filters.isNew) {
    filtered = filtered.filter(product => product.isNew);
  }
  
  if (filters.isBestSeller) {
    filtered = filtered.filter(product => product.isBestSeller);
  }
  
  return filtered;
};

// Helper function to sort products
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'popular':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};

// Categories data
export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'sweets', name: 'Sweets', count: products.filter(p => p.category === 'sweets').length },
  { id: 'snacks', name: 'Snacks', count: products.filter(p => p.category === 'snacks').length },
  { id: 'dry-fruits', name: 'Dry Fruits', count: products.filter(p => p.category === 'dry-fruits').length }
];

// Sort options
export const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' }
];

// Helper function to search products
export const searchProducts = (productsArray, query) => {
  if (!query || query.trim() === '') {
    return productsArray;
  }
  
  const searchTerm = query.toLowerCase().trim();
  return productsArray.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    (product.description && product.description.toLowerCase().includes(searchTerm)) ||
    (product.detailedDescription && product.detailedDescription.toLowerCase().includes(searchTerm)) ||
    (product.category && product.category.toLowerCase().includes(searchTerm)) ||
    (product.subcategory && product.subcategory.toLowerCase().includes(searchTerm)) ||
    (product.ingredients && product.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm)
    ))
  );
};