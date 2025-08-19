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
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1
    }),
    in: {
      x: 0,
      opacity: 1
    },
    out: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 1
    })
  };

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{
        type: "tween",
        ease: [0.22, 1, 0.36, 1],
        duration: 0.6
      }}
      className="absolute inset-0 w-full h-full overflow-y-auto bg-white"
      style={{ zIndex: 1 }}
    >
      <div className="min-h-full">
        {children}
      </div>
    </motion.div>
  );
}