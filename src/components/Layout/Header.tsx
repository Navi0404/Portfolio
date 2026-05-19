import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { navLinks, socialLinks } from '../../data';
import ThemeToggle from '../UI/ThemeToggle';
import SocialIcon from '../UI/SocialIcon';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const sections = document.querySelectorAll('section[id]');

      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || '';
        const sectionTop = (section as HTMLElement).offsetTop - 120;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'top-12 bg-white/80 dark:bg-transparent backdrop-blur-sm'
      }`}
    >
     

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[90] transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 "
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 w-full h-full shadow-2xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20 h-full min-h-screen overflow-y-auto bg-white dark:bg-gray-900">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={24} className="text-gray-600 dark:text-gray-300" />
            </button>

            {/* Navigation */}
            <nav className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Navigation
              </h3>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.target}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === link.href.substring(1)
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>

            {/* Contact Info */}
            <div className="mb-8 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+91-6309351001"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={18} className="text-primary-500" />
                  <span className="text-sm">+91-6309351001</span>
                </a>
                <a
                  href="mailto:haripreeththota@gmail.com"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail size={18} className="text-primary-500" />
                  <span className="text-sm">haripreeththota@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <MapPin size={18} className="text-primary-500" />
                  <span className="text-sm">Hyderabad, India</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Connect
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <SocialIcon icon={link.icon} size={16} />
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
