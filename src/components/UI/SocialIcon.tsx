import React from 'react';
import { Github, Linkedin, Instagram, Phone, Mail, Code, Globe, MessageCircle } from 'lucide-react';

interface SocialIconProps {
  icon: string;
  size?: number;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, size = 20 }) => {
  switch (icon.toLowerCase()) {
    case 'github':
      return <Github size={size} />;
    case 'linkedin':
      return <Linkedin size={size} />;
    case 'instagram':
      return <Instagram size={size} />;
    case 'whatsapp':
      return <MessageCircle size={size} />;
    case 'mail':
      return <Mail size={size} />;
    case 'code':
      return <Code size={size} />;
    default:
      return <Globe size={size} />;
  }
};

export default SocialIcon;