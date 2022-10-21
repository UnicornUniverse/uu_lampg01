//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Text, Icon } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics
};

const InlineView = createVisualComponent({
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
    onClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const switchCss = Config.Css.css`cursor: pointer`;

    const colorScheme = props.on ? props.colorScheme : "grey";

    const [elementProps] = Utils.VisualComponent.splitProps(props, switchCss);

    return (
      <Text nestingLevel={"inline"} colorScheme={colorScheme} {...elementProps}>
        <span onClick={props.onClick}>
          <Icon icon={switchIcon} />
        </span>
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
