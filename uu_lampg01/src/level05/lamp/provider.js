//@@viewOn:imports
import { PropTypes, createComponent, useMemo, useState, useEffect, useRef } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
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

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
