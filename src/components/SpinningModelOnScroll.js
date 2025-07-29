import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import '../SpinningModelOnScroll.css';

function SpinningModel({ rotationSpeed }) {
  const modelRef = useRef();
  const { scene } = useGLTF('/test.glb');

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed.current;
      rotationSpeed.current *= 0.9;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={4}/>;
}

export default function SpinningModelOnScroll() {
  const rotationSpeed = useRef(0);
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      rotationSpeed.current += (e.deltaY || 0) * 0.001;
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      rotationSpeed.current += deltaY * 0.005;
      touchStartY.current = e.touches[0].clientY;
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section className="section-wrapper">
      <div className="text-section">
        <h3>REACTION has been designed by sports nutrition experts to optimize
           cognitive and physical performance, while offering an unrivaled flavor profile. </h3>

      </div>

      <div className="model-section">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          <SpinningModel rotationSpeed={rotationSpeed} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
}
