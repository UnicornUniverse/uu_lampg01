//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi } from "uu5g05";
import { Uri } from "uu_appg01";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import LampView from "./lamp/lamp-view";
import LampProvider from "./lamp/provider";
import EditModal from "./lamp/edit-modal";
import withAuthentication from "../core/with-authentication.js";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    documentUri: PropTypes.string.isRequired,
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
        ["on", "documentUri", "bulbStyle", "bulbSize", "header"],
        LampCore.defaultProps,
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    const { documentUri, on, ...viewProps } = props;
    const { baseUri, documentId } = parseBaseUriAndId(props.documentUri);

    return (
      <LampProvider uuDocKitUri={baseUri} documentId={documentId} on={on}>
        {(lamp) => {
          function handleSwitchClick() {
            lamp.setOn(!lamp.on);
          }

          return (
            <LampView
              {...viewProps}
              documentDataObject={lamp.documentDataObject}
              on={lamp.on}
              header={props.header || lsi.header}
              help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
              onCopyComponent={handleCopyComponent}
              showSwitch={lamp.documentDataObject.state === "ready"}
              canSwitch={lamp.canSwitch}
              onSwitchClick={lamp.canSwitch ? handleSwitchClick : undefined}
            />
          );
        }}
      </LampProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function parseBaseUriAndId(documentUri) {
  if (!documentUri) {
    return { baseUri: undefined, documentId: undefined };
  }

  const uri = Uri.Uri.parse(documentUri);
  const baseUri = uri.getBaseUri(documentUri);
  const { documentId } = uri.getParameters("documentId");
  return { baseUri: baseUri.toString(), documentId };
}
//@@viewOff:helpers

let Lamp = withAuthentication(LampCore);
Lamp = withMargin(Lamp);
Lamp = withEditModal(Lamp, EditModal);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
