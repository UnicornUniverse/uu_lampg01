//@@viewOn:imports
import { PropTypes, createComponent, useEffect, useRef, useDataObject } from "uu5g05";
import { usePerson } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics
};

const PROPERTY_CODE = STATICS.uu5Tag.replaceAll(".", "");
// MFA TODO - Revise the scope
const PROPERTY_SCOPE = "uuAppWorkspace";

const Provider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string.isRequired,
    code: PropTypes.string,
    on: PropTypes.bool,
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
        setBulbSize: handleSetBulbSize,
        savePreference: handleSavePreference,
      },
    });
    const personDataObject = usePerson();

    const prevPropsRef = useRef({ ...props, personDataObject });

    async function handleGet() {
      let lamp = { on: props.on, bulbSize: props.bulbSize }; // default lamp

      const codeList = [];

      if (props.code) {
        codeList.push(`${PROPERTY_CODE}_${props.code}`);
      }

      // Order of codeList is IMPORTANT because of priority!
      codeList.push(PROPERTY_CODE);

      const dtoIn = {
        mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
        codeList,
      };

      try {
        const lampProperty = await Calls.loadFirstUserPreferenceProperty(props.baseUri, dtoIn);

        let data = lampProperty.data?.data;

        if (data) {
          if (Object.prototype.hasOwnProperty.call(data, "on")) {
            lamp.on = data.on;
          }

          if (Object.prototype.hasOwnProperty.call(data, "bulbSize")) {
            lamp.bulbSize = data.bulbSize;
          }
        }
      } catch (error) {
        Provider.logger.error(error);
        Provider.logger.warn(
          `The user preference for component ${Provider.uu5Tag} can't be loaded due to error above!`
        );
      }

      return lamp;
    }

    async function handleSetOn(on) {
      return { ...lampDataObject.data, on };
    }

    async function handleSetBulbSize(bulbSize) {
      return { ...lampDataObject.data, bulbSize };
    }

    async function handleSavePreference(preferenceType) {
      const dtoIn = {
        mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
        code: getPropertyCode(props.code, preferenceType),
        scope: PROPERTY_SCOPE,
        data: lampDataObject.data,
      };

      const lampProperty = await Calls.createOrUpdateUserPreferenceProperty(props.baseUri, dtoIn);

      return lampProperty.data.data;
    }

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
          await lampDataObject.handlerMap.get();
        } catch (error) {
          Provider.logger.error(error);
        }
      }

      checkPropsAndReload();
    }, [lampDataObject, personDataObject, props]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(lampDataObject);
    //@@viewOff:render
  },
});

//@@viewOn:helpers
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

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
