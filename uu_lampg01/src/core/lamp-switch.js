//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import Config from "./lamp-view/config/config";
import InlineView from "./lamp-switch/inline-view";
import BoxView from "./lamp-switch/box-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampSwitch",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const LampSwitch = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    colorScheme: PropTypes.colorScheme,
    onClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    colorScheme: "yellow",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { colorScheme } = props;

    switch (currentNestingLevel) {
      case "box":
        return <BoxView colorScheme={colorScheme} onSwitch />;
      case "inline":
      default:
        return <InlineView colorScheme={colorScheme} />;
    }
    //@@viewOff:render
  },
});

export default LampSwitch;
