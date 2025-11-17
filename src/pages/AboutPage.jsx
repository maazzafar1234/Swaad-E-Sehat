import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShield, FiAward, FiUsers, FiClock, FiStar } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="w-full bg-white pt-20"> {/* Offset for fixed header */}
      
      {/* --- Section 1: Our Story (Hero) --- */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900">
            About Swaad-E-Sehat
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="story-text">
            <h2 className="text-3xl font-bold font-serif text-amber-600 mb-6">Our Story</h2>
            <p className="text-lg text-slate-600 leading-relaxed text-balance">
              Swaad-E-Sehat was born out of a passion for pure, homemade sweets that remind you of your mother's kitchen. What started as a simple home experiment soon turned into a heartfelt journey to bring wholesome, preservative-free sweets to everyone who values both flavor and fitness.
            </p>
          </div>
          <div className="story-image">
            
            <img 
              src="https://ik.imagekit.io/swaadesehat/swadesehat-frontent-image/CHANA%20(2).JPG" 
              alt="Our homemade sweets" 
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- Section 2: Our Values --- */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600 text-balance">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<FiHeart />}
              title="Homemade with Love"
              description="Fresh preparation upon order, no factory production, no preservatives, and the warmth of home."
            />
            <ValueCard
              icon={<FiShield />}
              title="Pure Ingredients"
              description="Premium dry fruits, super seeds, desi khaand, and desi ghee to ensure products are nutritious, rich, and authentic."
            />
            <ValueCard
              icon={<FiAward />}
              title="Healthy Indulgence"
              description="Natural energy boosters, full of proteins, healthy fats, and essential nutrients, rather than just treats."
            />
            <ValueCard
              icon={<FiUsers />}
              title="Tradition Meets Modern"
              description="Recipes blend the wisdom of our grandmothers' recipes with today's health-conscious choices."
            />
          </div>
        </div>
      </section>

      {/* --- Section 3: Our Process --- */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4">Our Process</h2>
            <p className="text-lg text-slate-600 text-balance">
              How we create our premium products, from our kitchen to yours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
            <ProcessStep
              number="1"
              title="Careful Selection"
              description="We handpick the finest dry fruits and ingredients from trusted suppliers, ensuring only the best quality reaches our kitchen."
            />
            <ProcessStep
              number="2"
              title="Traditional Preparation"
              description="Our skilled artisans prepare each product using traditional methods and age-old recipes, maintaining authenticity and taste."
            />
            <ProcessStep
              number="3"
              title="Quality Control"
              description="Every batch undergoes rigorous quality checks to ensure consistency, freshness, and adherence to our high standards."
            />
            <ProcessStep
              number="4"
              title="Fresh Delivery"
              description="We package our products carefully and deliver them fresh to your doorstep, maintaining the quality and taste you expect."
            />
          </div>
        </div>
      </section>

      {/* --- Section 4: Why Choose Us --- */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="choose-image order-last lg:order-first">
              
              <img 
                src="https://ik.imagekit.io/swaadesehat/swadesehat-frontent-image/CHANNA%20DRY%20FRUIT%20PINI.JPG" 
                alt="Our premium dry fruit pinni" 
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="choose-text">
              <h2 className="text-4xl font-bold font-serif text-slate-900 mb-8">
                Why Choose Swaad-E-Sehat?
              </h2>
              <div className="space-y-8">
                <ReasonItem
                  icon={<FiStar />}
                  title="Authentic Taste"
                  description="Experience the true flavors of traditional Indian sweets and dry fruits."
                />
                <ReasonItem
                  icon={<FiClock />}
                  title="Fresh Daily"
                  description="All our products are made fresh daily to ensure maximum freshness and taste."
                />
                <ReasonItem
                  icon={<FiShield />}
                  title="Health Benefits"
                  description="Our natural products provide essential nutrients and health benefits."
                />
                <ReasonItem
                  icon={<FiAward />}
                  title="Trusted Brand"
                  description="Join thousands of satisfied customers who trust us for quality products."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: Our Promise --- */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-serif text-slate-900 mb-8">Our Promise to You</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-balance">
              <p>
                At Swaad-E-Sehat, every product is made with honesty, purity, and care — the same way we prepare food for our family.
              </p>
              <p>
                From ingredient selection to final packaging, we ensure freshness, hygiene, and love in every step.
              </p>
              <p>
                Whether you're gifting someone, satisfying a craving, or simply choosing a healthier lifestyle — Swaad-E-Sehat is here to make every moment a little sweeter, naturally. 💛
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 6: CTA --- */}
      <section className="py-24 bg-amber-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold font-serif text-white">
              Experience the Difference
            </h2>
            <p className="text-lg text-amber-100 mt-4 mb-8 text-balance">
              Join thousands of satisfied customers who have made Swaad-E-Sehat their trusted choice for natural sweets and dry fruits.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-amber-700 bg-white rounded-lg shadow-md hover:bg-slate-100 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Shop All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// --- Helper Components ---

const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-amber-500 mb-5">
      {React.cloneElement(icon, { className: 'w-8 h-8' })}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const ProcessStep = ({ number, title, description }) => (
  <div className="flex items-start gap-6">
    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-amber-500 text-white font-bold text-2xl shadow-md">
      {number}
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-balance">{description}</p>
    </div>
  </div>
);

const ReasonItem = ({ icon, title, description }) => (
  <div className="flex items-start gap-5">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
      {React.cloneElement(icon, { className: 'w-6 h-6' })}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default AboutPage;