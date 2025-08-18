import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  rotationVelocityX: number;
  rotationVelocityY: number;
  rotationVelocityZ: number;
  type: 'basketball' | 'hoop' | 'court';
  size: number;
  opacity: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 파티클 초기화
    const initParticles = () => {
      const particles: Particle[] = [];
      
      // 농구공 파티클
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: (Math.random() - 0.5) * 0.5,
          velocityZ: (Math.random() - 0.5) * 2,
          rotationVelocityX: (Math.random() - 0.5) * 0.02,
          rotationVelocityY: (Math.random() - 0.5) * 0.02,
          rotationVelocityZ: (Math.random() - 0.5) * 0.02,
          type: 'basketball',
          size: 20 + Math.random() * 30,
          opacity: 0.1 + Math.random() * 0.2
        });
      }

      // 농구링 파티클
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          velocityX: (Math.random() - 0.5) * 0.3,
          velocityY: (Math.random() - 0.5) * 0.3,
          velocityZ: (Math.random() - 0.5) * 1,
          rotationVelocityX: (Math.random() - 0.5) * 0.01,
          rotationVelocityY: (Math.random() - 0.5) * 0.01,
          rotationVelocityZ: (Math.random() - 0.5) * 0.01,
          type: 'hoop',
          size: 40 + Math.random() * 20,
          opacity: 0.05 + Math.random() * 0.15
        });
      }

      // 코트 라인 파티클
      for (let i = 0; i < 12; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          velocityX: (Math.random() - 0.5) * 0.2,
          velocityY: (Math.random() - 0.5) * 0.2,
          velocityZ: (Math.random() - 0.5) * 0.8,
          rotationVelocityX: (Math.random() - 0.5) * 0.005,
          rotationVelocityY: (Math.random() - 0.5) * 0.005,
          rotationVelocityZ: (Math.random() - 0.5) * 0.005,
          type: 'court',
          size: 60 + Math.random() * 40,
          opacity: 0.03 + Math.random() * 0.1
        });
      }

      particlesRef.current = particles;
    };

    // 농구공 그리기
    const drawBasketball = (ctx: CanvasRenderingContext2D, particle: Particle, screenX: number, screenY: number, size: number) => {
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(particle.rotationZ);
      ctx.globalAlpha = particle.opacity;
      
      // 농구공 몸체
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, '#ff4500');
      gradient.addColorStop(0.7, '#cc3300');
      gradient.addColorStop(1, '#991100');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      
      // 농구공 라인
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = size * 0.05;
      ctx.globalAlpha = particle.opacity * 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, 0);
      ctx.lineTo(size * 0.8, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    // 농구링 그리기
    const drawHoop = (ctx: CanvasRenderingContext2D, particle: Particle, screenX: number, screenY: number, size: number) => {
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(particle.rotationZ);
      ctx.globalAlpha = particle.opacity;
      
      // 백보드
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-size * 0.8, -size * 0.6, size * 1.6, size * 1.2);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(-size * 0.8, -size * 0.6, size * 1.6, size * 1.2);
      
      // 림
      ctx.strokeStyle = '#ff4500';
      ctx.lineWidth = size * 0.08;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      
      // 네트
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = size * 0.02;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = Math.cos(angle) * size * 0.4;
        const y1 = Math.sin(angle) * size * 0.4;
        const x2 = Math.cos(angle) * size * 0.2;
        const y2 = Math.sin(angle) * size * 0.2 + size * 0.3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // 코트 라인 그리기
    const drawCourt = (ctx: CanvasRenderingContext2D, particle: Particle, screenX: number, screenY: number, size: number) => {
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(particle.rotationZ);
      ctx.globalAlpha = particle.opacity;
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = size * 0.02;
      
      // 센터 서클
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      
      // 3점 라인
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.5, 0, Math.PI);
      ctx.stroke();
      
      // 자유투 라인
      ctx.strokeRect(-size * 0.2, -size * 0.4, size * 0.4, size * 0.8);
      
      ctx.restore();
    };

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // 파티클 업데이트
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.z += particle.velocityZ;
        particle.rotationX += particle.rotationVelocityX;
        particle.rotationY += particle.rotationVelocityY;
        particle.rotationZ += particle.rotationVelocityZ;
        
        // 경계 체크 및 재배치
        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;
        if (particle.z < -500) particle.z = 1000;
        if (particle.z > 1000) particle.z = -500;
        
        // 3D 투영
        const perspective = 800;
        const scale = perspective / (perspective + particle.z);
        const screenX = particle.x + (particle.x - canvas.width / 2) * (scale - 1);
        const screenY = particle.y + (particle.y - canvas.height / 2) * (scale - 1);
        const size = particle.size * scale;
        
        // 파티클 타입에 따른 렌더링
        if (scale > 0.1) {
          switch (particle.type) {
            case 'basketball':
              drawBasketball(ctx, particle, screenX, screenY, size);
              break;
            case 'hoop':
              drawHoop(ctx, particle, screenX, screenY, size);
              break;
            case 'court':
              drawCourt(ctx, particle, screenX, screenY, size);
              break;
          }
        }
      });
      
      animationIdRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 100%)',
      }}
    />
  );
}