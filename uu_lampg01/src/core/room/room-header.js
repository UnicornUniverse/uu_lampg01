//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../bricks/level06/room/config/config";
import RoomTotal from "./room-total";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomHeader",
  //@@viewOff:statics
};

export const RoomHeader = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    room: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: undefined,
    header: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Text {...attrs}>
        {props.header}
        {` `}
        <RoomTotal room={props.room} />
      </UU5.Bricks.Text>
    );
  },
  //@@viewOff:render
});

export default RoomHeader;
