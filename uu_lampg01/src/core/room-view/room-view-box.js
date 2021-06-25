//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import RoomHeader from "./room-header";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomViewBox",
  nestingLevel: "box",
  //@@viewOff:statics
};

export const RoomViewBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    room: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: undefined,
    header: "",
    help: "",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        header={<RoomHeader room={props.room} header={props.header} />}
        help={props.help}
        cardView={props.cardView}
        copyTagFunc={props.copyTagFunc}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        {...attrs}
      >
        {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default RoomViewBox;
