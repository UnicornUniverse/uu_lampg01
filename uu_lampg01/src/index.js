import UU5 from "uu5g04";
import Level01 from "./level01/level01.js";
import Level02 from "./level02/level02.js";
import Level03 from "./level03/level03.js";
import Level04 from "./level04/level04.js";
import Level05 from "./level05/level05.js";
import Level06 from "./level06/level06.js";

const UuLamp = { Level01, Level02, Level03, Level04, Level05, Level06 };
export { Level01, Level02, Level03, Level04, Level05, Level06 };
export default UuLamp;

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
