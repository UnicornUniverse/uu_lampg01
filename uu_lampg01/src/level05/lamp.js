//@@viewOn:imports
import { PropTypes, createVisualComponent, Lsi, useLsi } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import EditModal from "./lamp/edit-modal";
import importLsi from "../lsi/import-lsi";
import LampProvider from "./lamp/lamp-provider";
//@@viewOff:imports

const Lamp = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lamp",
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
    const lsi = useLsi(importLsi, [Lamp.uu5Tag]);

    function handleCopyComponent() {
      return createCopyTag(Lamp.uu5Tag, props, ["on", "bulbStyle", "bulbSize", "header"], Lamp.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <LampProvider on={props.on}>
        {(lamp) => {
          function handleSwitchClick() {
            lamp.setOn(!lamp.on);
          }

          return (
            <Core.LampView
              {...props}
              header={props.header ?? lsi.header}
              help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
              on={lamp.on}
              showSwitch
              onSwitchClick={handleSwitchClick}
              onCopyComponent={handleCopyComponent}
            />
          );
        }}
      </LampProvider>
    );
    //@@viewOff:render
  },
});

let BrickLamp = Core.withAuthentication(Lamp, Lamp.uu5Tag);
BrickLamp = withMargin(BrickLamp);
BrickLamp = withEditModal(BrickLamp, EditModal);
BrickLamp = withErrorBoundary(BrickLamp);

//@@viewOn:exports
export { BrickLamp as Lamp };
export default BrickLamp;
//@@viewOff:exports
