import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser'; // Make sure you have this installed

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- All your EmailJS and form logic is preserved ---
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  const RECIPIENT_EMAIL = 'maazzafar156@gmail.com';

  const isEmailJSConfigured = () => {
    return EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
           EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
           EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEmailJSConfigured()) {
      toast.error('Email service not configured. Please contact the site administrator.', { position: 'top-right' });
      console.error('EmailJS not configured.');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        to_email: RECIPIENT_EMAIL,
        reply_to: formData.email
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast.success('Message sent successfully! We will get back to you soon.', { position: 'top-right' });

    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send message. Please try again later.', { position: 'top-right' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed text-balance">
            Have questions about our products? Want to place a custom order? 
            We'd love to hear from you!
          </p>
        </div>

        {/* Contact Form Wrapper */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
          
          {/* Column 1: Contact Info */}
          <div className="bg-slate-800 p-8 md:p-12 text-white">
            <h2 className="text-3xl font-semibold font-serif mb-4">Contact Information</h2>
            <p className="text-slate-300 mb-10">
              Fill out the form, or for a faster response, reach out to us via phone or email.
            </p>
            
            <div className="space-y-8">
              <ContactInfoItem
                icon={<FiPhone className="w-6 h-6" />}
                title="Phone"
                content="+91 88499 78818"
                href="tel:+918849978818"
              />
              <ContactInfoItem
                icon={<FiMail className="w-6 h-6" />}
                title="Email"
                content="info@swaad-e-sehat.com"
                href="mailto:info@swaad-e-sehat.com"
              />
              <ContactInfoItem
                icon={<FiMapPin className="w-6 h-6" />}
                title="Address"
                content="Manufacturing & Office Address, Delhi, India"
              />
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormGroup>
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                    className="form-input"
                  />
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormGroup>
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="form-input"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select 
                    id="subject" name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input bg-white" // bg-white needed for select
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Related</option>
                    <option value="custom">Custom Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </FormGroup>
              </div>

              <FormGroup>
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message" name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className="form-input"
                ></textarea>
              </FormGroup>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-3 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ContactInfoItem = ({ icon, title, content, href }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-amber-500 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
      {href ? (
        <a href={href} className="text-slate-300 hover:text-amber-400 transition-colors break-all">
          {content}
        </a>
      ) : (
        <p className="text-slate-300">{content}</p>
      )}
    </div>
  </div>
);

const FormGroup = ({ children }) => (
  <div className="w-full">
    {children}
  </div>
);

// --- Add these utility classes to your main `index.css` ---
/*
@layer base {
  .form-label {
    @apply block text-sm font-medium text-slate-700 mb-1.5;
  }
  .form-input {
    @apply w-full px-4 py-3 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all;
  }
}
*/

export default ContactForm;