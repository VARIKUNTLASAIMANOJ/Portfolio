"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useInView } from "react-intersection-observer"

const projects = [
  {
    title: "Flora-ID",
    description: "It is a Machine Learning project based on a classification task. Features include Sepal-width, Sepal-height, Petal-width, and Petal-height. Predicted variables are species of the iris flower. Upon providing the sepal and petal measurements, the model will predict and display the image and details of the species..",
    image: "/project1.jpg",
    github: "https://github.com/VARIKUNTLASAIMANOJ/VARIKUNTLASAIMANOJ.github.io",
    live: "https://varikuntlasaimanoj.github.io/FLORA-ID/index%20(2).html",
    category: "AI/ML Projects",
  },
  {
    title: "ToxiDetect",
    description: "Developed an AI-powered toxicity classification system using DistilBERT, enhancing detection of toxic comments (e.g., hate speech, threats) through natural language processing and deep learning techniques. Integrated features include text, audio, and image analysis, along with an intuitive web interface using Gradio for real-time predictions and a feedback mechanism for continuous improvement. Achieved high accuracy using metrics such as precision, recall.",
    image: "/project2.jpg",
    github: "https://github.com/VARIKUNTLASAIMANOJ/ToxiDetect",
    live: "#",
    category: "AI/ML Projects",
  },
  {
    title: "Nova AI",
    description: "Nova AI is an intelligent AI chatbot designed for knowledge assistance, and personalized conversations. It leverages Google Gemini API to generate smart responses, supports voice input, text-to-speech, PDF processing, and real-time weather updates.<br/>This multi-functional AI assistant comes with custom AI personas (Teacher, Friend, Expert, etc.), smart reply suggestions, and speech synthesis for an enhanced user experience.",
    image: "/project3.jpg",
    github: "https://github.com/VARIKUNTLASAIMANOJ/Nova-AI",
    live: "https://nova-ai-6tbg.onrender.com",
    category: "AI/ML Projects",
  },
  {
    title: "Project 4",
    description: "Coming Soon....",
    image: "/project4.jpg",
    github: "https://github.com/yourusername/project4",
    live: "https://project4.com",
    category: "AI/ML Projects",
  },
  {
    title: "Beyond-Horizon",
    description: "Coming Soon....",
    image: "/project5.jpg",
    github: "https://github.com/VARIKUNTLASAIMANOJ/Beyond-Horizon",
    live: "https://beyond-horizon-dusky.vercel.app/",
    category: "Web App",
  },
]

const categories = ["All", "AI/ML Projects","Web App"]

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          My Projects
        </motion.h2>
        <div className="flex justify-center mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`mx-2 px-4 py-2 rounded-full ${filter === category ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex justify-between">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Github className="mr-2" size={20} />
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-500 hover:text-green-600"
                    >
                      <ExternalLink className="mr-2" size={20} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects

