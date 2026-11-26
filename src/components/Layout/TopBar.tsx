import React, { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Moon,
  Sun,
  FileText,
} from 'lucide-react';

import { socialLinks, profile } from '../../data';
import SocialIcon from '../UI/SocialIcon';

const TopBar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    setDarkMode(!darkMode);
  };

  return (
    <div
      className="
        bg-gradient-to-r
    from-primary-50
    to-white
    dark:from-gray-900
    dark:to-gray-800
    backdrop-blur-md
    text-gray-900
    dark:text-white
    py-4
    border-b
    border-gray-200/50 
    dark:border-gray-800
    shadow-sm
    transition-all
    duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left Section */}
          <div className="hidden md:flex items-center space-x-8">

            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="
                flex items-center
                space-x-3
                hover:text-blue-600
                transition-colors
                duration-200
              "
            >
              <Mail size={18} />

              <span className="font-medium tracking-wide">
                {profile.email}
              </span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${profile.phone}`}
              className="
                flex items-center
                space-x-3
                hover:text-blue-600
                transition-colors
                duration-200
              "
            >
              <Phone size={18} />

              <span className="font-medium tracking-wide">
                {profile.phone}
              </span>
            </a>

            {/* Resume */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-primary-500/60
                bg-primary-500/10
                px-4 py-1.5
                text-sm font-semibold
                text-primary-700 dark:text-primary-300
                hover:bg-primary-500 hover:text-white hover:border-primary-500
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                transition-colors duration-200
              "
            >
              <FileText size={16} />
              View Resume
            </a>

          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 md:ml-auto">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="
                p-2
                rounded-full
                hover:bg-gray-100
                dark:hover:bg-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/50
                focus:ring-offset-2
                dark:focus:ring-offset-gray-900
                transition-all
                duration-200
              "
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Social Links */}
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="
                  p-2
                  rounded-full
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                  hover:text-blue-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/50
                  focus:ring-offset-2
                  dark:focus:ring-offset-gray-900
                  transition-all
                  duration-200
                "
              >
                <SocialIcon
                  icon={link.icon}
                  size={18}
                />
              </a>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;