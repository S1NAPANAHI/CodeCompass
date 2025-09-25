export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'tool';
  status: 'completed' | 'in-progress' | 'planning';
  highlights: string[];
  challenges?: string[];
  learnings?: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years: number;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin?: string;
  twitter?: string;
  avatar: string;
  tagline: string;
  interests: string[];
}

export const portfolioData = {
  personal: {
    name: 'Sina Panahi',
    title: 'Full-Stack Developer & Creative Writer',
    bio: 'Passionate full-stack developer with a unique blend of technical expertise and creative writing skills. Currently building CodeCompass, a comprehensive platform for developer education, while crafting fantasy novels based on Persian mythology. I bring both analytical problem-solving and creative storytelling to every project.',
    location: 'Torino, Italy',
    email: 'sina@sinapanahi.dev',
    github: 'https://github.com/S1NAPANAHI',
    linkedin: 'https://linkedin.com/in/sinapanahi',
    avatar: '/api/placeholder/150/150',
    tagline: 'Building the future of developer education, one line of code at a time',
    interests: [
      'Full-Stack Development',
      'React & Next.js',
      'Persian Mythology & Zoroastrianism',
      'Creative Writing',
      'Database Design',
      'User Experience Design'
    ]
  } as PersonalInfo,

  projects: [
    {
      id: 'codecompass',
      title: 'CodeCompass Platform',
      description: 'Unified development platform combining site analysis, interview preparation, and portfolio showcase.',
      longDescription: 'CodeCompass is a comprehensive platform that helps developers master full-stack skills through three integrated tools: site analysis for reverse-engineering websites, interview preparation with 150+ React/Next.js questions, and a professional portfolio showcase. Built as a monorepo with shared components and unified authentication.',
      techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
      githubUrl: 'https://github.com/S1NAPANAHI/CodeCompass',
      liveUrl: 'https://codecompass.dev',
      imageUrl: '/api/placeholder/600/400',
      featured: true,
      category: 'fullstack',
      status: 'in-progress',
      highlights: [
        'Unified platform with 3 integrated applications',
        'Monorepo architecture with shared packages',
        'Real-time progress tracking with Supabase',
        'Comprehensive interview preparation system',
        'Advanced site analysis and component extraction'
      ],
      challenges: [
        'Integrating three separate applications into one cohesive platform',
        'Designing a scalable monorepo architecture',
        'Implementing cross-app state management',
        'Creating a unified design system'
      ],
      learnings: [
        'Advanced React patterns and hooks',
        'Monorepo management and shared packages',
        'Supabase real-time features',
        'TypeScript interface design',
        'Component architecture best practices'
      ]
    },
    {
      id: 'webcite-authors',
      title: 'Webcite for New Authors',
      description: 'Full-stack platform helping new authors build their online presence with content management and subscription features.',
      longDescription: 'A comprehensive platform designed specifically for emerging authors to establish their digital presence. Features include content management for books and blog posts, user authentication, subscription management with Stripe integration, and admin dashboard for content control.',
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'Stripe', 'NextUI', 'Vercel', 'Render'],
      githubUrl: 'https://github.com/S1NAPANAHI/Webcite-for-new-authors',
      liveUrl: 'https://webcite-authors.vercel.app',
      imageUrl: '/api/placeholder/600/400',
      featured: true,
      category: 'fullstack',
      status: 'completed',
      highlights: [
        'Complete author content management system',
        'Stripe payment integration for subscriptions',
        'Admin dashboard with full CRUD operations',
        'Responsive design with NextUI components',
        'Deployed on Vercel with Render backend'
      ],
      challenges: [
        'Complex database schema design for content relationships',
        'Stripe webhook integration and error handling',
        'CORS configuration for cross-origin requests',
        'Database migration and schema updates'
      ]
    },
    {
      id: 'interview-prep-standalone',
      title: 'React Interview Prep Hub',
      description: 'Comprehensive interview preparation platform with 150+ questions, spaced repetition, and analytics.',
      longDescription: 'A standalone interview preparation platform featuring interactive flashcards, coding challenges, spaced repetition algorithm, progress tracking, and comprehensive analytics. Now integrated into the CodeCompass platform.',
      techStack: ['Vanilla JavaScript', 'HTML5', 'CSS3', 'Supabase', 'PostgreSQL'],
      githubUrl: 'https://github.com/S1NAPANAHI/react-nextjs-interview-prep',
      liveUrl: 'https://react-nextjs-interview-prep.vercel.app',
      imageUrl: '/api/placeholder/600/400',
      featured: false,
      category: 'frontend',
      status: 'completed',
      highlights: [
        '150+ curated interview questions',
        'Spaced repetition algorithm implementation',
        'Real-time progress tracking',
        'Interactive coding challenges',
        'Performance analytics dashboard'
      ]
    },
    {
      id: 'zoroastervers',
      title: 'Zoroastervers - Persian Mythology Research',
      description: 'Comprehensive research platform for Persian mythology and Zoroastrianism, supporting novel writing.',
      longDescription: 'A personal research platform documenting Persian mythology, Zoroastrian concepts, and Shahnameh characters. This platform supports my fantasy novel series based on Persian mythology and serves as a comprehensive knowledge base.',
      techStack: ['Research', 'Content Creation', 'Mythology', 'World Building'],
      githubUrl: '#',
      liveUrl: 'https://zoroastervers.com',
      imageUrl: '/api/placeholder/600/400',
      featured: false,
      category: 'tool',
      status: 'in-progress',
      highlights: [
        'Extensive mythology research database',
        'Character profiles and relationships',
        'Timeline and historical context',
        'World-building documentation'
      ]
    }
  ] as Project[],

  skills: [
    // Frontend
    { name: 'React', category: 'frontend', level: 'advanced', years: 3, icon: '⚛️' },
    { name: 'Next.js', category: 'frontend', level: 'advanced', years: 2, icon: '▲' },
    { name: 'TypeScript', category: 'frontend', level: 'advanced', years: 3, icon: '🔷' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 'expert', years: 4, icon: '🟨' },
    { name: 'HTML5 & CSS3', category: 'frontend', level: 'expert', years: 4, icon: '🎨' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'advanced', years: 2, icon: '💨' },
    { name: 'Responsive Design', category: 'frontend', level: 'advanced', years: 3, icon: '📱' },
    
    // Backend
    { name: 'Node.js', category: 'backend', level: 'intermediate', years: 2, icon: '🟢' },
    { name: 'Express.js', category: 'backend', level: 'intermediate', years: 2, icon: '🚂' },
    { name: 'REST APIs', category: 'backend', level: 'intermediate', years: 2, icon: '🔗' },
    { name: 'Authentication', category: 'backend', level: 'intermediate', years: 2, icon: '🔐' },
    
    // Database
    { name: 'PostgreSQL', category: 'database', level: 'intermediate', years: 2, icon: '🐘' },
    { name: 'Supabase', category: 'database', level: 'advanced', years: 2, icon: '⚡' },
    { name: 'SQL', category: 'database', level: 'intermediate', years: 2, icon: '📊' },
    { name: 'Database Design', category: 'database', level: 'intermediate', years: 2, icon: '🗄️' },
    
    // Tools
    { name: 'Git & GitHub', category: 'tools', level: 'advanced', years: 4, icon: '📚' },
    { name: 'Vercel', category: 'tools', level: 'advanced', years: 2, icon: '▲' },
    { name: 'Railway', category: 'tools', level: 'intermediate', years: 1, icon: '🚆' },
    { name: 'VS Code', category: 'tools', level: 'expert', years: 4, icon: '💻' },
    { name: 'Figma', category: 'tools', level: 'intermediate', years: 2, icon: '🎨' },
    { name: 'Obsidian', category: 'tools', level: 'advanced', years: 2, icon: '🧠' },
    
    // Languages
    { name: 'Python', category: 'languages', level: 'intermediate', years: 2, icon: '🐍' },
    { name: 'English', category: 'languages', level: 'expert', years: 10, icon: '🇺🇸' },
    { name: 'Italian', category: 'languages', level: 'intermediate', years: 3, icon: '🇮🇹' },
    { name: 'Persian', category: 'languages', level: 'expert', years: 25, icon: '🇮🇷' }
  ] as Skill[],

  experience: [
    {
      id: 'zitsticka-saxx',
      company: 'ZitSticka & SAXX Underwear',
      position: 'Customer Service Representative',
      duration: '2024 - Present',
      description: 'Providing exceptional customer service for premium brands, handling email support, returns, and technical inquiries while maintaining high customer satisfaction scores.',
      responsibilities: [
        'Handle customer inquiries via email and chat support',
        'Process returns, exchanges, and warranty claims',
        'Resolve technical issues and product questions',
        'Maintain detailed customer interaction records',
        'Collaborate with internal teams for complex issues'
      ],
      technologies: ['Customer Service Platforms', 'Email Management', 'Database Systems'],
      achievements: [
        'Consistently maintained high customer satisfaction ratings',
        'Developed efficient response templates and workflows',
        'Successfully handled complex return and warranty cases'
      ]
    },
    {
      id: 'remarkableai',
      company: 'RemarkableAI',
      position: 'Web Developer & Content Creator',
      duration: '2023 - 2024',
      description: 'Contributed to web development projects and content creation for AI-focused company, gaining experience in modern development practices and technical writing.',
      responsibilities: [
        'Developed responsive web components',
        'Created technical content and documentation',
        'Collaborated on frontend development tasks',
        'Assisted with project management and planning'
      ],
      technologies: ['React', 'JavaScript', 'HTML/CSS', 'Content Management'],
      achievements: [
        'Improved website performance and user experience',
        'Created comprehensive technical documentation',
        'Successfully delivered multiple web development projects'
      ]
    }
  ] as Experience[],

  education: [
    {
      institution: 'Self-Taught Developer',
      degree: 'Full-Stack Web Development',
      duration: '2021 - Present',
      description: 'Comprehensive self-directed learning in modern web development technologies, focusing on React ecosystem, full-stack development, and best practices.',
      courses: [
        'React & Next.js Mastery',
        'Node.js & Express Backend Development',
        'Database Design & PostgreSQL',
        'TypeScript & Modern JavaScript',
        'System Design & Architecture'
      ]
    }
  ],

  certifications: [
    {
      name: 'Full-Stack Development Portfolio',
      issuer: 'Self-Validated',
      date: '2024',
      description: 'Demonstrated through multiple deployed projects including CodeCompass platform'
    },
    {
      name: 'React Development Expertise',
      issuer: 'Project-Based Learning',
      date: '2023',
      description: 'Advanced React patterns, hooks, and modern development practices'
    }
  ],

  contact: {
    email: 'sina@sinapanahi.dev',
    phone: null, // Private
    location: 'Torino, Italy',
    timezone: 'CET (UTC+1)',
    availability: 'Available for freelance projects and full-time opportunities',
    preferredContact: 'Email or GitHub',
    social: {
      github: 'https://github.com/S1NAPANAHI',
      linkedin: 'https://linkedin.com/in/sinapanahi',
      twitter: 'https://twitter.com/sinapanahi'
    },
    workingHours: 'Monday - Friday, 9:00 AM - 6:00 PM CET',
    responseTime: 'Usually within 24 hours'
  },

  stats: {
    projectsCompleted: 4,
    yearsExperience: 3,
    technologiesUsed: 25,
    githubContributions: 500, // Approximate
    linesOfCode: 50000, // Approximate
    coffeeCupsConsumed: 'Infinite ☕'
  },

  testimonials: [
    {
      name: 'Anonymous Colleague',
      company: 'Previous Workplace',
      text: 'Sina brings a unique combination of technical skills and creative thinking to every project. Their attention to detail and problem-solving abilities make them a valuable team member.',
      rating: 5
    }
  ],

  currentFocus: [
    'Building and scaling CodeCompass platform',
    'Advanced React patterns and performance optimization',
    'Full-stack architecture and system design',
    'Open source contributions',
    'Writing fantasy novels based on Persian mythology'
  ],

  availability: {
    status: 'Available for new opportunities',
    type: ['Full-time', 'Contract', 'Freelance'],
    remote: true,
    relocation: false,
    startDate: 'Immediate',
    hourlyRate: 'Contact for rates',
    preferredRoles: [
      'Full-Stack Developer',
      'Frontend Developer (React/Next.js)',
      'JavaScript Developer',
      'TypeScript Developer'
    ]
  }
};

export default portfolioData;