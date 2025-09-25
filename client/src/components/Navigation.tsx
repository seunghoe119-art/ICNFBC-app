import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useNavigationDirection } from "@/contexts/NavigationContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { setDirection } = useNavigationDirection();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      // Show navigation when at top or scrolling up, hide when scrolling down
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (targetPath: string) => {
    setDirection(targetPath);
    closeMobileMenu();
  };


  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100" : "bg-transparent"
    } ${
      isVisible ? "transform translate-y-0" : "transform -translate-y-full"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-3xl">
              <span style={{ color: '#0099ff' }}>ICN</span>
              {location === "/board" ? (
                <span 
                  className="mx-2 cursor-pointer" 
                  style={{ 
                    background: 'linear-gradient(90deg, #ff4500, #ff7b00)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  onClick={() => handleNavigation("/admin/new")}
                >
                  FIRE
                </span>
              ) : (
                <span className="mx-2" style={{ 
                  background: 'linear-gradient(90deg, #ff4500, #ff7b00)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>FIRE</span>
              )}
              <span className="text-white">, F.B.C Team</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" onClick={() => handleNavigation("/")}>
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Home
              </span>
            </Link>
            <Link href="/about" onClick={() => handleNavigation("/about")}>
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/about" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                About Us
              </span>
            </Link>
            <Link href="/rules" onClick={() => handleNavigation("/rules")}>
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/rules" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Rules
              </span>
            </Link>
            <Link href="/finance" onClick={() => handleNavigation("/finance")}>
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/finance" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Finance
              </span>
            </Link>
            <Link href="/contact" onClick={() => handleNavigation("/contact")}>
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/contact" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Join Us
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/board" onClick={() => handleNavigation("/board")}>
              <Button className="bg-accent text-white hover:bg-accent/90 rounded-full">
                GO VIDEO
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" onClick={() => handleNavigation("/")}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Home
                </span>
              </Link>
              <Link href="/about" onClick={() => handleNavigation("/about")}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/about" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  About Us
                </span>
              </Link>
              <Link href="/rules" onClick={() => handleNavigation("/rules")}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/rules" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Rules
                </span>
              </Link>
              <Link href="/finance" onClick={() => handleNavigation("/finance")}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/finance" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Finance
                </span>
              </Link>
              <Link href="/contact" onClick={() => handleNavigation("/contact")}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/contact" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Join Us
                </span>
              </Link>
              <div className="px-3 py-2 border-t border-gray-100 mt-2">
                <Link href="/board" onClick={() => handleNavigation("/board")}>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    GO VIDEO
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
