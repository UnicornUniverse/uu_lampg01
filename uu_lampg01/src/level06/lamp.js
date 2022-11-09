//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi, useEffect } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import EditModal from "./lamp/edit-modal";
import { useRoom } from "./room/context";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    card: PropTypes.oneOf(["none", "content", "full"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bulbStyle: "filled",
    bulbSize: "xl",
    card: "full",
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "moderate",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [LampCore.uu5Tag]);
    const room = useRoom();

    useEffect(() => {
      if (!room) {
        return;
      }

      room.registerLamp(props.id);

      return () => room.unregisterLamp(props.id);
    }, [room, props.id]);

    function handleCopyComponent() {
      return createCopyTag(Config.TAG + "Lamp", props, ["bulbStyle", "bulbSize", "header"], LampCore.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    if (room) {
      return (
        <Core.LampView
          {...props}
          header={props.header || lsi.header}
          help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
          onCopyComponent={handleCopyComponent}
          on={room.light.on}
        />
      );
    } else {
      return (
        <Core.PackageView
          {...props}
          header={props.header || lsi.header}
          help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
          info={<Lsi import={importLsi} path={[LampCore.uu5Tag, "noRoom"]} />}
          icon="mdi-home-alert"
        />
      );
    }
  },
  //@@viewOff:render
});

let Lamp = Core.withAuthentication(LampCore);
Lamp = withMargin(Lamp);
Lamp = withEditModal(Lamp, EditModal);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
