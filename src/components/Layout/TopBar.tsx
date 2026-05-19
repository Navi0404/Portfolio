import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { socialLinks } from '../../data';
import SocialIcon from '../UI/SocialIcon';

const TopBar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-2 text-sm">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Contact Info - Hidden on mobile */}
          <div className="hidden md:flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <a 
              href="mailto:navinashconnect@gmail.com" 
              className="flex items-center space-x-2 hover:text-primary-400 transition-colors duration-200"
            >
              <Mail size={14} />
              <span>navinashconnect@gmail.com</span>
            </a>
            <a 
              href="tel:+91-9121933278" 
              className="flex items-center space-x-2 hover:text-primary-400 transition-colors duration-200"
            >
              <Phone size={14} />
              <span>+91-9121933278</span>
            </a>
          </div>
          
          {/* Social Links - Aligned to right on mobile */}
          <div className="flex items-center space-x-3 md:ml-auto">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-gray-800 transition-colors duration-200"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;