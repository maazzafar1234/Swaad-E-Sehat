import React, { useState } from 'react';
import { FiHelpCircle,FiAlertCircle , FiChevronDown, FiPackage, FiTruck, FiShield, FiMail } from 'react-icons/fi';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const faqs = [
    {
      id: 'products-1',
      category: 'Products & Ingredients',
      question: 'What are the main ingredients in your products?',
      answer: 'All Swaad-E-Sehat products are made with premium, natural ingredients including desi ghee, desi khaand (unrefined sugar), dry fruits, whole grains, and spices. We do not use artificial preservatives, colors, or flavors. Every product is homemade in small batches to ensure freshness and quality.'
    },
    {
      id: 'products-2',
      category: 'Products & Ingredients',
      question: 'Do your products contain allergens?',
      answer: 'Yes, many of our products contain common allergens such as nuts (almonds, cashews, walnuts, peanuts), milk, and sesame. Please review the ingredient list for each product carefully before purchase. If you have severe allergies, contact us at brothersfoodie1@gmail.com to confirm allergen information.'
    },
    {
      id: 'products-3',
      category: 'Products & Ingredients',
      question: 'Are your products suitable for diabetics?',
      answer: 'Most of our standard products are made with desi khaand which is unrefined sugar and not specifically formulated for diabetics. However, we may have sugar-free or low-sugar variants. Please check product descriptions or contact us directly to inquire about diabetic-friendly options.'
    },
    {
      id: 'products-4',
      category: 'Products & Ingredients',
      question: 'Are your products vegan?',
      answer: 'Most of our products are not vegan as they contain ghee (clarified butter derived from milk) and sometimes milk products. However, some dry fruit and grain-based items may be vegan. Check individual product descriptions for dietary information, or reach out to us for confirmation.'
    },
    {
      id: 'products-5',
      category: 'Products & Ingredients',
      question: 'How long do products stay fresh after delivery?',
      answer: 'Freshness depends on storage conditions and product type. Typically, products remain fresh for 15-30 days if stored in an airtight container in a cool, dry place away from direct sunlight. Always check the expiry date on the package and consume before that date. Proper storage extends freshness significantly.'
    },

    {
      id: 'ordering-1',
      category: 'Ordering & Payments',
      question: 'Do I need to create an account to place an order?',
      answer: 'Yes, you must create and log into a user account on Swaad-E-Sehat to proceed from the cart to checkout. This helps us process your order securely and maintain your order history and saved addresses for faster future purchases.'
    },
    {
      id: 'ordering-2',
      category: 'Ordering & Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept two payment methods: (1) Cash on Delivery (COD) - Pay when your order arrives, and (2) Online Payment - We use DevCraftor\'s secure payment gateway for credit cards, debit cards, and digital wallets. Your payment information is encrypted and secure.'
    },
    {
      id: 'ordering-3',
      category: 'Ordering & Payments',
      question: 'How does the online payment process work?',
      answer: 'When you select online payment, you\'ll be redirected to our DevCraftor payment page in a new tab. Complete your payment there. Our system automatically verifies the payment, and you\'ll be redirected to an Order Confirmation page. You\'ll also receive a confirmation email with your order details.'
    },
    {
      id: 'ordering-4',
      category: 'Ordering & Payments',
      question: 'What if my payment fails?',
      answer: 'If your payment fails, you will not be charged and your order will not be placed. Try again with the same or a different payment method. If you continue to experience issues, please contact us at brothersfoodie1@gmail.com with your order details.'
    },
    {
      id: 'ordering-5',
      category: 'Ordering & Payments',
      question: 'Can I change or cancel my order after placing it?',
      answer: 'Orders can typically be modified or cancelled within 1-2 hours of placement before processing begins. Contact us immediately at brothersfoodie1@gmail.com with your order ID if you need to make changes. After processing starts, cancellation may not be possible, but you may be eligible for a refund under our Return & Refund Policy.'
    },
    {
      id: 'ordering-6',
      category: 'Ordering & Payments',
      question: 'Will I receive an order confirmation?',
      answer: 'Yes! You will receive an order confirmation email immediately after your payment is verified (or for COD orders after placement). The email includes your order ID, items ordered, delivery address, and estimated delivery date. Keep this for reference.'
    },

    {
      id: 'shipping-1',
      category: 'Shipping & Delivery',
      question: 'How long does delivery take?',
      answer: 'Delivery times vary by location: Metro cities (2-3 business days), Tier 2 cities (4-6 business days), Remote areas (7-10 business days). Business days exclude Sundays and public holidays. Actual delivery may vary based on courier processing and weather conditions.'
    },
    {
      id: 'shipping-2',
      category: 'Shipping & Delivery',
      question: 'What areas do you deliver to?',
      answer: 'We ship across India including most cities, towns, and rural areas. To check if we deliver to your location, enter your pincode at checkout. We do not currently ship internationally or to certain remote/high-altitude regions unserviceable by our courier partners.'
    },
    {
      id: 'shipping-3',
      category: 'Shipping & Delivery',
      question: 'How much does shipping cost?',
      answer: 'Shipping costs are calculated based on location and order weight. Standard rates: ₹40-100 for metro and tier-2 cities (Free on orders above ₹500). Remote areas have variable costs calculated at checkout. You\'ll see the exact shipping charge before completing payment.'
    },
    {
      id: 'shipping-4',
      category: 'Shipping & Delivery',
      question: 'Can I track my order?',
      answer: 'Yes! You\'ll receive a tracking ID via email and SMS once your order ships. Track your package in real-time using this ID or through your Swaad-E-Sehat dashboard. You\'ll receive status updates at each delivery stage (picked up, in transit, out for delivery, delivered).'
    },
    {
      id: 'shipping-5',
      category: 'Shipping & Delivery',
      question: 'What if my delivery is delayed?',
      answer: 'Check your tracking ID for the latest status. If delay exceeds 3 days beyond the estimated delivery date, contact the courier partner via the tracking link or reach out to us. We will investigate and assist you. Delays may occur due to weather, courier operations, or unforeseen circumstances beyond our control.'
    },
    {
      id: 'shipping-6',
      category: 'Shipping & Delivery',
      question: 'My order arrived at an incorrect address. What should I do?',
      answer: 'Please verify your delivery address in your order confirmation email. If there\'s an error, contact us immediately with your order ID and correct address. For future orders, carefully review the address during checkout. We are not responsible for delays caused by incorrect address information provided by you.'
    },

    {
      id: 'return-1',
      category: 'Returns & Refunds',
      question: 'Can I return or exchange a product I don\'t like?',
      answer: 'No, we operate on an "All Sales Final" policy due to the perishable and homemade nature of our products. We cannot accept returns for taste preferences, personal dislike, or change of mind. However, we offer replacements or refunds for damaged items, wrong items, or expired products within 72 hours.'
    },
    {
      id: 'return-2',
      category: 'Returns & Refunds',
      question: 'What conditions qualify for a replacement or refund?',
      answer: 'You\'re eligible for a full replacement or refund if you receive: (1) Damaged/broken packaging or product leaking or crushed in transit, (2) Wrong item (completely different product), or (3) Expired product (expired on delivery, not after storage). You must report within 72 hours with photographic evidence.'
    },
    {
      id: 'return-3',
      category: 'Returns & Refunds',
      question: 'How do I file a claim for damage or issues?',
      answer: 'Contact us within 72 hours of delivery at brothersfoodie1@gmail.com. Include your Order ID, clear photographs showing the damage/issue/expiry date, and a brief description. Claims without photographic evidence cannot be processed. Our quality team reviews within 1-2 business days. If approved, we send a replacement or process a refund within 5-7 business days.'
    },
    {
      id: 'return-4',
      category: 'Returns & Refunds',
      question: 'What if the product spoiled after I received it?',
      answer: 'We are not responsible for products that spoil due to improper storage after delivery. Always store products in an airtight container in a cool, dry place away from direct sunlight. Follow the storage instructions included in your package. Proper storage significantly extends freshness. Spoilage due to poor storage after delivery is not covered under our policy.'
    },
    {
      id: 'return-5',
      category: 'Returns & Refunds',
      question: 'How long does a refund take after approval?',
      answer: 'Once your claim is approved, we process the refund to your original payment method within 5-7 business days. For online payments, refunds appear in your account after 5-7 business days. For COD orders, refunds are processed via bank transfer or your preferred method. Please allow 2-3 additional business days for your bank to reflect the amount.'
    },

    {
      id: 'account-1',
      category: 'Account & Dashboard',
      question: 'How do I access my dashboard?',
      answer: 'Log into your Swaad-E-Sehat account using your email and password. Your dashboard displays your profile information, order history, past paid orders, and saved shipping addresses. You can also track current orders and manage account settings from the dashboard.'
    },
    {
      id: 'account-2',
      category: 'Account & Dashboard',
      question: 'Can I save multiple shipping addresses?',
      answer: 'Yes! You can add and save multiple shipping addresses in your dashboard. During checkout, select from your saved addresses for faster ordering. This feature is available only for logged-in users and helps streamline your shopping experience.'
    },
    {
      id: 'account-3',
      category: 'Account & Dashboard',
      question: 'How do I reset my password?',
      answer: 'On the login page, click "Forgot Password?" Enter your registered email address. You\'ll receive a password reset link via email. Click the link, set a new password, and log in. If you don\'t receive the email, check your spam folder or contact us at brothersfoodie1@gmail.com.'
    },
    {
      id: 'account-4',
      category: 'Account & Dashboard',
      question: 'Can I view my order history?',
      answer: 'Yes, all paid orders appear in your dashboard under "Order History." You can view order details, order dates, items purchased, delivery status, and estimated or confirmed delivery dates. This helps you track all your purchases with Swaad-E-Sehat.'
    },

    {
      id: 'general-1',
      category: 'General Questions',
      question: 'Why are your products more expensive than store-bought sweets?',
      answer: 'Our products are premium, homemade items made with natural ingredients (desi ghee, desi khaand) and no artificial preservatives. We prioritize quality over quantity. Each product is made fresh in small batches to ensure maximum freshness and taste. The higher cost reflects superior ingredients, traditional recipes, and our commitment to quality and health.'
    },
    {
      id: 'general-2',
      category: 'General Questions',
      question: 'Do you offer bulk orders or corporate gifting?',
      answer: 'Yes! We accept bulk orders and corporate gifting requests. For large quantities or custom orders, please contact us at brothersfoodie1@gmail.com with your requirements. We\'ll provide a quote and assist with customization, bulk discounts, and special packaging options.'
    },
    {
      id: 'general-3',
      category: 'General Questions',
      question: 'Can I place orders for future delivery?',
      answer: 'Currently, orders are processed for immediate shipment based on availability. We do not offer pre-orders or scheduled future deliveries at this time. However, you can place multiple orders at different times to receive shipments when needed. Contact us to discuss custom timing options for bulk orders.'
    },
    {
      id: 'general-4',
      category: 'General Questions',
      question: 'Do you have a physical store or showroom?',
      answer: 'Currently, Swaad-E-Sehat operates as an online e-commerce platform. We do not have a physical showroom. You can browse and purchase all products through our website. For special requests or inquiries, reach out to us at brothersfoodie1@gmail.com.'
    },
    {
      id: 'general-5',
      category: 'General Questions',
      question: 'How can I contact customer support?',
      answer: 'You can reach us via email at brothersfoodie1@gmail.com for any queries, issues, or feedback. Our team typically responds within 24 hours during business days. You can also fill out the contact form on our Contact Page for faster assistance.'
    },
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 via-white to-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <FiHelpCircle className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about our products, ordering process, shipping, and policies. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left Column - FAQ Sections */}
          <div className="lg:col-span-2 space-y-8">
            {categories.map((category) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{category}</h2>
                </div>
                <div className="p-8">
                  <div className="space-y-3">
                    {faqs
                      .filter(faq => faq.category === category)
                      .map((faq) => (
                        <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <button
                            onClick={() => toggleExpand(faq.id)}
                            className="w-full flex items-start justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                          >
                            <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                            <FiChevronDown
                              className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform duration-300 ${
                                expandedId === faq.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedId === faq.id && (
                            <div className="p-5 bg-white border-t border-slate-200">
                              <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="w-full text-left p-3 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <FiMail className="w-5 h-5" />
                  Contact Support
                </button>
                <button 
                  onClick={() => handleNavigation('/return-and-refund')}
                  className="w-full text-left p-3 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <FiShield className="w-5 h-5" />
                  Return & Refund Policy
                </button>
                <button 
                  onClick={() => handleNavigation('/shipping')}
                  className="w-full text-left p-3 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <FiTruck className="w-5 h-5" />
                  Shipping Policy
                </button>
                <button 
                  onClick={() => handleNavigation('/terms-and-conditions')}
                  className="w-full text-left p-3 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <FiPackage className="w-5 h-5" />
                  Terms & Conditions
                </button>
              </div>
            </div>

            {/* Categories Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">FAQ Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`#${category}`}
                    className="block p-3 bg-slate-50 hover:bg-purple-50 rounded-lg font-semibold text-slate-700 hover:text-purple-700 transition-all"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Still Need Help Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Still Need Help?</h3>
              <p className="mb-4 text-amber-50 text-sm">
                Couldn't find the answer you were looking for? Our support team is here to help!
              </p>
              <button 
                onClick={() => handleNavigation('/contact')}
                className="w-full bg-white text-amber-600 font-bold py-3 rounded-lg hover:bg-amber-50 transition-colors"
              >
                Contact Us Now
              </button>
              <div className="mt-4 pt-4 border-t border-amber-400">
                <p className="text-xs text-amber-50 mb-2">Email us:</p>
                <a 
                  href="mailto:brothersfoodie1@gmail.com"
                  className="text-white font-semibold hover:text-amber-100 break-all text-sm"
                >
                  brothersfoodie1@gmail.com
                </a>
              </div>
            </div>

            {/* Important Note Card */}
            <div className="bg-slate-900 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <FiAlertCircle className="w-6 h-6" />
                Note
              </h3>
              <p className="text-slate-300 text-sm">
                For urgent issues or claims, please reach out directly via email. Our team responds within 24 hours during business days.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Swaad-E-Sehat?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Browse our collection of homemade sweets and dry fruits made with love and fresh ingredients.
            </p>
            <button 
              onClick={() => handleNavigation('/products')}
              className="inline-block bg-purple-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-purple-600 transition-colors shadow-lg"
            >
              Shop Products
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;