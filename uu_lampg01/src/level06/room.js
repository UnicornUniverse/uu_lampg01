//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import EditModal from "./room/edit-modal";
import RoomProvider from "./room/provider";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

// const STATICS = {
//   //@@viewOn:statics
//   tagName: Config.TAG + "Room",
//   nestingLevelList: ["box", "inline"],
//   editMode: {
//     displayType: "block",
//     customEdit: true,
//     lazy: true,
//     enablePlaceholder: true,
//   },
//   //@@viewOff:statics
// };

const RoomCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RoomCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    card: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    card: "none",
    width: undefined,
    height: undefined,
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "none",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [RoomCore.uu5Tag]);

    function handleCopyComponent() {
      return createCopyTag(RoomCore.uu5Tag, props, ["on", "bulbStyle", "bulbSize", "header"], RoomCore.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <RoomProvider on={props.on}>
        {(room) => (
          <Core.RoomView
            {...props}
            header={props.header ?? lsi.header}
            help={<Lsi import={importLsi} path={[RoomCore.uu5Tag, "help"]} />}
            room={room}
            onCopyComponent={handleCopyComponent}
          >
            {props.children}
          </Core.RoomView>
        )}
      </RoomProvider>
    );
    //@@viewOff:render
  },
});

let Room = Core.withAuthentication(RoomCore);
Room = withMargin(Room);
Room = withEditModal(Room, EditModal);
Room = withErrorBoundary(Room);

//@@viewOn:exports
export { Room };
export default Room;
//@@viewOff:exports
