//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Config from "../config/config";
import Lamp from "../core/lamp";
import Lsi from "./level-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level04Body",
  //@@viewOff:statics
};

export const Level04Body = createVisualComponent({
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
  defaultProps: {
    on: false,
    iconStyle: "filled",
    size: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: 0,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <UuP.Bricks.ComponentWrapper
        header="uuLamp Level 04 - Editable Lamp"
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        cardView={props.cardView}
        copyTagFunc={props.copyTagFunc}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
      >
        <Lamp
          on={props.on}
          iconStyle={props.iconStyle}
          size={props.size}
          colorSchema={props.colorSchema}
          bgStyle={props.bgStyle}
        />
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default Level04Body;
