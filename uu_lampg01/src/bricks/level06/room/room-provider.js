//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import RoomContext from "./room-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomProvider",
  //@@viewOff:statics
};

export const RoomProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [on, setOn] = useState(props.on);
    const [lampTotal, setLampTotal] = useState(0);
    const [switchTotal, setSwitchTotal] = useState(0);

    function registerLamp(id) {
      console.log("Register Lamp: " + id);
      setLampTotal((prevTotal) => prevTotal + 1);
    }

    function unregisterLamp(id) {
      console.log("Unregister Lamp: " + id);
      setLampTotal((prevTotal) => prevTotal - 1);
    }

    function registerSwitch(id) {
      console.log("Register Switch: " + id);
      setSwitchTotal((prevTotal) => prevTotal + 1);
    }

    function unregisterSwitch(id) {
      console.log("Unregister Switch: " + id);
      setSwitchTotal((prevTotal) => prevTotal - 1);
    }

    const room = {
      light: { on, setOn },
      lampTotal,
      registerLamp,
      unregisterLamp,
      switchTotal,
      registerSwitch,
      unregisterSwitch,
    };

    return <RoomContext.Provider value={room}>{props.children}</RoomContext.Provider>;
  },
  //@@viewOff:render
});

export default RoomProvider;
