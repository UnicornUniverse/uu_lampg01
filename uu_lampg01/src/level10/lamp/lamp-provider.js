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

const PROPERTY_CODE = STATICS.displayName.replaceAll(".", "");
const PROPERTY_SCOPE = "uuAppWorkspace";

export const LampProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
    personDataObject: UU5.PropTypes.object.isRequired,
    on: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    code: undefined,
    on: false,
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
      let lamp = { on: props.on }; // default lamp

      const dtoIn = {
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
        code: getPropertyCode(props.code),
        scope: PROPERTY_SCOPE,
      };

      try {
        const lampProperty = await Calls.getUserPreferenceProperty(props.baseUri, dtoIn);

        let data = lampProperty.data?.data;

        if (data && data.hasOwnProperty("on")) {
          lamp.on = data.on;
        }
      } catch (error) {
        console.error(error);
        console.warn(`The user property ${PROPERTY_CODE} can't be loaded due to error above!`);
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
        lampDataObject.handlerMap.get();
      }
    }, [props.personDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(lampDataObject);
    //@@viewOff:render
  },
});

//@@viewOn:render
function getPropertyCode(code) {
  if (code) {
    return `${PROPERTY_CODE}_${code}`;
  } else {
    return PROPERTY_CODE;
  }
}

export default LampProvider;
