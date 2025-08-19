import { Play, ExternalLink } from "lucide-react";

const highlights = [
  {
    title: "챔피언십 우승",
    description: "뛰어난 팀 퍼포먼스로 지역 챔피언십을 차지한 순간입니다.",
    type: "image"
  },
  {
    title: "팀 케미스트리",
    description: "전술 훈련이 코트에서 완벽한 실행으로 이어지는 모습을 확인하세요.",
    type: "youtube",
    youtubeId: "_omKkTU0_FQ",
    youtubeUrl: "https://youtu.be/_omKkTU0_FQ?si=uifSTutBEgLdlhWH"
  },
  {
    title: "훈련 하이라이트",
    description: "집중적인 5대5 개발 세션의 비하인드 스토리입니다.",
    type: "youtube",
    youtubeId: "q1V5_UDKnl4",
    youtubeUrl: "https://youtu.be/q1V5_UDKnl4?si=vRu-WxLVV9h_7DR1"
  },
];

export default function Highlights() {
  return (
    <section className="py-32 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">This Week on the Court</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            이번 주 코트 위 순간들
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {highlight.type === "youtube" ? (
                <a
                  href={highlight.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video bg-gray-900 relative group cursor-pointer"
                >
                  <img 
                    src={`https://img.youtube.com/vi/${highlight.youtubeId}/maxresdefault.jpg`}
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to medium quality thumbnail if maxres is not available
                      e.currentTarget.src = `https://img.youtube.com/vi/${highlight.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-colors">
                    <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <ExternalLink className="w-5 h-5 text-white opacity-80" />
                  </div>
                </a>
              ) : (
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white opacity-80" fill="currentColor" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
                {highlight.type === "youtube" && (
                  <div className="mt-2 flex items-center text-red-600 text-sm font-medium">
                    <Play className="w-4 h-4 mr-1" fill="currentColor" />
                    YouTube에서 보기
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
