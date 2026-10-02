import * as THREE from 'three';
import * as CANNON from 'cannon-es';

/**
 * Creates 2D vector shapes for block letters (A, D, F, H, L, M, N, O, R, U)
 * with sharp, modern, chunky proportions matching Bruno Simon's 3D name.
 */
function createLetterShape(char: string, w = 1.0, h = 1.6, t = 0.28): THREE.Shape {
  const shape = new THREE.Shape();

  switch (char.toUpperCase()) {
    case 'N': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(t, h);
      shape.lineTo(w - t, t * 1.5);
      shape.lineTo(w - t, h);
      shape.lineTo(w, h);
      shape.lineTo(w, 0);
      shape.lineTo(w - t, 0);
      shape.lineTo(t, h - t * 1.5);
      shape.lineTo(t, 0);
      shape.closePath();
      break;
    }
    case 'A': {
      shape.moveTo(0, 0);
      shape.lineTo(w * 0.5 - t * 0.5, h);
      shape.lineTo(w * 0.5 + t * 0.5, h);
      shape.lineTo(w, 0);
      shape.lineTo(w - t, 0);
      shape.lineTo(w * 0.5 + t * 0.4, h * 0.35);
      shape.lineTo(w * 0.5 - t * 0.4, h * 0.35);
      shape.lineTo(t, 0);
      shape.closePath();

      // Inner triangle hole
      const hole = new THREE.Path();
      hole.moveTo(w * 0.5 - t * 0.35, h * 0.5);
      hole.lineTo(w * 0.5 + t * 0.35, h * 0.5);
      hole.lineTo(w * 0.5, h * 0.85);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }
    case 'U': {
      shape.moveTo(0, h);
      shape.lineTo(t, h);
      shape.lineTo(t, t);
      shape.lineTo(w - t, t);
      shape.lineTo(w - t, h);
      shape.lineTo(w, h);
      shape.lineTo(w, 0);
      shape.lineTo(0, 0);
      shape.closePath();
      break;
    }
    case 'F': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(w, h);
      shape.lineTo(w, h - t);
      shape.lineTo(t, h - t);
      shape.lineTo(t, h * 0.55 + t * 0.5);
      shape.lineTo(w * 0.85, h * 0.55 + t * 0.5);
      shape.lineTo(w * 0.85, h * 0.55 - t * 0.5);
      shape.lineTo(t, h * 0.55 - t * 0.5);
      shape.lineTo(t, 0);
      shape.closePath();
      break;
    }
    case 'L': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(t, h);
      shape.lineTo(t, t);
      shape.lineTo(w, t);
      shape.lineTo(w, 0);
      shape.closePath();
      break;
    }
    case 'D': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(w * 0.7, h);
      shape.bezierCurveTo(w * 1.1, h, w * 1.1, 0, w * 0.7, 0);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(t, t);
      hole.lineTo(t, h - t);
      hole.lineTo(w * 0.65, h - t);
      hole.bezierCurveTo(w * 0.9, h - t, w * 0.9, t, w * 0.65, t);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }
    case 'H': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(t, h);
      shape.lineTo(t, h * 0.5 + t * 0.5);
      shape.lineTo(w - t, h * 0.5 + t * 0.5);
      shape.lineTo(w - t, h);
      shape.lineTo(w, h);
      shape.lineTo(w, 0);
      shape.lineTo(w - t, 0);
      shape.lineTo(w - t, h * 0.5 - t * 0.5);
      shape.lineTo(t, h * 0.5 - t * 0.5);
      shape.lineTo(t, 0);
      shape.closePath();
      break;
    }
    case 'R': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(w * 0.75, h);
      shape.bezierCurveTo(w * 1.05, h, w * 1.05, h * 0.5, w * 0.7, h * 0.5);
      shape.lineTo(w, 0);
      shape.lineTo(w - t * 1.2, 0);
      shape.lineTo(w * 0.55, h * 0.5);
      shape.lineTo(t, h * 0.5);
      shape.lineTo(t, 0);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(t, h * 0.65);
      hole.lineTo(t, h - t);
      hole.lineTo(w * 0.65, h - t);
      hole.bezierCurveTo(w * 0.85, h - t, w * 0.85, h * 0.65, w * 0.65, h * 0.65);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }
    case 'O': {
      shape.moveTo(t, 0);
      shape.lineTo(w - t, 0);
      shape.bezierCurveTo(w, 0, w, h, w - t, h);
      shape.lineTo(t, h);
      shape.bezierCurveTo(0, h, 0, 0, t, 0);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(t * 1.3, t);
      hole.lineTo(w - t * 1.3, t);
      hole.bezierCurveTo(w - t * 0.4, t, w - t * 0.4, h - t, w - t * 1.3, h - t);
      hole.lineTo(t * 1.3, h - t);
      hole.bezierCurveTo(t * 0.4, h - t, t * 0.4, t, t * 1.3, t);
      hole.closePath();
      shape.holes.push(hole);
      break;
    }
    case 'M': {
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(t, h);
      shape.lineTo(w * 0.5, h * 0.4);
      shape.lineTo(w - t, h);
      shape.lineTo(w, h);
      shape.lineTo(w, 0);
      shape.lineTo(w - t, 0);
      shape.lineTo(w - t, h * 0.7);
      shape.lineTo(w * 0.5, h * 0.2);
      shape.lineTo(t, h * 0.7);
      shape.lineTo(t, 0);
      shape.closePath();
      break;
    }
    default: {
      // Fallback box for space or others
      shape.moveTo(0, 0);
      shape.lineTo(0, h);
      shape.lineTo(t, h);
      shape.lineTo(t, 0);
      shape.closePath();
      break;
    }
  }

  return shape;
}

/**
 * Builds the giant 3D extruded "NAUFAL FADHLURROHMAN" letters on the ground
 * exactly like Bruno Simon's signature 3D block letters in Image 2.
 */
export function createBrunoStyle3DName(
  scene: THREE.Scene,
  world: CANNON.World,
  startPos = new THREE.Vector3(0, 0, 8.5)
): THREE.Group {
  const group = new THREE.Group();
  group.position.copy(startPos);

  // Material: Smooth off-white/warm cream with subtle roughness for soft shadows
  const letterMat = new THREE.MeshStandardMaterial({
    color: 0xede4d8, // Bruno Simon style warm stone/cream
    roughness: 0.35,
    metalness: 0.05,
  });

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.65,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.05,
  };

  const words = [
    { text: 'NAUFAL', scale: 1.45, spacing: 1.6, zOffset: -1.2, xOffset: -4.8 },
    { text: 'FADHLURROHMAN', scale: 0.95, spacing: 1.05, zOffset: 1.2, xOffset: -6.8 },
  ];

  words.forEach((w) => {
    let curX = w.xOffset;
    for (let i = 0; i < w.text.length; i++) {
      const char = w.text[i];
      const shape = createLetterShape(char, 1.05, 1.6, 0.28);
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center(); // Center local anchor for clean rotations

      const mesh = new THREE.Mesh(geo, letterMat);
      mesh.scale.set(w.scale, w.scale, w.scale);
      // Slight backward tilt for classic isometric visibility and shadow casting
      mesh.rotation.x = -Math.PI / 14;
      mesh.rotation.y = Math.PI / 28;
      mesh.position.set(curX, (1.6 * w.scale) / 2 + 0.05, w.zOffset);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Cannon.js static collider so car doesn't pass through the giant letters
      const colliderSize = new CANNON.Vec3((1.05 * w.scale) / 2, (1.6 * w.scale) / 2, 0.4);
      const body = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(colliderSize),
        position: new CANNON.Vec3(
          startPos.x + curX,
          startPos.y + (1.6 * w.scale) / 2,
          startPos.z + w.zOffset
        ),
      });
      world.addBody(body);

      curX += w.spacing;
    }
  });

  scene.add(group);
  return group;
}
