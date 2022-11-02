//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Lsi, Utils } from "uu5g05";
import { Uri } from "uu_appg01";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
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
    documentUri: PropTypes.string.isRequired,
    on: PropTypes.bool,
    header: PropTypes.node,
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
    documentUri: undefined,
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    card: "full",
    width: undefined,
    height: undefined,
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "moderate",
    aspectRatio: undefined,
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
        LampCore.defaultProps
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const { baseUri, documentId } = parseBaseUriAndId(props.documentUri);

    return (
      <LampProvider uuDocKitUri={baseUri} documentId={documentId} on={props.on}>
        {(lamp) => {
          function handleSwitchClick() {
            lamp.setOn(!lamp.on);
          }

          return (
            <LampView
              {...elementProps}
              documentDataObject={lamp.documentDataObject}
              on={lamp.on}
              header={props.header || lsi.header}
              help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
              bulbStyle={props.bulbStyle}
              bulbSize={props.bulbSize}
              colorScheme={props.colorScheme}
              card={props.card}
              width={props.width}
              height={props.height}
              significance={props.significance}
              borderRadius={props.borderRadius}
              aspectRatio={props.aspectRatio}
              nestingLevel={props.nestingLevel}
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

let Lamp = Core.withAuthentication(LampCore);
Lamp = withMargin(Lamp);
Lamp = withEditModal(Lamp, EditModal);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
