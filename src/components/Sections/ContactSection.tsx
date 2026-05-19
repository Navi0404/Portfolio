import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../../data';
import SocialIcon from '../UI/SocialIcon';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
  pattern: RegExp;
  placeholder: string;
}

const countryCodes: CountryCode[] = [
  { code: '+1', country: 'US', flag: '🇺🇸', pattern: /^\d{10}$/, placeholder: '1234567890' },
  { code: '+44', country: 'UK', flag: '🇬🇧', pattern: /^\d{10}$/, placeholder: '1234567890' },
  { code: '+91', country: 'IN', flag: '🇮🇳', pattern: /^\d{10}$/, placeholder: '9876543210' },
  { code: '+61', country: 'AU', flag: '🇦🇺', pattern: /^\d{9}$/, placeholder: '412345678' },
  { code: '+49', country: 'DE', flag: '🇩🇪', pattern: /^\d{10,11}$/, placeholder: '1234567890' },
  { code: '+33', country: 'FR', flag: '🇫🇷', pattern: /^\d{9}$/, placeholder: '123456789' },
  { code: '+81', country: 'JP', flag: '🇯🇵', pattern: /^\d{10,11}$/, placeholder: '9012345678' },
  { code: '+86', country: 'CN', flag: '🇨🇳', pattern: /^\d{11}$/, placeholder: '13812345678' },
];

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone: string, countryCode: string) => {
    const country = countryCodes.find(c => c.code === countryCode);
    if (!country) return false;
    return country.pattern.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'phone' || name === 'countryCode') {
      const phone = name === 'phone' ? value : formState.phone;
      const countryCode = name === 'countryCode' ? value : formState.countryCode;
      
      if (phone && !validatePhone(phone, countryCode)) {
        const country = countryCodes.find(c => c.code === countryCode);
        setPhoneError(`Please enter a valid ${country?.country} phone number`);
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate phone number
    if (!validatePhone(formState.phone, formState.countryCode)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      // Initialize EmailJS with public key
      emailjs.init('hdJzo1DjDBAGgjhM9');

      // Send email using EmailJS
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        phone: `${formState.countryCode} ${formState.phone}`,
        subject: formState.subject,
        message: formState.message,
        to_name: 'Haripreeth Thota',
      };

      await emailjs.send(
        'service_ucqgqfh',
        'template_ox956rq',
        templateParams
      );

      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      setError('Failed to send message. Please try again or contact me directly.');
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800/30 relative overflow-hidden">
      {/* Left Side Pattern */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 11, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-pattern-left" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-secondary-500" />
              <circle cx="25" cy="25" r="3" fill="currentColor" className="text-accent-500" opacity="0.5" />
              <path d="M10 25 L40 25 M25 10 L25 40" stroke="currentColor" strokeWidth="0.2" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern-left)" />
        </svg>
      </motion.div>

      {/* Right Side Pattern */}
      <motion.div 
        className="absolute right-0 top-0 h-full w-32 opacity-20 dark:opacity-10 pointer-events-none"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 13, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-pattern-right" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500" />
              <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-secondary-500" />
              <circle cx="25" cy="25" r="3" fill="currentColor" className="text-accent-500" opacity="0.5" />
              <path d="M10 25 L40 25 M25 10 L25 40" stroke="currentColor" strokeWidth="0.2" className="text-primary-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern-right)" />
        </svg>
      </motion.div>
      
      {/* Floating Contact Elements */}
      <motion.div 
        className="absolute top-16 left-16 w-20 h-20 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-gradient-to-tr from-primary-500 via-secondary-500 to-accent-500 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute bottom-16 right-16 w-16 h-16 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          rotate: [0, 12, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full border-4 border-primary-500 rounded-lg transform rotate-12"></div>
      </motion.div>
      <motion.div 
        className="absolute top-1/3 left-20 w-12 h-12 opacity-20 dark:opacity-20 pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full bg-secondary-500 transform rotate-45"></div>
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let’s Work Together
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Contact Information
            </motion.h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-full">
                  <Mail size={20} className="text-primary-500 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Email</h4>
                  <a href="mailto:navinashconnect@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    navinashconnect@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-full">
                  <Phone size={20} className="text-primary-500 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Phone</h4>
                  <a href="tel:+91-9121933278" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    +91-9121933278
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-full">
                  <MapPin size={20} className="text-primary-500 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 mb-8">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ready for New Challenges</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ready to contribute to challenging projects involving AI development, backend systems, and scalable applications.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connect with me</h4>
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <SocialIcon icon={link.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
              <motion.h3 
                className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Send Me a Message
              </motion.h3>
              
              {submitted ? (
                <motion.div 
                  className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg flex items-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-medium">Message sent successfully!</span>
                    <span className="text-sm">Thank you for reaching out. I'll get back to you soon!</span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg flex items-start">
                      <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                      <select
                        name="countryCode"
                        value={formState.countryCode}
                        onChange={handleChange}
                        className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-l-md sm:rounded-r-none shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder={countryCodes.find(c => c.code === formState.countryCode)?.placeholder}
                        required
                        className="flex-1 px-4 py-2 border sm:border-l-0 border-gray-300 dark:border-gray-600 rounded-md sm:rounded-r-md sm:rounded-l-none shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{phoneError}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !!phoneError}
                    className="w-full btn-primary flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;