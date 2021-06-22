//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo, useState, useDataObject, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampProvider",
  //@@viewOff:statics
};

export const LampProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    uuDocKitUri: UU5.PropTypes.string.isRequired,
    documentId: UU5.PropTypes.string.isRequired,
    on: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    uuDocKitUri: undefined,
    documentId: undefined,
    on: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    // *** DOCUMENT ***
    const documentDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    // TODO Smazat await a testnout
    async function handleLoad() {
      const dtoIn = { id: props.documentId };
      return await Calls.loadDocument(props.uuDocKitUri, dtoIn);
    }

    // *** ON ***
    const [on, setOn] = useState({ value: props.on, initValue: props.on });

    useEffect(() => {
      if (props.on !== on.initValue) {
        setOn({ value: props.on, initValue: props.on });
      }
    }, [props.on, on.initValue]);

    // *** LAMP ***
    const canSwitch = useMemo(() => {
      if (documentDataObject.state !== "ready") {
        return false;
      }

      const profiles = documentDataObject.data.uuAppTypeProfileList;
      const isWriter = profiles.indexOf("Writers") > -1;
      return isWriter;
    }, [documentDataObject]);

    function handleSetOn(on) {
      setOn((prevOn) => {
        return { value: on, initValue: prevOn.initValue };
      });
    }

    const lamp = useMemo(() => {
      const result = { on: on.value, canSwitch, documentDataObject };

      if (canSwitch) {
        result.setOn = handleSetOn;
      }

      return result;
    }, [on, canSwitch, documentDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(lamp);
    //@@viewOff:render
  },
});

export default LampProvider;
