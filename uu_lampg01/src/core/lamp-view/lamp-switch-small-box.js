//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampSwitchSmallBox",
  nestingLevel: "smallBox",
  //@@viewOff:statics
};

export const LampSwitchSmallBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorSchema: UU5.PropTypes.string,
    onClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbSize: "xl",
    colorSchema: "amber",
    onClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <UU5.Bricks.Switch
        switchedOn={props.on}
        onChange={props.onClick}
        onIcon="mdi-power-plug"
        offIcon="mdi-power-plug-off"
        size={getSwitchSize(props.bulbSize)}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getSwitchSize(bulbSize) {
  switch (bulbSize) {
    case "s":
    case "m":
      return "s";
    case "l":
    case "xl":
    default:
      return "m";
  }
}
//@@viewOff:helpers

export default LampSwitchSmallBox;
