import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

interface Props {
  className?: string;
  variant?: 'hero' | 'minimal' | 'summit' | 'emblem' | 'interactive';
  onOpenRegister?: () => void;
}

export const Astitva3DCanvas: React.FC<Props> = ({
  className = '',
  variant = 'hero',
  onOpenRegister,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (isMobile ? 260 : 500);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile
      ? variant === 'minimal' ? 7.5 : variant === 'emblem' ? 6.5 : 10.5
      : variant === 'minimal' ? 6.5 : variant === 'emblem' ? 5.5 : 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Determine current theme
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // -------------------------------------------------------------
    // 1. DIPLOMATIC GLOBE CORE
    // -------------------------------------------------------------
    const globeRadius = variant === 'minimal' ? 1.6 : variant === 'emblem' ? 1.7 : 2.0;

    // Inner Core Sphere (Black/Gold luxury planetary material)
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius * 0.96, 32, 32);
    const innerSphereMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0xb48a1a : 0x070a14,
      emissive: isLight ? 0xeab308 : 0x16203b,
      emissiveIntensity: isLight ? 0.45 : 0.25,
      metalness: 0.95,
      roughness: 0.1,
      transmission: isLight ? 0.2 : 0.6,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const innerSphereMesh = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    scene.add(innerSphereMesh);

    // Outer Wireframe Latitude/Longitude Grid Globe
    const globeWireframeGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
    const globeWireframeMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xffd700 : 0xd4af37,
      emissive: isLight ? 0xd4af37 : 0x544110,
      emissiveIntensity: isLight ? 0.55 : 0.35,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.85 : 0.5,
      metalness: 0.95,
      roughness: 0.15,
    });
    const globeWireframeMesh = new THREE.Mesh(globeWireframeGeo, globeWireframeMat);
    scene.add(globeWireframeMesh);

    // -------------------------------------------------------------
    // 2. ORBITING RINGS
    // -------------------------------------------------------------
    const ring1Geo = new THREE.TorusGeometry(globeRadius * 1.35, 0.05, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xffd700 : 0xd4af37,
      metalness: 0.95,
      roughness: 0.1,
      emissive: isLight ? 0xd4af37 : 0x8a7024,
      emissiveIntensity: isLight ? 0.7 : 0.4,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    scene.add(ring1Mesh);

    const ring2Geo = new THREE.TorusGeometry(globeRadius * 1.5, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xeab308 : 0x52459e,
      metalness: 0.9,
      roughness: 0.2,
      emissive: isLight ? 0xb48a1a : 0x3b2d80,
      emissiveIntensity: isLight ? 0.6 : 0.5,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.rotation.x = -Math.PI / 6;
    scene.add(ring2Mesh);

    // -------------------------------------------------------------
    // 3. INNER DIPLOMATIC EMBLEM CRYSTAL (Assembly Nucleus)
    // -------------------------------------------------------------
    const nucleusGeo = new THREE.IcosahedronGeometry(globeRadius * 0.45, 1);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xf3e5ab,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xd4af37,
      emissiveIntensity: isLight ? 0.7 : 0.5,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleusMesh);

    // -------------------------------------------------------------
    // 4. COMMITTEE BEACON NODES (6 Satellite Beacons)
    // -------------------------------------------------------------
    const nodeCount = 6;
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      emissiveIntensity: 0.9,
      metalness: 0.9,
    });

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      const dist = globeRadius * 1.38;
      nodeMesh.position.set(
        dist * Math.cos(theta) * Math.sin(phi),
        dist * Math.sin(theta) * Math.sin(phi),
        dist * Math.cos(phi)
      );
      nodeGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    }
    scene.add(nodeGroup);

    // -------------------------------------------------------------
    // 5. BACKGROUND CONSTELLATION DUST
    // -------------------------------------------------------------
    const particleCount = isMobile ? (variant === 'hero' ? 80 : 40) : (variant === 'hero' ? 220 : 100);
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      colors[i * 3] = 0.85 + Math.random() * 0.15;
      colors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.45 + Math.random() * 0.4;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // LIGHTING & ATMOSPHERE
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.6 : 0.9);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xffd700, isLight ? 5 : 3.5, 30);
    goldPointLight.position.set(5, 5, 6);
    scene.add(goldPointLight);

    const bluePointLight = new THREE.PointLight(isLight ? 0xeab308 : 0x52459e, isLight ? 4 : 4.5, 30);
    bluePointLight.position.set(-6, -4, 4);
    scene.add(bluePointLight);

    // MutationObserver to update theme live
    const themeObserver = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const lightActive = currentTheme === 'light';
      innerSphereMat.color.setHex(lightActive ? 0xb48a1a : 0x070a14);
      innerSphereMat.emissive.setHex(lightActive ? 0xeab308 : 0x16203b);
      innerSphereMat.emissiveIntensity = lightActive ? 0.45 : 0.25;

      globeWireframeMat.color.setHex(lightActive ? 0xffd700 : 0xd4af37);
      globeWireframeMat.emissive.setHex(lightActive ? 0xd4af37 : 0x544110);

      ring1Mat.color.setHex(lightActive ? 0xffd700 : 0xd4af37);
      ring1Mat.emissive.setHex(lightActive ? 0xd4af37 : 0x8a7024);

      ring2Mat.color.setHex(lightActive ? 0xeab308 : 0x52459e);
      ring2Mat.emissive.setHex(lightActive ? 0xb48a1a : 0x3b2d80);

      ambientLight.intensity = lightActive ? 1.6 : 0.9;
      goldPointLight.intensity = lightActive ? 5 : 3.5;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // -------------------------------------------------------------
    // MOUSE INTERACTIVITY
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
      targetRotationY = mouseX * 0.6;
      targetRotationX = mouseY * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // -------------------------------------------------------------
    // ANIMATION LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for user mouse tilt
      globeWireframeMesh.rotation.y += 0.005;
      globeWireframeMesh.rotation.x += (targetRotationX - globeWireframeMesh.rotation.x) * 0.05;
      globeWireframeMesh.rotation.y += (targetRotationY - globeWireframeMesh.rotation.y) * 0.05;

      innerSphereMesh.rotation.y = globeWireframeMesh.rotation.y;
      innerSphereMesh.rotation.x = globeWireframeMesh.rotation.x;

      // Orbiting rings animation
      ring1Mesh.rotation.z = elapsedTime * 0.25;
      ring1Mesh.rotation.y = elapsedTime * 0.15;

      ring2Mesh.rotation.z = -elapsedTime * 0.3;
      ring2Mesh.rotation.x = -Math.PI / 6 + Math.sin(elapsedTime * 0.5) * 0.1;

      // Pulsing central nucleus
      nucleusMesh.rotation.x = elapsedTime * 0.5;
      nucleusMesh.rotation.y = elapsedTime * 0.7;
      const scalePulse = 1 + Math.sin(elapsedTime * 2) * 0.06;
      nucleusMesh.scale.set(scalePulse, scalePulse, scalePulse);

      // Rotating Committee Beacons Group
      nodeGroup.rotation.y = -elapsedTime * 0.3;
      nodeGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15;

      // Particle system drift
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      globeWireframeGeo.dispose();
      globeWireframeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div
      onClick={() => onOpenRegister && onOpenRegister()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full group ${
        onOpenRegister ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
      } ${className}`}
      title={onOpenRegister ? 'Click Orbiting Celestial Core to Open Summit Registration' : undefined}
    >
      <div ref={mountRef} className="w-full h-full relative" />

      {/* Interactive Registration Trigger Prompt on Hover */}
      {onOpenRegister && (
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-[#070A14]/90 border border-[#D4AF37]/60 text-[#D4AF37] text-[11px] font-jakarta font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Click Celestial Core to Register</span>
        </div>
      )}
    </div>
  );
};
