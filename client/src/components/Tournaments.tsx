export default function Tournaments() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">Nationwide & Friendlies</h2>
          <p className="text-xl text-gray-600 font-light max-w-4xl mx-auto">
            We join the National Sports Festival annually and play inter-city friendlies. Travel is handled per agency policy (business-trip status).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Team celebration after tournament victory" 
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="font-bold text-xl mb-2">National Sports Festival</h3>
              <p className="text-white/80">Annual championship tournament</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-2xl mb-4">Tournament Benefits</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Official business-trip status</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Travel expenses covered</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Meal and accommodation per-diem</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>3-day tournament format</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="font-bold text-xl mb-4">Tournament Flow</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <span className="text-gray-700">Day 1: Qualifiers</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <span className="text-gray-700">Day 2: Main Round</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <span className="text-gray-500">Day 3: Finals (if qualified)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
