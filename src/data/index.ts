import { Project, SkillDomain, NavLink, SocialLink, Experience, Service, Education } from '../types';

// Latest resume (Google Drive). Used by the top bar, header, About section and the "Ask me" bot.
export const RESUME_URL = 'https://drive.google.com/drive/folders/1jTcRS1HGxHTG5EWqGQb0ra7lqWCl2mYe?usp=sharing';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: RESUME_URL, target: '_blank' },
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

export const skillDomains: SkillDomain[] = [
  {
    name: 'Gen AI & LLM',
    icon: 'genai',
    skills: ['RAG', 'CAG', 'Vector Search', 'Similarity Search', 'Vector Embeddings', 'Prompt Engineering', 'Retrieval', 'Semantic Search', 'Conversational AI', 'Observability', 'Evaluation', 'Guardrails'],
  },
  {
    name: 'Agents & Orchestration',
    icon: 'agents',
    skills: ['LangChain', 'LangGraph', 'Tool Calling', 'MCP', 'A2A', 'Multi-Agent Systems', 'Agentic Workflows'],
  },
  {
    name: 'AI Coding & Dev Tools',
    icon: 'tools',
    skills: ['Claude Code', 'Cursor', 'Antigravity', 'Codex', 'OpenCode', 'OpenClaw', 'Hermes Agent'],
  },
  {
    name: 'LLM Fine-tuning',
    icon: 'finetune',
    skills: ['LoRA', 'QLoRA', 'PEFT'],
  },
  {
    name: 'Programming Languages',
    icon: 'code',
    skills: ['Python', 'HTML', 'CSS', 'JavaScript', 'React', 'SQL', 'NoSQL'],
  },
  {
    name: 'Machine Learning',
    icon: 'ml',
    skills: ['Regression', 'Classification', 'Model Evaluation', 'Model Selection', 'EDA', 'Feature Engineering'],
  },
  {
    name: 'Knowledge Graphs & Databases',
    icon: 'database',
    skills: ['Neo4j', 'Pinecone', 'pgvector', 'Qdrant', 'Milvus', 'ChromaDB', 'Knowledge Graphs', 'Taxonomy', 'SQL Server', 'MongoDB', 'PostgreSQL', 'Redis'],
  },
  {
    name: 'Backend & APIs',
    icon: 'backend',
    skills: ['FastAPI', 'REST APIs', 'SQLAlchemy', 'Microservices & Schedulers', 'Pydantic', 'RBAC', 'JWT', 'Auth'],
  },
  {
    name: 'Observability & Monitoring',
    icon: 'observability',
    skills: ['Langfuse', 'LangSmith', 'TruLens', 'RAGAS', 'DeepEval', 'Metrics & Traces', 'Token Monitoring', 'Cost Calculation'],
  },
  {
    name: 'DevOps & Deployment',
    icon: 'devops',
    skills: ['Docker', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Model Deployment', 'Railway', 'Render', 'Vercel', 'Cloudflare', 'Supabase'],
  },
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
      'Multi-agent systems and agentic workflows that plan, call tools and take action, grounded with RAG and built for production.',
    icon: 'agents',
    tags: ['LangGraph', 'MCP', 'RAG', 'A2A'],
  },
  {
    id: 2,
    title: 'Computer Vision & Machine Learning',
    description:
      'Models for image understanding, object detection and prediction, from EDA and feature engineering to evaluation and deployment.',
    icon: 'vision',
    tags: ['Deep Learning', 'Detection', 'Model Evaluation'],
  },
  {
    id: 3,
    title: 'Web Development',
    description:
      'Fast, responsive web apps with React front ends that make AI products simple to use.',
    icon: 'web',
    tags: ['React', 'JavaScript', 'HTML & CSS', 'Vercel'],
  },
  {
    id: 4,
    title: 'API & Backend Development',
    description:
      'Secure, scalable APIs and microservices with auth, RBAC and schedulers, ready for production traffic.',
    icon: 'api',
    tags: ['FastAPI', 'Pydantic', 'JWT', 'Docker'],
  },
];
// Shared by the Contact section and the "Ask me" bot.
export const profile = {
  name: 'G Navinash',
  title: 'AI Developer & Team Lead',
  location: 'Hyderabad, Telangana, India',
  email: 'navinashconnect@gmail.com',
  phone: '+91-9121933278',
  resumeUrl: RESUME_URL,
  yearsOfExperience: '4+',
  summary:
    "I'm an AI Engineer with 4+ years of experience building intelligent, production-ready applications. I specialize in Agentic AI, Multi-Agent Systems, RAG and MCP, and I care about clean, maintainable code.",
  availability:
    'Ready to contribute to challenging projects involving AI development, backend systems, and scalable applications.',
};
