//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useState, Content } from "uu5g05";
import Config from "./config/config";
import InlineView from "./room-view/inline-view";
import AreaView from "./room-view/area-view";
import DetailModal from "./room-view/detail-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RoomView",
  nestingLevel: ["area", "inline"],
  //@@viewOff:statics
};

const RoomView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    room: PropTypes.object.isRequired,
    header: PropTypes.node,
    help: PropTypes.node,
    card: PropTypes.oneOf(["none", "full", "content"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    card: "none",
    colorScheme: "yellow",
    borderRadius: "none",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isDetailModal, setIsDetailModal] = useState(false);

    function handleDetailOpen() {
      setIsDetailModal(true);
    }
    function handleDetailClose() {
      setIsDetailModal(false);
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);

    return (
      <>
        {currentNestingLevel === "area" && <AreaView {...elementProps} {...otherProps} />}
        {currentNestingLevel === "inline" && (
          <InlineView
            {...elementProps}
            header={props.header}
            room={props.room}
            onDetail={handleDetailOpen}
            colorScheme={props.colorScheme}
          >
            {props.children}
          </InlineView>
        )}
        {isDetailModal && (
          <DetailModal open onClose={handleDetailClose} room={props.room} header={props.header}>
            <Content nestingLevel="area">{props.children}</Content>
          </DetailModal>
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RoomView };
export default RoomView;
//@@viewOff:exports
