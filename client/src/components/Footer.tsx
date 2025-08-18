export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="font-extrabold text-2xl">
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
            <p className="text-gray-400 mb-4">2010년부터 코트 안팎에서 챔피언을 만들어가고 있습니다.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">빠른 링크</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection("about")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                우리 팀
              </button>
              <button 
                onClick={() => scrollToSection("schedule")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                일정
              </button>
              <button 
                onClick={() => scrollToSection("news")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                뉴스
              </button>
              <button 
                onClick={() => scrollToSection("join")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                회원가입
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">연락처</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 (055) 123-4567</p>
              <p>✉️ info@icnfire.com</p>
              <p>📍 경기도 화성시 동탄중앙로 123</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2024 ICN FIRE Basketball Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
