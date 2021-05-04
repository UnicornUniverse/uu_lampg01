//@@viewOn:imports
import LampView from "./lamp-view";
import SwitchView from "./switch-view";
import RoomView from "./room-view";
import PackageView from "./package-view";
import withAuthentication from "./with-authentication";
import Bulb from "./bulb";
import Error from "./error";
import ErrorBoundary from "./error-boundary";
import DataObjectStateResolver from "./data-object-state-resolver";
import LampSwitch from "./lamp-switch";
//@@viewOff:imports

const Core = {
  LampView,
  SwitchView,
  RoomView,
  PackageView,
  withAuthentication,
  Bulb,
  Error,
  ErrorBoundary,
  DataObjectStateResolver,
  LampSwitch,
};

export {
  LampView,
  SwitchView,
  RoomView,
  PackageView,
  withAuthentication,
  Bulb,
  Error,
  ErrorBoundary,
  DataObjectStateResolver,
  LampSwitch,
};

export default Core;
