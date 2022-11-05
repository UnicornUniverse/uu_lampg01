//@@viewOn:imports
import { Content, createVisualComponent, PropTypes } from "uu5g05";
import { Box, Modal, UuGds } from "uu5g05-elements";
import Config from "./config/config.js";
import RoomHeader from "./header";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: "inherit",
    }),
};
//@@viewOff:css

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
        <Box className={Css.box()} significance="subdued" shape="interactiveElement">
          <Content nestingLevel="area">{props.children}</Content>
        </Box>
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailModal };
export default DetailModal;
//@@viewOff:exports
