//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Bulb from "../bulb";
import LampSwitch from "../lamp-switch";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewSmallBox",
  nestingLevel: "smallBox",
  //@@viewOff:statics
};

export const LampViewSmallBox = createVisualComponent({
  ...STATICS,

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
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Card
        colorSchema={props.colorSchema}
        bgStyle={props.bgStyle}
        borderRadius={props.borderRadius}
        elevation={props.elevation}
        elevationHover={props.elevation}
        className="center padding-s"
        {...attrs}
      >
        <Bulb on={props.on} bulbSize={props.bulbSize} bulbStyle={props.bulbStyle} colorSchema={props.colorSchema} />
        {props.showSwitch && (
          <LampSwitch
            on={props.on}
            bulbSize={props.bulbSize}
            colorSchema={props.colorSchema}
            onClick={props.onSwitchClick}
          />
        )}
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default LampViewSmallBox;
