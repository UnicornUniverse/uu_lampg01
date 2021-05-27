//@@viewOn:imports
import { createComponent, useMemo, useState, useEffect, useRef } from "uu5g04-hooks";
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
    const initOn = useRef(props.on);
    const [on, setOn] = useState(props.on);

    useEffect(() => {
      if (props.on !== initOn) {
        initOn.current = props.on;
        setOn(props.on);
      }
    }, [props.on]);

    const lamp = useMemo(() => {
      return {
        on,
        setOn,
      };
    }, [on, setOn]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(lamp);
    //@@viewOff:render
  },
});

export default LampProvider;
