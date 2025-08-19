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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0
    })
  };

  return (
    <motion.div
      key={location}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.6
      }}
      className="w-full absolute inset-0 overflow-y-auto"
    >
      <div className="min-h-full">
        {children}
      </div>
    </motion.div>
  );
}