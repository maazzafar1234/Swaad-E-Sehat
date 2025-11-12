import React, { useState, useEffect } from 'react';
import { FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { 
  products, 
  sortOptions, 
  sortProducts,
  searchProducts
} from '../data/products';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let result = [...products];

    // Apply search
    if (searchTerm.trim()) {
      result = searchProducts(result, searchTerm);
    }

    // Apply sorting
    result = sortProducts(result, sortBy);

    setFilteredProducts(result);
  }, [sortBy, searchTerm]);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full bg-slate-50 pt-20"> {/* pt-20 offsets the fixed header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our premium collection of natural sweets and dry fruits
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 p-4 bg-white rounded-lg shadow-sm">
          
          {/* Search */}
          <div className="relative w-full md:w-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-80 pl-12 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-500 transition-colors"
                aria-label="Clear search"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sort & View Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-slate-600 hidden sm:block">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-3 pl-3 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg bg-slate-100 p-1">
              <button
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-amber-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-amber-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid / List */}
        <div className="products-section">
          <div className="mb-6 border-b border-slate-200 pb-4">
            <p className="text-sm text-slate-500">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className={`
              transition-all duration-300
              ${viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'flex flex-col gap-6'
              }
            `}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  viewMode={viewMode} // Pass the viewMode prop
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-300 rounded-lg bg-white">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;