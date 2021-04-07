//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession } from "uu5g04-hooks";
import Lamp from "../../core/lamp/lamp";
import Package from "../../core/package/package";
import Config from "./config/config";
import Lsi from "./level02-lsi";
import createCopyTag from "../../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level02",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const Level02 = createVisualComponent({
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
    const { sessionState } = useSession();

    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props, ["header"]);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    if (sessionState === "authenticated") {
      return (
        <Lamp
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
    } else {
      return (
        <Package
          header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
          help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
          cardView={props.cardView}
          copyTagFunc={_handleCopyTag}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          nestingLevel={currentNestingLevel}
          {...attrs}
        />
      );
    }
    //@@viewOff:render
  },
});

export default Level02;
