//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import Config from "./config/config";
import InlineView from "./package-view/inline-view";
import BoxView from "./package-view/box-view";
import AreaView from "./package-view/area-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PackageView",
  nestingLevel: ["area", "box", "inline"],
  //@@viewOff:statics
};

const PackageView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    help: PropTypes.node,
    info: PropTypes.node,
    icon: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    card: PropTypes.oneOf(["none", "full", "content"]),
    colorScheme: PropTypes.colorScheme,
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    info: null,
    icon: "mdi-gift",
    width: undefined,
    height: undefined,
    card: "full",
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "moderate",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    switch (currentNestingLevel) {
      case "area":
        return <AreaView {...props} />;
      case "box":
        return <BoxView {...props} />;
      case "inline":
      default:
        return <InlineView icon={props.icon} colorScheme={props.colorScheme} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PackageView };
export default PackageView;
//@@viewOff:exports
