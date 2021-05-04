//@@viewOn:imports
import { createComponent, useTimeZone, useState, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TimeZoneSync",
  //@@viewOff:statics
};

export const TimeZoneSync = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setTimeZone] = useTimeZone();
    const [prevTimeZone, setPrevTimeZone] = useState(props.timeZone);

    useEffect(() => {
      if (props.timeZone !== prevTimeZone) {
        setPrevTimeZone(props.timeZone);
        setTimeZone(props.timeZone);
      }
    }, [props.timeZone, prevTimeZone, setTimeZone, setPrevTimeZone]);
    //@@viewOff:private

    //@@viewOn:render
    return null;
    //@@viewOff:render
  },
});

export default TimeZoneSync;
