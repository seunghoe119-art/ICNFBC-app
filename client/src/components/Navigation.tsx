import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
            <Link href="/">
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/about" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                About Us
              </span>
            </Link>
            <Link href="/rules">
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/rules" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Rules
              </span>
            </Link>
            <Link href="/finance">
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/finance" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Finance
              </span>
            </Link>
            <Link href="/contact">
              <span className={`font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                location === "/contact" ? "text-[#e60000] font-bold" : "text-gray-600"
              }`}>
                Join Us
              </span>
            </Link>
          </div>

          <Link href="/contact">
            <Button className="hidden md:block bg-black text-white hover:bg-gray-800 rounded-full">
              Get Started
            </Button>
          </Link>

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
              <Link href="/" onClick={closeMobileMenu}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Home
                </span>
              </Link>
              <Link href="/about" onClick={closeMobileMenu}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/about" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  About Us
                </span>
              </Link>
              <Link href="/rules" onClick={closeMobileMenu}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/rules" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Rules
                </span>
              </Link>
              <Link href="/finance" onClick={closeMobileMenu}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/finance" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Finance
                </span>
              </Link>
              <Link href="/contact" onClick={closeMobileMenu}>
                <span className={`block w-full text-left px-3 py-2 font-medium transition-all duration-200 ease-out hover:text-[#e60000] hover:font-bold hover:scale-105 hover:-translate-y-0.5 hover:drop-shadow-md focus-visible:text-[#e60000] focus-visible:font-bold focus-visible:underline focus-visible:outline-none ${
                  location === "/contact" ? "text-[#e60000] font-bold" : "text-gray-600"
                }`}>
                  Join Us
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
