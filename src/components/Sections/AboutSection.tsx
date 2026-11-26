import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';
import { services, profile } from '../../data';
import ServiceCard from '../UI/ServiceCard';
import AgentPipeline from '../UI/AgentPipeline';

const AboutSection: React.FC = () => {
  const strengths = [
    'AI Systems Architect',
    'Building Smarter Solutions',
    'Building Future-Ready Systems',
    'Team collaborator',
  ];

  return (
    <section id="about" className="section-padding bg-transparent relative overflow-hidden">
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
            My AI Journey
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my journey, passion for AI, and the intelligent solutions I build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <AgentPipeline />
              <div className="absolute -top-6 -left-4 sm:-left-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 py-3 px-5 rounded-lg shadow-lg">
                <div className="text-center">
                  <span className="block text-4xl font-bold text-primary-600 dark:text-primary-400">{profile.yearsOfExperience}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Years of Experience</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get to Know Me
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{profile.summary}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Today I lead AI development at Letitbex AI, designing autonomous systems end to end: retrieval pipelines,
              LLM orchestration, and the APIs and front ends that ship them. Before that, I built RAG chatbots and
              data-analysis tools at Intellypod, and backend automation and microservices at Cognizant.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-primary-500" />
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </div>
              ))}
            </div>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FileText size={16} className="mr-2" />
              View Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Solutions I Provide
          </motion.h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;