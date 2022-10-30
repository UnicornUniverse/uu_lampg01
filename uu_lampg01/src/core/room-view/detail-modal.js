//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import { Modal } from "uu5g05-elements";
import Config from "./config/config.js";
import RoomHeader from "./header";
//@@viewOff:imports

const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    actionList: PropTypes.array,
    room: PropTypes.object.isRequired,
    header: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    open: false,
    actionList: [],
    room: undefined,
    header: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <Modal
        open={props.open}
        onClose={props.onClose}
        actionList={props.actionList}
        header={<RoomHeader room={props.room} header={props.header} />}
      >
        {props.children}
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailModal };
export default DetailModal;
//@@viewOff:exports
