//@@viewOn:imports
import { PropTypes, createVisualComponent, Lsi, useLsi } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import withAuthentication from "../core/with-authentication";
import LampView from "../core/lamp-view";
import EditModal from "./lamp/edit-modal";
import LampProvider from "./lamp/provider";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    card: PropTypes.oneOf(["none", "content", "full"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
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

    function handleCopyComponent() {
      return createCopyTag(
        Config.TAG + "Lamp",
        props,
        ["on", "bulbStyle", "bulbSize", "header"],
        LampCore.defaultProps,
      );
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
            <LampView
              {...props}
              header={props.header ?? lsi.header}
              help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
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

let Lamp = withAuthentication(LampCore);
Lamp = withMargin(Lamp);
Lamp = withEditModal(Lamp, EditModal);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
