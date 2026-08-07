import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  className?: string;
  variant?: 'hero' | 'minimal' | 'summit';
}

export const Astitva3DCanvas: React.FC<Props> = ({ className = '', variant = 'hero' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = variant === 'minimal' ? 6.5 : 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // 1. DIPLOMATIC GLOBE CORE (International Diplomacy & Academic Platform)
    // -------------------------------------------------------------
    const globeRadius = variant === 'minimal' ? 1.6 : 2.0;

    // Inner Translucent Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius * 0.96, 32, 32);
    const innerSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d1427,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const innerSphereMesh = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    scene.add(innerSphereMesh);

    // Outer Wireframe Latitude/Longitude Grid Globe
    const globeWireframeGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
    const globeWireframeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Champagne Gold
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      metalness: 0.9,
      roughness: 0.2,
    });
    const globeWireframeMesh = new THREE.Mesh(globeWireframeGeo, globeWireframeMat);
    scene.add(globeWireframeMesh);

    // -------------------------------------------------------------
    // 2. ORBITING MULTILATERAL DIPLOMACY RINGS
    // -------------------------------------------------------------
    const ring1Geo = new THREE.TorusGeometry(globeRadius * 1.35, 0.05, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x544110,
      emissiveIntensity: 0.3,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    scene.add(ring1Mesh);

    const ring2Geo = new THREE.TorusGeometry(globeRadius * 1.5, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x3a5499, // Sapphire Blue
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x16203b,
      emissiveIntensity: 0.4,
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
      emissiveIntensity: 0.4,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleusMesh);

    // -------------------------------------------------------------
    // 4. COMMITTEE BEACON NODES (6 Pulsing Satellite Beacons)
    // -------------------------------------------------------------
    const nodeCount = 6;
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      emissiveIntensity: 0.8,
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
    const particleCount = variant === 'hero' ? 220 : 100;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color variation between champagne gold, sapphire blue, and silver
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xffd700, 3, 25);
    goldPointLight.position.set(5, 5, 6);
    scene.add(goldPointLight);

    const bluePointLight = new THREE.PointLight(0x243563, 4, 25);
    bluePointLight.position.set(-6, -4, 4);
    scene.add(bluePointLight);

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

  return <div ref={mountRef} className={`w-full h-full relative pointer-events-none ${className}`} />;
};
