import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import SpaceParticles from './SpaceParticles';

const Projects = () => {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black">
      <SpaceParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mb-6"></div>
          {/* <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in AI, ML, and web development.
          </p> */}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/VARIKUNTLASAIMANOJ?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300 group relative overflow-hidden border-2 border-white hover:bg-white hover:text-black"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 group-hover:text-black transition-colors">View All Projects</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;