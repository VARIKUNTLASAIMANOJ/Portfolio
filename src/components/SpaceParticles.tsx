import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationType: 'float' | 'twinkle' | 'drift';
  delay: number;
}

const SpaceParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = window.innerWidth < 768 ? 40 : 80; // More particles for better effect

      for (let i = 0; i < particleCount; i++) {
        const animations: Particle['animationType'][] = ['float', 'twinkle', 'drift'];
        
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5, // 0.5-2.5px
          opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8 opacity
          animationType: animations[Math.floor(Math.random() * animations.length)],
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getAnimation = (animationType: Particle['animationType'], delay: number, opacity: number) => {
    switch (animationType) {
      case 'twinkle':
        return {
          opacity: [opacity * 0.3, opacity, opacity * 0.3],
          scale: [1, 1.2, 1],
          transition: {
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          },
        };
      case 'drift':
        return {
          x: [0, 20, -15, 0],
          y: [0, -25, 15, 0],
          opacity: [opacity * 0.4, opacity, opacity * 0.4],
          transition: {
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          },
        };
      default: // float
        return {
          y: [0, -15, 0],
          opacity: [opacity * 0.3, opacity, opacity * 0.3],
          transition: {
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          },
        };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={getAnimation(particle.animationType, particle.delay, particle.opacity)}
        />
      ))}
    </div>
  );
};

export default SpaceParticles;