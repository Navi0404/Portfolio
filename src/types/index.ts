// export interface Project {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   demoUrl?: string;
//   codeUrl?: string;
//   category: 'Artificial Intelligence' | 'backend' | 'fullstack' | 'mobile' | 'design';
// }

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'ai' | 'frontend' | 'backend' | 'other';
}

export interface NavLink {
  name: string;
  href: string;
  target?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  // grade: string;
  // description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}