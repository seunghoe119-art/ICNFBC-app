import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-3xl">
              <span style={{ color: '#0099ff' }}>ICN</span>
              <span className="mx-2" style={{ 
                background: 'linear-gradient(90deg, #ff4500, #ff7b00)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>FIRE</span>
              <span className="text-black">, F.B.C Team</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-gray-900 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-gray-600 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection("rules")}
              className="text-gray-600 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
            >
              Rules
            </button>
            <button 
              onClick={() => scrollToSection("join")}
              className="text-gray-600 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
            >
              Join Us
            </button>
          </div>

          <Button 
            onClick={() => scrollToSection("join")}
            className="hidden md:block bg-black text-white hover:bg-gray-800 rounded-full"
          >
            Get Started
          </Button>

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
              <button 
                onClick={() => scrollToSection("home")}
                className="block w-full text-left px-3 py-2 text-gray-900 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 text-gray-600 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection("rules")}
                className="block w-full text-left px-3 py-2 text-gray-600 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
              >
                Rules
              </button>
              <button 
                onClick={() => scrollToSection("join")}
                className="block w-full text-left px-3 py-2 text-gray-600 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none"
              >
                Join Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
