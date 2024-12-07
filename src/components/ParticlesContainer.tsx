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
        background: {
          color: 'transparent'
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#ff69b4", "#da70d6"],
            animation: {
              enable: true,
              speed: 8,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: {
              value: "#ff69b4"
            },
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce"
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          },
          number: {
            density: {
              enable: true,
              area: 1000
            },
            value: 50
          },
          opacity: {
            value: 0.5,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false
            }
          },
          shape: {
            type: "circle"
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 1,
              sync: false
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 20,
                smooth: 10
              }
            }
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.5,
                color: "#ff69b4"
              }
            }
          }
        },
        detectRetina: true
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

export default ParticlesContainer;
