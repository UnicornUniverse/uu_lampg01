import UU5 from "uu5g04";
import { Level01 } from "./level01.js";
export * from "./level01.js";
import { Level02 } from "./level02.js";
export * from "./level02.js";
import { Level03 } from "./level03.js";
export * from "./level03.js";
export default { Level01, Level02, Level03 };

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
