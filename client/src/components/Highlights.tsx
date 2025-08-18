import { Play } from "lucide-react";

const highlights = [
  {
    title: "Championship Victory",
    description: "Thunder Hoops secures regional championship with outstanding team performance.",
  },
  {
    title: "Team Chemistry",
    description: "Watch how our tactical training translates to seamless court execution.",
  },
  {
    title: "Training Highlights",
    description: "Behind the scenes of our intensive 5-on-5 development sessions.",
  },
];

export default function Highlights() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">This Week's Highlights</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Short clips that capture our pace and chemistry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-80" fill="currentColor" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
