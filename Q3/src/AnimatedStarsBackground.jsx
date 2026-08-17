import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 80;
const STAR_COLOR = 'rgba(255,255,255,0.8)';
const STAR_SIZE = [1, 2];
const STAR_SPEED = 0.3; // pixels per frame

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const AnimatedStarsBackground = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize stars
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      size: randomBetween(STAR_SIZE[0], STAR_SIZE[1]),
      speed: randomBetween(STAR_SPEED * 0.7, STAR_SPEED * 1.3),
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Fill with semi-transparent dark color
      ctx.fillStyle = 'rgba(20, 24, 40, 0.85)';
      ctx.fillRect(0, 0, width, height);
      // Debug: log to confirm drawing
      console.log('Drawing stars...');
      for (let star of stars.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function update() {
      for (let star of stars.current) {
        star.x += star.speed;
        star.y += star.speed;
        if (star.x > width || star.y > height) {
          // Reset to top-left
          star.x = randomBetween(-50, 0);
          star.y = randomBetween(-50, 0);
        }
      }
    }

    function animate() {
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
};

export default AnimatedStarsBackground; 