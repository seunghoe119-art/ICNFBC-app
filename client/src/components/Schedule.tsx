const scheduleItems = [
  {
    title: "매주 3시간 금요일 대관",
    time: "21:00 ~ 24:00PM",
    location: "정규 대관 체육관",
  },
  {
    title: "초청팀 초청",
    time: "지인 초청 가능",
    location: "홈 or 원정 - 친선 경기",
  },
  {
    title: "정기 교류전 팀 구인중",
    time: " ",
    location: "",
  },
];

export default function Schedule() {
  return (
    <section className="py-32 bg-black text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              GAME &<br/>
              <span className="text-accent">HOME GYM</span>
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12">
              삼성리틀썬더스농구교실 김포점<br/>경기 김포시 감정로 86 2층<br/>경기 김포시 감정동 626-10
            </p>
            
            {/* Court Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="https://drive.google.com/uc?export=view&id=14FJRJjSWRVdtJqAGyWX0x_l2gJ1AeWF9" 
                  alt="Basketball Court 1" 
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="https://drive.google.com/uc?export=view&id=1PbP4o7-_4YVsJvhFV9LQcO3u0P-RWDnQ" 
                  alt="Basketball Court 2" 
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
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
              <h4 className="font-bold text-lg mb-2">다음 주요 이벤트</h4>
              <p className="text-gray-300">전국체전 - 2026년 6월 초</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
