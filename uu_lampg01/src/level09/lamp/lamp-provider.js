//@@viewOn:imports
import { createComponent, useDataObject, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import DataObjectPending from "../../core/data-object-state-resolver/data-object-pending";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampProvider",
  //@@viewOff:statics
};

const PROPERTY_CODE = STATICS.displayName.replaceAll(".", "");
// MFA TODO - Revise the scope
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
        savePreference: handleSavePreference,
      },
    });

    async function handleGet() {
      let lamp = { on: props.on }; // default lamp

      const codeList = [];

      if (props.code) {
        codeList.push(`${PROPERTY_CODE}_${props.code}`);
      }

      // Order of codeList is IMPORTANT because of priority!
      codeList.push(PROPERTY_CODE);

      const dtoIn = {
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
        codeList,
      };

      try {
        const lampProperty = await Calls.loadFirstUserPreferenceProperty(props.baseUri, dtoIn);

        let data = lampProperty.data?.data;

        if (data && data.hasOwnProperty("on")) {
          lamp.on = data.on;
        }
      } catch (error) {
        console.error(error);
        console.warn(`The user preference for component ${STATICS.displayName} can't be loaded due to error above!`);
      }

      return lamp;
    }

    async function handleSetOn(on) {
      return { ...lampDataObject.data, on };
    }

    async function handleSavePreference(preferenceType) {
      const dtoIn = {
        mtMainBaseUri: props.personDataObject.data.mtMainBaseUri,
        code: getPropertyCode(props.code, preferenceType),
        scope: PROPERTY_SCOPE,
        data: lampDataObject.data,
      };

      Calls.createOrUpdateUserPreferenceProperty(props.baseUri, dtoIn).catch((error) => {
        console.error(error);
        console.warn(
          `The user preference for component ${STATICS.displayName} can't be created or updated due to error above!`
        );
      });

      return lampDataObject.data;
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

//@@viewOn:helpres
function getPropertyCode(code, preferenceType) {
  switch (preferenceType) {
    case Config.PreferenceType.SPECIFIC:
      return `${PROPERTY_CODE}_${code}`;
    case Config.PreferenceType.DEFAULT:
    default:
      return PROPERTY_CODE;
  }
}
//@@viewOff:helpers

export default LampProvider;
