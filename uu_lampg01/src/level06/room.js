//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import withAuthentication from "../core/with-authentication";
import RoomView from "../core/room-view";
import EditModal from "./room/edit-modal";
import RoomProvider from "./room/provider";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const RoomCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RoomCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    on: PropTypes.bool,
    card: PropTypes.oneOf(["none", "content", "full"]),
    borderRadius: PropTypes.borderRadius,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    card: "full",
    borderRadius: "moderate",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [RoomCore.uu5Tag]);
    const { on, header, children, ...viewProps } = props;

    function handleCopyComponent() {
      return createCopyTag(Config.TAG + "Room", props, ["on", "header"], RoomCore.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <RoomProvider on={on}>
        {(room) => (
          <RoomView
            {...viewProps}
            header={header ?? lsi.header}
            help={<Lsi import={importLsi} path={[RoomCore.uu5Tag, "help"]} />}
            room={room}
            onCopyComponent={handleCopyComponent}
          >
            {children}
          </RoomView>
        )}
      </RoomProvider>
    );
    //@@viewOff:render
  },
});

let Room = withAuthentication(RoomCore);
Room = withMargin(Room);
Room = withEditModal(Room, EditModal);
Room = withErrorBoundary(Room);

//@@viewOn:exports
export { Room };
export default Room;
//@@viewOff:exports
