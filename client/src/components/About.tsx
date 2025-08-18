export default function About() {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
            Same Team, Stronger Together
          </h2>
          <p className="text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
            We're a workplace basketball club focused on 5-on-5 fundamentals and smart team play.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Basketball team in huddle showing unity" 
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <div className="space-y-8 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-8">
              Play Hard.<br/>
              <span className="text-gray-400">Grow Together.</span>
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              We train real 5-on-5 basketball—roles, spacing, and team tactics—so everyone improves together.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Regular attendance builds tactics, chemistry, and trust that carries back to work.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Structured 5-on-5 training</h3>
                  <p className="text-gray-600">Focus on roles, spacing, and tactical sets that improve team coordination.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Inter-city friendlies & National Sports Festival</h3>
                  <p className="text-gray-600">Competitive opportunities that challenge and develop our collective skills.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Open finance and simple membership</h3>
                  <p className="text-gray-600">Transparent operations with straightforward membership options for everyone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
