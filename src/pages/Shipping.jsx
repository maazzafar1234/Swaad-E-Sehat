import React from 'react';
import { FiTruck, FiMapPin, FiClock, FiCheck, FiAlertCircle, FiDollarSign, FiPackage, FiMail } from 'react-icons/fi';

const Shipping = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 via-white to-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FiTruck className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
            Shipping Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Fast, safe, and reliable delivery of fresh homemade products to your doorstep. Learn about our shipping process, timelines, and policies.
          </p>
        </div>

        {/* Trust Badge */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Fresh Delivery Guaranteed</h2>
            <p className="text-blue-50 text-lg max-w-2xl mx-auto">
              We prioritize speed and quality to ensure your Swaad-E-Sehat products arrive fresh and in perfect condition.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left Column - Shipping Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Coverage */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">1. Shipping Coverage & Areas</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Service Areas</h3>
                    <p className="text-slate-700 mb-4">
                      Swaad-E-Sehat ships across <span className="font-semibold">India</span>. We deliver to most cities, towns, and rural areas through our trusted courier partners.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-blue-900 font-medium flex items-start gap-2">
                        <FiCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        To ensure delivery to your location, enter your pincode during checkout to verify serviceability.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Exclusions</h3>
                    <p className="text-slate-700 mb-3">
                      We currently do <span className="font-semibold">NOT ship to</span>:
                    </p>
                    <ul className="space-y-2 text-slate-700 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>International locations (outside India)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>Certain remote or high-altitude regions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>Areas flagged as unserviceable by courier partners</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Timeline */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
                <div className="flex items-center gap-3">
                  <FiClock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">2. Delivery Timeline</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <p className="text-slate-700 text-lg font-semibold mb-6">
                    Delivery times depend on your location:
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-4 items-start p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Metro Cities</h3>
                        <p className="text-slate-700">Delhi, Mumbai, Bangalore, Hyderabad, Pune, Ahmedabad, Chennai</p>
                        <p className="text-emerald-700 font-bold mt-2">2-3 Business Days</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Tier 2 Cities</h3>
                        <p className="text-slate-700">Most state capitals and major towns</p>
                        <p className="text-emerald-700 font-bold mt-2">4-6 Business Days</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">3</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Remote Areas</h3>
                        <p className="text-slate-700">Small towns, villages, and rural locations</p>
                        <p className="text-emerald-700 font-bold mt-2">7-10 Business Days</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-6">
                    <p className="text-blue-900 font-medium">
                      <FiAlertCircle className="inline mr-2 text-blue-600" />
                      <span className="font-bold">Business days exclude Sundays and public holidays.</span> Actual delivery times may vary based on courier processing and weather conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Process */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                <div className="flex items-center gap-3">
                  <FiPackage className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">3. Our Shipping Process</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        1
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-2">Order Confirmation</h3>
                      <p className="text-slate-700">
                        Once your order is confirmed (COD or online payment verified), we begin preparing your products immediately.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        2
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-2">Fresh Preparation</h3>
                      <p className="text-slate-700">
                        Products are freshly made in small batches to ensure maximum freshness. Quality checks are performed before packing.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        3
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-2">Secure Packing</h3>
                      <p className="text-slate-700">
                        Items are carefully packed in food-grade containers and insulated packaging with handling instructions to maintain freshness during transit.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-2">Courier Handover</h3>
                      <p className="text-slate-700">
                        Package is handed to our courier partner with tracking details. You receive a tracking ID via email/SMS.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        5
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-2">Real-Time Tracking</h3>
                      <p className="text-slate-700">
                        Track your shipment in real-time using the tracking ID. You'll receive delivery status updates at each stage.
                      </p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        6
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-xl mb-2">Safe Delivery</h3>
                      <p className="text-slate-700">
                        Package is delivered to your address. Please inspect immediately and report any damage within 72 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Costs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6">
                <div className="flex items-center gap-3">
                  <FiDollarSign className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">4. Shipping Costs</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <p className="text-slate-700 text-lg">
                    Shipping charges are calculated based on your location and order weight:
                  </p>

                  <div className="space-y-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">Metro & Tier 2 Cities</h4>
                      <p className="text-slate-700">Flat ₹40-100 per order or FREE on orders above ₹500</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">Remote Areas</h4>
                      <p className="text-slate-700">Calculated based on distance and weight. See checkout for exact cost.</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <p className="text-green-900 font-medium flex items-start gap-2">
                      <FiCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>Shipping costs are displayed at checkout before you complete payment.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking & Updates */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <div className="flex items-center gap-3">
                  <FiClock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">5. Order Tracking & Updates</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    Once your order ships, you will receive:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold">Tracking ID</span> via email and SMS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold">Delivery updates</span> at each stage (picked up, in transit, out for delivery)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold">Estimated delivery date</span> based on your location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold">Delivery confirmation</span> once package arrives</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    You can also track your order through your Swaad-E-Sehat dashboard using your order ID.
                  </p>
                </div>
              </div>
            </div>

            {/* Handling & Packaging */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6">
                <div className="flex items-center gap-3">
                  <FiPackage className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">6. Packaging & Handling</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Packaging Standards</h3>
                    <p className="text-slate-700 mb-3">
                      We use premium, food-safe packaging to ensure your homemade products remain fresh:
                    </p>
                    <ul className="space-y-2 text-slate-700 ml-4">
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Food-grade plastic containers with secure sealing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Bubble wrap and cushioning to prevent movement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Insulated outer packaging with ice packs (if needed)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Storage and handling instructions included</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                    <p className="text-teal-900 font-medium">
                      Despite our best efforts, products may shift during transit. Please inspect your package carefully upon delivery and report any damage within 72 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Issues */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">7. Delivery Issues & Troubleshooting</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Delayed Delivery</h3>
                    <p className="text-slate-700 mb-3">
                      If your package is delayed beyond the estimated delivery date:
                    </p>
                    <ul className="space-y-2 text-slate-700 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Check your tracking ID for the latest status</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Contact the courier partner directly via tracking link</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Reach out to us if delay exceeds 3 days beyond estimate</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Damaged Package</h3>
                    <p className="text-slate-700 mb-3">
                      If your package arrives damaged:
                    </p>
                    <ul className="space-y-2 text-slate-700 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Do NOT accept the delivery (if possible)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Take clear photographs of the damaged package</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Contact us within 72 hours with photos and order ID</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>We will arrange a replacement or refund immediately</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-3">Package Not Received</h3>
                    <p className="text-slate-700 mb-3">
                      If you don't receive your package:
                    </p>
                    <ul className="space-y-2 text-slate-700 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Check tracking status—delivery may be pending</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Wait until the estimated delivery date passes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>After 5 days, file a claim with supporting evidence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Contact us at brothersfoodie1@gmail.com with order ID</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6">
                <div className="flex items-center gap-3">
                  <FiMail className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">8. Support & Contact</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6">
                  Have questions about shipping or need assistance? We're here to help!
                </p>
                <div className="space-y-3">
                  <a 
                    href="mailto:brothersfoodie1@gmail.com"
                    className="inline-block bg-cyan-100 text-cyan-800 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-200 transition-colors"
                  >
                    brothersfoodie1@gmail.com
                  </a>
                  <p className="text-slate-600">or contact us through our Contact Page</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Info Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Shipping Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-white bg-opacity-15 p-3 rounded-lg">
                  <p className="font-semibold mb-1">Service Area</p>
                  <p className="text-blue-100">Across India</p>
                </div>
                <div className="bg-white bg-opacity-15 p-3 rounded-lg">
                  <p className="font-semibold mb-1">Delivery Time</p>
                  <p className="text-blue-100">2-10 business days</p>
                </div>
                <div className="bg-white bg-opacity-15 p-3 rounded-lg">
                  <p className="font-semibold mb-1">Shipping Cost</p>
                  <p className="text-blue-100">₹40-100 or FREE on orders above ₹500</p>
                </div>
                <div className="bg-white bg-opacity-15 p-3 rounded-lg">
                  <p className="font-semibold mb-1">Real-Time Tracking</p>
                  <p className="text-blue-100">Track via email/SMS and dashboard</p>
                </div>
              </div>
            </div>

            {/* Related Policies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Related Policies</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleNavigation('/return-refund')}
                  className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-800 transition-all"
                >
                  Return & Refund Policy
                </button>
                <button 
                  onClick={() => handleNavigation('/terms-conditions')}
                  className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-800 transition-all"
                >
                  Terms & Conditions
                </button>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-slate-800 transition-all"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-slate-50 rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Key Points</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Nationwide shipping (India-wide)</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>2-10 business day delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time tracking available</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Food-safe packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>72-hour damage claim window</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Free shipping on orders above ₹500</span>
                </li>
              </ul>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 rounded-2xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                <FiAlertCircle className="w-6 h-6" />
                Important
              </h3>
              <p className="text-amber-800 text-sm">
                Shipping timelines are estimates and do not constitute guaranteed delivery dates. Delays may occur due to weather, courier operations, or factors beyond our control. We are not liable for delays caused by third-party courier partners.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Order Fresh Products?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Get your homemade sweets and dry fruits delivered fresh to your doorstep with reliable shipping and real-time tracking.
            </p>
            <button 
              onClick={() => handleNavigation('/products')}
              className="inline-block bg-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-800 px-8 py-4 rounded-full border border-blue-200">
            <FiTruck className="w-6 h-6" />
            <span className="font-semibold text-lg">Fast Delivery • Fresh Products • Secure Packaging</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shipping;