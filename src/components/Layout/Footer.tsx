import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { socialLinks } from '../../data';
import SocialIcon from '../UI/SocialIcon';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 py-12 border-t-2 border-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <button 
              onClick={handleLogoClick}
              className="text-xl font-bold mb-4 text-white cursor-pointer"
            >
              {/* <span className="inline-flex items-center">
                <span className="bg-primary-500 text-white px-2 py-1 rounded-lg">H</span>
                <span className="text-primary-500 mx-0.5">T</span>
                <span className="bg-primary-500 text-white px-2 py-1 rounded-lg">H</span>
              </span> */}
            </button>
            <p className="text-gray-300 mb-4 max-w-md">
              AI digital experiences that make a difference. Let's work together to bring your ideas to life.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                  aria-label={link.name}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">About</a>
              </li>
              <li>
                <a href="#education" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Education</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Projects</a>
              </li>
              <li>
                <a href="#experience" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Experience</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin size={14} className="text-primary-400" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={14} className="text-primary-400" />
                <a href="mailto:navinashconnect@gmail.com" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  navinashconnect@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={14} className="text-primary-400" />
                <a href="tel:+91-9121933278" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  +91-9121933278
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col justify-center items-center">
        <p className="text-gray-400 text-sm text-center">
          &copy; {currentYear} G Navinash. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;