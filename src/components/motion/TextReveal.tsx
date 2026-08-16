import React from 'react';
import { motion } from 'motion/react';

interface Props {
  text: string;
  className?: string;
  type?: 'words' | 'chars' | 'lines';
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  once?: boolean;
}

/**
 * TextReveal
 * Splinters headlines or paragraphs into words/chars that cascade gracefully into view.
 */
export const TextReveal: React.FC<Props> = ({
  text,
  className = '',
  type = 'words',
  delay = 0,
  stagger = 0.04,
  duration = 0.65,
  as: Component = 'div',
  once = true,
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out curve
      },
    },
  };

  if (type === 'chars') {
    const chars = Array.from(text);
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-40px' }}
        className={`inline-block ${className}`}
      >
        {chars.map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Default: words
  const words = text.split(' ');
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            variants={itemVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};
