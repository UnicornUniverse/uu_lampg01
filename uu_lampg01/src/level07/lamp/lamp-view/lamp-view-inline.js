//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import Config from "./config/config";
import TimeZoneSwitch from "./time-zone-switch";
import Clock from "./clock";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const LampViewInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
        <Core.Bulb on={props.on} bulbStyle={props.bulbStyle} colorSchema={props.colorSchema} />
        {` `}
        <Clock />
        {` [`}
        <TimeZoneSwitch />]
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default LampViewInline;