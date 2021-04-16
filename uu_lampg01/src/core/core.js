//@@viewOn:imports
import LampView from "./lamp-view";
import SwitchView from "./switch-view";
import RoomView from "./room-view";
import PackageView from "./package-view";
import withAuthentication from "./with-authentication";
//@@viewOff:imports

const Core = { LampView, SwitchView, RoomView, PackageView, withAuthentication };
export { LampView, SwitchView, RoomView, PackageView, withAuthentication };
export default Core;
