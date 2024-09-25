import Config from "./config/config";
import { PropertyError } from "../errors/errors";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "lamp-provider/";

export class NoCodeError extends PropertyError {
  constructor(cause) {
    super(ERROR_PREFIX + "no-code", "The required property code is not defined!", cause);
  }
}

export class CodeFormatError extends PropertyError {
  constructor(cause) {
    super(ERROR_PREFIX + "code-format", "The required property code has invalid format!", cause);
  }
}

export default { PropertyError, NoCodeError, CodeFormatError };
