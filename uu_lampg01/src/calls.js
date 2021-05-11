/**
 * Server calls of application client.
 */
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";

let Calls = {
  /** URL containing app base, e.g. "https://uuapp.plus4u.net/vnd-app/awid/". */
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  async call(method, url, dtoIn, clientOptions) {
    let response = await Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
    return response.data;
  },

  loadDocument(baseUri, dtoIn) {
    let commandUri = Calls.getCommandUri("document/load", baseUri);
    return UU5.Common.Tools.groupCall(commandUri, dtoIn, () => Calls.call("get", commandUri, dtoIn));
  },

  findPerson(baseUri, dtoIn) {
    let commandUri = Calls.getCommandUri("findPerson", baseUri);
    return UU5.Common.Tools.groupCall(commandUri, dtoIn, () => Calls.call("get", commandUri, dtoIn));
  },

  createOrUpdateUserPreferenceProperty(baseUri, dtoIn) {
    let commandUri = Calls.getCommandUri("userPreferenceProperty/createOrUpdate", baseUri);
    return Calls.call("post", commandUri, dtoIn);
  },

  getUserPreferenceProperty(baseUri, dtoIn) {
    let commandUri = Calls.getCommandUri("userPreferenceProperty/get", baseUri);
    return UU5.Common.Tools.groupCall(commandUri, dtoIn, () => Calls.call("get", commandUri, dtoIn));
  },

  loadFirstUserPreferenceProperty(baseUri, dtoIn) {
    let commandUri = Calls.getCommandUri("userPreferenceProperty/loadFirst", baseUri);
    return UU5.Common.Tools.groupCall(commandUri, dtoIn, () => Calls.call("get", commandUri, dtoIn));
  },

  getCommandUri(aUseCase, baseUri) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let properBaseUri = Calls.APP_BASE_URI;
    if (baseUri) properBaseUri = !baseUri.endsWith("/") ? baseUri.concat("/") : baseUri;

    let targetUriStr = properBaseUri + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = UU5.Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  },
};

export default Calls;
