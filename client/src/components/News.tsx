import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    date: "March 10, 2024",
    title: "Championship Victory",
    excerpt: "Thunder Hoops secures regional championship with outstanding team performance.",
  },
  {
    date: "March 8, 2024",
    title: "New Training Facility",
    excerpt: "State-of-the-art facility now open for all team members and community.",
  },
  {
    date: "March 5, 2024",
    title: "Player Spotlight",
    excerpt: "Get to know Marcus Johnson and his journey to becoming team captain.",
  },
];

export default function News() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Latest News</h2>
          <p className="text-xl text-gray-400 font-light">
            Stay updated with Thunder Hoops.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-colors">
              <div className="p-8">
                <div className="text-accent text-sm font-medium mb-3">{item.date}</div>
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-6">{item.excerpt}</p>
                <button className="text-accent hover:text-red-400 transition-colors font-medium inline-flex items-center">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
