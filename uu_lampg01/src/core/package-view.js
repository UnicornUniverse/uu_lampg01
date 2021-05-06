//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import PackageViewInline from "./package-view/package-view-inline";
import PackageViewSmallBox from "./package-view/package-view-small-box";
import PackageViewBox from "./package-view/package-view-box";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PackageView",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const PackageView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    info: UU5.PropTypes.node,
    icon: UU5.PropTypes.string,
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
    info: null,
    icon: "mdi-gift",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    switch (currentNestingLevel) {
      case "box":
        return <PackageViewBox {...props} />;
      case "smallBox":
        return <PackageViewSmallBox {...props} />;
      case "inline":
      default:
        return <PackageViewInline icon={props.icon} colorSchema={props.colorSchema} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default PackageView;
