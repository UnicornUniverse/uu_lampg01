//@@viewOn:imports
import { createComponent } from "uu5g05";
import { Uri } from "uu_appg01";
import Config from "./config/config.js";
import ProviderDocKit from "./provider-doc-kit.js";
import ProviderManagementKit from "./provider-mk-kit.js";
//@@viewOff:imports

//@@viewOn:helpers
function parseBaseUriAndId(documentUri) {
  if (!documentUri) {
    return { baseUri: undefined, documentId: undefined, app: undefined };
  }

  const uri = Uri.Uri.parse(documentUri);
  const baseUri = uri.getBaseUri(documentUri);
  const { documentId, oid } = uri.getParameters();

  return { baseUri: baseUri.toString(), app: uri.getApp(), documentId, oid };
}
//@@viewOff:helpers

const ProviderResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProviderResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ documentUri, on, children }) {
    //@@viewOn:private
    const { baseUri, documentId, app, oid } = parseBaseUriAndId(documentUri);

    let Provider;
    let providerProps = {};

    if (app === "dockit") {
      Provider = ProviderDocKit;
      providerProps.uuDocKitUri = baseUri;
      providerProps.documentId = documentId;
    } else {
      Provider = ProviderManagementKit;
      providerProps.baseUri = baseUri;
      providerProps.oid = oid;
    }

    providerProps.on = on;
    //@@viewOff:private

    //@@viewOn:render
    return <Provider {...providerProps}>{children}</Provider>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ProviderResolver };
export default ProviderResolver;
//@@viewOff:exports
