//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import PackageInline from "./package-inline";
import PackageSmallBox from "./package-small-box";
import PackageBox from "./package-box";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Package",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const Package = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    info: UU5.PropTypes.node,
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
        return <PackageBox {...props} />;
      case "smallBox":
        return <PackageSmallBox {...props} />;
      case "inline":
      default:
        return <PackageInline colorSchema={props.colorSchema} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default Package;
