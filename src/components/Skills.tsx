import { motion } from 'framer-motion';
import { Code, Cpu, Database, Globe, Wrench } from 'lucide-react';
import SpaceParticles from './SpaceParticles';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Frameworks',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', /*'Vue.js'*/ /*'Angular'*/ 'Next.js']
    },
    {
      title: 'Backend Frameworks',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      skills: ['Node.js', 'Express.js', /*'Django'*/ 'Flask']
    },
    {
      title: 'AI/ML Frameworks',
      icon: Cpu,
      color: 'from-purple-500 to-violet-500',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras']
    },
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-orange-500 to-red-500',
      skills: ['JavaScript', /*'TypeScript'*/ 'Python', 'Java']
    },
    {
      title: 'Database Technologies',
      icon: Database,
      color: 'from-indigo-500 to-blue-500',
      skills: [/*'MongoDB', 'PostgreSQL'*/ 'MySQL']
    },
    // {
    //   title: 'Cloud & DevOps',
    //   icon: Cloud,
    //   color: 'from-teal-500 to-green-500',
    //   skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    // },
    {
      title: 'Development Tools',
      icon: Wrench,
      color: 'from-pink-500 to-rose-500',
      skills: ['Git', 'Vite']
    },
    {
      title: 'Web Technologies',
      icon: Globe,
      color: 'from-yellow-500 to-amber-500',
      skills: ['HTML5', 'CSS3', 'Tailwind CSS']
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-black">
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
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mb-6"></div>
          {/* <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            My expertise organized by frameworks and core technologies
          </p> */}
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-gray-900/50 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category.color} p-2.5 mr-3 flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                    <span className="text-gray-300 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Summary */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Professional Journey</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Years Experience', value: '5+', desc: 'Professional Development' },
              { label: 'Projects Completed', value: '50+', desc: 'Successful Deliveries' },
              { label: 'Technologies', value: '30+', desc: 'Tools & Frameworks' },
              { label: 'Happy Clients', value: '30+', desc: 'Satisfied Customers' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Skills;