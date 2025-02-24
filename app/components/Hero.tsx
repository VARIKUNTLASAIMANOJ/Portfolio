"use client"

import { motion } from "framer-motion"
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react"
import TypewriterComponent from "typewriter-effect"

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Hi, I&#39;m Varikuntla Sai Manoj
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          <TypewriterComponent
            options={{
              strings: ["Ai & Ml Engineer", "Web Developer", "Problem Solver"],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-4 mb-8"
        >
          <a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors"
          >
            View My Work
            <ArrowRight className="ml-2" />
          </a>
          <a
            href="#contact"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <a
            href="https://github.com/VARIKUNTLASAIMANOJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/varikuntla-sai-manoj-082b782b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://varikuntlasaimanojresume.tiiny.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            <FileText size={24} />
          </a>

        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <ArrowRight size={24} className="transform rotate-90" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

