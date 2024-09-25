//@@viewOn:imports
import { PropTypes, createComponent, useEffect, useRef, useDataObject } from "uu5g05";
import { usePerson } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    code: PropTypes.string,
    on: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const personDataObject = usePerson();

    const lampDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        setOn: handleSetOn,
        setBulbSize: handleSetBulbSize,
        savePreference: handleSavePreference,
      },
      skipInitialLoad: personDataObject.state !== "ready",
    });

    const prevPropsRef = useRef({ ...props, personDataObject });

    async function handleLoad() {
      let lamp = { on: props.on, bulbSize: props.bulbSize }; // default lamp
      const mtBaseUri = personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri;

      try {
        // First attempt to load user preferences for particular lamp accordit its code
        let lampProperty = await Calls.getUserPreferences(mtBaseUri, { key: Provider.uu5Tag, target: props.code });

        // Otherwise we try to load default user preferences for Provider
        if (!lampProperty.data) {
          lampProperty = await Calls.getUserPreferences(mtBaseUri, { key: Provider.uu5Tag });
        }

        let data = lampProperty.data;

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
      const mtBaseUri = personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri;

      const dtoIn = {
        key: Provider.uu5Tag,
        target: getPropertyTarget(props.code, preferenceType),
        data: lampDataObject.data,
      };

      const lampProperty = await Calls.setUserPreferences(mtBaseUri, dtoIn);

      return lampProperty.data;
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change = no reload is required
        if (prevProps.code === props.code && prevProps.personDataObject === personDataObject) {
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
function getPropertyTarget(code, preferenceType) {
  switch (preferenceType) {
    case Config.PreferenceType.SPECIFIC:
      return code;
    case Config.PreferenceType.DEFAULT:
    default:
      return null;
  }
}
//@@viewOff:helpers

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
