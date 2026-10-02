'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { ToyVehicle, VehicleInputs } from './Vehicle';
import { WorldEnvironment } from './WorldEnvironment';
import { Project3DData } from './WorldData';
import { HUDOverlay } from './HUDOverlay';
import { ProjectModal } from './ProjectModal';
import { sounds } from './SoundEffects';

interface WorldCanvasProps {
  onSwitchToClassic: () => void;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ onSwitchToClassic }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // React State for HUD & Modal
  const [speed, setSpeed] = useState<number>(0);
  const [currentZone, setCurrentZone] = useState<string>('Welcome Plaza');
  const [nearestProject, setNearestProject] = useState<Project3DData | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project3DData | null>(null);

  // Mutable refs for high-frequency game loop
  const vehicleRef = useRef<ToyVehicle | null>(null);
  const environmentRef = useRef<WorldEnvironment | null>(null);
  const inputsRef = useRef<VehicleInputs>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // -------------------------------------------------------------
    // 1. THREE.JS SCENE, CAMERA, & RENDERER SETUP
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdce5f2); // Soft atmospheric sky blue
    scene.fog = new THREE.FogExp2(0xdce5f2, 0.012);

    // Isometric-angled perspective camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 300);
    camera.position.set(0, 18, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // 2. WARM STYLIZED LIGHTING (BRUNO SIMON SIGNATURE LOOK)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
    sunLight.position.set(35, 55, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 160;
    const shadowD = 55;
    sunLight.shadow.camera.left = -shadowD;
    sunLight.shadow.camera.right = shadowD;
    sunLight.shadow.camera.top = shadowD;
    sunLight.shadow.camera.bottom = -shadowD;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Fill blueish bounce light
    const hemiLight = new THREE.HemisphereLight(0xdce5f2, 0xc7d2fe, 0.6);
    scene.add(hemiLight);

    // -------------------------------------------------------------
    // 3. CANNON-ES PHYSICS WORLD
    // -------------------------------------------------------------
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -25, 0), // Strong snappy gravity for toy car
    });
    world.defaultContactMaterial.friction = 0.3;
    world.defaultContactMaterial.restitution = 0.1;

    // -------------------------------------------------------------
    // 4. SPAWN TOY VEHICLE & WORLD ENVIRONMENT
    // -------------------------------------------------------------
    const vehicle = new ToyVehicle(scene, world, new THREE.Vector3(0, 1.2, 0));
    vehicleRef.current = vehicle;

    const environment = new WorldEnvironment(scene, world, (proj) => {
      setSelectedProject(proj);
    });
    environmentRef.current = environment;

    // -------------------------------------------------------------
    // 5. INPUT EVENT LISTENERS (KEYBOARD & INTERACTION)
    // -------------------------------------------------------------
    const handleKeyDown = (e: KeyboardEvent) => {
      // Initialize audio on first keystroke
      sounds.init();

      const k = e.key.toLowerCase();

      if (e.code === 'KeyW' || e.code === 'ArrowUp' || k === 'w' || e.key === 'ArrowUp') {
        inputsRef.current.forward = true;
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown' || k === 's' || e.key === 'ArrowDown') {
        inputsRef.current.backward = true;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft' || k === 'a' || e.key === 'ArrowLeft') {
        inputsRef.current.left = true;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight' || k === 'd' || e.key === 'ArrowRight') {
        inputsRef.current.right = true;
      }
      if (e.code === 'Space' || k === ' ') {
        e.preventDefault();
        inputsRef.current.brake = true;
      }
      if (e.code === 'KeyH' || k === 'h') {
        sounds.playHorn();
      }
      if (e.code === 'KeyR' || k === 'r') {
        vehicle.resetPosition(new THREE.Vector3(0, 1.2, 0));
        environment.resetObjects();
      }
      if (e.code === 'Enter' || k === 'enter') {
        if (environment.nearestProject) {
          setSelectedProject(environment.nearestProject);
        }
      }
      if (e.code === 'Escape' || k === 'escape') {
        setSelectedProject(null);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      if (e.code === 'KeyW' || e.code === 'ArrowUp' || k === 'w' || e.key === 'ArrowUp') {
        inputsRef.current.forward = false;
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown' || k === 's' || e.key === 'ArrowDown') {
        inputsRef.current.backward = false;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft' || k === 'a' || e.key === 'ArrowLeft') {
        inputsRef.current.left = false;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight' || k === 'd' || e.key === 'ArrowRight') {
        inputsRef.current.right = false;
      }
      if (e.code === 'Space' || k === ' ') {
        inputsRef.current.brake = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // 6. MAIN ANIMATION & PHYSICS TICK LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    let lastTime = performance.now();
    const fixedTimeStep = 1 / 60;
    let uiThrottleTimer = 0;

    const tick = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      // Step Cannon.js physics
      world.step(fixedTimeStep, delta, 3);

      // Update Vehicle
      vehicle.update(delta, inputsRef.current);

      // Update Environment dynamic items & zones
      const carPos = vehicle.mesh.position;
      environment.update(carPos);

      // Camera Smooth Follow (Smooth Isometric Offset)
      const targetCamPos = new THREE.Vector3(
        carPos.x,
        carPos.y + 15,
        carPos.z + 18
      );
      camera.position.lerp(targetCamPos, delta * 3.5);
      camera.lookAt(carPos.x, carPos.y + 0.8, carPos.z);

      // Update Sun light position to follow car for high quality shadow maps
      sunLight.position.set(carPos.x + 35, 55, carPos.z + 30);
      sunLight.target.position.set(carPos.x, carPos.y, carPos.z);
      sunLight.target.updateMatrixWorld();

      // Throttle UI React State updates to ~15fps for maximum 60fps WebGL smoothness
      uiThrottleTimer += delta;
      if (uiThrottleTimer > 0.065) {
        uiThrottleTimer = 0;
        setSpeed(vehicle.body.velocity.length());
        setCurrentZone(environment.activeZoneName);
        setNearestProject(environment.nearestProject);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Teleport handler
  const handleTeleport = (x: number, y: number, z: number) => {
    if (vehicleRef.current) {
      sounds.playZoneChime();
      vehicleRef.current.resetPosition(new THREE.Vector3(x, y, z));
    }
  };

  // Reset car handler
  const handleResetCar = () => {
    if (vehicleRef.current && environmentRef.current) {
      vehicleRef.current.resetPosition(new THREE.Vector3(0, 1.2, 0));
      environmentRef.current.resetObjects();
      sounds.playHorn();
    }
  };

  // Mobile inputs update
  const handleSetMobileInputs = (newInputs: Partial<VehicleInputs>) => {
    sounds.init();
    inputsRef.current = { ...inputsRef.current, ...newInputs };
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#dce5f2]">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Bruno Simon Style HUD Overlay */}
      <HUDOverlay
        speed={speed}
        currentZone={currentZone}
        nearestProject={nearestProject}
        onOpenProject={(proj) => setSelectedProject(proj)}
        onTeleport={handleTeleport}
        onResetCar={handleResetCar}
        onSwitchToClassic={onSwitchToClassic}
        onSetMobileInputs={handleSetMobileInputs}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
