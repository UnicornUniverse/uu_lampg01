import UU5 from "uu5g04";
import * as Level01 from "./level01/level01.js";
import * as Level02 from "./level02/level02.js";
import * as Level03 from "./level03/level03.js";
import * as Level04 from "./level04/level04.js";
import * as Level05 from "./level05/level05.js";
import * as Level06 from "./level06/level06.js";
import * as Level07 from "./level07/level07.js";
import * as Level08 from "./level08/level08.js";

export { Level01, Level02, Level03, Level04, Level05, Level06, Level07, Level08 };

const UuLamp = { Level01, Level02, Level03, Level04, Level05, Level06, Level07, Level08 };
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
