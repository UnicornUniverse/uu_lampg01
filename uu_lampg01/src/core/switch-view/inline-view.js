//@@viewOn:imports
import { PropTypes, createVisualComponent } from "uu5g05";
import { Text, Icon } from "uu5g05-elements";
import Config from "./config/config";
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
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    colorScheme: "yellow",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const className = Config.Css.css`cursor: pointer`;
    const [elementProps] = Utils.VisualComponent.splitProps(props, className);

    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const colorScheme = props.on ? props.colorScheme : "black";

    return (
      <Text
        elementAttrs={{ onClick: props.onSwitchClick }}
        colorScheme={colorScheme}
        nestingLevel="inline"
        {...elementProps}
      >
        <Icon icon={switchIcon} />
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
