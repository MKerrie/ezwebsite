import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 25, separator = "—", className = "" }) => {
  const text = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: [0, `-50%`] }}
        transition={{ x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" } }}
      >
        <span className="inline-block pr-4">{text}</span>
        <span className="inline-block pr-4">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
