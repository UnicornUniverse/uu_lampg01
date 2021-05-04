//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import SwitchViewInline from "./switch-view/switch-view-inline";
import SwitchViewSmallBox from "./switch-view/switch-view-small-box";
import SwitchViewBox from "./switch-view/switch-view-box";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Switch",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const Switch = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    help: "",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    switch (currentNestingLevel) {
      case "box":
        return <SwitchViewBox {...props} {...attrs} />;
      case "smallBox":
        return <SwitchViewSmallBox {...props} {...attrs} />;
      case "inline":
      default:
        return (
          <SwitchViewInline
            on={props.on}
            colorSchema={props.colorSchema}
            onSwitchClick={props.onSwitchClick}
            {...attrs}
          />
        );
    }
    //@@viewOff:render
  },
});

export default Switch;
