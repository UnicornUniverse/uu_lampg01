import UU5 from "uu5g04";
import { Level01 } from "./bricks/level01/level01.js";
export * from "./bricks/level01/level01.js";
import { Level02 } from "./bricks/level02/level02.js";
export * from "./bricks/level02/level02.js";
import { Level03 } from "./bricks/level03/level03.js";
export * from "./bricks/level03/level03.js";
import { Level04 } from "./bricks/level04/level04.js";
export * from "./bricks/level04/level04.js";
import { Level05 } from "./bricks/level05/level05.js";
export * from "./bricks/level05/level05.js";

export default { Level01, Level02, Level03, Level04, Level05 };

if (process.env.NODE_ENV !== "test") {
  console.log(
    `${process.env.NAME}-${process.env.VERSION} © Unicorn\nTerms of Use: https://unicorn.com/tou/${process.env.NAME}`
  );
}
UU5.Environment.addRuntimeLibrary({
  name: process.env.NAME,
  version: process.env.VERSION,
  namespace: process.env.NAMESPACE,
});
