import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiAlertCircle, FiClock, FiCheck, FiX, FiShield, FiMail, FiCamera } from 'react-icons/fi';

const ReturnAndRefund = () => {
  return (
    <div className="w-full bg-gradient-to-b from-amber-50 via-white to-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Header with decorative elements */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-amber-100 p-4 rounded-full">
              <FiShield className="w-10 h-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
            Return & Refund Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We're committed to your satisfaction with every homemade product. Learn about our quality guarantee and return process.
          </p>
        </div>

        {/* Trust Badge */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Quality Guaranteed</h2>
            <p className="text-amber-50 text-lg max-w-2xl mx-auto">
              Every product is made fresh with love and care. We stand behind the quality of our homemade sweets and dry fruits.
            </p>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left Column - Policy Overview */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* All Sales Final Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-amber-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Our Policy: All Sales Are Final</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-lg">
                    Due to the <span className="font-semibold text-amber-600">perishable and homemade nature</span> of our products, we operate on an <span className="font-bold">all sales are final</span> policy once payment is completed.
                  </p>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                    <p className="text-slate-800 font-medium">
                      <FiShield className="inline mr-2 text-amber-600" />
                      We're committed to delivering excellence. While we cannot accept returns for taste preferences, we will issue replacements or refunds for quality issues outlined below.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* When We Offer Replacement/Refund */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
                <div className="flex items-center gap-3">
                  <FiPackage className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">When We Offer Replacements or Refunds</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg">
                  We will issue a <span className="font-semibold">full replacement or refund</span> if you receive an item that is:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <FiCheck className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Damaged in Transit</h3>
                      <p className="text-slate-600">The product's packaging is clearly broken, leaking, crushed, or compromised during shipping.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <FiCheck className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Wrong Item Received</h3>
                      <p className="text-slate-600">You received a completely different product than what you ordered from us.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <FiCheck className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Expired Product</h3>
                      <p className="text-slate-600">The product has passed its expiration date upon delivery (not after storage).</p>
                    </div>
                  </div>
                </div>

                {/* What's NOT Covered */}
                <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                    <FiX className="w-6 h-6 text-red-600" />
                    What is NOT Covered
                  </h3>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex items-start gap-3">
                      <FiX className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p>Products that have been opened, used, or partially consumed</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <FiX className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p>Personal dislike of the product's taste, texture, or sweetness level</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <FiX className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p>Items that spoiled due to improper storage after delivery</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <FiX className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p>Change of mind or ordering the wrong product by mistake</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Make a Claim */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <div className="flex items-center gap-3">
                  <FiClock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">How to File a Claim</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <p className="font-bold text-blue-900 text-xl mb-2">
                    ⏰ 72-Hour Window Required
                  </p>
                  <p className="text-blue-800">
                    You must contact us within <span className="font-bold">72 hours (3 days)</span> of your order being delivered to be eligible for a replacement or refund.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        1
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center gap-2">
                        <FiMail className="text-blue-600" />
                        Contact Us Immediately
                      </h3>
                      <p className="text-slate-700 mb-3">
                        Visit our <Link to="/contact" className="text-amber-600 hover:text-amber-700 font-semibold underline">Contact Page</Link> or email us directly at:
                      </p>
                      <a 
                        href="mailto:brothersfoodie1@gmail.com" 
                        className="inline-block bg-amber-100 text-amber-800 px-5 py-3 rounded-lg font-semibold hover:bg-amber-200 transition-colors"
                      >
                        brothersfoodie1@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        2
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center gap-2">
                        <FiCamera className="text-blue-600" />
                        Provide Required Proof
                      </h3>
                      <p className="text-slate-700 mb-3">
                        You must include the following in your claim:
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>Your <span className="font-semibold">Order ID</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><span className="font-semibold">Clear photographs</span> showing the damage, wrong item, or expiry date</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>Brief description of the issue</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-900 text-sm font-medium">
                          ⚠️ Claims without photographic evidence cannot be processed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        3
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center gap-2">
                        <FiCheck className="text-blue-600" />
                        Our Review Process
                      </h3>
                      <p className="text-slate-700 mb-3">
                        Our quality team will review your claim within <span className="font-semibold">1-2 business days</span>.
                      </p>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <p className="text-emerald-900 font-medium">
                          ✓ If approved, we will either ship a replacement or process a full refund to your original payment method within 5-7 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Quick Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="mb-6 text-amber-50">
                Have questions about a recent order? We're here to help.
              </p>
              <Link 
                to="/contact"
                className="block w-full bg-white text-amber-600 text-center font-bold py-4 rounded-xl hover:bg-amber-50 transition-colors shadow-md"
              >
                Contact Us Now
              </Link>
              <div className="mt-6 pt-6 border-t border-amber-400">
                <p className="text-sm text-amber-50 mb-2">Email us directly:</p>
                <a 
                  href="mailto:brothersfoodie1@gmail.com"
                  className="text-white font-semibold hover:text-amber-100 break-all text-sm"
                >
                  brothersfoodie1@gmail.com
                </a>
              </div>
            </div>

            {/* Key Points Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Key Points</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>72-hour claim window</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Photo evidence required</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>1-2 day review period</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Full refund or replacement</span>
                </li>
              </ul>
            </div>

            {/* Storage Tips Card */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">💡 Storage Tips</h3>
              <p className="text-slate-300 text-sm mb-4">
                Proper storage extends freshness:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Store in an airtight container</li>
                <li>• Keep in a cool, dry place</li>
                <li>• Avoid direct sunlight</li>
                <li>• Check expiry dates</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Have Questions About Our Policy?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              We recommend reading this policy carefully before placing your order. If anything is unclear, please reach out to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg"
              >
                Contact Support
              </Link>
              <Link 
                to="/products"
                className="inline-block bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-800 px-8 py-4 rounded-full border border-emerald-200">
            <FiShield className="w-6 h-6" />
            <span className="font-semibold text-lg">Quality Guaranteed • Made Fresh Daily • Customer First</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReturnAndRefund;