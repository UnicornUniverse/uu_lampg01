//@@viewOn:imports
import LampView from "./core/lamp-view";
import SwitchView from "./core/switch-view";
import RoomView from "./core/room-view";
import PackageView from "./core/package-view";
import withAuthentication from "./core/with-authentication";
//@@viewOff:imports

const Core = { LampView, SwitchView, RoomView, PackageView, withAuthentication };
export { LampView, SwitchView, RoomView, PackageView, withAuthentication };
export default Core;
