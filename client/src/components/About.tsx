export default function About() {
  return (
    <section id="about" className="py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
            Same Team, Stronger Together
          </h2>
          <p className="text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
            하나로 연결된 플레이, 함께 성장한다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="/basketball.jpg" 
              alt="Basketball team1" 
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <div className="space-y-8 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-8">
              Play Hard.<br/>
              <span className="text-gray-400">Grow Together.</span>
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              정규코트 5대5 농구를 통해 포지션별 역할, 공간 활용, 팀 전술을 익혀 모두가 함께 성장합니다.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              꾸준한 참여로 전술 이해도와 팀워크가 향상되어 <br /> 팀농구를 배울 수 있습니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">체계적인 5대5 훈련</h3>
                  <p className="text-gray-600">포지션별 역할, 공간 활용, 전술 세트를 통해 팀 조직력을 향상시킵니다.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">팀별 친선경기 & 전국체전</h3>
                  <p className="text-gray-600">경쟁적인 환경에서 우리의 집단 기술을 도전하고 발전할 <br /> 기회를 제공합니다.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">누구나 즐기는 농구</h3>
                  <p className="text-gray-600">농구 경험이 없어도 환영! 기초부터 차근차근 배워가는 <br />환경을 제공합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
