import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SpaceParticles from './SpaceParticles';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-black">
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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Who I Am</h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
             "A dedicated learner with a passion for deep technology and innovation."
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
             My professional journey commenced with a strong interest in web development and artificial intelligence & machine learning. Since then, 
             I have continuously honed my skills, translating curiosity into impactful projects that challenge conventional boundaries and drive technological advancement.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              I am particularly drawn to exploring complex systems and emerging technologies, striving to create solutions that are both innovative and meaningful.
            </p>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Beyond my professional pursuits, I value experiences that push me out of my comfort zone. Whether it's through adventurous activities or new learning opportunities, 
              I believe growth often comes from embracing the unfamiliar.
            </p>

            <motion.a
              href="/varikuntla_sai_manoj_resume.pdf"
              download
              className="inline-flex items-center px-8 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300 group relative overflow-hidden border-2 border-white"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="mr-3 group-hover:animate-bounce relative z-10" size={20} />
              <span className="relative z-10">Download Resume</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-6">Learning Journey</h4>
              <div className="space-y-4">
                {[
                  'Currently pursuing Bachelor\'s in Computer Science with focus on AI/ML',
                  // 'Completed online courses in React, Python, Machine Learning, and Cloud Computing',
                  'Constantly exploring new technologies through documentation, tutorials, and practice',
                  'Building personal projects to apply theoretical knowledge to real-world problems',
                  // 'Active participant in coding communities and open-source contributions',
                  'Seeking entry-level opportunities to apply skills and grow in a collaborative environment'
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-gray-400 mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
