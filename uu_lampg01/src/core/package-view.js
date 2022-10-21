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

export const PackageView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    help: PropTypes.node,
    info: PropTypes.node,
    icon: PropTypes.string,
    cardView: PropTypes.string,
    colorScheme: PropTypes.colorScheme,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    info: null,
    icon: "mdi-gift",
    cardView: "full",
    colorScheme: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

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

//@@viewOn:helpers
//@@viewOff:helpers

export default PackageView;
