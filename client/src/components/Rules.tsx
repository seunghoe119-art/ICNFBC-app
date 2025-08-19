export default function Rules() {
  return (
    <section className="py-32 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">Club Guidelines</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            커뮤니티를 더욱 강화하고 집중하여 유지하기 위한 운영 지침 요약 카드입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">회원제</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">정규 회원</h4>
                <p className="text-gray-600">₩20,000 / 월</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold">휴면 회원</h4>
                <p className="text-gray-600">₩5,000 / 월 (3개월 단위) <br />게스트비 7천원</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-bold">합격자 및 신임 교육 재학생</h4>
                <p className="text-gray-600">게스트비 7천원 무료</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">대회 선발 기준</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>개인 실력 고려</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>연습경기 참여 횟수 및 출석률</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>감독의 전술 요구사항 이행</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <span>동료들과의 팀워크 및 협동심</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <p className="text-xs text-amber-600 italic font-medium bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                *월등한 실력이나 포지션 우위가 없는 한, 일반회원이 휴면회원보다 우선 기용될 수 있다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">재정 사용처</h3>
            <p className="text-gray-700 mb-4">
              체육관 대관료<br />연습 경기 비용<br />체육 용품<br />비품 및 소모품 구입비<br />대회 숙박 예약금 및 긴급경비<br />
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">작성중2</h3>
            <p className="text-gray-700 mb-4">
              .
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 1일차</p>
              <p>• 2일차</p>
              <p>• 3일차</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">운영</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">체육관 대여료</span>
                <span className="font-semibold text-lg">₩100,000 / 주</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">음료 제외한 게스트비</span>
                <span className="font-semibold text-lg">₩50,000</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">회비</span>
                <span className="font-semibold text-lg">₩50,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">경기 운영 총괄자 특혜</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">운영 주관자는 경기 준비와 책임을 맡음</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">운영 없이는 경기‧게스트비 수금 불가 → 필수적 역할</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">다른 회원도 운영에 참여하도록 동기 부여</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">공헌을 인정해 해당 월 회비 면제</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-blue-600 italic font-medium">
                *회비+게스트비 합산 주 10만원 충족 시 적용
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
