//@@viewOn:imports
import { PropTypes, createComponent, useDataObject, useEffect, useRef } from "uu5g05";
import { usePerson } from "uu_plus4u5g02";
import { UuDateTime } from "uu_i18ng01";
import Config from "./config/config";
import Calls from "calls";
import Errors from "./lamp-provider-errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampProvider",
  //@@viewOff:statics
};

const PROPERTY_CODE = STATICS.uu5Tag.replaceAll(".", "");
const PROPERTY_SCOPE = "uuAppWorkspace";

const LampProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string.isRequired,
    code: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    code: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lampDataObject = useDataObject({
      handlerMap: {
        load: handleGet,
        setOn: handleSetOn,
      },
    });
    const personDataObject = usePerson();

    const prevPropsRef = useRef({ ...props, personDataObject });

    async function handleGet() {
      let lamp = { on: false, nextUpdateAt: getNextUpdateAt() }; // default lamp

      if (!props.baseUri) {
        throw new Errors.NoBaseUriError();
      }

      if (!props.code) {
        throw new Errors.NoCodeError();
      }

      if (props.code && typeof props.code === "string" && !props.code.match(Config.CODE_REGEXP)) {
        throw new Errors.CodeFormatError();
      }

      const dtoIn = {
        mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
        code: getPropertyCode(props.code),
        scope: PROPERTY_SCOPE,
      };

      const lampProperty = await Calls.getUserPreferenceProperty(props.baseUri, dtoIn);

      let data = lampProperty.data?.data;

      if (data && Object.prototype.hasOwnProperty.call(data, "on")) {
        lamp.on = data.on;
      }

      return lamp;
    }

    async function handleSetOn(on) {
      const dtoIn = {
        mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
        code: getPropertyCode(props.code),
        scope: PROPERTY_SCOPE,
        data: { on },
      };

      const lampProperty = await Calls.createOrUpdateUserPreferenceProperty(props.baseUri, dtoIn);

      return { ...lampProperty.data.data, nextUpdateAt: getNextUpdateAt() };
    }

    // Trigger of the lamp synchronization everytime the dependencies changed
    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change = no reload is required
        if (
          prevProps.baseUri === props.baseUri &&
          prevProps.code === props.code &&
          prevProps.personDataObject === personDataObject
        ) {
          return;
        }

        // Are we ready to start reload?
        if (
          personDataObject.state !== "ready" ||
          lampDataObject.state === "pendingNoData" ||
          lampDataObject.state === "pending"
        ) {
          return;
        }

        try {
          prevPropsRef.current = { ...props, personDataObject };
          await lampDataObject.handlerMap.load();
        } catch (error) {
          LampProvider.logger.error(error);
        }
      }

      checkPropsAndReload();
    }, [lampDataObject, personDataObject, props]);

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
          lampDataObject.handlerMap.load().catch((error) => LampProvider.logger.error(error));
        }
      }

      const intervalId = setInterval(checkAndReloadLamp, 500);
      return () => clearInterval(intervalId);
    }, [lampDataObject]);
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

//@@viewOn:exports
export { LampProvider };
export default LampProvider;
//@@viewOff:exports
