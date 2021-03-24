//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent, useSession } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Lamp from "../core/lamp";
import LampInBox from "../core/lamp-in-box";
import Config from "./config/config";
import Lsi from "./level03-lsi";
import createCopyTag from "../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level03",
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  on: false,
  bulbStyle: "filled",
  bulbSize: "xl",
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "amber",
  elevation: 1,
  borderRadius: 0,
};

export const Level03 = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    on: UU5.PropTypes.bool,
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
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sessionState } = useSession();

    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props, ["on", "bulbStyle", "bulbSize", "header"], DEFAULT_PROPS);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        copyTagFunc={_handleCopyTag}
        cardView={props.cardView}
        borderRadius={props.borderRadius}
        elevation={props.elevation}
        {...attrs}
      >
        {sessionState === "authenticated" ? (
          <Lamp
            on={props.on}
            bulbStyle={props.bulbStyle}
            bulbSize={props.bulbSize}
            bgStyle={props.bgStyle}
            colorSchema={props.colorSchema}
          />
        ) : (
          <LampInBox bgStyle={props.bgStyle} colorSchema={props.colorSchema} />
        )}
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default Level03;
