
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  animationDuration: number;
}

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Initial particles
    const initialParticles = Array.from({ length: 40 }, (_, i) => createParticle(i));
    setParticles(initialParticles);
    
    // Create new particles periodically
    const interval = setInterval(() => {
      setParticles(prev => {
        // Remove some old particles
        const filtered = prev.filter((_, i) => Math.random() > 0.1);
        
        // Add new particles
        const newParticles = Array.from(
          { length: Math.floor(Math.random() * 3) + 1 }, 
          (_, i) => createParticle(filtered.length + i)
        );
        
        return [...filtered, ...newParticles];
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const createParticle = (id: number): Particle => {
    return {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.1,
      animationDuration: Math.random() * 3 + 2
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary animate-particle-float"
          style={{
            left: `${particle.x}%`,
            bottom: `${Math.random() * 20}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
