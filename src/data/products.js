import ClientApiInstance from '../api/axiosIntercepter'; 


const API_URL = '/dynamic/api/products'; 


export const getProductBySlug = async (slug) => {
  try {
    const response = await ClientApiInstance.get(`${API_URL}/slug/${slug}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (err) {
    console.error("Error fetching product by slug:", err);
    return null;
  }
};


export const getProductById = (id) => {
  throw new Error("getProductById is deprecated. Please use getProductBySlug instead.");
};


export const getFeaturedProducts = async () => {
  try {
    const response = await ClientApiInstance.get(API_URL, { params: { featured: true } });
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching featured products:", err);
    return [];
  }
};


export const searchAndSortProducts = async ({ searchTerm, sortBy }) => {
  try {
    const response = await ClientApiInstance.get(API_URL, {
      params: {
        search: searchTerm,
        sort: sortBy
      }
    });
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (err) {
    console.error("Error searching/sorting products:", err);
    return [];
  }
};

export const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'sweets', name: 'Sweets' },
  { id: 'snacks', name: 'Snacks' },
];