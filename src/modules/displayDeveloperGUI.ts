import type { World } from "src/modules/World";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export function displayDeveloperGUI(world: World) {
  const generateWorldParams: Parameters<World["generate"]>[0] = {
    size: 10,
    depth: 10,
  };

  const gui = new GUI();

  gui.add(generateWorldParams, "size", 1, 100).step(1).name("World Size");
  gui.add(generateWorldParams, "depth", 1, 50).step(1).name("World Depth");
  gui
    .add(
      {
        generateWorld: () => {
          world.generate({
            size: generateWorldParams.size,
            depth: generateWorldParams.depth,
          });
        },
      },
      "generateWorld"
    )
    .name("Generate World");
}
