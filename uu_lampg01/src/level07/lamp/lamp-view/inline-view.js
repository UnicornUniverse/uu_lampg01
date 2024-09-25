//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Text } from "uu5g05-elements";
import Config from "./config/config";
import Clock from "../clock";
import Bulb from "../../../core/bulb";
import TimeZoneSwitch from "../time-zone-switch";
//@@viewOff:imports

const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    colorScheme: PropTypes.colorScheme,
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    colorScheme: "yellow",
    showSwitch: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Text nestingLevel={"inline"} {...elementProps}>
        <Bulb on={props.on} bulbStyle={props.bulbStyle} colorScheme={props.colorScheme} nestingLevel="inline" />
        {` `}
        <Clock nestingLevel="inline" />
        {` [`}
        <TimeZoneSwitch nestingLevel="inline" />]
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
