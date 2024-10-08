//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import withAuthentication from "../core/with-authentication";
import LampView from "./lamp/lamp-view";
import LampProvider from "./lamp/provider";
import EditModal from "./lamp/edit-modal";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    code: PropTypes.string,
    on: PropTypes.bool,
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
        ["on", "baseUri", "bulbStyle", "bulbSize", "header", "code"],
        LampCore.defaultProps,
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    const { code, on, header, ...viewProps } = props;

    return (
      <LampProvider code={code} on={on} bulbSize={props.bulbSize}>
        {(lampDataObject) => (
          <LampView
            {...viewProps}
            lampDataObject={lampDataObject}
            header={header || lsi.header}
            help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
            onCopyComponent={handleCopyComponent}
          />
        )}
      </LampProvider>
    );
  },
  //@@viewOff:render
});

let Lamp = withAuthentication(LampCore);
Lamp = withMargin(Lamp);
Lamp = withEditModal(Lamp, EditModal);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
