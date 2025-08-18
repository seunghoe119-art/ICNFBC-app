import { useEffect, useState } from 'react';

export function ScrollGradient() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤 진행도 계산 (0-1)
  const scrollProgress = Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
  
  return (
    <>
      {/* 상단 그라데이션 오버레이 */}
      <div
        className="fixed top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: `${Math.min(scrollY * 0.5, 200)}px`,
          background: `linear-gradient(180deg, 
            rgba(0,0,0,${Math.min(scrollProgress * 0.3, 0.3)}) 0%, 
            rgba(0,0,0,${Math.min(scrollProgress * 0.15, 0.15)}) 50%, 
            transparent 100%)`,
          transition: 'all 0.3s ease-out'
        }}
      />
      
      {/* 섹션 간 그라데이션 효과 */}
      <div
        className="fixed inset-0 z-5 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center top, 
            transparent 0%, 
            rgba(0,0,0,${Math.min(scrollProgress * 0.05, 0.05)}) 40%, 
            transparent 100%)`,
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'background 0.3s ease-out'
        }}
      />

      {/* 동적 색상 오버레이 */}
      <div
        className="fixed inset-0 z-5 pointer-events-none"
        style={{
          background: `linear-gradient(${45 + scrollProgress * 90}deg, 
            rgba(230, 0, 0, ${Math.sin(scrollProgress * Math.PI) * 0.02}) 0%, 
            rgba(0, 153, 255, ${Math.sin(scrollProgress * Math.PI * 1.5) * 0.02}) 50%, 
            rgba(230, 0, 0, ${Math.sin(scrollProgress * Math.PI * 2) * 0.02}) 100%)`,
          transition: 'background 0.5s ease-out'
        }}
      />
      
      {/* 하단 페이드 효과 */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '100px',
          background: `linear-gradient(0deg, 
            rgba(0,0,0,${Math.min(scrollProgress * 0.2, 0.1)}) 0%, 
            transparent 100%)`,
          transform: `translateY(${Math.max(0, (1 - scrollProgress) * 50)}px)`,
          transition: 'all 0.3s ease-out'
        }}
      />
    </>
  );
}