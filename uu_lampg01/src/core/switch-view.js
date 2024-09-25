//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import Config from "./config/config";
import InlineView from "./switch-view/inline-view";
import BoxView from "./switch-view/box-view";
import AreaView from "./switch-view/area-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SwitchView",
  nestingLevel: ["area", "box", "inline"],
  //@@viewOff:statics
};

const SwitchView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    header: PropTypes.node,
    help: PropTypes.node,
    card: PropTypes.oneOf(["none", "full", "content"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
    onSwitchClick: PropTypes.func,
    onCopyComponent: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    help: "",
    card: "none",
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    switch (currentNestingLevel) {
      case "area":
        return <AreaView {...props} {...elementProps} />;
      case "box":
        return <BoxView {...props} {...elementProps} />;
      case "inline":
      default:
        return (
          <InlineView
            on={props.on}
            colorScheme={props.colorScheme}
            onSwitchClick={props.onSwitchClick}
            {...elementProps}
          />
        );
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SwitchView };
export default SwitchView;
//@@viewOff:exports
