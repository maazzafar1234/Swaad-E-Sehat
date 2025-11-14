import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock,FiClock , FiShield, FiEye, FiDatabase, FiMail, FiCreditCard, FiUser, FiTruck, FiAlertCircle, FiCheck } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 via-white to-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Header with decorative elements */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FiLock className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information at Swaad-E-Sehat.
          </p>
          <div className="mt-6 text-sm text-slate-500">
            <p><strong>Last Updated:</strong> November 15, 2025</p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Your Data is Safe With Us</h2>
            <p className="text-blue-50 text-lg max-w-2xl mx-auto">
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left Column - Policy Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
                <div className="flex items-center gap-3">
                  <FiShield className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Introduction</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-lg">
                    Welcome to <span className="font-bold text-amber-600">Swaad-E-Sehat</span> ("we," "us," or "our"). We respect your privacy and are committed to protecting your personal data.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, share, and protect your information when you visit our website, make purchases, or interact with our services.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                    <p className="text-slate-800 font-medium">
                      <FiAlertCircle className="inline mr-2 text-blue-600" />
                      By using our website and services, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
                <div className="flex items-center gap-3">
                  <FiDatabase className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Information We Collect</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg">
                  We collect several types of information to provide and improve our services:
                </p>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                      <FiUser className="text-purple-600" />
                      1. Personal Information You Provide
                    </h3>
                    <p className="text-slate-700 mb-4">When you create an account or place an order, we collect:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Name:</strong> Your full name for order processing and delivery</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Email Address:</strong> For order confirmations, updates, and customer support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Phone Number:</strong> For delivery coordination and order-related communication</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Shipping Address:</strong> For accurate product delivery</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Billing Address:</strong> For payment processing (if different from shipping)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <h3 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                      <FiCreditCard className="text-emerald-600" />
                      2. Payment Information
                    </h3>
                    <p className="text-slate-700 mb-3">
                      When you make a purchase:
                    </p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Online Payments:</strong> We use secure third-party payment processors (DevCraftor). We do NOT store your complete credit/debit card details on our servers.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Cash on Delivery:</strong> No payment information is collected for COD orders.</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
                      <p className="text-emerald-900 text-sm font-medium flex items-start gap-2">
                        <FiShield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>All payment transactions are encrypted and processed through PCI-compliant payment gateways for your security.</span>
                      </p>
                    </div>
                  </div>

                  {/* Order & Usage Data */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                      <FiTruck className="text-blue-600" />
                      3. Order & Usage Data
                    </h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Purchase History:</strong> Products ordered, quantities, prices, and order dates</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Browsing Data:</strong> Pages visited, products viewed, and items added to cart/wishlist</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</span>
                      </li>
                    </ul>
                  </div>

                  {/* Communication Data */}
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                      <FiMail className="text-amber-600" />
                      4. Communication Data
                    </h3>
                    <p className="text-slate-700">
                      When you contact us via email, contact forms, or customer support, we collect the content of your messages and any additional information you provide to help resolve your inquiry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6">
                <div className="flex items-center gap-3">
                  <FiEye className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">How We Use Your Information</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg">
                  We use your personal information for the following purposes:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Order Processing & Fulfillment</h3>
                      <p className="text-slate-600">To process your orders, arrange delivery, send order confirmations, and handle payment transactions.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Customer Support</h3>
                      <p className="text-slate-600">To respond to your inquiries, resolve issues, process refunds/replacements, and provide assistance.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Account Management</h3>
                      <p className="text-slate-600">To create and maintain your user account, save shipping addresses, and manage your order history.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Marketing Communications (Optional)</h3>
                      <p className="text-slate-600">To send promotional emails about new products, special offers, and updates (you can opt-out anytime).</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        5
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Website Improvement</h3>
                      <p className="text-slate-600">To analyze user behavior, improve our website functionality, and enhance user experience.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        6
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">Legal Compliance</h3>
                      <p className="text-slate-600">To comply with legal obligations, prevent fraud, and protect our business interests.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sharing Your Information */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Sharing Your Information</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-6">
                  <p className="text-red-900 font-bold text-lg mb-2">
                    We DO NOT sell your personal information to third parties.
                  </p>
                  <p className="text-red-800">
                    Your data is only shared with trusted partners who help us operate our business.
                  </p>
                </div>

                <p className="text-slate-700 mb-6 text-lg font-semibold">
                  We may share your information with:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FiTruck className="text-blue-600" />
                      Delivery Partners
                    </h3>
                    <p className="text-slate-700">
                      We share your name, phone number, and shipping address with our delivery service providers to ensure your order reaches you safely.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FiCreditCard className="text-emerald-600" />
                      Payment Processors
                    </h3>
                    <p className="text-slate-700">
                      For online payments, your payment information is processed securely through third-party payment gateways (e.g., DevCraftor). We do not store your full card details.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FiMail className="text-purple-600" />
                      Email Service Providers
                    </h3>
                    <p className="text-slate-700">
                      We use email services to send order confirmations, shipping updates, and promotional emails (if you've opted in).
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FiShield className="text-slate-600" />
                      Legal Authorities
                    </h3>
                    <p className="text-slate-700">
                      We may disclose your information if required by law, court order, or to protect our legal rights and prevent fraud.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
                <div className="flex items-center gap-3">
                  <FiLock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Data Security</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg">
                  We take the security of your personal information seriously and implement industry-standard measures to protect it:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FiShield className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-bold text-slate-900">SSL Encryption</h3>
                    </div>
                    <p className="text-slate-700 text-sm">All data transmitted between your browser and our servers is encrypted using SSL/TLS protocols.</p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FiDatabase className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-bold text-slate-900">Secure Storage</h3>
                    </div>
                    <p className="text-slate-700 text-sm">Your data is stored on secure servers with restricted access and regular security audits.</p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FiLock className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-bold text-slate-900">Password Protection</h3>
                    </div>
                    <p className="text-slate-700 text-sm">User passwords are hashed and encrypted. We never store passwords in plain text.</p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <FiCreditCard className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-bold text-slate-900">PCI Compliance</h3>
                    </div>
                    <p className="text-slate-700 text-sm">Payment processing follows PCI DSS standards for handling card information securely.</p>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-900 text-sm">
                    <strong>Note:</strong> While we implement robust security measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to protect your data.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6">
                <div className="flex items-center gap-3">
                  <FiUser className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Your Privacy Rights</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg">
                  You have the following rights regarding your personal data:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <FiCheck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Access Your Data</h3>
                      <p className="text-slate-700">Request a copy of the personal information we hold about you.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <FiCheck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Update Your Data</h3>
                      <p className="text-slate-700">Correct or update any inaccurate information in your account settings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <FiCheck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Delete Your Data</h3>
                      <p className="text-slate-700">Request deletion of your account and associated data (subject to legal retention requirements).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <FiCheck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Opt-Out of Marketing</h3>
                      <p className="text-slate-700">Unsubscribe from promotional emails at any time by clicking the "unsubscribe" link in our emails.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <FiCheck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Data Portability</h3>
                      <p className="text-slate-700">Request your data in a machine-readable format to transfer to another service.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <p className="text-blue-900 font-medium">
                    To exercise any of these rights, please contact us at <a href="mailto:brothersfoodie1@gmail.com" className="text-blue-600 hover:text-blue-700 font-semibold underline">brothersfoodie1@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6">
                <div className="flex items-center gap-3">
                  <FiDatabase className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Cookies & Tracking</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-4 text-lg">
                  We use cookies and similar technologies to enhance your browsing experience:
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="font-bold text-slate-900 mb-2">Essential Cookies</h3>
                    <p className="text-slate-700 text-sm">Required for the website to function properly (e.g., shopping cart, login sessions).</p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="font-bold text-slate-900 mb-2">Functional Cookies</h3>
                    <p className="text-slate-700 text-sm">Remember your preferences and settings for a better user experience.</p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="font-bold text-slate-900 mb-2">Analytics Cookies</h3>
                    <p className="text-slate-700 text-sm">Help us understand how visitors use our website to improve functionality.</p>
                  </div>
                </div>

                <p className="text-slate-700 text-sm">
                  You can manage cookie preferences through your browser settings. Note that disabling cookies may affect website functionality.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Children's Privacy</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 text-lg mb-4">
                  Our services are not directed to individuals under the age of 18.
                </p>
                <p className="text-slate-700">
                  We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us immediately at <a href="mailto:brothersfoodie1@gmail.com" className="text-pink-600 hover:text-pink-700 font-semibold underline">brothersfoodie1@gmail.com</a>, and we will promptly delete such information.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6">
                <div className="flex items-center gap-3">
                  <FiClock className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Data Retention</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 text-lg mb-6">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-teal-50 rounded-lg p-5 border border-teal-200">
                    <h3 className="font-bold text-slate-900 mb-2">Active Account Data</h3>
                    <p className="text-slate-700">Retained for the duration of your account's active status and for a reasonable period after account closure for legal and business purposes.</p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-5 border border-teal-200">
                    <h3 className="font-bold text-slate-900 mb-2">Order & Transaction Records</h3>
                    <p className="text-slate-700">Kept for up to 7 years to comply with tax laws, accounting requirements, and potential warranty/return claims.</p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-5 border border-teal-200">
                    <h3 className="font-bold text-slate-900 mb-2">Marketing Data</h3>
                    <p className="text-slate-700">Retained until you opt-out or request deletion, after which it will be removed from active marketing lists.</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                  <p className="text-slate-700 text-sm">
                    After the retention period, your data will be securely deleted or anonymized unless we are legally required to keep it longer.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Third-Party Links</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 text-lg mb-4">
                  Our website may contain links to third-party websites (e.g., social media platforms, payment processors).
                </p>
                <div className="bg-cyan-50 border-l-4 border-cyan-500 p-5 rounded-r-lg">
                  <p className="text-cyan-900 font-medium">
                    <FiShield className="inline mr-2 text-cyan-600" />
                    We are not responsible for the privacy practices of external sites. We encourage you to review their privacy policies before providing any personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-violet-600 to-violet-500 p-6">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-8 h-8 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Changes to This Policy</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 text-lg mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                </p>
                <p className="text-slate-700 mb-4">
                  When we make significant changes, we will:
                </p>
                <ul className="space-y-2 text-slate-700 mb-6">
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span>Update the "Last Updated" date at the top of this page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span>Notify you via email (if you're a registered user)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span>Display a notice on our website homepage</span>
                  </li>
                </ul>
                <div className="bg-violet-50 rounded-lg p-5 border border-violet-200">
                  <p className="text-violet-900 font-medium">
                    Your continued use of our services after any changes constitutes your acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Quick Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Questions?</h3>
              <p className="mb-6 text-blue-50">
                Have concerns about your privacy or data? Contact us anytime.
              </p>
              <Link 
                to="/contact"
                className="block w-full bg-white text-blue-600 text-center font-bold py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-md mb-4"
              >
                Contact Us
              </Link>
              <div className="pt-6 border-t border-blue-400">
                <p className="text-sm text-blue-50 mb-2">Email us directly:</p>
                <a 
                  href="mailto:brothersfoodie1@gmail.com"
                  className="text-white font-semibold hover:text-blue-100 break-all text-sm"
                >
                  brothersfoodie1@gmail.com
                </a>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiShield className="text-blue-600" />
                Our Commitment
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>We never sell your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>SSL encrypted connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Transparent data usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>You control your data</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-amber-50 rounded-2xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Related Policies</h3>
              <div className="space-y-3">
                <Link 
                  to="/terms-conditions"
                  className="block text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                >
                  → Terms & Conditions
                </Link>
                <Link 
                  to="/return-refund"
                  className="block text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                >
                  → Return & Refund Policy
                </Link>
                <Link 
                  to="/shipping"
                  className="block text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                >
                  → Shipping Policy
                </Link>
              </div>
            </div>

            {/* Data Rights Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Your Rights</h3>
              <ul className="space-y-2 text-sm text-indigo-50">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Access your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Update information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Request deletion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Opt-out of marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Data portability</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Contact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-10 text-center text-white">
            <div className="inline-block mb-6">
              <div className="bg-blue-500 p-4 rounded-full">
                <FiMail className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Need to Contact Our Privacy Team?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              If you have any questions, concerns, or requests regarding your personal data or this Privacy Policy, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:brothersfoodie1@gmail.com"
                className="inline-block bg-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
              >
                Email Privacy Team
              </a>
              <Link 
                to="/contact"
                className="inline-block bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-800 px-8 py-4 rounded-full border border-blue-200">
            <FiLock className="w-6 h-6" />
            <span className="font-semibold text-lg">Your Privacy is Our Priority • Secure & Transparent</span>
          </div>
          <p className="mt-6 text-slate-500 text-sm">
            Last Updated: November 15, 2025 • Swaad-E-Sehat
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;