//@@viewOn:imports
import { createComponent, useDataObject, useEffect, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
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
      let lamp = { on: false }; // default lamp

      // TODO MFA Move errors to own classes
      if (!props.baseUri) {
        const error = new Error("The required property baseUri is not defined!");
        error.code = Config.Error.NO_BASE_URI;
        throw error;
      }

      if (!props.code) {
        const error = new Error("The required property code is not defined!");
        error.code = Config.Error.NO_CODE;
        throw error;
      }

      if (props.code && typeof props.code === "string" && !props.code.match("^\\w{3,32}$")) {
        const error = new Error("The required property code has invalid format!");
        error.code = Config.Error.CODE_INVALID_FORMAT;
        throw error;
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

      return lampProperty.data.data;
    }

    useEffect(() => {
      if (lampDataObject.state === "readyNoData" && props.personDataObject.state === "ready") {
        lampDataObject.handlerMap.get().catch((error) => console.error(error));
      }
    }, [props.personDataObject]);

    // MFA TODO Finish auto reload of the lamp
    // useEffect(() => {
    //   if (lampDataObject.state !== "ready") {
    //     return;
    //   }

    //   const intervalId = setInterval(() => {
    //     if (reloadCounter < 10) {
    //       setReloadCounter((prevCounter) => prevCounter + 1);
    //     } else {
    //       setReloadCounter(0);
    //       lampDataObject.handlerMap.get();
    //     }
    //   }, 1000);

    //   return () => clearInterval(intervalId);
    // }, [lampDataObject.state]);
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
