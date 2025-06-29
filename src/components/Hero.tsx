import { motion } from 'framer-motion';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import SpaceParticles from './SpaceParticles';

const Hero = () => {
  const titles = ['AI & ML Engineer', 'Web Developer', 'Problem Solver'];
  const currentTitle = useTypingAnimation(titles, 100, 2000);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <SpaceParticles />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Hi, I'm <br></br><span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Varikuntla Sai Manoj</span>
          </motion.h1>
          
          <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span className="border-r-2 border-white pr-2 animate-pulse">
              {currentTitle}
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Passionate about creating innovative solutions that bridge the gap between cutting-edge technology and real-world applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300 group relative overflow-hidden border-2 border-white"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">View My Work</span>
            </motion.button>
            
            <motion.button
              onClick={scrollToContact}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold border-2 border-white hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-white/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:text-black transition-colors">Contact Me</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;