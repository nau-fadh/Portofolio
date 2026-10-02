'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { ToyVehicle, VehicleInputs } from './Vehicle';
import { WorldEnvironment } from './WorldEnvironment';
import { Project3DData } from './WorldData';
import { HUDOverlay } from './HUDOverlay';
import { ProjectModal } from './ProjectModal';
import { ControlsGuideModal } from './ControlsGuideModal';
import { sounds } from './SoundEffects';

interface WorldCanvasProps {
  onSwitchToClassic: () => void;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ onSwitchToClassic }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // React State for HUD & Modals
  const [speed, setSpeed] = useState<number>(0);
  const [currentZone, setCurrentZone] = useState<string>('Welcome Plaza');
  const [nearestProject, setNearestProject] = useState<Project3DData | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project3DData | null>(null);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState<boolean>(false);

  // Mutable refs for high-frequency game loop
  const vehicleRef = useRef<ToyVehicle | null>(null);
  const environmentRef = useRef<WorldEnvironment | null>(null);

  // Driving inputs (W, A, S, D, Space)
  const inputsRef = useRef<VehicleInputs>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  });

  // Camera Orbit controls (Arrow Keys + Mouse Drag)
  const cameraAngleRef = useRef({
    azimuth: 0, // Horizontal rotation in radians around the car
    elevation: 0.65, // Vertical pitch angle (~37 deg)
    distance: 24, // Distance from car
  });

  const cameraKeysRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
  });

  const isDraggingRef = useRef(false);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // -------------------------------------------------------------
    // 1. THREE.JS SCENE, CAMERA, & RENDERER SETUP
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdce5f2); // Soft atmospheric sky blue
    scene.fog = new THREE.FogExp2(0xdce5f2, 0.012);

    // Free orbit perspective camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 300);
    camera.position.set(0, 16, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // 2. WARM STYLIZED LIGHTING (BRUNO SIMON LOOK)
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

    const hemiLight = new THREE.HemisphereLight(0xdce5f2, 0xc7d2fe, 0.6);
    scene.add(hemiLight);

    // -------------------------------------------------------------
    // 3. CANNON-ES PHYSICS WORLD
    // -------------------------------------------------------------
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -25, 0),
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
    // 5. INPUT EVENT LISTENERS (KEYBOARD & MOUSE DRAG)
    // -------------------------------------------------------------
    const handleKeyDown = (e: KeyboardEvent) => {
      sounds.init();
      const k = e.key.toLowerCase();

      // Driving Keys (W, A, S, D, Space)
      if (e.code === 'KeyW' || k === 'w') inputsRef.current.forward = true;
      if (e.code === 'KeyS' || k === 's') inputsRef.current.backward = true;
      if (e.code === 'KeyA' || k === 'a') inputsRef.current.left = true;
      if (e.code === 'KeyD' || k === 'd') inputsRef.current.right = true;
      if (e.code === 'Space' || k === ' ') {
        e.preventDefault();
        inputsRef.current.brake = true;
      }

      // Camera Orbit Keys (Arrow Keys ◀ ▲ ▼ ▶)
      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
        e.preventDefault();
        cameraKeysRef.current.left = true;
      }
      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
        e.preventDefault();
        cameraKeysRef.current.right = true;
      }
      if (e.code === 'ArrowUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        cameraKeysRef.current.up = true;
      }
      if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
        e.preventDefault();
        cameraKeysRef.current.down = true;
      }

      // Action Keys
      if (e.code === 'KeyH' || k === 'h') sounds.playHorn();
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
        setIsControlsModalOpen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      // Driving Keys
      if (e.code === 'KeyW' || k === 'w') inputsRef.current.forward = false;
      if (e.code === 'KeyS' || k === 's') inputsRef.current.backward = false;
      if (e.code === 'KeyA' || k === 'a') inputsRef.current.left = false;
      if (e.code === 'KeyD' || k === 'd') inputsRef.current.right = false;
      if (e.code === 'Space' || k === ' ') inputsRef.current.brake = false;

      // Camera Orbit Keys
      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') cameraKeysRef.current.left = false;
      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') cameraKeysRef.current.right = false;
      if (e.code === 'ArrowUp' || e.key === 'ArrowUp') cameraKeysRef.current.up = false;
      if (e.code === 'ArrowDown' || e.key === 'ArrowDown') cameraKeysRef.current.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Mouse Drag on Canvas to Rotate Camera Orbit
    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerPosRef.current.x;
      const dy = e.clientY - lastPointerPosRef.current.y;
      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

      cameraAngleRef.current.azimuth -= dx * 0.006;
      cameraAngleRef.current.elevation = Math.max(
        0.18,
        Math.min(1.35, cameraAngleRef.current.elevation + dy * 0.006)
      );
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

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

      // Update Vehicle (W, A, S, D)
      vehicle.update(delta, inputsRef.current);

      // Update Environment
      const carPos = vehicle.mesh.position;
      environment.update(carPos);

      // -----------------------------------------------------------
      // DYNAMIC 360° CAMERA ORBIT CONTROLS (ARROW KEYS)
      // -----------------------------------------------------------
      const camRotateSpeed = 2.4;
      if (cameraKeysRef.current.left) {
        cameraAngleRef.current.azimuth += camRotateSpeed * delta;
      }
      if (cameraKeysRef.current.right) {
        cameraAngleRef.current.azimuth -= camRotateSpeed * delta;
      }
      if (cameraKeysRef.current.up) {
        cameraAngleRef.current.elevation = Math.min(1.35, cameraAngleRef.current.elevation + camRotateSpeed * 0.6 * delta);
      }
      if (cameraKeysRef.current.down) {
        cameraAngleRef.current.elevation = Math.max(0.18, cameraAngleRef.current.elevation - camRotateSpeed * 0.6 * delta);
      }

      // Compute 3D camera position based on spherical coordinates
      const { azimuth, elevation, distance } = cameraAngleRef.current;
      const horizDist = Math.cos(elevation) * distance;
      const vertDist = Math.sin(elevation) * distance;

      const targetCamPos = new THREE.Vector3(
        carPos.x + Math.sin(azimuth) * horizDist,
        carPos.y + vertDist,
        carPos.z + Math.cos(azimuth) * horizDist
      );

      camera.position.lerp(targetCamPos, delta * 5.0);
      camera.lookAt(carPos.x, carPos.y + 0.8, carPos.z);

      // Update Sun light position to follow car
      sunLight.position.set(carPos.x + 35, 55, carPos.z + 30);
      sunLight.target.position.set(carPos.x, carPos.y, carPos.z);
      sunLight.target.updateMatrixWorld();

      // Throttle UI updates to ~15fps
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

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
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

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#dce5f2]">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        title="Klik dan seret mouse untuk memutar sudut pandang kamera 360°"
      />

      {/* Bruno Simon Style HUD Overlay */}
      <HUDOverlay
        speed={speed}
        currentZone={currentZone}
        nearestProject={nearestProject}
        onOpenProject={(proj) => setSelectedProject(proj)}
        onTeleport={handleTeleport}
        onResetCar={handleResetCar}
        onSwitchToClassic={onSwitchToClassic}
        onOpenControlsModal={() => setIsControlsModalOpen(true)}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Game Controls & Camera Manual Book Modal */}
      <ControlsGuideModal
        isOpen={isControlsModalOpen}
        onClose={() => setIsControlsModalOpen(false)}
      />
    </div>
  );
};
