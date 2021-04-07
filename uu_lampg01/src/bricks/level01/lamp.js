//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import LampView from "../../core/lamp/lamp";
import Config from "./config/config";
import Lsi from "./lamp-lsi";
import createCopyTag from "../../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Lamp",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const Lamp = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: 0,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props, ["header"]);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <LampView
        header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        copyTagFunc={_handleCopyTag}
        bgStyle={props.bgStyle}
        cardView={props.cardView}
        colorSchema={props.colorSchema}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        nestingLevel={currentNestingLevel}
        on
        {...attrs}
      />
    );
    //@@viewOff:render
  },
});

export default Lamp;
