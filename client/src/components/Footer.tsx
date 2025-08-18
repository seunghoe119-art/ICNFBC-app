export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">Thunder Hoops</span>
            </div>
            <p className="text-gray-400 mb-4">Building champions on and off the court since 2010.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection("about")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Our Team
              </button>
              <button 
                onClick={() => scrollToSection("schedule")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Schedule
              </button>
              <button 
                onClick={() => scrollToSection("news")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                News
              </button>
              <button 
                onClick={() => scrollToSection("join")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
              >
                Membership
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@thunderhoops.com</p>
              <p>📍 123 Court Street, Sports City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2024 Thunder Hoops Basketball Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
