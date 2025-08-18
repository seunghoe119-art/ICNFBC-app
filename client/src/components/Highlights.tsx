import { Play } from "lucide-react";

const highlights = [
  {
    title: "챔피언십 우승",
    description: "뛰어난 팀 퍼포먼스로 지역 챔피언십을 차지한 순간입니다.",
  },
  {
    title: "팀 케미스트리",
    description: "전술 훈련이 코트에서 완벽한 실행으로 이어지는 모습을 확인하세요.",
  },
  {
    title: "훈련 하이라이트",
    description: "집중적인 5대5 개발 세션의 비하인드 스토리입니다.",
  },
];

export default function Highlights() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">This Week's Highlights</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            우리의 경기 템포와 팀 케미스트리를 담은 짧은 클립들입니다.
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
