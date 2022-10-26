//@@viewOn:imports
import { createComponent, PropTypes, useState, useMemo } from "uu5g05";
import Config from "./config/config";
import RoomContext from "./context";
//@@viewOff:imports

const RoomProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RoomProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
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
    //@@viewOff:private

    //@@viewOn:render
    return (
      <RoomContext.Provider value={room}>
        {typeof props.children === "function" ? props.children(room) : props.children}
      </RoomContext.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RoomContext };
export default RoomProvider;
//@@viewOff:exports
