import { Project, Skill, NavLink, SocialLink, Experience, Service, Education } from '../types';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: 'https://drive.google.com/file/d/1dMnzbJSXRrbyUeEmtfdnmzuHKHqxvXl_/view?usp=sharing', target: '_blank' },
];

export const socialLinks: SocialLink[] = [
  { 
    name: 'WhatsApp', 
    url: 'https://wa.me/+919121933278', 
    icon: 'whatsapp' 
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/gnavinash/', 
    icon: 'linkedin' 
  },
  // { 
  //   name: 'Instagram', 
  //   url: 'https://www.instagram.com/navinashh/', 
  //   icon: 'instagram' 
  // },
  { 
    name: 'GitHub', 
    url: 'https://github.com/Navi0404', 
    icon: 'github' 
  },
];

export const skills: Skill[] = [


  {name:'HTML', icon:'html', level:90, category:'frontend'},
  {name:'CSS', icon:'css', level:85, category:'frontend'},
  {name:'JavaScript', icon:'javascript', level:90, category:'frontend'},
  { name: 'React', icon: 'react', level: 85, category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', level: 80, category: 'frontend' },


  { name: 'Python', icon: 'python', level: 85, category: 'backend' },
  { name: 'PostgreSQL', icon: 'postgresql', level: 70, category: 'backend' },
  { name: 'MongoDB', icon: 'mongodb', level: 75, category: 'backend' },
  { name: 'FastAPI', icon: 'fastapi', level: 70, category: 'backend' },
  { name: 'Flask', icon: 'flask', level: 65, category: 'backend' },
  


  { name: 'Machine Learning', icon: 'Machine Learning', level: 85, category: 'ai' },
  { name: 'Deep Learning', icon: 'Deep Learning', level: 80, category: 'ai' },
  { name: 'Computer Vision', icon: 'Computer Vision', level: 80, category: 'ai' },
  { name: 'Reinforcement Learning', icon: 'Reinforcement Learning', level: 75, category: 'ai' },
  { name: 'Generative AI', icon: 'Generative AI', level: 85, category: 'ai' },
  { name: 'Embeddings & Vector Stores', icon: 'Transformers', level: 80, category: 'ai' },
  { name: 'Natural Language Processing', icon: 'NLP', level: 85, category: 'ai' },
  { name: 'Multi-Agent Systems', icon: 'Multi-Agent Systems', level: 80, category: 'ai' },
  { name: 'Agentic AI', icon: 'Agentic AI', level: 85, category: 'ai' },
  { name: 'RAG', icon: 'RAG', level: 90, category: 'ai' },

  { name: 'Git', icon: 'git', level: 85, category: 'other' },
  { name: 'Docker', icon: 'docker', level: 70, category: 'other' },
  { name: 'CI/CD', icon: 'cicd', level: 75, category: 'other' },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'LEXXIT - AI Powered Automation Testing',
    description: 'LexxIT AI is an AI-powered testing platform that converts plain-language instructions into executable test scripts, enabling fast, scalable, and high-coverage testing for agile and CI/CD environments.',
    image: '/images/Lexxit.png',
    tags: ['Python', 'FastAPI', 'LLM', 'LangChain & LangGraph', 'React'],
    demoUrl: 'https://dev.lexxit.ai/sign-in',
    category: 'Artificial Intelligence',
  },
  {
    id: 2,
    title: 'Tzort - AI-powered travel chatbot',
    description: 'TZORT is an AI-powered travel platform that helps users discover, plan, and book resort-style vacations through personalized recommendations, real-time assistance, and a seamless travel experience.',
    image: '/images/Tzort.png',
    tags: ['React', 'Travel Agent', 'RAG', 'Langchain', 'Reinforcement Learning', 'Python' ],
    demoUrl: 'https://intellybot.ai/intellybotqa/',
    category: 'Artificial Intelligence',
  },
  {
    id: 3,
    title: 'TravelRemind.ai',
    description: 'TravelRemind.ai delivers an AI-powered resort analytics dashboard that transforms travel data into smart insights and actionable decisions.',
    image: '/images/TR.png',
    tags: ['WordPress', 'Construction', 'Real Estate', 'SEO', 'Mobile Responsive'],
    demoUrl: 'https://travelremindai.com/',
    category: 'Artificial Intelligence',
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Artificial Intelligence Developer',
    company: 'Letitbex AI , Hyderabad',
    duration: 'Apr 2025 - Present',
    description: 'AI Developer & Team Lead specializing in Agentic AI and full-stack development. Leading the design and deployment of intelligent autonomous systems, driving technical initiatives, and mentoring development teams using modern technologies',
  },
  {
    id: 2,
    role: 'Artificial Intelligence Developer',
    company: 'Intellypod , United States (Remote)',
    duration: 'Jan 2024  - Apr 2025',
    description: 'Worked as an AI Developer, building scalable chatbots, RAG-based applications, and intelligent data analysis solutions using modern AI technologies to enhance automation, generate insights, and improve user experience.',
  },
  {
    id: 3,
    role: 'Program Analyst',
    company: 'Cognizant Technology Solutions , Bangalore',
    duration: 'Feb 2023  - Aug 2023',
    description: 'Worked on Python Automation Testing, microservices architecture, and database configuration to develop scalable, efficient, and high-performance backend systems.',
  },
];

export const education: Education[] = [
  {
    id: 1,
    degree: 'B.Tech in Electrical and Electronics Engineering',
    institution: 'Gokaraju Rangaraju Institute of Engineering and Technology , Hyderabad',
    duration: '2020 - 2023',
    // grade: '9.3 CGPA',
    // description: 'Graduated with a 9.3 CGPA, specializing in full-stack development and software engineering.',
  },
  {
    id: 2,
    degree: 'Diploma in Electrical and Electronics Engineering',
    institution: 'Government Polytechnic , Mahabubnagar',
    duration: '2017 - 2020',
    // grade: 'Distinction',
    // description: 'Focused on Mathematics, Physics, and Chemistry with a strong foundation in problem-solving.',
  },
  {
    id: 3,
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Fathima Vidyalayam , Mahabubnagar',
    duration: '2016 - 2017',
    // grade: 'Distinction',
    // description: 'Excelled in academics and participated in coding competitions.',
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: 'AI & Agentic Systems',
    description:
      'Designing intelligent AI solutions including multi-agent systems and agentic AI to solve complex real-world problems and enhance user experiences.',
    icon: 'code',
  },
  {
    id: 2,
    title: 'Computer Vision & Machine Learning',
    description:
      'Building and deploying machine learning and computer vision models for image understanding, object detection, and predictive intelligence.',
    icon: 'layout',
  },
  {
    id: 3,
    title: 'Web Development',
    description:
      'Creating responsive, high-performance, and scalable web applications with modern frontend and backend technologies.',
    icon: 'smartphone',
  },
  {
    id: 4,
    title: 'API & Backend Development',
    description:
      'Developing secure, scalable, and high-performance APIs for seamless system integration and data exchange.',
    icon: 'server',
  },
];