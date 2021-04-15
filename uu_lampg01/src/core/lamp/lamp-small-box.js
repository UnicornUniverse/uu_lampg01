//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Bulb from "./bulb";
//@@viewOff:imports

export const LampSmallBox = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "LampSmallBox",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    header: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showSwitch: UU5.PropTypes.bool,
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 0,
    borderRadius: "0",
    showSwitch: false,
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render

    return (
      <UU5.Bricks.Card
        colorSchema={props.colorSchema}
        bgStyle={props.bgStyle}
        borderRadius={props.borderRadius}
        elevation={props.elevation}
        elevationHover={props.elevation}
        className="center padding-s"
      >
        <Bulb on={props.on} bulbSize={props.bulbSize} bulbStyle={props.bulbStyle} colorSchema={props.colorSchema} />
        {props.showSwitch && (
          <UU5.Bricks.Switch
            switchedOn={props.on}
            onChange={props.onSwitchClick}
            onIcon="mdi-power-plug"
            offIcon="mdi-power-plug-off"
            size={getSwitchSize(props.bulbSize)}
          />
        )}
      </UU5.Bricks.Card>
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

export default LampSmallBox;
