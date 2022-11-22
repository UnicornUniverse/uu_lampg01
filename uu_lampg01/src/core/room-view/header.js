//@@viewOn:imports
import { PropTypes, createVisualComponent } from "uu5g05";
import Config from "./config/config";
import RoomTotal from "./room-total";
//@@viewOff:imports

const Header = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Header",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    room: PropTypes.object.isRequired,
    header: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <>
        {props.header}
        {` `}
        <RoomTotal room={props.room} />
      </>
    );
  },
  //@@viewOff:render
});

//@@viewOn:exports
export { Header };
export default Header;
//@@viewOff:exports
