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
      className="bg-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-gray-900/50 transition-all duration-300 border border-white/20 h-full"
      whileHover={{ y: -5 }}
    >
      <div className="p-6 flex flex-col h-full min-h-[400px]">
        {/* Title - Fixed height */}
        <div className="h-16 mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors line-clamp-2 leading-tight">
            {title}
          </h3>
        </div>
        
        {/* Description - Fixed height with scrollable overflow */}
        <div className="h-32 mb-6 overflow-hidden">
          <p className="text-gray-300 leading-relaxed text-sm h-full overflow-y-auto">
            {description}
          </p>
        </div>
        
        {/* Technologies - Fixed height */}
        <div className="h-20 mb-6 overflow-hidden">
          <div className="flex flex-wrap gap-2 h-full overflow-y-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800/40 text-gray-300 rounded-full text-xs border border-white/20 hover:bg-gray-700/50 transition-colors h-fit"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Buttons - Fixed at bottom */}
        <div className="flex gap-3 mt-auto">
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-3 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 group/btn relative overflow-hidden shadow-lg hover:shadow-white/30 border-2 border-white text-sm min-h-[44px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <ExternalLink className="mr-1.5 relative z-10" size={16} />
            <span className="relative z-10">Live Demo</span>
          </motion.a>
          <motion.a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-3 py-3 bg-black text-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 group/btn relative overflow-hidden border-2 border-white text-sm min-h-[44px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <Github className="mr-1.5 relative z-10 group-hover/btn:text-black transition-colors" size={16} />
            <span className="relative z-10 group-hover/btn:text-black transition-colors">Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
