//@@viewOn:imports
import { createComponent, useMemo, useState, useDataObject } from "uu5g04-hooks";
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
    const documentDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    async function handleLoad() {
      const dtoIn = { id: props.documentId };
      return await Calls.documentLoad(props.uuDocKitUri, dtoIn);
    }

    const [on, setOn] = useState(props.on);

    const canSwitch = useMemo(() => {
      if (documentDataObject.state !== "ready") {
        return false;
      }

      const profiles = documentDataObject.data.uuAppTypeProfileList;
      const isWriter = profiles.indexOf("Writers") > -1;
      return isWriter;
    }, [documentDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    const lamp = { on, canSwitch, documentDataObject };

    if (canSwitch) {
      lamp.setOn = setOn;
    }

    return props.children(lamp);
    //@@viewOff:render
  },
});

export default LampProvider;
