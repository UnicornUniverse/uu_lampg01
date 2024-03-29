//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Text, Icon } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  text: () =>
    Config.Css.css({
      textAlign: "center",
      cursor: "pointer",
    }),
};
//@@viewOff:css

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
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.text());

    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const colorScheme = props.on ? props.colorScheme : "grey";

    return (
      <Text
        {...elementProps}
        elementAttrs={{ onClick: props.onSwitchClick }}
        colorScheme={colorScheme}
        nestingLevel="inline"
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
