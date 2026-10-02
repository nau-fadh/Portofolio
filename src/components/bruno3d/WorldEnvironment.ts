import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PROJECTS_3D, SKILLS_LIST, CAREER_LIST, createTextTexture, createHighwaySignTexture, Project3DData } from './WorldData';
import { sounds } from './SoundEffects';

export interface ZoneTrigger {
  name: string;
  pos: THREE.Vector3;
  radius: number;
  data?: any;
  onEnter?: () => void;
}

export class WorldEnvironment {
  public scene: THREE.Scene;
  public world: CANNON.World;
  public dynamicBoxes: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];
  public bowlingPins: { mesh: THREE.Group; body: CANNON.Body }[] = [];
  public triggers: ZoneTrigger[] = [];
  public nearestProject: Project3DData | null = null;
  public activeZoneName: string = 'Welcome Area';

  constructor(scene: THREE.Scene, world: CANNON.World, onOpenProject: (proj: Project3DData) => void) {
    this.scene = scene;
    this.world = world;

    this.buildGroundAndWalls();
    this.buildWelcomeZone();
    this.buildProjectsZone(onOpenProject);
    this.buildSkillsZone();
    this.buildExperienceHighway();
    this.buildContactZone();
    this.buildStuntPlayground();
  }

  // -------------------------------------------------------------
  // 1. GROUND FLOOR & BOUNDARY WALLS
  // -------------------------------------------------------------
  private buildGroundAndWalls() {
    // Ground Visual (Warm pastel floor with grid)
    const floorSize = 140;
    const floorGeo = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xede8f5, // Bruno Simon style soft warm lavender/clay
      roughness: 0.8,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    this.scene.add(floorMesh);

    // Subtle Ground Grid Texture
    const grid = new THREE.GridHelper(floorSize, 70, 0x4361ee, 0xd8d3e6);
    grid.position.y = 0.01;
    this.scene.add(grid);

    // Ground Physics
    const groundBody = new CANNON.Body({
      mass: 0, // static
      shape: new CANNON.Plane(),
      material: new CANNON.Material({ friction: 0.4, restitution: 0.1 })
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.world.addBody(groundBody);

    // Boundary Walls (To keep the car inside 140x140 area)
    const half = floorSize / 2;
    const wallThick = 2;
    const wallHeight = 4;
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x3a0ca3, roughness: 0.5 });

    const wallConfigs = [
      { x: 0, z: half, w: floorSize, h: wallThick },   // North
      { x: 0, z: -half, w: floorSize, h: wallThick },  // South
      { x: half, z: 0, w: wallThick, h: floorSize },   // East
      { x: -half, z: 0, w: wallThick, h: floorSize },  // West
    ];

    wallConfigs.forEach((cfg) => {
      const wallMesh = new THREE.Mesh(
        new THREE.BoxGeometry(cfg.w, wallHeight, cfg.h),
        wallMat
      );
      wallMesh.position.set(cfg.x, wallHeight / 2, cfg.z);
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      this.scene.add(wallMesh);

      const wallBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(cfg.w / 2, wallHeight / 2, cfg.h / 2)),
        position: new CANNON.Vec3(cfg.x, wallHeight / 2, cfg.z),
      });
      this.world.addBody(wallBody);
    });
  }

  // -------------------------------------------------------------
  // 2. WELCOME ZONE
  // -------------------------------------------------------------
  private buildWelcomeZone() {
    const welcomeGroup = new THREE.Group();
    welcomeGroup.position.set(0, 0, 0);

    // Giant Welcome Billboard
    const boardTex = createTextTexture('NAUFAL FADHLURROHMAN', '#4361ee', '#ffffff', 1024, 256);
    const subTex = createTextTexture('.NET & FULLSTACK SPECIALIST', '#16213e', '#4cc9f0', 1024, 180);

    const postGeo = new THREE.CylinderGeometry(0.18, 0.18, 5, 12);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x2b2d42 });

    const postL = new THREE.Mesh(postGeo, postMat);
    postL.position.set(-4.5, 2.5, -4);
    postL.castShadow = true;
    welcomeGroup.add(postL);

    const postR = new THREE.Mesh(postGeo, postMat);
    postR.position.set(4.5, 2.5, -4);
    postR.castShadow = true;
    welcomeGroup.add(postR);

    // Board Main
    const boardGeo = new THREE.BoxGeometry(9.6, 2.4, 0.3);
    const boardMat = new THREE.MeshStandardMaterial({ map: boardTex });
    const boardMesh = new THREE.Mesh(boardGeo, boardMat);
    boardMesh.position.set(0, 4.2, -4);
    boardMesh.castShadow = true;
    welcomeGroup.add(boardMesh);

    // Subtitle Board
    const subGeo = new THREE.BoxGeometry(8.2, 1.4, 0.25);
    const subMat = new THREE.MeshStandardMaterial({ map: subTex });
    const subMesh = new THREE.Mesh(subGeo, subMat);
    subMesh.position.set(0, 2.2, -4);
    subMesh.castShadow = true;
    welcomeGroup.add(subMesh);

    // Static physics for welcome board posts
    const postBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(5, 3, 0.4)),
      position: new CANNON.Vec3(0, 3, -4)
    });
    this.world.addBody(postBody);

    // Glowing Circular Spawn Ring on Ground (Image 2 style)
    const spawnRingGeo = new THREE.RingGeometry(3.6, 3.85, 48);
    const spawnRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
    const spawnRing = new THREE.Mesh(spawnRingGeo, spawnRingMat);
    spawnRing.rotation.x = -Math.PI / 2;
    spawnRing.position.set(0, 0.03, 0);
    welcomeGroup.add(spawnRing);

    const spawnDiscGeo = new THREE.CircleGeometry(3.6, 36);
    const spawnDiscMat = new THREE.MeshStandardMaterial({ color: 0x221833, roughness: 0.8 });
    const spawnDisc = new THREE.Mesh(spawnDiscGeo, spawnDiscMat);
    spawnDisc.rotation.x = -Math.PI / 2;
    spawnDisc.position.set(0, 0.02, 0);
    spawnDisc.receiveShadow = true;
    welcomeGroup.add(spawnDisc);

    // Warm Retro Street Lamp next to the spawn circle (Image 2 aesthetic)
    const lampPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 3.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 })
    );
    lampPost.position.set(-2.8, 1.6, 1.2);
    lampPost.castShadow = true;
    welcomeGroup.add(lampPost);

    const lantern = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.6, 0.5),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    lantern.position.set(-2.8, 3.2, 1.2);
    welcomeGroup.add(lantern);

    const lampLight = new THREE.PointLight(0xfbbf24, 2.0, 10);
    lampLight.position.set(-2.8, 3.2, 1.2);
    welcomeGroup.add(lampLight);

    // Road Arrows on Ground
    this.createRoadArrow(new THREE.Vector3(6, 0.05, 0), 0, 'PROJECTS ➔');
    this.createRoadArrow(new THREE.Vector3(-6, 0.05, 0), Math.PI, '⬅ SKILLS');
    this.createRoadArrow(new THREE.Vector3(0, 0.05, 6), Math.PI / 2, '⬇ EXPERIENCE');
    this.createRoadArrow(new THREE.Vector3(0, 0.05, -8), -Math.PI / 2, '⬆ CONTACT & STUNT');

    this.scene.add(welcomeGroup);
  }

  private createRoadArrow(pos: THREE.Vector3, rotY: number, label: string) {
    const tex = createTextTexture(label, 'rgba(0,0,0,0)', '#4361ee', 512, 128);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 1.5),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.rotation.z = rotY;
    plane.position.copy(pos);
    this.scene.add(plane);
  }

  // -------------------------------------------------------------
  // 3. PROJECTS ZONE (INTERACTIVE 3D BOOTHS)
  // -------------------------------------------------------------
  private buildProjectsZone(onOpenProject: (proj: Project3DData) => void) {
    // Zone Header Billboard
    const titleTex = createTextTexture('★ FEATURED PROJECTS ★', '#7209b7', '#ffffff', 1024, 256);
    const titleMesh = new THREE.Mesh(
      new THREE.BoxGeometry(14, 2.5, 0.4),
      new THREE.MeshStandardMaterial({ map: titleTex })
    );
    titleMesh.position.set(23, 4, -4);
    titleMesh.castShadow = true;
    this.scene.add(titleMesh);

    // Display booths for each project
    PROJECTS_3D.forEach((proj) => {
      const booth = new THREE.Group();
      booth.position.set(proj.pos[0], proj.pos[1], proj.pos[2]);

      // Pedestal Base
      const baseGeo = new THREE.BoxGeometry(6, 0.6, 6);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x2b2d42, roughness: 0.6 });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.3;
      baseMesh.receiveShadow = true;
      booth.add(baseMesh);

      // Physics body for base
      const baseBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(3, 0.3, 3)),
        position: new CANNON.Vec3(proj.pos[0], 0.3, proj.pos[2])
      });
      this.world.addBody(baseBody);

      // Screenshot Billboard
      const imgTexture = new THREE.TextureLoader().load(proj.image);
      const screenMesh = new THREE.Mesh(
        new THREE.BoxGeometry(5.2, 3.2, 0.2),
        new THREE.MeshStandardMaterial({ map: imgTexture })
      );
      screenMesh.position.set(0, 2.4, 0);
      screenMesh.castShadow = true;
      booth.add(screenMesh);

      // Title Banner under screenshot
      const labelTex = createTextTexture(proj.title, '#3a0ca3', '#ffffff', 512, 128);
      const labelMesh = new THREE.Mesh(
        new THREE.BoxGeometry(4.8, 0.9, 0.1),
        new THREE.MeshStandardMaterial({ map: labelTex })
      );
      labelMesh.position.set(0, 0.85, 0.2);
      booth.add(labelMesh);

      // Glowing Interaction Ring on Ground in front of Booth
      const ringGeo = new THREE.RingGeometry(1.6, 2.1, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x4cc9f0, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, 0.05, 4.2);
      booth.add(ring);

      this.scene.add(booth);

      // Register Trigger Zone
      this.triggers.push({
        name: `Project: ${proj.title}`,
        pos: new THREE.Vector3(proj.pos[0], 0, proj.pos[2] + 4.2),
        radius: 3.5,
        data: proj,
        onEnter: () => {
          sounds.playZoneChime();
          this.nearestProject = proj;
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 4. SKILLS ZONE (CRASHABLE PHYSICS BLOCKS!)
  // -------------------------------------------------------------
  private buildSkillsZone() {
    const originX = -26;
    const originZ = 0;

    // Header sign
    const signTex = createTextTexture('★ CRASH TO EXPLORE SKILLS ★', '#d90429', '#ffffff', 1024, 256);
    const signMesh = new THREE.Mesh(
      new THREE.BoxGeometry(16, 2.2, 0.3),
      new THREE.MeshStandardMaterial({ map: signTex })
    );
    signMesh.position.set(originX, 4.5, originZ - 10);
    signMesh.castShadow = true;
    this.scene.add(signMesh);

    // Build pyramid of 15 crashable physics cubes
    const boxSize = 1.6;
    let idx = 0;
    const levels = 4;

    for (let level = 0; level < levels; level++) {
      const itemsInRow = levels - level;
      const startX = originX - (itemsInRow * boxSize * 1.1) / 2 + boxSize / 2;
      const y = level * boxSize + boxSize / 2 + 0.1;

      for (let col = 0; col < itemsInRow; col++) {
        if (idx >= SKILLS_LIST.length) break;

        const skill = SKILLS_LIST[idx];
        const x = startX + col * boxSize * 1.15;
        const z = originZ;

        // Three.js Mesh
        const tex = createTextTexture(skill.name, skill.color, '#ffffff', 256, 256);
        const geo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        // Cannon-es RigidBody
        const body = new CANNON.Body({
          mass: 18, // Light enough to send flying!
          shape: new CANNON.Box(new CANNON.Vec3(boxSize / 2, boxSize / 2, boxSize / 2)),
          position: new CANNON.Vec3(x, y, z),
          material: new CANNON.Material({ friction: 0.4, restitution: 0.3 })
        });
        this.world.addBody(body);

        this.dynamicBoxes.push({ mesh, body });
        idx++;
      }
    }
  }

  // -------------------------------------------------------------
  // 5. EXPERIENCE / CAREER HIGHWAY
  // -------------------------------------------------------------
  private buildExperienceHighway() {
    const roadZStart = 12;
    const roadLength = 55;
    const roadWidth = 9;

    // Asphalt road visual
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.02, roadZStart + roadLength / 2);
    road.receiveShadow = true;
    this.scene.add(road);

    // Dashed center line
    const stripesCount = 14;
    for (let i = 0; i < stripesCount; i++) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 2.2),
        new THREE.MeshBasicMaterial({ color: 0xfacc15 })
      );
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.03, roadZStart + 3 + i * 3.8);
      this.scene.add(stripe);
    }

    // Milestones Arches across the road
    CAREER_LIST.forEach((item, index) => {
      const zPos = roadZStart + 8 + index * 12;
      const arch = new THREE.Group();
      arch.position.set(0, 0, zPos);

      // Signboard texture (2048x512 high resolution)
      const signTex = createHighwaySignTexture(item.company, item.role, item.period, 2048, 512);

      const boardWidth = 11.5;
      const boardHeight = 2.6;
      const boardDepth = 0.25;

      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
      const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.3 });

      // Multi-material box: [right, left, top, bottom, front, back]
      // front (face index 4) and back (face index 5) both have the highway sign texture
      const materials = [frameMat, frameMat, frameMat, frameMat, signMat, signMat];
      const sign = new THREE.Mesh(
        new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth),
        materials
      );
      sign.position.y = 4.3;
      sign.castShadow = true;
      arch.add(sign);

      // Support Poles
      const poleGeo = new THREE.CylinderGeometry(0.18, 0.18, 4.6, 12);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
      const poleL = new THREE.Mesh(poleGeo, poleMat);
      poleL.position.set(-5.5, 2.3, 0);
      poleL.castShadow = true;
      arch.add(poleL);

      const poleR = new THREE.Mesh(poleGeo, poleMat);
      poleR.position.set(5.5, 2.3, 0);
      poleR.castShadow = true;
      arch.add(poleR);

      this.scene.add(arch);

      // Pole physics colliders
      const bL = new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(0.2, 0.2, 4.6, 8), position: new CANNON.Vec3(-5.5, 2.3, zPos) });
      const bR = new CANNON.Body({ mass: 0, shape: new CANNON.Cylinder(0.2, 0.2, 4.6, 8), position: new CANNON.Vec3(5.5, 2.3, zPos) });
      this.world.addBody(bL);
      this.world.addBody(bR);
    });
  }

  // -------------------------------------------------------------
  // 6. CONTACT & SOCIAL PEDESTALS
  // -------------------------------------------------------------
  private buildContactZone() {
    const zPos = -26;
    const xPos = -4;

    const contactGroup = new THREE.Group();
    contactGroup.position.set(xPos, 0, zPos);

    // Large Mailbox Billboard
    const mailTex = createTextTexture('📬 GET IN TOUCH WITH NAUFAL', '#059669', '#ffffff', 1024, 256);
    const billboard = new THREE.Mesh(
      new THREE.BoxGeometry(12, 2.4, 0.3),
      new THREE.MeshStandardMaterial({ map: mailTex })
    );
    billboard.position.set(0, 3.5, 0);
    billboard.castShadow = true;
    contactGroup.add(billboard);

    // 4 Social Media Pedestals
    const channels = [
      { name: 'WhatsApp', text: 'Chat WhatsApp', color: '#25d366', link: 'https://wa.me/6282121686379', offset: -4.5 },
      { name: 'Email', text: 'Send Email', color: '#ea4335', link: 'mailto:fadlurahman03@gmail.com', offset: -1.5 },
      { name: 'LinkedIn', text: 'LinkedIn Profile', color: '#0a66c2', link: 'https://www.linkedin.com/in/naufal-fadhlurrohman21/', offset: 1.5 },
      { name: 'GitHub', text: 'GitHub Repos', color: '#24292e', link: 'https://github.com/nau-fadh', offset: 4.5 },
    ];

    channels.forEach((ch) => {
      const stand = new THREE.Group();
      stand.position.set(ch.offset, 0, 3.5);

      const standGeo = new THREE.CylinderGeometry(0.8, 0.9, 1.2, 16);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
      const standMesh = new THREE.Mesh(standGeo, standMat);
      standMesh.position.y = 0.6;
      standMesh.castShadow = true;
      stand.add(standMesh);

      const iconTex = createTextTexture(ch.name, ch.color, '#ffffff', 256, 128);
      const iconSign = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.8, 0.1),
        new THREE.MeshStandardMaterial({ map: iconTex })
      );
      iconSign.position.set(0, 1.6, 0);
      stand.add(iconSign);

      contactGroup.add(stand);

      // Trigger
      this.triggers.push({
        name: `Contact: ${ch.name}`,
        pos: new THREE.Vector3(xPos + ch.offset, 0, zPos + 3.5),
        radius: 2.2,
        onEnter: () => {
          sounds.playZoneChime();
        }
      });
    });

    this.scene.add(contactGroup);
  }

  // -------------------------------------------------------------
  // 7. STUNT PLAYGROUND (RAMP & BOWLING PINS)
  // -------------------------------------------------------------
  private buildStuntPlayground() {
    const rampX = -28;
    const rampZ = -28;

    // Ramp Wedge
    const rampWidth = 6;
    const rampLength = 9;
    const rampHeight = 2.4;

    const rampShape = new CANNON.Box(new CANNON.Vec3(rampWidth / 2, 0.2, rampLength / 2));
    const rampBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(rampX, 1.0, rampZ),
      shape: rampShape
    });
    // Incline by 18 degrees
    rampBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 10);
    this.world.addBody(rampBody);

    // Visual Ramp
    const rampGeo = new THREE.BoxGeometry(rampWidth, 0.4, rampLength);
    const rampMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Vibrant caution yellow/orange
      roughness: 0.4
    });
    const rampMesh = new THREE.Mesh(rampGeo, rampMat);
    rampMesh.position.copy(rampBody.position as any);
    rampMesh.quaternion.copy(rampBody.quaternion as any);
    rampMesh.castShadow = true;
    rampMesh.receiveShadow = true;
    this.scene.add(rampMesh);

    // Bowling Pins behind the ramp (Triangle setup)
    const pinStartX = rampX;
    const pinStartZ = rampZ - 9;
    const pinRows = 4;
    let pinIndex = 0;

    for (let row = 0; row < pinRows; row++) {
      const pinsInRow = row + 1;
      const startX = pinStartX - (pinsInRow * 0.8) / 2 + 0.4;
      const z = pinStartZ - row * 1.0;

      for (let p = 0; p < pinsInRow; p++) {
        const x = startX + p * 0.8;
        const pinGroup = new THREE.Group();

        // Pin visual (Cylinder + Sphere top)
        const pinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
        const redBand = new THREE.MeshStandardMaterial({ color: 0xef4444 });

        const bodyPart = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, 1.2, 12), pinMat);
        bodyPart.position.y = 0.6;
        bodyPart.castShadow = true;
        pinGroup.add(bodyPart);

        const neckPart = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 12), redBand);
        neckPart.position.y = 1.35;
        pinGroup.add(neckPart);

        const headPart = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), pinMat);
        headPart.position.y = 1.6;
        headPart.castShadow = true;
        pinGroup.add(headPart);

        pinGroup.position.set(x, 0, z);
        this.scene.add(pinGroup);

        // Pin physics body
        const pinBody = new CANNON.Body({
          mass: 5,
          shape: new CANNON.Cylinder(0.35, 0.35, 1.6, 8),
          position: new CANNON.Vec3(x, 0.8, z),
          material: new CANNON.Material({ friction: 0.3, restitution: 0.4 })
        });
        this.world.addBody(pinBody);

        this.bowlingPins.push({ mesh: pinGroup, body: pinBody });
        pinIndex++;
      }
    }
  }

  // -------------------------------------------------------------
  // UPDATE LOOP (SYNC DYNAMIC RIGID BODIES & TRIGGERS)
  // -------------------------------------------------------------
  public update(carPosition: THREE.Vector3) {
    // 1. Sync Dynamic Skill Cubes
    for (const b of this.dynamicBoxes) {
      b.mesh.position.set(b.body.position.x, b.body.position.y, b.body.position.z);
      b.mesh.quaternion.set(b.body.quaternion.x, b.body.quaternion.y, b.body.quaternion.z, b.body.quaternion.w);
    }

    // 2. Sync Bowling Pins
    for (const p of this.bowlingPins) {
      p.mesh.position.set(p.body.position.x, p.body.position.y - 0.8, p.body.position.z);
      p.mesh.quaternion.set(p.body.quaternion.x, p.body.quaternion.y, p.body.quaternion.z, p.body.quaternion.w);
    }

    // 3. Check Distance to Nearest Project for Popups
    let closestProj: Project3DData | null = null;
    let closestDist = Infinity;

    PROJECTS_3D.forEach((p) => {
      const boothPos = new THREE.Vector3(p.pos[0], 0, p.pos[2] + 4.2);
      const d = carPosition.distanceTo(boothPos);
      if (d < 5.0 && d < closestDist) {
        closestDist = d;
        closestProj = p;
      }
    });
    this.nearestProject = closestProj;

    // 4. Determine Active Zone for HUD
    if (carPosition.x > 8 && carPosition.z < 5) {
      this.activeZoneName = 'Featured Projects Zone';
    } else if (carPosition.x < -10 && carPosition.z > -16) {
      this.activeZoneName = 'Skills Playground (Crashable Cubes)';
    } else if (carPosition.z > 10) {
      this.activeZoneName = 'Career Journey Highway';
    } else if (carPosition.x < -15 && carPosition.z < -18) {
      this.activeZoneName = 'Stunt Ramp & Bowling Pins';
    } else if (carPosition.z < -15) {
      this.activeZoneName = 'Contact & Social Station';
    } else {
      this.activeZoneName = 'Welcome Plaza';
    }
  }

  // Reset skills pyramid & bowling pins when user presses R or clicks Reset
  public resetObjects() {
    this.dynamicBoxes.forEach((b, i) => {
      b.body.velocity.set(0, 0, 0);
      b.body.angularVelocity.set(0, 0, 0);
      b.body.quaternion.set(0, 0, 0, 1);
    });
    this.bowlingPins.forEach((p) => {
      p.body.velocity.set(0, 0, 0);
      p.body.angularVelocity.set(0, 0, 0);
      p.body.quaternion.set(0, 0, 0, 1);
    });
  }
}
