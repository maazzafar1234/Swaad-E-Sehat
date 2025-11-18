import React, { useState } from 'react';
import { FiSave, FiBell, FiLock, FiGlobe, FiDollarSign } from 'react-icons/fi';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Swaad-E-Sehat',
    storeEmail: 'brothersfoodie1@gmail.com',
    storePhone: '+91 81780 63094',
    storeAddress: 'Gurgaon, Sector 8',
    storeCity: 'Gurgaon',
    storeState: 'Haryana',
    storePincode: '122001',
    currency: 'INR',
    taxPercentage: 18,
    shippingCost: 50,
    freeShippingAbove: 500,
    enableNotifications: true,
    enableSMS: true,
    enableEmail: true,
    maintenanceMode: false,
    allowGuestCheckout: true,
    enableCoupon: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
        <h1 className="text-3xl font-bold text-amber-900">⚙️ Settings</h1>
        <p className="text-amber-700 mt-2">Manage your store configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Information */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-4">
            🏪 Store Information
          </h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Name</label>
                <input 
                  type="text" 
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Email</label>
                <input 
                  type="email" 
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Phone</label>
                <input 
                  type="tel" 
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Currency</label>
                <select 
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Store Address</label>
              <input 
                type="text" 
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input 
                  type="text" 
                  name="storeCity"
                  value={settings.storeCity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                <input 
                  type="text" 
                  name="storeState"
                  value={settings.storeState}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                <input 
                  type="text" 
                  name="storePincode"
                  value={settings.storePincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
              <FiBell size={20} /> Notifications
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Enable All Notifications</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableEmail"
                  checked={settings.enableEmail}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Email Notifications</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableSMS"
                  checked={settings.enableSMS}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">SMS Notifications</span>
              </label>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
              <FiLock size={20} /> System
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Maintenance Mode</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="allowGuestCheckout"
                  checked={settings.allowGuestCheckout}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Allow Guest Checkout</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableCoupon"
                  checked={settings.enableCoupon}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Enable Coupon System</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Billing & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
            <FiDollarSign size={20} /> Billing
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Percentage (%)</label>
              <input 
                type="number" 
                name="taxPercentage"
                value={settings.taxPercentage}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Shipping Cost (₹)</label>
              <input 
                type="number" 
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Free Shipping Above (₹)</label>
              <input 
                type="number" 
                name="freeShippingAbove"
                value={settings.freeShippingAbove}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
            <FiGlobe size={20} /> Preferences
          </h2>
          
          <div className="space-y-5">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800"><span className="font-semibold">Theme:</span> Light Mode</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800"><span className="font-semibold">Language:</span> English</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800"><span className="font-semibold">Timezone:</span> IST (UTC+5:30)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
        >
          <FiSave size={20} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;