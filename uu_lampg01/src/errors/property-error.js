import { UuLampError } from "./uu-lamp-error";

export class PropertyError extends UuLampError {
  constructor(code, message, cause) {
    super(code, message, cause);
  }
}

export default PropertyError;
