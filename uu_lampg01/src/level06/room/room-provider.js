//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useMemo } from "uu5g04-hooks";
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
      setLampTotal((prevTotal) => prevTotal + 1);
    }

    function unregisterLamp(id) {
      setLampTotal((prevTotal) => prevTotal - 1);
    }

    function registerSwitch(id) {
      setSwitchTotal((prevTotal) => prevTotal + 1);
    }

    function unregisterSwitch(id) {
      setSwitchTotal((prevTotal) => prevTotal - 1);
    }

    const room = useMemo(() => {
      return {
        light: { on, setOn },
        lampTotal,
        registerLamp,
        unregisterLamp,
        switchTotal,
        registerSwitch,
        unregisterSwitch,
      };
    }, [on, lampTotal, switchTotal]);

    return (
      <RoomContext.Provider value={room}>
        {typeof props.children === "function" ? props.children(room) : props.children}
      </RoomContext.Provider>
    );
    //@@viewOff:render
  },
});

export default RoomProvider;
