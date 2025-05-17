import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

export type WorldDimensions = { width: number; length: number; depth: number };

export class World extends THREE.Group {
  private static instance: World;
  private constructor() {
    super();
  }

  public static getInstance() {
    if (!World.instance) {
      World.instance = new World();
    }

    return World.instance;
  }

  public generate(dimensions: { size: number; depth: number }) {
    this.clear();

    const maxMeshCount = dimensions.size * dimensions.size * dimensions.depth;

    const mesh = new THREE.InstancedMesh(geometry, material, maxMeshCount);
    mesh.count = 0;

    const transformationMatrix = new THREE.Matrix4();

    for (let x = 0; x < dimensions.size; x++) {
      for (let y = 0; y < dimensions.depth; y++) {
        for (let z = 0; z < dimensions.size; z++) {
          transformationMatrix.setPosition(x + 0.5, y + 0.5, z + 0.5);
          mesh.setMatrixAt(mesh.count++, transformationMatrix);
        }
      }
    }

    this.add(mesh);
  }
}
