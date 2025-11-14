import React from 'react';
import { FiCheck, FiAlertCircle, FiShield, FiMail, FiLock, FiGlobe } from 'react-icons/fi';

const TermsAndConditions = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-slate-100 p-4 rounded-full">
              <FiCheck className="w-10 h-10 text-slate-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before using Swaad-E-Sehat. By accessing our website and making purchases, you agree to be bound by these conditions.
          </p>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-slate-600 text-sm">Last Updated: November 2024</p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left Column - Policy Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Business Overview */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                <div className="flex items-center gap-3">
                  <FiShield className="w-8 h-8 text-slate-300" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">1. About Swaad-E-Sehat</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    <span className="font-bold">Swaad-E-Sehat</span> is a premium e-commerce brand specializing in <span className="font-semibold">homemade, natural sweets and dry fruit products</span> made with traditional recipes and pure ingredients.
                  </p>
                  <p>
                    Our tagline is <span className="italic font-semibold">"Homemade with Love,"</span> and our mission is to provide high-quality, natural, and preservative-free products that combine taste (Swaad) with health (Sehat).
                  </p>
                  <div className="bg-slate-50 border-l-4 border-slate-600 p-5 rounded-r-lg mt-4">
                    <p className="text-slate-800 font-medium">
                      Our products include: Aata Dry Fruit Pinni, Channa Dry Fruit Pinni, Dry Fruit Laddu, Muscle Laddu, Chocolate Muscle Laddu, Chocolate Energy Bar, and Energy Bar—all made with desi ghee and desi khaand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. User Accounts & Authentication */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <div className="flex items-center gap-3">
                  <FiLock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">2. User Accounts & Authentication</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Account Registration</h3>
                    <p className="text-slate-700 mb-3">
                      To make purchases on our platform, you are <span className="font-semibold">required to create and log into a user account</span>. You must provide accurate and complete information during registration.
                    </p>
                    <p className="text-slate-700">
                      You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-blue-900 font-medium flex items-start gap-2">
                      <FiAlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      Checkout requires active authentication. Non-logged-in users cannot proceed from the cart to checkout.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Your Dashboard</h3>
                    <p className="text-slate-700">
                      Logged-in users have access to a <span className="font-semibold">personal dashboard</span> where you can view your profile, past paid orders, and manage saved shipping addresses for faster checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Product Information & Perishability */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">3. Product Information & Perishability</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Product Accuracy</h3>
                    <p className="text-slate-700">
                      We strive to provide accurate descriptions, images, and nutritional information for all products. However, slight variations in color, texture, and appearance may occur due to the homemade, natural nature of our items.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Perishable Nature</h3>
                    <p className="text-slate-700 mb-3">
                      All Swaad-E-Sehat products are <span className="font-semibold">perishable homemade goods</span>. They are made fresh with minimal or no preservatives. Please:
                    </p>
                    <ul className="space-y-2 text-slate-700 ml-4">
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Check expiry dates upon delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Store products in cool, dry conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Keep in airtight containers away from direct sunlight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Consume within recommended timeframe</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Ordering & Payment */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
                <div className="flex items-center gap-3">
                  <FiCheck className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">4. Ordering & Payment</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Payment Methods</h3>
                    <p className="text-slate-700 mb-4">
                      We offer two payment options:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <h4 className="font-bold text-slate-900 mb-2">Cash on Delivery (COD)</h4>
                        <p className="text-slate-700 text-sm">Your order is placed immediately with an order status of "cod_pending" and will be confirmed upon delivery payment.</p>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <h4 className="font-bold text-slate-900 mb-2">Online Payment</h4>
                        <p className="text-slate-700 text-sm">We use DevCraftor's secure payment gateway. You will be redirected to a payment page. Your order is confirmed once payment is verified by our backend system.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Payment Verification</h3>
                    <p className="text-slate-700 mb-3">
                      For online payments, our system will automatically verify your transaction. You may see a "Waiting for Payment..." modal while we confirm payment status.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="text-blue-900 text-sm">
                        Once payment is confirmed, you will receive a confirmation email and be redirected to your Order Confirmation page with order details.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">All Sales Are Final</h3>
                    <p className="text-slate-700">
                      Due to the perishable and homemade nature of our products, <span className="font-bold">all sales are final</span>. See our Return & Refund Policy for limited exceptions (damaged items, wrong items, or expired products within 72 hours).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Shipping & Delivery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                <div className="flex items-center gap-3">
                  <FiGlobe className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">5. Shipping & Delivery</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Shipping addresses must be complete and accurate. We are not responsible for delays or non-delivery due to incorrect or incomplete address information provided by you.
                  </p>
                  <p>
                    During transit, packages may be exposed to temperature changes. While we use appropriate packaging, we cannot guarantee product condition if mishandled by shipping carriers. Please inspect your package immediately upon delivery.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-4">
                    <p className="text-purple-900 font-medium">
                      If your package arrives damaged, you have <span className="font-bold">72 hours</span> to report it with photographic evidence. See our Return & Refund Policy for the complete claim process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. User Responsibilities */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">6. User Responsibilities</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700">
                  <p>By using our website, you agree to:</p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-lg">•</span>
                      <span>Provide accurate and truthful information in your account and orders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-lg">•</span>
                      <span>Not misuse our website or services for unlawful purposes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-lg">•</span>
                      <span>Respect intellectual property rights and not reproduce content without permission</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-lg">•</span>
                      <span>Store and care for products appropriately after delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-lg">•</span>
                      <span>Not attempt to hack, reverse engineer, or compromise our platform</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Limitation of Liability */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">7. Limitation of Liability</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Swaad-E-Sehat provides products and services on an "as-is" basis. We are not liable for:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Allergic reactions or health issues related to ingredient consumption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Product spoilage due to improper storage after delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Indirect or consequential damages from website use or product purchase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Shipping delays caused by third-party couriers</span>
                    </li>
                  </ul>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4">
                    <p className="text-orange-900 text-sm font-medium">
                      Our liability is limited to the purchase price of the product in question.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Privacy & Data */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6">
                <div className="flex items-center gap-3">
                  <FiLock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">8. Privacy & Data Protection</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Your personal information (name, email, address, payment details) is collected solely for order processing and customer service. Please refer to our Privacy Policy for complete details on how we collect, use, and protect your data.
                  </p>
                  <p>
                    We use secure encryption for payment processing and do not store sensitive payment information on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* 9. Modification of Terms */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">9. Modification of Terms</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 leading-relaxed">
                  Swaad-E-Sehat reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our website constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>

            {/* 10. Contact Us */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6">
                <div className="flex items-center gap-3">
                  <FiMail className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">10. Contact & Support</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6">
                  If you have questions about these Terms & Conditions, please contact us:
                </p>
                <div className="space-y-3">
                  <a 
                    href="mailto:brothersfoodie1@gmail.com"
                    className="inline-block bg-cyan-100 text-cyan-800 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-200 transition-colors"
                  >
                    brothersfoodie1@gmail.com
                  </a>
                  <p className="text-slate-600">or visit our Contact Page</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Related Policies</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleNavigation('/return-and-refund')}
                  className="w-full text-left p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-white font-semibold transition-all"
                >
                  Return & Refund Policy
                </button>
                <button 
                  onClick={() => handleNavigation('/privacy')}
                  className="w-full text-left p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-white font-semibold transition-all"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="w-full text-left p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-white font-semibold transition-all"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Key Points Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Key Points</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Login required for checkout</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Perishable homemade products</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>All sales are final</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>72-hour exception window for claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Secure online & COD payment options</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Personal dashboard for logged-in users</span>
                </li>
              </ul>
            </div>

            {/* Important Notice Card */}
            <div className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <FiAlertCircle className="w-6 h-6" />
                Important
              </h3>
              <p className="text-red-800 text-sm">
                These terms apply to all purchases. By ordering from Swaad-E-Sehat, you accept all conditions outlined here. In case of disputes, our Return & Refund Policy takes precedence for product-related issues.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Agree to Our Terms?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Continue shopping with confidence knowing our commitment to quality, transparency, and customer satisfaction.
            </p>
            <button 
              onClick={() => handleNavigation('/products')}
              className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg"
            >
              Continue to Products
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;