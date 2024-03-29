//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import Config from "./config/config";
import AreaView from "./lamp-view/area-view";
import BoxView from "./lamp-view/box-view";
import InlineView from "./lamp-view/inline-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampView",
  nestingLevel: ["area", "box", "inline"],
  //@@viewOff:statics
};

const LampView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    header: PropTypes.node,
    help: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
    card: PropTypes.oneOf(["none", "full", "content"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
    onCopyComponent: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    card: "full",
    significance: "common",
    borderRadius: "moderate",
    showSwitch: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props);
    const { onCopyComponent, ...viewProps } = componentProps;

    switch (currentNestingLevel) {
      case "area":
        return <AreaView {...elementProps} {...viewProps} onCopyComponent={onCopyComponent} />;
      case "box":
        return <BoxView {...elementProps} {...viewProps} />;
      case "inline":
      default:
        return (
          <InlineView on={props.on} bulbStyle={props.bulbStyle} colorScheme={props.colorScheme} {...elementProps} />
        );
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LampView };
export default LampView;
//@@viewOff:exports
