//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Lamp from "../core/lamp";
import Config from "./config/config";
import Lsi from "./level-lsi";
import createCopyTag from "../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level03",
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  on: false,
  iconStyle: "filled",
  size: "xl",
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
    on: UU5.PropTypes.bool,
    iconStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    size: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
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
    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props, ["on", "iconStyle", "size"], DEFAULT_PROPS);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        header="uuLamp Level 03 - Lamp With Props"
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        copyTagFunc={_handleCopyTag}
        cardView={props.cardView}
        borderRadius={props.borderRadius}
        elevation={props.elevation}
        {...attrs}
      >
        <Lamp
          on={props.on}
          iconStyle={props.iconStyle}
          size={props.size}
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
        />
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default Level03;
