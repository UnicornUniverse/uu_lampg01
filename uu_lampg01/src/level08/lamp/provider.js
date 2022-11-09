//@@viewOn:imports
import { PropTypes, createComponent, useMemo, useState, useDataObject, useEffect, useRef } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    uuDocKitUri: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
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
    const [on, setOn] = useState(props.on);
    const prevPropOnRef = useRef(props.on);

    useEffect(() => {
      if (props.on !== prevPropOnRef.current) {
        prevPropOnRef.current = props.on;
        setOn(props.on);
      }
    }, [props.on]);

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
      setOn(on);
    }

    const lamp = useMemo(() => {
      const result = { on, canSwitch, documentDataObject };

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

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
