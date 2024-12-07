import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

const ParticlesContainer = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: '#0a0a0f',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ['#ff69b4', '#9370db', '#8a2be2'],
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.12,
            width: 0.8,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 50,
          },
          opacity: {
            value: 0.15,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.05,
              sync: false
            }
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 2.5 },
            random: true,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesContainer;
