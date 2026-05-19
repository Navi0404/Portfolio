import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Layout, Server } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={28} className="text-primary-500" />;
      case 'smartphone':
        return <Smartphone size={28} className="text-primary-500" />;
      case 'layout':
        return <Layout size={28} className="text-primary-500" />;
      case 'server':
        return <Server size={28} className="text-primary-500" />;
      default:
        return <Code size={28} className="text-primary-500" />;
    }
  };

  return (
    <motion.div 
      className="card p-6 h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
        {getIcon(service.icon)}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;