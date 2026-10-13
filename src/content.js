// Everything the site says comes from this file.
//
// Filling it in:
// - Replace each [bracketed] slot with real text. Bracketed values render as
//   visible placeholders, and bracketed links render as dead, dashed buttons.
// - Set a link to null to hide that button or icon entirely.
// - Empty an array ([]) to hide that whole section and its trace-rail step.
// - `skills` on projects and internship work items must use the exact names
//   from the `skills` groups below; that is how skill hover links them.

export default {
  meta: {
    title: 'Sai Manoj · AI Engineer',
    description: 'Sai Manoj Varikuntla, AI/ML engineer in Hyderabad. Semantic search, RAG and document retrieval systems.',
    url: 'https://saimanojvarikuntla-portfolio.vercel.app', // the live address, for link previews and the sitemap
    image: 'public/image.webp', // the picture shown when the link is shared
  },

  person: {
    name: 'Sai Manoj Varikuntla',
    initials: 'SM',
    role: 'an AI engineer', // finishes the headline: "I'm [Name], [role]."
    // intro: 'I engineer retrieval pipelines and agentic systems that ground language models in evidence rather than conjecture.',
    // status: '[Open to AI engineering roles]', // the pill above the headline; null hides it
    photo: '/image.webp', // path in /public, e.g. '/me.jpg'; null hides it
    photoTags: ['Hyderabad', 'Open to AI engineering roles'], // little chips floating on the photo
    aboutTitle: 'Behind the run',
    about: [
      'I’m interested in building AI agents that can do more than call tools and generate text. I enjoy figuring out how retrieval, orchestration, evaluation, and failure handling fit together to make systems genuinely useful beyond a controlled environment.',
    ],
    facts: [
      { label: 'Based in', value: 'Hyderabad, India' },
      { label: 'Currently', value: 'Graduated' },
      { label: 'Focus', value: 'Agents, SaaS, Develop' },
      { label: 'Off the clock', value: 'Music · Gym · Films' },
    ],
  },

  links: {
    resume: 'https://drive.google.com/file/d/1X9YE9iezKu7HsuzBS2ukmDRWAQQQcYCD/view?usp=sharing', // e.g. '/resume.pdf' after dropping the file in /public
    email: 'varikuntlasaimanoj@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sai-manoj-varikuntla-082b782b8/',
    github: 'https://github.com/VARIKUNTLASAIMANOJ',
    // phone: '[+00 00000 00000]',
    // source: '[https://github.com/you/portfolio]',
  },

  // The floating "Ask my agent" chat. Questions are answered on this page
  // only, from the content in this file.
  ask: {
    name: 'Bubble', // the assistant's name, shown in the chat header; null falls back to "<first name>'s assistant"
    suggestions: [
      'What did Sai Manoj build at ICRISAT?',
      'Walk me through Aperture',
      'Which RAG and agent projects stand out?',
      'Is Sai Manoj open to new roles?',
      'How do I get in touch?',
    ],
    // Optional hand-written answers, checked before the automatic ones.
    // Wrap a section id in braces to link it: {about} {skills} {projects}
    // {log} {experience} {checkpoints} {certs} {contact}
    answers: [
      // { match: ['visa', 'relocate'], text: 'Your answer here. More in {contact}.' },
    ],
  },

  // Each group becomes one circuit on the skills board.
  // level: your own 1–10 rating (null hides the bar).
  // icon: a Simple Icons slug like 'tensorflow' or 'django' (see
  //       simpleicons.org), or a path to your own image in /public, or null.
  skills: [
    {
      items: [
        { name: 'Python', level: 8, icon: null },
        { name: 'Generative AI', level: 7, icon: null },
        { name: 'Agentic AI', level: 6, icon: null },
        { name: 'LangChain', level: 6, icon: null },
        { name: 'LangGraph', level: 6, icon: null },
        { name: 'RAG', level: 5, icon: null },
        { name: 'Multi-Agent Systems', level: 8, icon: null },
        { name: 'LLMS', level: 6, icon: null },
        { name: 'Embeddings', level: 7, icon: null },
        { name: 'Vector Databases', level: 7, icon: null },
        { name: 'PostgreSQL', level: 5, icon: null },
        { name: 'FastAPI', level: 6, icon: null },
        { name: 'React', level: 8, icon: null },
        { name: 'TypeScript', level: 6, icon: null },
        { name: 'Git', level: 6, icon: null },
        { name: 'GCP', level: 5, icon: null },
        { name: 'Docker', level: 7, icon: null },
        { name: 'Postman', level: 7, icon: null },
      ],
    },
  ],

  // Each project reads like a tool: what goes in, what comes out, and how
  // it's wired.
  projects: [
    {
      name: 'Aperture',
      signature: 'onboard(candidate) → Offer → Appointment → Onboarded',
      summary: 'An HR onboarding agent built for Indian companies. A LangGraph state machine takes a selected candidate from offer letter to appointment letter to onboarding, works out the CTC breakup with EPF, ESI, PT and TDS, and waits for HR approval before any letter goes out.',
      tags: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Next.js', 'LiveKit', 'NVIDIA NIM'],
      status: 'shipped', // 'shipped' | 'in progress' | 'archived'
      // Architecture, left to right. Each inner array is one layer; every
      // box connects to every box in the next layer. Use 'Label · detail'
      // to add a second line.
      architecture: [
        ['HR console · Next.js', 'Candidate portal'],
        ['FastAPI · SSE stream'],
        ['LangGraph · 9 nodes'],
        ['Triage · Nemotron', 'Salary · EPF, ESI, TDS', 'Letters · PDF'],
        ['Postgres · checkpoints', 'Resend · email', 'LiveKit · voice'],
      ],
      // optional { src, alt } screenshot. It becomes the project's thumbnail
      // and big preview; the architecture diagram moves to its own tab.
      media: null,
      code: 'https://github.com/VARIKUNTLASAIMANOJ/Aperture',
      demo: null,
      skills: ['LangGraph', 'Agentic AI', 'Multi-Agent Systems', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Python'],
    },
    {
      name: 'Tejoraj',
      signature: 'research(topic, persona) → Answer | Paper',
      summary: 'A space research assistant that grounds a local LLM in arXiv papers and NASA data. Ask questions through one of five expert personas, or have it draft a full research paper with NASA figures, exported as PDF or DOC.',
      tags: ['LangGraph', 'LangChain', 'Ollama', 'FastAPI', 'React', 'Supabase'],
      status: 'shipped',
      architecture: [
        ['React · chat, papers'],
        ['FastAPI · LangGraph agent'],
        ['arXiv · papers', 'NASA · data, images'],
        ['Ollama · local LLM'],
        ['Cited answer', 'Paper · PDF, DOC'],
      ],
      media: null,
      code: 'https://github.com/VARIKUNTLASAIMANOJ/Tejoraj',
      demo: null,
      skills: ['LangGraph', 'LangChain', 'RAG', 'LLMS', 'FastAPI', 'React', 'Docker', 'Python'],
    },
    {
      name: 'ShopScribe',
      signature: 'analyze(product, store) → SentimentReport',
      summary: 'A shopping assistant for Indian e-commerce. It scrapes listings and reviews from Amazon, Flipkart and Myntra with Firecrawl, has Gemini turn the raw pages into clean JSON, then scores every review with VADER and charts sentiment by aspect and over time.',
      tags: ['Python', 'Streamlit', 'Firecrawl API', 'Google Gemini API', 'VADER Sentiment', 'Pandas / Matplotlib / Seaborn'],
      status: 'shipped',
      architecture: [
        ['Streamlit · search'],
        ['Firecrawl · live scraping'],
        ['Gemini · page → JSON'],
        ['VADER · review sentiment', 'Gemini · aspects'],
        ['Report · charts, trends'],
      ],
      media: null,
      code: 'https://github.com/VARIKUNTLASAIMANOJ/ShopScribe',
      demo: null,
      skills: ['Python', 'Generative AI', 'LLMS'],
    },
  ],

  // "Shipping log": your GitHub contribution graph, loaded live in the
  // visitor's browser from a public API. null hides the section.
  log: {
    githubUser: 'VARIKUNTLASAIMANOJ', // your GitHub username
  },

  // Optional cards beside the experience timeline. [] hides them.
  // products: [
  //   { name: '[Product]', kind: '[Area · domain]', detail: '[What you did on it.]', link: '[https://product.example.com]' },
  //   { name: '[Product]', kind: '[Area · domain]', detail: '[What you did on it.]', link: null },
  //   { name: '[Product]', kind: '[Area · domain]', detail: '[What you did on it.]', link: null },
  //   { name: '[Product]', kind: '[Area · domain]', detail: '[What you did on it.]', link: null },
  // ],

  // Newest first.
  experience: [
    {
      role: 'AI Intern',
      org: 'International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)',
      dates: 'Oct 2026 — Present',
      location: 'Hyderabad, India',
      mode: 'Onsite',
      // summary: '[One or two sentences on the role.]',
      // items: [
      //   {
      //     title: '[Work item]',
      //     bullets: ['[What you did and why it mattered.]'],
      //     metrics: [
      //       { value: '[Metric]', label: '[label]' },
      //       { value: '[Metric]', label: '[label]' },
      //     ],
      //     steps: ['[Input]', '[Step]', '[Output]'],
      //     skills: ['[Skill E]', '[Skill H]'],
      //   },
      //   {
      //     title: '[Work item]',
      //     bullets: ['[What you did and why it mattered.]'],
      //     metrics: [],
      //     steps: [],
      //     skills: ['[Skill K]'],
      //   },
      // ],
      // link: null,
    },
        {
      role: 'AI/ ML Intern',
      org: 'International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)',
      dates: 'Feb 2026 — Aug 2026',
      location: 'Hyderabad, India',
      mode: 'Onsite',
      summary: 'Built a Retrieval-Augmented Generation (RAG) system using LangGraph, Qdrant, and locally hosted Llama models to enable natural language querying over a large scientific research corpus — achieving 80%+ response accuracy with a custom 6-layer evidence validation pipeline to minimize hallucination, with no dependency on external APIs.\n\nDeveloped an agro-meteorological intelligence platform for Telangana combining 30-year ERA5 reanalysis validation, GRU/LSTM deep learning forecasting, FAO-56 irrigation advisory logic, and an NVIDIA Earth-2 (FourCastNet 3 + CorrDiff) real-time forecasting web app — resolving forecasts down to mandal level across all 33 Telangana districts, with 110 automated tests passing.',
      // items: [
      //   {
      //     title: '[Work item]',
      //     bullets: ['[What you did and why it mattered.]'],
      //     metrics: [{ value: '[Metric]', label: '[label]' }],
      //     steps: ['[Input]', '[Step]', '[Step]', '[Output]'], // optional flow diagram
      //     // skills: ['[Skill A]', '[Skill B]'],
      //   },
      //   {
      //     title: '[Work item]',
      //     bullets: ['[What you did and why it mattered.]'],
      //     metrics: [],
      //     steps: [],
      //     // skills: ['[Skill C]'],
      //   },
      // ],
      link: { label: 'View internship certificate', href: 'https://drive.google.com/file/d/12CeNq7GGSGtpMR0pOBEiGdNS-ho4UvIS/view?usp=sharing' }, // null hides it
    },
  ],

  // Newest first. type: 'award' | 'publication' | 'education' | 'certification'
  checkpoints: [
    { type: 'education', date: '2026', title: 'B.Tech — Malla Reddy University', detail: 'Computer Science Engineering - AI & ML · Hyderabad · CGPA 8.09/10', link: null },
    { type: 'award', date: '2024', title: '2nd Place — National Hackathon', detail: 'Malla Reddy University · GenAI Chatbot', link: null },
    { type: 'award', date: '2026', title: 'Winner - AgentX Hackathon', detail: 'Anurag University, Salesforce · Designed and implemented an AI-driven customer onboarding & CRM workflow using Agentforce and Data Cloud', link: null },
    { type: 'publication', date: '2025', title: 'AI-Powered Shopping Assistants Using Sentiment Analysis', link: 'https://drive.google.com/file/d/1vSmBFQfjzSmPDLE8xqgybT5Rg-hbFHww/view?usp=sharing' },
  ],

  // The certificates carousel. image: a picture of the certificate in
  // /public (e.g. '/certs/meta-frontend.png'); null draws a stand-in.
  // logo: the issuer's mark in the card's seal. A Simple Icons slug (like
  // 'postman' or 'udemy'), a path in /public, or an image URL; null shows the
  // issuer's initials.
  certifications: [
    //{ name: 'Complete Generative AI Course With Langchain and Huggingface', issuer: 'Udemy', logo: 'udemy', date: '[Month Year]', image: null, link: '[https://credential.example.com]' },
    { name: 'Postman API Fundamentals Student Expert', issuer: 'Postman', logo: 'postman', date: 'Oct 2025', image: null, link: 'https://drive.google.com/file/d/1qutuSPH-yzMxmhyzYOlzp5mXfw1C4T-F/view?usp=sharing' },
    { name: 'Machine Learning Bootcamp', issuer: 'GDSC', logo: '/logos/gdsc.svg', date: 'March 2024', image: null, link: 'https://drive.google.com/file/d/1T94jE2lW6BQb4X_ENaOXqcKKZyDOI65a/view?usp=sharing' },
    { name: 'AWS Academy Graduate - Cloud Foundations', issuer: 'AWS Academy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', date: 'March 2026', image: null, link: 'https://drive.google.com/file/d/1Gjw60Fewnk0Gdta0XsWiCNpY72eToEOa/view?usp=sharing' },
  ],

  contact: {
    lead: 'Have a role, a project, or a problem worth solving? Tell me about it.',
    // Where the form posts. Works with Formspree-style endpoints that accept
    // JSON, e.g. 'https://formspree.io/f/xxxxxxx'. While this is a [slot],
    // the dev server pretends the send worked; a production build reports an
    // error and points visitors to email instead.
    endpoint: '[form endpoint]',
  },
};
