const scheduleItems = [
  {
    title: "Wednesday Practice",
    time: "8:00 PM",
    location: "Gym A",
  },
  {
    title: "Saturday Scrimmage",
    time: "5:00 PM",
    location: "Court B - Friendly Match",
  },
  {
    title: "Friday Training",
    time: "7:30 PM",
    location: "Tactical Development",
  },
];

export default function Schedule() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              Practice &<br/>
              <span className="text-accent">Games</span>
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12">
              Weekly practices and friendly matches. Check the latest dates below.
            </p>
          </div>

          <div className="space-y-6">
            {scheduleItems.map((item, index) => (
              <div key={index} className="border-l-4 border-accent pl-6 py-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <span className="text-accent font-medium">{item.time}</span>
                </div>
                <p className="text-gray-400">{item.location}</p>
              </div>
            ))}

            <div className="bg-accent/10 border border-accent rounded-xl p-6 mt-8">
              <h4 className="font-bold text-lg mb-2">Next Big Event</h4>
              <p className="text-gray-300">National Sports Festival Qualifiers - March 25th</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
