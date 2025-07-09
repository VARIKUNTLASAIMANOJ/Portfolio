export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  codeUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Flora-ID',
    description: 'It is a Machine Learning project based on a classification task. Features include Sepal-width, Sepal-height, Petal-width, and Petal-height. Predicted variables are species of the iris flower. Upon providing the sepal and petal measurements, the model will predict and display the image and details of the species..',
    technologies: ['HTML', 'CSS', 'Flask', 'Python', 'ML'],
    liveUrl: 'https://varikuntlasaimanoj.github.io/FLORA-ID/index%20(2).html',
    codeUrl: 'https://github.com/VARIKUNTLASAIMANOJ/VARIKUNTLASAIMANOJ.github.io',
    featured: true
  },
  {
    id: '2',
    title: 'ToxiDetect',
    description: 'Developed an AI-powered toxicity classification system using DistilBERT, enhancing detection of toxic comments (e.g., hate speech, threats) through natural language processing and deep learning techniques. Integrated features include text, audio, and image analysis, along with an intuitive web interface using Gradio for real-time predictions and a feedback mechanism for continuous improvement. Achieved high accuracy using metrics such as precision, recall.',
    technologies: ['Python'],
    liveUrl: '',
    codeUrl: 'https://github.com/VARIKUNTLASAIMANOJ/ToxiDetect',

    featured: true
  },
  {
    id: '3',
    title: 'Nova AI',
    description: 'Nova AI is an intelligent AI chatbot designed for knowledge assistance, and personalized conversations. It leverages Google Gemini API to generate smart responses, supports voice input, text-to-speech, PDF processing, and real-time weather updates.This multi-functional AI assistant comes with custom AI personas (Teacher, Friend, Expert, etc.), smart reply suggestions, and speech synthesis for an enhanced user experience.',
    technologies: ['Python', 'Streamlit', 'Gemini API', 'AI'],
    liveUrl: 'https://nova-ai-mjappzzq7naudqp2hhmmje9.streamlit.app/',
    codeUrl: 'https://github.com/VARIKUNTLASAIMANOJ/Nova-AI',
    featured: true
  },
  {
    id: '4',
    title: 'Beyond-Horizon',
    description: 'Beyond Horizon is a sophisticated space exploration web application built with React, Three.js, and Framer Motion, showcasing interactive 3D visualizations of the solar system, space missions, and cosmic discoveries. The project leverages React 18 with TypeScript for type safety, Three.js with React Three Fiber for immersive 3D graphics, and Framer Motion for smooth animations. Notable features include real-time planet orbits, a comprehensive space mission database, latest discoveries catalog, physics equations explorer, and a secure contact system using the Resend API. The application demonstrates expertise in modern web development, 3D graphics programming, responsive design with Tailwind CSS, and full-stack integration while providing an engaging educational platform about space exploration.',
    technologies: ['React', 'Three.js', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://beyond-horizon-dusky.vercel.app/',
    codeUrl: 'https://github.com/VARIKUNTLASAIMANOJ/Beyond-Horizon',
    featured: true
  },
 {
    id: '5',
    title: 'QuizWise',
    description: 'QuizWise is a AI - powered quiz platform that enables users to create, manage, and take interactive quizzes with a modern UI and real-time backend logic. It is built with Python, React, TailwindCSS, and Vite, offering a scalable solution for educational or entertainment-based quizzes.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Python', 'FastAPI', 'Google API(Scripts)'],
    liveUrl: 'https://quizwise-m.vercel.app/',
    codeUrl: 'https://github.com/VARIKUNTLASAIMANOJ/QuizWise',
    featured: true
  },
  {
    id: '6',
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting system built on blockchain technology with smart contracts.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
    liveUrl: 'https://example.com/project6',
    codeUrl: 'https://github.com/username/project6',
    featured: false
  }
];
