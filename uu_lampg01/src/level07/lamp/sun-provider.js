//@@viewOn:imports
import { createComponent, useState, useEffect, useMemo, useTimeZone } from "uu5g04-hooks";
import { UuDateTime } from "uu_i18ng01";
import Config from "./config/config";
//@@viewOff:imports

const SHINE_FROM_HOUR = 7;
const SHINE_TO_HOUR = 21;

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SunProvider",
  //@@viewOff:statics
};

export const SunProvider = createComponent({
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
    const [timeZone] = useTimeZone();
    const [isShining, setIsShining] = useState();

    useEffect(() => {
      function calcAndSetIsShining() {
        const now = new UuDateTime(new Date(), timeZone);
        const hour = now.getHour();
        const newIsShining = hour >= SHINE_FROM_HOUR && hour <= SHINE_TO_HOUR;
        setIsShining(newIsShining);
      }

      calcAndSetIsShining();

      const interval = setInterval(calcAndSetIsShining, 60000);
      return () => clearInterval(interval);
    }, [timeZone]);

    const sun = useMemo(() => {
      return { isShining };
    }, [isShining]);
    //@@viewOff:private

    //@@viewOn:render
    return props.children(sun);
    //@@viewOff:render
  },
});

export default SunProvider;
