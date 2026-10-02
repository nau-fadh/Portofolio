import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { sounds } from './SoundEffects';

export interface VehicleInputs {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  brake: boolean;
}

export class ToyVehicle {
  public mesh: THREE.Group;
  public body: CANNON.Body;
  public wheels: THREE.Mesh[] = [];
  public frontWheelPivots: THREE.Group[] = [];
  
  // Physics parameters
  private maxSpeed = 24;
  private acceleration = 45;
  private reverseSpeed = 12;
  private turnSpeed = 2.8;
  private currentSteering = 0;
  private currentSpeed = 0;

  // Visual effects
  private smokeParticles: { mesh: THREE.Mesh; life: number; maxLife: number; velocity: THREE.Vector3 }[] = [];
  private smokeGroup: THREE.Group;
  private smokeGeo: THREE.BufferGeometry;
  private smokeMat: THREE.MeshBasicMaterial;

  constructor(scene: THREE.Scene, world: CANNON.World, startPos: THREE.Vector3 = new THREE.Vector3(0, 1.2, 0)) {
    this.mesh = new THREE.Group();

    // -------------------------------------------------------------
    // 1. CANNON.JS RIGID BODY (CHASSIS COLLIDER)
    // -------------------------------------------------------------
    const chassisShape = new CANNON.Box(new CANNON.Vec3(0.9, 0.35, 1.6));
    this.body = new CANNON.Body({
      mass: 150,
      shape: chassisShape,
      position: new CANNON.Vec3(startPos.x, startPos.y, startPos.z),
      material: new CANNON.Material({ friction: 0.3, restitution: 0.1 }),
      linearDamping: 0.15,
      angularDamping: 0.3
    });
    world.addBody(this.body);

    // Collision listener for physics sound effects
    this.body.addEventListener('collide', (e: any) => {
      const relativeVelocity = e.contact.getImpactVelocityAlongNormal();
      if (Math.abs(relativeVelocity) > 2.5) {
        sounds.playHit(Math.abs(relativeVelocity) / 10);
      }
    });

    // -------------------------------------------------------------
    // 2. THREE.JS VISUAL MODEL (STYLIZED BRUNO SIMON TOY TRUCK)
    // -------------------------------------------------------------
    const carGroup = new THREE.Group();

    // Main Chassis Body (Cyber Yellow/Orange with Bevel style)
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.45, 2.9);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xffb703, // Bruno Simon style warm vibrant orange-yellow
      roughness: 0.3,
      metalness: 0.1,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.2;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    carGroup.add(bodyMesh);

    // Lower Front Bumper / Skid Plate
    const bumperGeo = new THREE.BoxGeometry(1.5, 0.25, 0.4);
    const bumperMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.7 });
    const bumperMesh = new THREE.Mesh(bumperGeo, bumperMat);
    bumperMesh.position.set(0, 0.05, 1.5);
    bumperMesh.castShadow = true;
    carGroup.add(bumperMesh);

    // Cabin / Windshield
    const cabinGeo = new THREE.BoxGeometry(1.3, 0.55, 1.4);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x023047, // Glossy deep navy/glass
      roughness: 0.1,
      metalness: 0.5,
    });
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(0, 0.65, -0.2);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // Truck Bed Rails (Cyber Accent)
    const railGeo = new THREE.BoxGeometry(1.4, 0.2, 0.9);
    const railMat = new THREE.MeshStandardMaterial({ color: 0xfb8500, roughness: 0.4 });
    const railMesh = new THREE.Mesh(railGeo, railMat);
    railMesh.position.set(0, 0.48, -1.0);
    railMesh.castShadow = true;
    carGroup.add(railMesh);

    // Headlights
    const lightGeo = new THREE.BoxGeometry(0.28, 0.15, 0.1);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftLight = new THREE.Mesh(lightGeo, lightMat);
    leftLight.position.set(-0.55, 0.25, 1.46);
    const rightLight = new THREE.Mesh(lightGeo, lightMat);
    rightLight.position.set(0.55, 0.25, 1.46);
    carGroup.add(leftLight);
    carGroup.add(rightLight);

    // Headlight Spotlights
    const spotL = new THREE.SpotLight(0xfff3b0, 1.2, 12, Math.PI / 6, 0.5);
    spotL.position.set(-0.55, 0.3, 1.5);
    spotL.target.position.set(-0.55, 0, 7);
    carGroup.add(spotL);
    carGroup.add(spotL.target);

    const spotR = new THREE.SpotLight(0xfff3b0, 1.2, 12, Math.PI / 6, 0.5);
    spotR.position.set(0.55, 0.3, 1.5);
    spotR.target.position.set(0.55, 0, 7);
    carGroup.add(spotR);
    carGroup.add(spotR.target);

    // Taillights
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xd90429 });
    const leftTail = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.05), tailMat);
    leftTail.position.set(-0.55, 0.25, -1.46);
    const rightTail = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.05), tailMat);
    rightTail.position.set(0.55, 0.25, -1.46);
    carGroup.add(leftTail);
    carGroup.add(rightTail);

    // Roof Antenna / Flag
    const antGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7);
    const antMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const antenna = new THREE.Mesh(antGeo, antMat);
    antenna.position.set(-0.45, 1.15, -0.6);
    carGroup.add(antenna);

    const flagMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.15, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x4cc9f0 })
    );
    flagMesh.position.set(-0.35, 1.45, -0.6);
    carGroup.add(flagMesh);

    // -------------------------------------------------------------
    // 3. WHEELS (4 CHUNKY TIRES WITH RIMS)
    // -------------------------------------------------------------
    const wheelRadius = 0.38;
    const wheelThickness = 0.28;
    const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelThickness, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, metalness: 0.7, roughness: 0.2 });

    const wheelOffsets = [
      { x: -0.92, y: -0.15, z: 1.0, isFront: true },  // Front Left
      { x: 0.92, y: -0.15, z: 1.0, isFront: true },   // Front Right
      { x: -0.92, y: -0.15, z: -1.0, isFront: false }, // Rear Left
      { x: 0.92, y: -0.15, z: -1.0, isFront: false },  // Rear Right
    ];

    wheelOffsets.forEach((cfg) => {
      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.castShadow = true;

      // Inner rim cap
      const rim = new THREE.Mesh(
        new THREE.CylinderGeometry(wheelRadius * 0.55, wheelRadius * 0.55, wheelThickness + 0.02, 12),
        rimMat
      );
      rim.rotateZ(Math.PI / 2);
      tire.add(rim);

      if (cfg.isFront) {
        const pivot = new THREE.Group();
        pivot.position.set(cfg.x, cfg.y, cfg.z);
        pivot.add(tire);
        carGroup.add(pivot);
        this.frontWheelPivots.push(pivot);
        this.wheels.push(tire);
      } else {
        tire.position.set(cfg.x, cfg.y, cfg.z);
        carGroup.add(tire);
        this.wheels.push(tire);
      }
    });

    this.mesh.add(carGroup);
    scene.add(this.mesh);

    // -------------------------------------------------------------
    // 4. TIRE SMOKE & DUST PARTICLES
    // -------------------------------------------------------------
    this.smokeGroup = new THREE.Group();
    this.smokeGeo = new THREE.DodecahedronGeometry(0.18, 0);
    this.smokeMat = new THREE.MeshBasicMaterial({
      color: 0xe5e7eb,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });
    scene.add(this.smokeGroup);
  }

  public update(delta: number, inputs: VehicleInputs) {
    // -----------------------------------------------------------
    // A. DRIVING & STEERING PHYSICS LOGIC
    // -----------------------------------------------------------
    const heading = this.body.quaternion;
    const forwardVec = new CANNON.Vec3(0, 0, 1);
    heading.vmult(forwardVec, forwardVec);

    // Handle acceleration & reverse
    let targetSpeed = 0;
    if (inputs.forward) {
      targetSpeed = this.maxSpeed;
    } else if (inputs.backward) {
      targetSpeed = -this.reverseSpeed;
    }

    if (inputs.brake) {
      targetSpeed = 0;
      this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, 0, delta * 6);
    } else {
      this.currentSpeed = THREE.MathUtils.lerp(
        this.currentSpeed,
        targetSpeed,
        delta * (targetSpeed !== 0 ? (this.acceleration / this.maxSpeed) : 3.0)
      );
    }

    // Steering logic (higher response when moving)
    let targetSteering = 0;
    if (inputs.left) targetSteering += 0.55;
    if (inputs.right) targetSteering -= 0.55;
    this.currentSteering = THREE.MathUtils.lerp(this.currentSteering, targetSteering, delta * 10);

    // Animate visual front wheel turn angle
    this.frontWheelPivots.forEach((pivot) => {
      pivot.rotation.y = this.currentSteering;
    });

    // Apply linear driving force to physics body
    const driveForce = forwardVec.scale(this.currentSpeed * 180);
    this.body.applyForce(driveForce, this.body.position);

    // Apply angular torque steering
    if (Math.abs(this.currentSpeed) > 0.5) {
      const steerDirection = this.currentSpeed > 0 ? 1 : -1;
      const torque = new CANNON.Vec3(0, this.currentSteering * this.turnSpeed * steerDirection * 550, 0);
      this.body.applyTorque(torque);
    }

    // Prevent car from flying away or flipping uncontrollably
    this.body.angularVelocity.x *= 0.88;
    this.body.angularVelocity.z *= 0.88;
    
    // Auto-upright stabilizer (ensures toy car returns to wheels smoothly if tilted)
    const upVector = new CANNON.Vec3(0, 1, 0);
    const currentUp = new CANNON.Vec3(0, 1, 0);
    heading.vmult(currentUp, currentUp);
    const tilt = upVector.cross(currentUp);
    this.body.applyTorque(tilt.scale(-1200));

    // Limit max velocity
    const speed = this.body.velocity.length();
    if (speed > this.maxSpeed * 1.2) {
      this.body.velocity.scale(this.maxSpeed * 1.2 / speed, this.body.velocity);
    }

    // -----------------------------------------------------------
    // B. SYNC THREE.JS MESH WITH CANNON.JS BODY
    // -----------------------------------------------------------
    this.mesh.position.set(this.body.position.x, this.body.position.y, this.body.position.z);
    this.mesh.quaternion.set(
      this.body.quaternion.x,
      this.body.quaternion.y,
      this.body.quaternion.z,
      this.body.quaternion.w
    );

    // Rotate wheels visually according to forward speed
    const wheelRotSpeed = (this.currentSpeed / 0.38) * delta;
    this.wheels.forEach((w) => {
      w.rotation.x += wheelRotSpeed;
    });

    // -----------------------------------------------------------
    // C. AUDIO & DUST PARTICLES
    // -----------------------------------------------------------
    const speedRatio = Math.abs(speed) / this.maxSpeed;
    sounds.updateEngine(speedRatio, inputs.forward || inputs.backward);

    // Spawn smoke / dust when accelerating hard or turning sharply
    if (Math.abs(this.currentSteering) > 0.2 && speed > 6) {
      this.spawnSmoke();
    }

    this.updateSmoke(delta);
  }

  private spawnSmoke() {
    if (this.smokeParticles.length > 25) return;

    const smokeMesh = new THREE.Mesh(this.smokeGeo, this.smokeMat.clone());
    const rearPos = new THREE.Vector3(
      this.mesh.position.x + (Math.random() - 0.5) * 0.8,
      this.mesh.position.y + 0.1,
      this.mesh.position.z + (Math.random() - 0.5) * 0.8
    );
    smokeMesh.position.copy(rearPos);
    this.smokeGroup.add(smokeMesh);

    this.smokeParticles.push({
      mesh: smokeMesh,
      life: 0,
      maxLife: 0.6 + Math.random() * 0.3,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.5, 0.8 + Math.random() * 0.5, (Math.random() - 0.5) * 0.5)
    });
  }

  private updateSmoke(delta: number) {
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];
      p.life += delta;
      const progress = p.life / p.maxLife;

      p.mesh.position.addScaledVector(p.velocity, delta);
      const scale = 0.5 + progress * 2.2;
      p.mesh.scale.set(scale, scale, scale);

      (p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.4 * (1 - progress));

      if (p.life >= p.maxLife) {
        this.smokeGroup.remove(p.mesh);
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
        this.smokeParticles.splice(i, 1);
      }
    }
  }

  public resetPosition(pos: THREE.Vector3 = new THREE.Vector3(0, 1.2, 0)) {
    this.body.position.set(pos.x, pos.y, pos.z);
    this.body.velocity.set(0, 0, 0);
    this.body.angularVelocity.set(0, 0, 0);
    this.body.quaternion.set(0, 0, 0, 1);
    this.currentSpeed = 0;
    this.currentSteering = 0;
  }
}
