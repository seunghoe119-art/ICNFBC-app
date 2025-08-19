const scheduleItems = [
  {
    title: "수요일 연습",
    time: "8:00 PM",
    location: "체육관 A",
  },
  {
    title: "토요일 스크리미지",
    time: "5:00 PM",
    location: "코트 B - 친선 경기",
  },
  {
    title: "금요일 훈련",
    time: "7:30 PM",
    location: "전술 개발",
  },
];

export default function Schedule() {
  return (
    <section className="py-32 bg-black text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              Practice &<br/>
              <span className="text-accent">Games</span>
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12">
              주간 연습과 친선 경기 일정입니다. 최신 날짜를 확인하세요.
            </p>
            
            {/* Court Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="/court1.jpg" 
                  alt="Basketball Court 1" 
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="/court2.jpg" 
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
              <p className="text-gray-300">전국체전 예선 - 3월 25일</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
