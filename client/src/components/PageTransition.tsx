import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useNavigationDirection } from "@/contexts/NavigationContext";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const { getDirection } = useNavigationDirection();
  
  const direction = getDirection(location);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 1
    })
  };

  return (
    <motion.div
      key={location}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "tween",
        ease: [0.22, 1, 0.36, 1],
        duration: 0.8
      }}
      className="w-full absolute inset-0 overflow-y-auto"
      style={{ willChange: "transform" }}
    >
      <div className="min-h-full pt-16 pb-32">
        {children}
      </div>
    </motion.div>
  );
}