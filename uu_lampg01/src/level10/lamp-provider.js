//@@viewOn:imports
import { createComponent, useDataObject, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampProvider",
  //@@viewOff:statics
};

const ERROR_PREFIX = STATICS.displayName.toLowerCase().replaceAll(".", "-") + "/";
const NO_CODE_ERROR = ERROR_PREFIX + "no-code";
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
      let lamp = { on: false }; // default lamp

      if (!props.code) {
        return Promise.reject({ code: Config.Error.NO_CODE });
        // TODO MFA Try to do it by standard error throwing
        // throw new Error(Config.Error.NO_CODE);
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
      const lamp = { on };

      const dtoIn = {
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
        code: getPropertyCode(props.code),
        scope: PROPERTY_SCOPE,
        data: lamp,
      };

      Calls.createOrUpdateUserPreferenceProperty(props.baseUri, dtoIn).catch((error) => {
        console.error(error);
        console.warn(`The user property ${PROPERTY_CODE} can't be created or updated due to error above!`);
      });

      return lamp;
    }

    useEffect(() => {
      if (lampDataObject.state === "readyNoData" && props.personDataObject.state === "ready") {
        lampDataObject.handlerMap.get().catch((error) => console.error(error));
      }
    }, [props.personDataObject]);
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
//@@viewOff:helpers

export default LampProvider;
