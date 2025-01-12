"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedHeading = ({title, varient, className}: Readonly<{ title: string; varient?: "heading" | "subheading"; className?: string }>) => {

  const totalLetters = title.length;

  // Variants for letter-by-letter reveal animation
  const letterVariants = {
    hidden: { opacity: 0, y: 2 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // delay for each letter
        duration: 0.5,
      },
    }),
  };

  return (
      <motion.div className="flex">
        {title.split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className={`${varient === "heading" && "text-4xl" } font-semibold ${className}`}
            style={{
              filter: `brightness(${1 + (i / totalLetters) * 2})`, // Gradually increase brightness towards the end
            }}
          >
            {letter === " " ? "\u00A0" : letter} {/* Keep spaces between words */}
          </motion.span>
        ))}
      </motion.div>
    
  );
};

export default AnimatedHeading;
