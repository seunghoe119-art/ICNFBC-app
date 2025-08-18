export default function Rules() {
  return (
    <section id="rules" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">Club Rules</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            커뮤니티를 강하고 집중적으로 유지하는 간단한 가이드라인입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">회원제</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">정규 회원</h4>
                <p className="text-gray-600">₩19,000 / 월</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold">휴면 회원</h4>
                <p className="text-gray-600">₩5,000 / 월 (3개월 단위)</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-bold">소방 간부후보생</h4>
                <p className="text-gray-600">무료</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">선발 기준</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>실력 수준 고려</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>출석률 추적</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>감독의 전술적 필요</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>정규 회원 우선권</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">참여 혜택</h3>
            <p className="text-gray-700 mb-4">
              더 많은 출석 → 더 나은 전술적 역할, 더 강한 팀 케미스트리
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-sm mb-2">월간 운영비</h4>
              <p className="text-sm text-gray-600">운영을 위해 ≥ ₩50,000 회비 필요</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">토너먼트 정책</h3>
            <p className="text-gray-700 mb-4">
              전국체전 참가는 공식 출장 인정과 전액 여행비 지원.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 1일차: 예선</p>
              <p>• 2일차: 본선</p>
              <p>• 3일차: 결승 (진출 시)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">운영</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">체육관 대여료</span>
                <span className="font-medium">≈ ₩100,000/주</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">음료수</span>
                <span className="font-medium">≈ ₩10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">게스트 수익</span>
                <span className="font-medium">≈ ₩50,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">품행 & 안전</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>팀원 존중</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>체육관 규칙 준수</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>실내화 착용</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
