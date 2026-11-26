// Answers questions using ONLY the portfolio data in src/data/index.ts.
// Nothing is invented: if a question isn't covered by that data, the bot says so.
import { skillDomains, projects, experiences, education, socialLinks, navLinks, services, profile } from '../../data';

export interface BotLink {
  label: string;
  href: string;
}

export interface BotReply {
  text: string;
  links?: BotLink[];
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = ['Skills', 'Projects', 'Experience', 'Resume', 'Contact'];

const resumeUrl = navLinks.find((l) => l.name.toLowerCase() === 'resume')?.href;
const splitCompany = (c: string) => c.split(',').map((p) => p.trim());

// ---------- text helpers ----------
const normalize = (s: string) =>
  s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9+#.\s-]/g, ' ').replace(/[.-]/g, ' ').replace(/\s+/g, ' ').trim();
const tokens = (s: string) => normalize(s).split(' ').filter(Boolean);
const hasPhrase = (q: string, phrase: string) => ` ${q} `.includes(` ${normalize(phrase)} `);

// ---------- skills index ----------
interface SkillEntry {
  name: string;
  domain: string;
  keys: string[];
}

const skillAliases: Record<string, string[]> = {
  JavaScript: ['js'],
  PostgreSQL: ['postgres'],
  MongoDB: ['mongo'],
  ChromaDB: ['chroma'],
  'Multi-Agent Systems': ['multi agent', 'multiagent', 'multi agents'],
  'Prompt Engineering': ['prompting', 'prompts'],
  'Conversational AI': ['chatbot', 'chatbots'],
  'Model Deployment': ['deploying models'],
  'REST APIs': ['rest', 'rest api'],
  Auth: ['authentication'],
  'Knowledge Graphs': ['knowledge graph'],
  'Claude Code': ['claude'],
};

const skillIndex: SkillEntry[] = skillDomains.flatMap((d) =>
  d.skills.map((name) => {
    const n = normalize(name.replace('&', ' '));
    const keys = [n, n.replace(/\s/g, ''), ...(skillAliases[name] ?? []).map(normalize)];
    return { name, domain: d.name, keys: Array.from(new Set(keys)).filter((k) => k.length > 1) };
  })
);

const findSkills = (q: string) => {
  const joined = q.replace(/\s/g, '');
  return skillIndex.filter((s) =>
    s.keys.some((k) => hasPhrase(q, k) || (k.length >= 6 && !k.includes(' ') && joined.includes(k)))
  );
};

// ---------- domain keywords ----------
const domainKeywords: Record<string, string[]> = {
  genai: ['gen ai', 'genai', 'generative', 'generative ai', 'llm', 'llms'],
  agents: ['agent', 'agents', 'agentic', 'orchestration'],
  tools: ['coding tools', 'ai tools', 'dev tools', 'developer tools', 'ide', 'coding assistant', 'ai coding'],
  finetune: ['fine tuning', 'finetuning', 'fine tune', 'finetune'],
  code: ['programming', 'languages', 'language', 'frontend'],
  ml: ['machine learning', 'ml'],
  database: ['database', 'databases', 'db', 'dbs', 'vector db', 'vector database', 'vector databases', 'graph databases'],
  backend: ['backend', 'back end', 'api', 'apis'],
  observability: ['observability', 'monitoring', 'evals', 'tracing', 'llmops'],
  devops: ['devops', 'deployment', 'deploy', 'hosting', 'cloud', 'ci cd', 'cicd'],
};

const findDomains = (q: string) =>
  skillDomains.filter((d) => (domainKeywords[d.icon] ?? []).some((k) => hasPhrase(q, k)));

// ---------- project / company keywords ----------
const projectKeys: Record<number, string[]> = {
  1: ['lexxit', 'lexx it', 'lexxit ai'],
  2: ['tzort', 'travel chatbot'],
  3: ['travelremind', 'travel remind', 'travelremind ai'],
};
const findProjects = (q: string) =>
  projects.filter((p) => (projectKeys[p.id] ?? [normalize(p.title)]).some((k) => hasPhrase(q, k) || q.replace(/\s/g, '').includes(k.replace(/\s/g, ''))));

const findCompanies = (q: string) =>
  experiences.filter((e) => {
    const name = normalize(splitCompany(e.company)[0]);
    return hasPhrase(q, name) || hasPhrase(q, name.split(' ')[0]);
  });

// ---------- intents ----------
const intents: Record<string, string[]> = {
  greet: ['hi', 'hii', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'yo'],
  thanks: ['thanks', 'thank you', 'thx', 'great', 'cool', 'awesome'],
  about: ['who', 'about', 'yourself', 'introduce', 'introduction', 'summary', 'background', 'bio'],
  skills: ['skill', 'skills', 'tech', 'stack', 'technologies', 'technology', 'tools', 'expertise', 'strengths'],
  projects: ['project', 'projects', 'built', 'build', 'demo', 'demos', 'apps', 'products', 'shipped'],
  experience: ['where do you work', 'currently working', 'current company', 'experience', 'work', 'job', 'jobs', 'company', 'companies', 'career', 'current', 'role', 'employer', 'worked', 'working'],
  education: ['education', 'degree', 'college', 'university', 'study', 'studied', 'btech', 'b tech', 'diploma', 'school', 'ssc', 'qualification', 'graduate'],
  contact: ['contact', 'email', 'mail', 'phone', 'call', 'number', 'reach', 'hire', 'whatsapp', 'connect', 'message'],
  resume: ['resume', 'cv', 'biodata'],
  location: ['where', 'location', 'based', 'city', 'live', 'located'],
  social: ['github', 'linkedin', 'social', 'socials'],
  services: ['services', 'service', 'offer', 'freelance', 'what can you do', 'help with'],
  years: ['how many years', 'years of experience', 'how long', 'total experience', 'how experienced'],
};

const KNOW_QUESTION = /\b(do you|can you|have you|know|knows|familiar|experience (in|with)|worked (on|with)|work with|use|used|using|proficient|skilled)\b/;

const STOPWORDS = new Set(
  'a an the is are am was were be do does did you your yours u i me my mine he his she her they them their it its of in on at to for with and or but about what which who whom how when where why can could would should will have has had any some tell show give list please know knows familiar use used using worked work experience skilled proficient there this that these those also like much many good well now currently today right just'.split(' ')
);

const scoreIntents = (q: string) => {
  const result: [string, number][] = Object.entries(intents).map(([name, keys]) => [
    name,
    keys.reduce((n, k) => n + (hasPhrase(q, k) ? (k.includes(' ') ? 2 : 1) : 0), 0),
  ]);
  return result.filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).map(([n]) => n);
};

// ---------- reply builders ----------
const replies: Record<string, () => BotReply> = {
  greet: () => ({
    text: `Hi! I'm ${profile.name}'s portfolio assistant. Ask me about my skills, projects, experience, education, resume or how to contact me.`,
    suggestions: DEFAULT_SUGGESTIONS,
  }),
  thanks: () => ({ text: 'Happy to help! Anything else you want to know?', suggestions: DEFAULT_SUGGESTIONS }),
  about: () => ({
    text: `${profile.summary}\n\nRight now I'm **${experiences[0].role}** at **${splitCompany(experiences[0].company)[0]}** (${experiences[0].duration}).`,
    suggestions: ['Experience', 'Skills', 'Projects'],
  }),
  skills: () => ({
    text: `My skills are grouped into ${skillDomains.length} areas:\n${skillDomains
      .map((d) => `• **${d.name}**: ${d.skills.slice(0, 4).join(', ')}${d.skills.length > 4 ? '…' : ''}`)
      .join('\n')}\n\nAsk about any area (e.g. "databases") or a specific tool (e.g. "Neo4j").`,
    links: [{ label: 'View all skills', href: '#skills' }],
    suggestions: ['Agents', 'Databases', 'Observability'],
  }),
  projects: () => ({
    text: `Here are my projects:\n${projects
      .map((p) => `• **${p.title}**: ${p.description.split('. ')[0].replace(/\.$/, '')}.`)
      .join('\n')}`,
    links: projects.map((p) => ({ label: p.title.split(' - ')[0], href: p.demoUrl ?? '#projects' })),
    suggestions: ['Tell me about LEXXIT', 'Tzort', 'TravelRemind.ai'],
  }),
  experience: () => ({
    text: `I have ${profile.yearsOfExperience} years of experience:\n${experiences
      .map((e) => `• **${e.role}** at ${splitCompany(e.company).join(', ')} (${e.duration})`)
      .join('\n')}`,
    links: [{ label: 'See experience', href: '#experience' }],
    suggestions: ['Letitbex AI', 'Intellypod', 'Cognizant'],
  }),
  education: () => ({
    text: `My education:\n${education
      .map((e) => `• **${e.degree}**, ${splitCompany(e.institution).join(', ')} (${e.duration})`)
      .join('\n')}`,
    links: [{ label: 'See education', href: '#education' }],
  }),
  contact: () => ({
    text: `You can reach me here:\n• **Email:** ${profile.email}\n• **Phone / WhatsApp:** ${profile.phone}\n• **Location:** ${profile.location}\n\n${profile.availability}`,
    links: [
      { label: 'Email', href: `mailto:${profile.email}` },
      ...socialLinks.map((s) => ({ label: s.name, href: s.url })),
    ],
  }),
  resume: () =>
    resumeUrl
      ? { text: 'Here is my resume. It opens in Google Drive.', links: [{ label: 'Open resume', href: resumeUrl }] }
      : { text: "I don't have a resume link on this site yet. You can contact me for it.", suggestions: ['Contact'] },
  location: () => ({ text: `I'm based in **${profile.location}**.`, suggestions: ['Contact', 'Experience'] }),
  social: () => ({
    text: 'You can find me here:',
    links: socialLinks.map((s) => ({ label: s.name, href: s.url })),
  }),
  services: () => ({
    text: `What I can help with:\n${services.map((s) => `• **${s.title}**: ${s.description}`).join('\n')}`,
    suggestions: ['Contact', 'Projects'],
  }),
  years: () => ({
    text: `I have **${profile.yearsOfExperience} years** of professional experience, most recently as ${experiences[0].role} at ${splitCompany(experiences[0].company)[0]}.`,
    suggestions: ['Experience'],
  }),
};

const projectReply = (p: (typeof projects)[number]): BotReply => ({
  text: `**${p.title}**\n${p.description}\n\n**Tech:** ${p.tags.join(', ')}`,
  links: p.demoUrl ? [{ label: `Open ${p.title.split(' - ')[0]}`, href: p.demoUrl }] : undefined,
});

const companyReply = (e: (typeof experiences)[number]): BotReply => ({
  text: `**${e.role}** at **${splitCompany(e.company).join(', ')}** (${e.duration})\n${e.description}`,
});

const domainReply = (d: (typeof skillDomains)[number]): BotReply => ({
  text: `**${d.name}**: ${d.skills.join(', ')}.`,
});

const skillReply = (found: SkillEntry[], askedProjects: boolean): BotReply => {
  const names = found.map((s) => s.name.toLowerCase());
  const usedIn = projects.filter((p) => p.tags.some((t: string) => names.some((n) => normalize(t).includes(normalize(n)))));
  const usedText = usedIn.map((p) => p.title.split(' - ')[0]).join(', ');
  const skillNames = found.map((s) => s.name).join(', ');
  if (askedProjects) {
    return {
      text: usedIn.length
        ? `${skillNames} is used in: **${usedText}**.`
        : `None of my listed projects mention ${skillNames} in their tech tags, but it's in my skills under ${found[0].domain}.`,
      suggestions: ['Projects'],
    };
  }
  const lines = found.map((s) => `• **${s.name}**, listed under ${s.domain}`);
  let text = `Yes, that's in my skill set:\n${lines.join('\n')}`;
  if (usedIn.length) text += `\n\nUsed in: ${usedText}.`;
  return { text };
};

const merge = (parts: BotReply[]): BotReply => ({
  text: parts.map((p) => p.text).join('\n\n'),
  links: parts.flatMap((p) => p.links ?? []),
  suggestions: parts.find((p) => p.suggestions)?.suggestions,
});

// ---------- main entry ----------
export function answer(question: string): BotReply {
  const q = normalize(question);
  if (!q) return replies.greet();

  const ranked = scoreIntents(q);
  const top = ranked[0];

  // Specific things named in the question take priority.
  const foundProjects = findProjects(q);
  const foundCompanies = findCompanies(q);
  const foundDomains = findDomains(q);
  // A skill whose name is also a domain keyword ("observability") means the whole domain.
  const domainWords = new Set(foundDomains.flatMap((d) => (domainKeywords[d.icon] ?? []).map(normalize)));
  const foundSkills = findSkills(q).filter((s) => !s.keys.some((k) => domainWords.has(k)));

  // "github link", "linkedin profile" -> social links, not the GitHub skill.
  if (ranked.includes('social') && !KNOW_QUESTION.test(q) && !foundProjects.length) return replies.social();

  const parts: BotReply[] = [];
  foundProjects.forEach((p) => parts.push(projectReply(p)));
  foundCompanies.forEach((e) => parts.push(companyReply(e)));
  if (foundSkills.length) parts.push(skillReply(foundSkills.slice(0, 5), ranked.includes('projects')));
  else foundDomains.slice(0, 2).forEach((d) => parts.push(domainReply(d)));

  // Contact/resume asked alongside something else ("email and resume").
  ['contact', 'resume'].forEach((i) => {
    if (ranked.includes(i) && parts.length) parts.push(replies[i]());
  });

  if (parts.length) return merge(parts.slice(0, 4));

  // "Do you know X?" where X isn't anywhere in the portfolio.
  // Contact + resume (+ socials) asked together.
  const contactish = ranked.filter((i) => ['contact', 'resume', 'social'].includes(i));
  if (contactish.length > 1) return merge(contactish.map((i) => replies[i]()));

  if (KNOW_QUESTION.test(q) && (!top || top === 'skills')) {
    const allIntentWords = new Set(Object.values(intents).flat().flatMap((k) => k.split(' ')));
    const leftover = tokens(q).filter((t) => !STOPWORDS.has(t) && !allIntentWords.has(t));
    if (leftover.length) {
      return {
        text: `I don't have **${leftover.slice(0, 4).join(' ')}** listed in my portfolio, so I can't say I've worked with it. Ask about my skills to see what I do use.`,
        suggestions: ['Skills', 'Contact'],
      };
    }
  }

  if (top && replies[top]) {
    if (top === 'greet' && ranked[1] && replies[ranked[1]]) return replies[ranked[1]]();
    return replies[top]();
  }

  return {
    text: "I can only answer from what's on this portfolio, and I couldn't find that here. Try asking about my skills, projects, experience, education, resume or contact details.",
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

export const WELCOME: BotReply = {
  text: `Hi! I'm ${profile.name}'s portfolio assistant. I answer only from what's on this site. What would you like to know?`,
  suggestions: DEFAULT_SUGGESTIONS,
};
