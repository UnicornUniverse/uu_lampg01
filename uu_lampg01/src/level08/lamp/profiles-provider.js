//@@viewOn:imports
import { createComponent } from "uu5g04-hooks";
import { UuDateTime } from "uu_i18ng01";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UnitProfilesProvider",
  //@@viewOff:statics
};

export const UnitProfilesProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    // TODO MFA Load profiles from uuBT and pass them to the children.
    //@@viewOff:private

    //@@viewOn:render
    return props.children;
    //@@viewOff:render
  },
});

export default UnitProfilesProvider;
