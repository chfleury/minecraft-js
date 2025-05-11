import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

export class World extends THREE.Group {
  // todo add height width and depth
  private size: number;

  constructor(size = 32) {
    super();
    this.name = "New World";

    this.size = size;
  }

  generate() {
    const maxMeshCount = this.size * this.size * this.size;

    const mesh = new THREE.InstancedMesh(geometry, material, maxMeshCount);
    mesh.count = 0;

    const transformationMatrix = new THREE.Matrix4();

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let z = 0; z < this.size; z++) {
          transformationMatrix.setPosition(x + 0.5, y + 0.5, z + 0.5);
          mesh.setMatrixAt(mesh.count++, transformationMatrix);
        }
      }
    }

    this.add(mesh);
  }
}
