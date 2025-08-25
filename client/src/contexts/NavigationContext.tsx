import { createContext, useContext, useRef, ReactNode } from "react";

interface NavigationContextType {
  getDirection: (currentPath: string) => number;
  setDirection: (targetPath: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationDirection = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationDirection must be used within NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

// Define menu order for directional animations
const menuOrder = ["/", "/about", "/rules", "/finance", "/contact", "/board", "/login", "/admin/new-post"];

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const previousPathRef = useRef("/");
  const directionRef = useRef(1);

  const getDirection = (currentPath: string) => {
    return directionRef.current;
  };

  const setDirection = (targetPath: string) => {
    const currentIndex = menuOrder.indexOf(previousPathRef.current);
    const targetIndex = menuOrder.indexOf(targetPath);
    
    if (currentIndex === -1 || targetIndex === -1) {
      directionRef.current = 1; // Default to right
    } else {
      directionRef.current = targetIndex > currentIndex ? 1 : -1; // 1 for right, -1 for left
    }
    
    previousPathRef.current = targetPath;
  };

  return (
    <NavigationContext.Provider value={{ getDirection, setDirection }}>
      {children}
    </NavigationContext.Provider>
  );
};