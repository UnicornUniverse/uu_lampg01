//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Core from "../core/core";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level05Body",
  //@@viewOff:statics
};

export const Level05Body = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [on, setOn] = useState(props.on);

    function handleSwitchClick() {
      setOn(!on);
    }

    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <Core.LampView
        header={props.header}
        help={props.help}
        copyTagFunc={props.copyTagFunc}
        on={on}
        bulbStyle={props.bulbStyle}
        bulbSize={props.bulbSize}
        bgStyle={props.bgStyle}
        cardView={props.cardView}
        colorSchema={props.colorSchema}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        nestingLevel={props.nestingLevel}
        onSwitchClick={handleSwitchClick}
        showSwitch
        {...attrs}
      />
    );
  },
  //@@viewOff:render
});

export default Core.withAuthentication(Level05Body, STATICS.displayName);
