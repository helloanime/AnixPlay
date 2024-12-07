import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  const letters = "AnixPlay".split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterAnimation = {
    hidden: { 
      y: -20,
      opacity: 0,
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="relative py-2">
      {/* Main Logo Text */}
      <motion.div
        className="relative text-6xl md:text-7xl font-bold tracking-wider"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className={`inline-block ${
              index === 0
                ? 'bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent'
                : index === 4
                ? 'bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent'
                : 'text-white'
            }`}
            variants={letterAnimation}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;
