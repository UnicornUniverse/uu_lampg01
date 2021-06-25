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
import PersonProvider from "./person-provider";
import UuLampError from "./uu-lamp-error";
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
  PersonProvider,
  UuLampError,
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
  PersonProvider,
  UuLampError,
};

export default Core;
