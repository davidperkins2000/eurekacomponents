// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';

function RotatingIcosahedron() {
  const meshRef = React.useRef();

  React.useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
      meshRef.current.rotation.z = 0;
    }
  }, []);

  useFrame((state, delta) => {
    const rotationSpeed = (Math.PI * 2) / 5;
    meshRef.current.rotation.x += rotationSpeed * delta;
    meshRef.current.rotation.y += rotationSpeed * delta;
    meshRef.current.rotation.z += rotationSpeed * delta;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color='#00ff88' metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

function Logo() {
  const zoom = 100; // Adjust this value to change the apparent size

  return (
    <Canvas
      style={{ background: '#1a1a1a' }}
      // Remove default camera prop as we're using OrthographicCamera
    >
      {/* Orthographic camera setup */}
      <OrthographicCamera
        makeDefault
        position={[4, 4, 4]}
        zoom={zoom}
        near={0.1}
        far={1000}
        left={-1}
        right={1}
        top={1}
        bottom={-1}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingIcosahedron />
      <OrbitControls
        enableZoom={false}
        // Optional: restrict rotation to maintain orthographic feel
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

// Self-initializing wrapper
(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScene);
  } else {
    initializeScene();
  }

  function initializeScene() {
    const container = document.currentScript.parentElement;
    const root = createRoot(container);
    root.render(<Logo />);
  }
})();
