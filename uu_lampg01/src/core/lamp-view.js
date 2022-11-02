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
    width: undefined,
    height: undefined,
    significance: "common",
    borderRadius: "moderate",
    aspectRatio: undefined,
    showSwitch: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const [elementProps, { onCopyComponent, ...otherProps }] = Utils.VisualComponent.splitProps(props);

    switch (currentNestingLevel) {
      case "area":
        return <AreaView onCopyComponent={onCopyComponent} {...elementProps} {...otherProps} />;
      case "box":
        return <BoxView {...elementProps} {...otherProps} />;
      case "inline":
      default:
        return (
          <InlineView
            on={props.on}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            showSwitch={props.showSwitch}
            onSwitchClick={props.onSwitchClick}
            {...elementProps}
          />
        );
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LampView };
export default LampView;
//@@viewOff:exports
