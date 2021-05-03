//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import LampViewInline from "./lamp-view/lamp-view-inline";
import LampViewSmallBox from "./lamp-view/lamp-view-small-box";
import LampViewBox from "./lamp-view/lamp-view-box";
import Lsi from "./lamp-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampView",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const LampView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const header = props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;
    const help = <UU5.Bricks.Lsi lsi={Lsi.help} />;

    switch (currentNestingLevel) {
      case "box":
        return <LampViewBox {...props} {...attrs} header={header} help={help} />;
      case "smallBox":
        return <LampViewSmallBox {...props} {...attrs} header={header} help={help} />;
      case "inline":
      default:
        return (
          <LampViewInline
            on={props.on}
            bulbStyle={props.bulbStyle}
            colorSchema={props.colorSchema}
            header={header}
            help={help}
            {...attrs}
          />
        );
    }
    //@@viewOff:render
  },
});

export default LampView;
