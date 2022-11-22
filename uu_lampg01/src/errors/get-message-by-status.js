//@@viewOn:imports
import HttpStatus from "./http-status";
//@@viewOff:imports

function getMessageByStatus(errorStatus, errorsLsi = {}) {
  let lsi;

  switch (errorStatus) {
    case HttpStatus.BaseNetworkError:
      lsi = errorsLsi.baseNetworkError;
      break;
    case HttpStatus.BadRequest:
      lsi = errorsLsi.badRequest;
      break;
    case HttpStatus.Unauthorized:
      lsi = errorsLsi.unauthorized;
      break;
    case HttpStatus.Forbidden:
      lsi = errorsLsi.forbidden;
      break;
    case HttpStatus.NotFound:
      lsi = errorsLsi.notFound;
      break;
    case HttpStatus.InternalServerError:
      lsi = errorsLsi.internal;
      break;
    case HttpStatus.ServiceUnavailable:
      lsi = errorsLsi.serviceUnavailable;
      break;
    case HttpStatus.GatewayTimeout:
      lsi = errorsLsi.requestTimeout;
      break;
    default:
      lsi = errorsLsi.defaultError;
  }

  return lsi;
}

//@@viewOn:exports
export { getMessageByStatus };
export default getMessageByStatus;
//@@viewOff:exports
