# Sai Manoj Varikuntla: knowledge base

<!--
  The portfolio chatbot answers ONLY from this file (served by /api/chat with Groq).
  - Plain Markdown; add, remove or rename sections freely.
  - Anything written here can be repeated to any visitor, so keep private
    details (phone number, home address, salary history) out.
  - Text inside HTML comments like this one is stripped before the model sees it.
  - Edits apply to the next question; no restart needed.
-->

## At a glance

- Name: Sai Manoj Varikuntla (goes by Sai Manoj)
- Pronouns: <!-- add yours here, e.g. he/him; until then the bot uses the name -->
- Role: AI / ML engineer
- Based in: Hyderabad, India
- Education: B.Tech in Computer Science and Engineering (AI & ML), Malla Reddy University, Sept 2022 to June 2026, CGPA 8.09/10. Graduated.
- Currently: AI Intern at ICRISAT (since Oct 2026)
- Looking for: AI engineering roles
- Focus areas: agents, SaaS, retrieval (RAG) and LLM applications
- Off the clock: music, gym, films

## Summary

CSE (AI/ML) graduate with hands-on AI/ML internship experience at ICRISAT in machine learning, deep learning, predictive analytics and generative AI. Works with Python, SQL, data analysis, RAG, NLP, LLMs and API-based deployment. Has built forecasting, intelligent retrieval, sentiment analysis and multi-agent AI systems for real-world use.

In Sai Manoj's own words: "I engineer retrieval pipelines and agentic systems that ground language models in evidence rather than conjecture. I work on the messy middle between AI research and real-world software: getting the right context, making outputs trustworthy, and turning model capabilities into systems that actually work. Most of the interesting problems live in the details."

## Contact

- Email: varikuntlasaimanoj@gmail.com (fastest)
- LinkedIn: https://www.linkedin.com/in/sai-manoj-varikuntla-082b782b8/
- GitHub: https://github.com/VARIKUNTLASAIMANOJ
- Résumé: https://drive.google.com/file/d/1X9YE9iezKu7HsuzBS2ukmDRWAQQQcYCD/view?usp=sharing
- The contact form at the bottom of the portfolio sends straight to Sai Manoj's inbox.
- Phone: not shared publicly; use email or the contact form.

## Experience

### AI Intern, ICRISAT (Oct 2026 to present)

International Crops Research Institute for the Semi-Arid Tropics, Hyderabad, India. Onsite. Current role.
<!-- Add what you're working on here when you can share it. -->

### AI/ML Intern, ICRISAT (Feb 2026 to Aug 2026)

International Crops Research Institute for the Semi-Arid Tropics, Hyderabad, India. Onsite.

- Built a RAG system with LangGraph, Qdrant and local Llama models for scientific knowledge retrieval, reaching 80%+ response accuracy.
- Designed a 6-layer evidence validation pipeline that reduces hallucinations and makes LLM answers more reliable, without external APIs.
- Built an agro-meteorological predictive analytics platform using 30 years of ERA5 climate data, GRU/LSTM forecasting and FAO-56 irrigation advisory for Telangana.
- Integrated NVIDIA Earth-2, FourCastNet 3 and CorrDiff into a real-time forecasting web app for mandal-level predictions across all 33 Telangana districts, with 110 automated tests passing.
- Internship certificate: https://drive.google.com/file/d/12CeNq7GGSGtpMR0pOBEiGdNS-ho4UvIS/view?usp=sharing

## Projects

### Aperture: HR onboarding agent

An HR onboarding agent built for Indian companies. A LangGraph state machine takes a selected candidate from offer letter to appointment letter to onboarding, works out the CTC breakup with EPF, ESI, PT and TDS, and waits for HR approval before any letter goes out.

- How it works: a 9-node LangGraph graph (triage, salary, offer, dispatch, offer gate, appointment, onboarding and error handling) with PostgreSQL checkpointing, so a run can pause and resume across days. Human-in-the-loop gates stop the graph before the offer letter is released, while waiting for the candidate's decision, and before the appointment letter is released.
- India-specific: salary breakups in ₹/LPA with EPF, ESI, professional tax and TDS; Indian states and cities.
- Letters are rendered deterministically from the graph's state as HTML and PDF (no model writes the numbers); an LLM (NVIDIA Nemotron via NIM) is used only for prose such as a considerate rejection email.
- Email delivery through Resend; a LiveKit voice agent (Deepgram speech) can follow up by phone with candidates who haven't replied. A phone call can never accept an offer; acceptance stays a click in the candidate portal.
- Frontend: a Next.js HR console with a live SSE stream of the run, plus a candidate portal.
- Stack: LangGraph, FastAPI, PostgreSQL, Celery, Redis, Next.js, React Three Fiber, LiveKit, NVIDIA NIM, Resend.
- Code: https://github.com/VARIKUNTLASAIMANOJ/Aperture

### Tejoraj: AI space research platform

A space research assistant that grounds a local LLM in arXiv papers and NASA data. Visitors ask questions through one of five expert personas (space researcher, space scientist, astronaut, mission commander, astrophysicist), or have it draft a full research paper with NASA figures, exported as PDF or DOC.

- How it works: a LangGraph agent prepares a persona prompt, retrieves sources from arXiv and NASA, and answers with citations. A paper generator writes title, keywords and sections, embeds NASA images, and exports the paper.
- Also includes a space explorer with NASA's picture of the day, an image gallery and spaceflight news.
- Stack: React (Vite), FastAPI, LangGraph, LangChain, Ollama (local LLM), Supabase (auth and chat history), ReportLab, Docker.
- Code: https://github.com/VARIKUNTLASAIMANOJ/Tejoraj

### ShopScribe: AI shopping assistant

A shopping assistant for Indian e-commerce. It scrapes listings and reviews from Amazon, Flipkart and Myntra with Firecrawl, uses Google Gemini to turn the raw pages into clean JSON, then scores every review with VADER and charts sentiment by aspect and over time.

- Features: product search across the three stores, review sentiment (positive, neutral, negative, mixed), aspect-based analysis (for example comfort or battery life), and sentiment trend charts.
- Stack: Python, Streamlit, Firecrawl, Google Gemini, VADER, Pandas, Matplotlib, Seaborn.
- The research behind it was published as a paper (see Publications).
- Code: https://github.com/VARIKUNTLASAIMANOJ/ShopScribe

## Skills

- Programming and data: Python, SQL, Pandas, NumPy, Matplotlib, data analysis, feature engineering
- Machine learning: deep learning, predictive modeling, regression, classification, time-series forecasting, model evaluation, NLP, sentiment analysis
- Generative AI: RAG, LLMs, LangChain, LangGraph, multi-agent systems, agentic AI, embeddings, vector databases (Qdrant), Llama, Google Gemini, prompt engineering
- Backend and cloud: FastAPI, REST APIs, Streamlit, PostgreSQL, MySQL, Supabase, Docker, AWS, GCP
- Frontend: React, TypeScript
- Tools: Git, GitHub, Postman, Power BI

## Publications

- "AI-Powered Shopping Assistants Using Sentiment Analysis", April 2025, IJARESM. Authors: Prof. Sabyasachi Chakraborty, V. Sai Manoj, Tejaswi Mahadev, U. Pranay Reddy, T. Vishal Prem, T. Vamshi Krishna. DOI: 10.56025/IJARESM.2025.1304252562. Paper: https://drive.google.com/file/d/1vSmBFQfjzSmPDLE8xqgybT5Rg-hbFHww/view?usp=sharing

## Awards

- Winner, AgentX 24-Hour Innovation Hackathon (Anurag University with Salesforce), 2026: designed and built an AI-driven customer onboarding and CRM workflow using Agentforce and Data Cloud.
- 2nd Prize, National Level Hackathon, Malla Reddy University, 2024: a GenAI chatbot.

## Certifications

- AWS Academy Graduate: Cloud Foundations (AWS Academy, March 2026): https://drive.google.com/file/d/1Gjw60Fewnk0Gdta0XsWiCNpY72eToEOa/view?usp=sharing
- Complete Generative AI Course with LangChain and HuggingFace (Udemy)
- Complete Python Pro Bootcamp (Udemy)
- Postman API Fundamentals Student Expert (Postman, October 2025): https://drive.google.com/file/d/1qutuSPH-yzMxmhyzYOlzp5mXfw1C4T-F/view?usp=sharing
- Machine Learning Bootcamp (GDSC, Google Developer Student Clubs, March 2024): https://drive.google.com/file/d/1T94jE2lW6BQb4X_ENaOXqcKKZyDOI65a/view?usp=sharing

## FAQ

<!--
  Add answers you want the bot to give. Anything left as a comment is ignored,
  and the bot will say it doesn't know and point to the contact form.
  Examples to fill in:
  - Open to relocating? ...
  - Remote / hybrid / onsite preference? ...
  - Notice period or earliest start date? ...
  - Full-time, internship or freelance? ...
-->
- Is Sai Manoj looking for work? Yes, AI engineering roles. The quickest way to reach out is email or the contact form.
