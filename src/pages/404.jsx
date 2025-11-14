import React from 'react';
import { FiAlertCircle, FiHome, FiPackage } from 'react-icons/fi';

const NotFound = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <FiAlertCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
            404 - Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. But don't worry, we have plenty of fresh homemade products to explore!
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left Column - Error Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Error Details Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-red-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">What Happened?</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    We couldn't find the page you were trying to access. This could happen for a few reasons:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>The page URL may be incorrect or outdated</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>The page may have been removed or relocated</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold">•</span>
                      <span>There might be a typo in the URL</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What to Do Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <div className="flex items-center gap-3">
                  <FiHome className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Where to Go Next?</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700">
                  <p className="mb-6">
                    Here are some helpful navigation options:
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNavigation('/')}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 mb-1">Go to Home Page</h3>
                      <p className="text-slate-600 text-sm">Return to the main page and browse from there</p>
                    </button>
                    <button
                      onClick={() => handleNavigation('/products')}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 mb-1">View Products</h3>
                      <p className="text-slate-600 text-sm">Browse our collection of fresh homemade sweets and dry fruits</p>
                    </button>
                    <button
                      onClick={() => handleNavigation('/faqs')}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 mb-1">View FAQ</h3>
                      <p className="text-slate-600 text-sm">Find answers to common questions</p>
                    </button>
                    <button
                      onClick={() => handleNavigation('/contact')}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 mb-1">Contact Support</h3>
                      <p className="text-slate-600 text-sm">Get help from our support team</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Error Code Card */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Error Code</h3>
              <p className="text-6xl font-bold text-red-100 mb-2">404</p>
              <p className="text-red-50 text-sm">
                Page Not Found
              </p>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation('/')}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-semibold text-slate-800 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('/products')}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-semibold text-slate-800 transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => handleNavigation('/faqs')}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-semibold text-slate-800 transition-colors"
                >
                  FAQ
                </button>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-semibold text-slate-800 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Important Notice Card */}
            <div className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <FiAlertCircle className="w-6 h-6" />
                Need Help?
              </h3>
              <p className="text-red-800 text-sm mb-3">
                If you believe this is an error or need assistance, please contact our support team.
              </p>
              <a 
                href="mailto:brothersfoodie1@gmail.com"
                className="text-red-600 hover:text-red-700 font-semibold text-sm"
              >
                brothersfoodie1@gmail.com
              </a>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Back on Track?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Head back to our home page or explore our products to find what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation('/')}
                className="inline-block bg-slate-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-600 transition-colors shadow-lg"
              >
                Go to Home
              </button>
              <button
                onClick={() => handleNavigation('/products')}
                className="inline-block bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;