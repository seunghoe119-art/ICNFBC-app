import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer only when user is at the very bottom (within 10px)
      const threshold = 10;
      setIsVisible(scrollPosition >= documentHeight - threshold);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    
    // Check initial position after a small delay to ensure page is loaded
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  return (
    <footer className={`fixed bottom-0 left-0 right-0 bg-black text-white py-8 z-40 transition-transform duration-500 ease-in-out ${
      isVisible ? "transform translate-y-0" : "transform translate-y-full"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="font-extrabold text-xl">
                <span style={{ color: '#0099ff' }}>ICN</span>
                <span className="mx-2" style={{ 
                  background: 'linear-gradient(90deg, #ff4500, #ff7b00)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>FIRE</span>
                <span className="text-white">, F.B.C Team</span>
              </span>
            </div>
            <p className="text-gray-400 mb-2 text-sm">2010년부터 코트 안팎에서 챔피언을 만들어가고 있습니다.</p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">빠른 링크</h4>
            <div className="space-y-1">
              <Link href="/about">
                <span className="block text-gray-400 hover:text-white transition-colors text-left text-sm">
                  우리 팀
                </span>
              </Link>
              <Link href="/about">
                <span className="block text-gray-400 hover:text-white transition-colors text-left text-sm">
                  일정
                </span>
              </Link>
              <Link href="/about">
                <span className="block text-gray-400 hover:text-white transition-colors text-left text-sm">
                  뉴스
                </span>
              </Link>
              <Link href="/contact">
                <span className="block text-gray-400 hover:text-white transition-colors text-left text-sm">
                  회원가입
                </span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">연락처</h4>
            <div className="space-y-1 text-gray-400 text-sm">
              <p>📞 (055) 123-4567</p>
              <p>✉️ info@icnfire.com</p>
              <p>📍 경기도 화성시 동탄중앙로 123</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-xs">© 2024 ICN FIRE Basketball Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
