//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect, useRef } from "uu5g04-hooks";
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

    const prevPropsRef = useRef(props);

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
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
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
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
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
          prevProps.personDataObject === props.personDataObject
        ) {
          return;
        }

        // Are we ready to start reload?
        if (
          props.personDataObject.state !== "ready" ||
          lampDataObject.state === "pendingNoData" ||
          lampDataObject.state === "pending"
        ) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await lampDataObject.handlerMap.get();
        } catch (error) {
          console.error(error);
        }
      }

      checkPropsAndReload();
    }, [lampDataObject, props]);

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

export default LampProvider;
