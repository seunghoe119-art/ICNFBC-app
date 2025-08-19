import { createContext, useContext, useRef, ReactNode } from "react";

interface NavigationContextType {
  getDirection: (currentPath: string) => number;
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
const menuOrder = ["/", "/about", "/rules", "/finance", "/contact"];

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const previousPathRef = useRef("/");

  const getDirection = (currentPath: string) => {
    const currentIndex = menuOrder.indexOf(currentPath);
    const previousIndex = menuOrder.indexOf(previousPathRef.current);
    
    if (currentIndex === -1 || previousIndex === -1) {
      previousPathRef.current = currentPath;
      return 1; // Default to right
    }
    
    const direction = currentIndex > previousIndex ? 1 : -1; // 1 for right, -1 for left
    previousPathRef.current = currentPath;
    return direction;
  };

  return (
    <NavigationContext.Provider value={{ getDirection }}>
      {children}
    </NavigationContext.Provider>
  );
};