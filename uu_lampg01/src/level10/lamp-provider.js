//@@viewOn:imports
import { createComponent, useDataObject, useEffect } from "uu5g04-hooks";
import { UuDateTime } from "uu_i18ng01";
import Config from "./config/config";
import Calls from "calls";
import Errors from "./lamp-provider-errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampProvider",
  //@@viewOff:statics
};

const PROPERTY_CODE = STATICS.displayName.replaceAll(".", "");
const PROPERTY_SCOPE = "uuAppWorkspace";

export const LampProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    personDataObject: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string.isRequired,
    code: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    personDataObject: undefined,
    baseUri: undefined,
    code: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lampDataObject = useDataObject({
      handlerMap: {
        get: handleGet,
        setOn: handleSetOn,
      },
    });

    async function handleGet() {
      let lamp = { on: false, nextUpdateAt: getNextUpdateAt() }; // default lamp

      if (!props.baseUri) {
        throw new Errors.NoBaseUriError();
      }

      if (!props.code) {
        throw new Errors.NoCodeError();
      }

      if (props.code && typeof props.code === "string" && !props.code.match("^\\w{3,32}$")) {
        throw new Errors.CodeFormatError();
      }

      const dtoIn = {
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
        code: getPropertyCode(props.code),
        scope: PROPERTY_SCOPE,
      };

      const lampProperty = await Calls.getUserPreferenceProperty(props.baseUri, dtoIn);

      let data = lampProperty.data?.data;

      if (data && data.hasOwnProperty("on")) {
        lamp.on = data.on;
      }

      return lamp;
    }

    async function handleSetOn(on) {
      const dtoIn = {
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
        code: getPropertyCode(props.code),
        scope: PROPERTY_SCOPE,
        data: { on },
      };

      const lampProperty = await Calls.createOrUpdateUserPreferenceProperty(props.baseUri, dtoIn);

      return { ...lampProperty.data.data, nextUpdateAt: getNextUpdateAt() };
    }

    // Initial load of the lamp after the provide has all necessary properties
    useEffect(() => {
      if (lampDataObject.state === "readyNoData" && props.personDataObject.state === "ready") {
        lampDataObject.handlerMap.get().catch((error) => console.error(error));
      }
    }, [props.personDataObject]);

    // Auto-reload of the lamp
    useEffect(() => {
      function checkAndReloadLamp() {
        if (lampDataObject.state !== "ready") {
          return;
        }

        if (!lampDataObject.data?.nextUpdateAt) {
          return;
        }

        const now = UuDateTime.utc();

        if (now.toIsoString() > lampDataObject.data.nextUpdateAt.toIsoString()) {
          lampDataObject.handlerMap.get().catch((error) => console.error(error));
        }
      }

      const intervalId = setInterval(checkAndReloadLamp, 500);
      return () => clearInterval(intervalId);
    }, [lampDataObject.state, lampDataObject.data?.nextUpdateAt]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(lampDataObject);
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getPropertyCode(code) {
  return `${PROPERTY_CODE}_${code}`;
}

function getNextUpdateAt() {
  return UuDateTime.utc().shiftTime(10000);
}
//@@viewOff:helpers

export default LampProvider;
