//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import useRoom from "./use-room";
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
    header: UU5.PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const room = useRoom();

    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <>
        {props.header}
        {` [ ${room.lampTotal} `}
        <UU5.Bricks.Icon icon="mdi-lightbulb-on" />
        {` ${room.switchTotal} `}
        <UU5.Bricks.Icon icon="mdi-toggle-switch" />
        {` ]`}
      </>
    );
  },
  //@@viewOff:render
});

export default RoomHeader;
