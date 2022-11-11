//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi, Utils } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import SwitchView from "./switch/switch-view";
import EditModal from "./switch/edit-modal";
import LampProvider from "./lamp-provider";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const SwitchCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SwitchCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    header: PropTypes.node,
    card: PropTypes.oneOf(["none", "content", "full"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    level: PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    card: "full",
    significance: "common",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [SwitchCore.uu5Tag]);

    function handleCopyLamp() {
      const component = `<UuLamp.Level10.Lamp baseUri="${props.baseUri}" code="${props.code}" />`;
      Utils.Clipboard.write(component);
    }

    function handleCopyComponent() {
      return createCopyTag(Config.TAG + "Switch", props, ["header", "baseUri", "code"], SwitchCore.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    const { baseUri, code, on, header, ...viewProps } = props;

    return (
      <LampProvider baseUri={baseUri} code={code}>
        {(lampDataObject) => {
          return (
            <SwitchView
              {...viewProps}
              lampDataObject={lampDataObject}
              header={header || lsi.header}
              help={<Lsi import={importLsi} path={[SwitchCore.uu5Tag, "help"]} />}
              onCopyComponent={handleCopyComponent}
              onCopyLamp={handleCopyLamp}
            />
          );
        }}
      </LampProvider>
    );
    // @@viewOff:render
  },
});

let Switch = Core.withAuthentication(SwitchCore);
Switch = withMargin(Switch);
Switch = withEditModal(Switch, EditModal);
Switch = withErrorBoundary(Switch);

//@@viewOn:exports
export { Switch };
export default Switch;
//@@viewOff:exports
