//@@viewOn:imports
import { PropTypes, createComponent, useDataObject, useEffect, useRef } from "uu5g05";
import { usePerson } from "uu_plus4u5g02";
import { UuDateTime } from "uu_i18ng01";
import Config from "./config/config";
import Calls from "calls";
import Errors from "./lamp-provider-errors";
import Provider from "../level09/lamp/provider";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampProvider",
  //@@viewOff:statics
};

const LampProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    code: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const personDataObject = usePerson();

    const lampDataObject = useDataObject({
      handlerMap: {
        load: handleGet,
        setOn: handleSetOn,
      },
      skipInitialLoad: personDataObject.state !== "ready",
    });

    const prevPropsRef = useRef({ ...props, personDataObject });

    async function handleGet() {
      let lamp = { on: false, nextUpdateAt: getNextUpdateAt() }; // default lamp
      const mtBaseUri = personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri;

      if (!props.code) {
        throw new Errors.NoCodeError();
      }

      if (props.code && typeof props.code === "string" && !props.code.match(Config.CODE_REGEXP)) {
        throw new Errors.CodeFormatError();
      }

      const dtoIn = {
        key: Provider.uu5Tag,
        target: props.code,
      };

      const lampProperty = await Calls.getUserPreferences(mtBaseUri, dtoIn);

      let data = lampProperty.data;

      if (data && Object.prototype.hasOwnProperty.call(data, "on")) {
        lamp.on = data.on;
      }

      return lamp;
    }

    async function handleSetOn(on) {
      const mtBaseUri = personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri;

      const dtoIn = {
        key: Provider.uu5Tag,
        target: props.code,
        data: { on },
      };

      const lampProperty = await Calls.setUserPreferences(mtBaseUri, dtoIn);

      return { ...lampProperty.data, nextUpdateAt: getNextUpdateAt() };
    }

    // Trigger of the lamp synchronization everytime the dependencies changed
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
function getNextUpdateAt() {
  const now = UuDateTime.utc();
  // Try to synchronize lamps and switches to have same counter value.
  // The difference between current time (e.g. 14:52:12) and next multipe of ten (e.g 14:52:20)
  // is found (e.g. 8 s) and converted to miliseconds (e.g. 8000 ms).
  const shift = (10 - (now.getSecond() % 10)) * 1000;
  return now.shiftTime(shift);
}
//@@viewOff:helpers

//@@viewOn:exports
export { LampProvider };
export default LampProvider;
//@@viewOff:exports
