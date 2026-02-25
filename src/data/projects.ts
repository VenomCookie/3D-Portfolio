export type Collaborator = {
  name: string;
  linkedinUrl: string;
};

export type Slide = {
  id: string;
  image: string;
  caption: string;
  priority: number;
};

export type Project = {
  id: string;
  title: string;
  category: string; // Changed to string to support more categories
  status: 'completed' | 'in-progress';
  icon: string;
  description: string;
  context: string;
  body: string; // Added for vertically scrolling page content
  slides: Slide[];
  collaborators?: Collaborator[];
};

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Liquid Glass UI',
    category: 'Product Design',
    status: 'completed',
    icon: 'Droplet',
    description: 'A modern UI kit based on glassmorphism and fluid animations.',
    context: 'Created to explore the boundaries of CSS backdrop-filters and Framer Motion.',
    body: 'This project involved an extensive exploration of glassmorphism. I started by defining a core set of CSS variables that could be easily themed. Then, I built a component library using React and Framer Motion to bring the UI to life with fluid transitions. The result is a highly customizable and visually stunning UI kit.',
    slides: [
      { id: 's1', image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop', caption: 'Hero Section Design', priority: 1 },
      { id: 's2', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop', caption: 'Component Library', priority: 2 },
      { id: 's3', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', caption: 'Dark Mode Variations', priority: 3 },
    ],
    collaborators: [
      { name: 'Jane Doe', linkedinUrl: 'https://linkedin.com/in/janedoe' }
    ]
  },
  {
    id: 'p2',
    title: 'Aero Physics Engine',
    category: 'Web Dev',
    status: 'completed',
    icon: 'Cpu',
    description: 'A lightweight 2D physics engine for web games.',
    context: 'Built from scratch using TypeScript to understand collision detection algorithms.',
    body: 'Developing a physics engine from scratch was a challenging but rewarding experience. I focused on implementing efficient collision detection using spatial hashing and resolving collisions with realistic impulses. The engine is designed to be lightweight and easy to integrate into any web-based game.',
    slides: [
      { id: 's4', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', caption: 'Collision Resolution', priority: 1 },
      { id: 's5', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop', caption: 'Performance Metrics', priority: 2 },
    ]
  },
  {
    id: 'p3',
    title: 'Eco App Concept',
    category: 'UI/UX',
    status: 'in-progress',
    icon: 'Leaf',
    description: 'Mobile app concept for tracking carbon footprint.',
    context: 'Personal project aimed at improving sustainable living habits.',
    body: 'The Eco App aims to make tracking carbon footprint as easy as tracking steps. I am currently working on the wireframes and user flows, focusing on creating a seamless and engaging experience. The next step will be to develop a high-fidelity prototype.',
    slides: [
      { id: 's6', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop', caption: 'Wireframes', priority: 1 },
    ]
  },
  {
    id: 'p4',
    title: 'Smart Home Hub',
    category: 'Hardware',
    status: 'in-progress',
    icon: 'Home',
    description: 'IoT dashboard for controlling smart home devices.',
    context: 'Integrating various APIs into a single unified dashboard.',
    body: 'This project involves integrating multiple smart home APIs (like Philips Hue, Nest, etc.) into a single, unified dashboard. I am using React for the frontend and Node.js for the backend to handle the API integrations. The goal is to create a seamless experience for managing all smart home devices from one place.',
    slides: [
      { id: 's7', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop', caption: 'Dashboard UI', priority: 1 },
    ]
  },
  {
    id: 'p5',
    title: 'Concepts',
    category: 'Concepts',
    status: 'in-progress',
    icon: 'Lightbulb',
    description: 'A collection of experimental design concepts and ideas.',
    context: 'Exploring new interaction paradigms and visual styles.',
    body: 'This folder contains various experimental concepts that I have been working on. These range from new UI paradigms to speculative hardware designs. The goal is to push the boundaries of what is possible and explore new ways of interacting with technology.',
    slides: [
      { id: 's8', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop', caption: 'Concept 1', priority: 1 },
    ]
  },
  {
    id: 'p6',
    title: 'Archives',
    category: 'Archives',
    status: 'completed',
    icon: 'Archive',
    description: 'Older projects from 2020-2023.',
    context: 'A look back at my earlier work and progression as a designer.',
    body: 'This archive contains some of my earlier projects. While they may not reflect my current skill level, they are an important part of my journey and show how I have grown as a designer and engineer over the years.',
    slides: [
      { id: 's9', image: 'https://images.unsplash.com/photo-1481481312836-438d0ceb2b58?q=80&w=2070&auto=format&fit=crop', caption: 'Old Project 1', priority: 1 },
    ]
  }
];
