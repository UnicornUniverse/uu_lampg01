//@@viewOn:imports
import LampView from "./lamp-view";
import SwitchView from "./switch-view";
import RoomView from "./room-view";
import PackageView from "./package-view";
import withAuthentication from "./with-authentication";
import Bulb from "./bulb";
//@@viewOff:imports

const Core = { LampView, SwitchView, RoomView, PackageView, withAuthentication, Bulb };
export { LampView, SwitchView, RoomView, PackageView, withAuthentication, Bulb };
export default Core;
