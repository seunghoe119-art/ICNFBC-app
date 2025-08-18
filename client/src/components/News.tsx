import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    date: "2024년 3월 10일",
    title: "챔피언십 우승",
    excerpt: "뛰어난 팀 퍼포먼스로 지역 챔피언십을 차지했습니다.",
  },
  {
    date: "2024년 3월 8일",
    title: "새로운 훈련 시설",
    excerpt: "모든 팀원과 커뮤니티를 위한 최첨단 시설이 개방되었습니다.",
  },
  {
    date: "2024년 3월 5일",
    title: "선수 스포트라이트",
    excerpt: "마커스 존슨이 팀 주장이 되기까지의 여정을 소개합니다.",
  },
];

export default function News() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Latest News</h2>
          <p className="text-xl text-gray-400 font-light">
            ICN FIRE 소식을 확인하세요.
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
                  더 보기
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
