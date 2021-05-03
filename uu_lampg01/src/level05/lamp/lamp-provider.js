//@@viewOn:imports
import { createComponent, useMemo, useState, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
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
    on: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    // *** ON ***
    const [on, setOn] = useState({ value: props.on, initValue: props.on });

    useEffect(() => {
      if (props.on !== on.initValue) {
        setOn({ value: props.on, initValue: props.on });
      }
    }, [props.on]);

    // *** LAMP ***
    function handleSetOn(on) {
      setOn((prevOn) => {
        return { value: on, initValue: prevOn.initValue };
      });
    }

    const lamp = useMemo(() => {
      return {
        on: on.value,
        setOn: handleSetOn,
      };
    }, [on, handleSetOn]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(lamp);
    //@@viewOff:render
  },
});

export default LampProvider;
