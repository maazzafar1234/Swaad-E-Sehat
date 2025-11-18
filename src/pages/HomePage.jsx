import React, { useState, useEffect } from 'react'; // <-- IMPORT useState & useEffect
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiHeart, 
  FiLoader
} from 'react-icons/fi';
import { FaWhatsapp, FaQuoteLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products'; 

const HomePage = () => {
  const { addToCart } = useCart();
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await getFeaturedProducts();
      setFeaturedProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []); 
  const handleAddToCart = (product, quantity = 1) => {
    const productPrice = product.base_price; 
    const originalPrice = product.base_original_price || productPrice;

    const productToAdd = {
      ...product,
      id: product.id,
      price: productPrice,
      originalPrice: originalPrice,
      variant: product.default_variant_id || 'default', 
      variantName: product.default_variant_name || 'Default',
      image: product.images?.[0] || '/images/placeholder.jpg' 
    };
    
    addToCart(productToAdd, quantity);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '8849978818';
    const message = 'Hi! I\'m interested in your natural sweets and dry fruits. Can you help me with more information?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-slate-50 relative overflow-hidden mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Text */}
            <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 font-serif leading-tight">
                Premium Natural Sweets & 
                <span className="text-amber-500"> Dry Fruits</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg text-balance">
                Experience the authentic taste of traditional homemade sweets and premium dry fruits. 
                Made with 100% natural ingredients and age-old recipes.
              </p>
              <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                <Link 
                  to="/products" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label="Shop natural sweets and dry fruits"
                >
                  Shop Now <FiArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/about" 
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-slate-700 bg-white rounded-lg shadow-md hover:bg-slate-100 transition-all duration-300 border border-slate-200"
                  aria-label="Learn more about our natural sweets and dry fruits"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
            
            {/* Hero Image with Mirror Effect */}
            <div className="flex justify-center">
              <div className="relative group">
                <img 
                  src="https://ik.imagekit.io/swaadesehat/swadesehat-frontent-image/2J1A5029.JPG" 
                  alt="Premium Natural Sweets & Dry Fruits"
                  fetchpriority="high"
                  className="rounded-xl shadow-2xl max-w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent"
                  style={{ transform: 'scaleY(-1)', transformOrigin: 'bottom', WebkitBoxReflect: 'below -1px linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.5))' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold font-serif text-slate-900">Featured Products</h2>
            <p className="text-lg text-slate-600 mt-4">
              Our best-selling natural sweets and dry fruit products
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FiLoader className="w-12 h-12 text-amber-500 animate-spin" />
              <h3 className="text-xl font-semibold text-slate-800 mt-4">Loading Featured Products...</h3>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-800">No featured products available right now.</h3>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-amber-600 border-2 border-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300"
            >
              View All Products <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (Unchanged) */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FiHeart className="w-7 h-7" />}
              title="100% Natural"
              description="Made with pure, organic ingredients without any artificial preservatives."
            />
            <FeatureCard
              icon={<FiShield className="w-7 h-7" />}
              title="Premium Quality"
              description="Handpicked ingredients ensuring the highest quality standards."
            />
            <FeatureCard
              icon={<FiTruck className="w-7 h-7" />}
              title="Free Shipping"
              description="Free delivery on orders above ₹500 across India."
            />
            <FeatureCard
              icon={<FiStar className="w-7 h-7" />}
              title="Traditional Recipes"
              description="Authentic recipes passed down through generations."
            />
          </div>
        </div>
      </section>

      {/* New Launch Section (Unchanged) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative group">
                <img 
                  src="https://ik.imagekit.io/swaadesehat/swadesehat-frontent-image/MUSCLELADDU.jpg" 
                  alt="Dry Fruit Khajur Pak"
                  loading="lazy"
                  className="rounded-xl shadow-2xl max-w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-white/70 to-transparent"
                  style={{ transform: 'scaleY(-1)', transformOrigin: 'bottom', WebkitBoxReflect: 'below -1px linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.5))' }}
                ></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 order-2 lg:order-1">
              <span className="inline-block bg-pink-100 text-pink-700 font-semibold px-4 py-1 rounded-full self-start">
                New Launch
              </span>
              <h2 className="text-4xl font-bold font-serif text-slate-900">Dry Fruit Khajur Pak</h2>
              <p className="text-lg text-slate-600 text-balance">
                Our latest creation combines the sweetness of dates with the richness of premium dry fruits. 
                Made using traditional methods and pure ghee.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FiStar className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-700">Made with premium dates</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiStar className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-700">No artificial sweeteners</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiStar className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-700">Rich in natural nutrients</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link 
                  to="/product/dry-fruit-laddu" // Changed slug to be more accurate
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label="Try Dry Fruit Khajur Pak now"
                >
                  Try Now <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold font-serif text-slate-900">What Our Customers Say</h2>
            <p className="text-lg text-slate-600 mt-4">
              Real feedback from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The quality of dry fruits is exceptional. Fresh, natural, and exactly as described. Highly recommended!"
              author="Priya Sharma"
              location="Delhi"
              initials="PS"
            />
            <TestimonialCard
              quote="The khajur pak is absolutely delicious! It reminds me of my grandmother's recipe. Will definitely order again."
              author="Rajesh Kumar"
              location="Mumbai"
              initials="RK"
            />
            <TestimonialCard
              quote="Fast delivery and excellent packaging. The products arrived fresh and the taste is authentic. Great service!"
              author="Anita Singh"
              location="Bangalore"
              initials="AS"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-amber-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold font-serif text-white">
              Ready to Experience Natural Goodness?
            </h2>
            <p className="text-lg text-amber-100 mt-4 mb-8 text-balance">
              Order now and get 10% off on your first purchase. Free shipping on orders above ₹500.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-amber-700 bg-white rounded-lg shadow-md hover:bg-slate-100 transition-all duration-300 transform hover:-translate-y-0.5"
                aria-label="Browse all natural sweets and dry fruits"
              >
                Shop Now <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-amber-700 transition-all duration-300"
                aria-label="Learn about our story and values"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <button 
        onClick={handleWhatsAppContact}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-3 px-5 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 transform"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
        <span className="hidden md:block font-semibold">Chat with us</span>
      </button>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-amber-500 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, location, initials }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col h-full">
    <div className="relative mb-6 flex-grow">
      <FaQuoteLeft className="absolute -top-4 -left-4 w-12 h-12 text-amber-100" />
      <p className="text-lg text-slate-700 italic z-10 relative">"{quote}"</p>
    </div>
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
        {initials}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">{author}</h4>
        <span className="text-sm text-slate-500">{location}</span>
      </div>
    </div>
  </div>
);

export default HomePage;