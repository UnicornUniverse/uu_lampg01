//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi, useEffect } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import EditModal from "./switch/edit-modal";
import { useRoom } from "./room/context";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const Switch = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Switch",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
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
    header: "",
    card: "none",
    width: undefined,
    height: undefined,
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [Switch.uu5Tag]);
    const room = useRoom();

    useEffect(() => {
      if (!room) {
        return;
      }

      room.registerSwitch(props.id);

      return () => room.unregisterSwitch(props.id);
    }, [room, props.id]);

    function handleSwitchClick() {
      room.light.setOn(!room.light.on);
    }

    function handleCopyComponent() {
      return createCopyTag(Switch.uu5Tag, props, ["header"], Switch.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    const header = props.header || lsi.header;
    const help = <Lsi import={importLsi} path={[Switch.uu5Tag, "help"]} />;
    const info = <Lsi import={importLsi} path={[Switch.uu5Tag, "noRoom"]} />;

    if (room) {
      return (
        <Core.SwitchView
          {...props}
          header={header}
          help={help}
          info={info}
          on={room.light && room.light.on}
          onCopyComponent={handleCopyComponent}
          onSwitchClick={handleSwitchClick}
          icon="mdi-home-alert"
        />
        // <></>
      );
    } else {
      return (
        <Core.PackageView
          {...props}
          header={header}
          help={help}
          info={info}
          onCopyComponent={handleCopyComponent}
          icon="mdi-home-alert"
        />
      );
    }
    //@@viewOff:render
  },
});

let BrickSwitch = Core.withAuthentication(Switch);
BrickSwitch = withMargin(BrickSwitch);
BrickSwitch = withEditModal(BrickSwitch, EditModal);
BrickSwitch = withErrorBoundary(BrickSwitch);

//@@viewOn:exports
export { BrickSwitch as Switch };
export default BrickSwitch;
//@@viewOff:exports
