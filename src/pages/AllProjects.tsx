import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import SpaceParticles from '../components/SpaceParticles';
import { projects } from '../data/projects';

const AllProjects = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-20">
        <SpaceParticles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 group px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
              Back to Home
            </Link>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              All Projects
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mb-6"></div>
            <p className="text-lg text-gray-300 max-w-3xl">
              Explore my complete portfolio of projects spanning AI, ML, web development, and more. Each project represents a unique challenge and innovative solution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-gray-300 text-lg mb-6">
              Interested in working together on your next project?
            </p>
            <Link to="/#contact">
              <motion.button
                className="px-8 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300 relative overflow-hidden group border-2 border-white"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Get In Touch</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProjects;