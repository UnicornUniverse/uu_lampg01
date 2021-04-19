//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import LampSwitchInline from "./lamp-switch-inline";
import LampSwitchSmallBox from "./lamp-switch-small-box";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampSwitch",
  nestingLevel: ["smallBox", "inline"],
  //@@viewOff:statics
};

export const LampSwitch = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    colorSchema: UU5.PropTypes.string,
    onClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    colorSchema: "amber",
    onClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    switch (currentNestingLevel) {
      case "smallBox":
        return <LampSwitchSmallBox {...props} {...attrs} />;
      case "inline":
      default:
        return <LampSwitchInline {...props} {...attrs} />;
    }
    //@@viewOff:render
  },
});

export default LampSwitch;
