import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  codeUrl: string;
}

const ProjectCard = ({ title, description, technologies, liveUrl, codeUrl }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-gray-900/50 transition-all duration-300 border border-white/20"
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-800/40 text-gray-300 rounded-full text-sm border border-white/20 hover:bg-gray-700/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 group/btn relative overflow-hidden shadow-lg hover:shadow-white/30 border-2 border-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <ExternalLink className="mr-2 relative z-10" size={16} />
            <span className="relative z-10">Live Demo</span>
          </motion.a>
          <motion.a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-3 bg-black text-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 group/btn relative overflow-hidden border-2 border-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <Github className="mr-2 relative z-10 group-hover/btn:text-black transition-colors" size={16} />
            <span className="relative z-10 group-hover/btn:text-black transition-colors">Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;