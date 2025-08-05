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

        {/* GitHub Contributions Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              GitHub Activity
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              My coding journey visualized through daily contributions and open source activity
            </p>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden">
            <div className="flex flex-col items-center">
              {/* GitHub Contributions Graph */}
              <div className="w-full max-w-4xl mb-6 overflow-x-auto">
                <img
                  src="https://ghchart.rshah.org/ffffff/VARIKUNTLASAIMANOJ"
                  alt="GitHub Contributions"
                  className="w-full h-auto rounded-lg bg-gray-800/50 p-4"
                  style={{ minWidth: '700px' }}
                />
              </div>

              {/* GitHub Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                <div className="flex justify-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=VARIKUNTLASAIMANOJ&show_icons=true&theme=dark&bg_color=1f2937&text_color=ffffff&icon_color=ffffff&title_color=ffffff&border_color=374151"
                    alt="GitHub Stats"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=VARIKUNTLASAIMANOJ&layout=compact&theme=dark&bg_color=1f2937&text_color=ffffff&title_color=ffffff&border_color=374151"
                    alt="Top Languages"
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* GitHub Profile Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <motion.a
                  href="https://github.com/VARIKUNTLASAIMANOJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-black rounded-xl font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300 group relative overflow-hidden border-2 border-white"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Visit My GitHub Profile</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
