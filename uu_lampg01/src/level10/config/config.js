import UU5 from "uu5g04";
import Config from "../../config/config.js";

const TAG = Config.TAG + "Level10.";
const ERROR_PREFIX = TAG.toLowerCase().replaceAll(".", "-") + "error/";

export default {
  ...Config,

  TAG,
  Css: UU5.Common.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),

  Error: {
    NO_CODE: ERROR_PREFIX + "no-code",
    NO_BASE_URI: ERROR_PREFIX + "no-base-uri",
    CODE_INVALID_FORMAT: ERROR_PREFIX + "code-invalid-format",
  },
};
