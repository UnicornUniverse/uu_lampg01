//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useTimeZone } from "uu5g04-hooks";
import Config from "./config/config";
import TimeZone from "./utils/time-zone";
import TimeZoneSwitchInline from "./time-zone-switch/time-zone-switch-inline";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TimeZoneSwitch",
  nestingLevel: ["smallBox", "inline"],
  //@@viewOff:statics
};

export const TimeZoneSwitch = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [timeZone, setTimeZone] = useTimeZone();

    function handleChange({ value }) {
      setTimeZone(value);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    const items = TimeZone.list().map((timeZone) => {
      return {
        value: timeZone,
        content: <UU5.Bricks.Lsi lsi={TimeZone.getLsi(timeZone)} />,
      };
    });

    switch (currentNestingLevel) {
      case "smallBox":
        return (
          <UU5.Bricks.SwitchSelector
            value={timeZone}
            items={items}
            onChange={handleChange}
            nestingLevel={currentNestingLevel}
            {...attrs}
          />
        );
      case "inline":
      default:
        return (
          <TimeZoneSwitchInline
            value={timeZone}
            items={items}
            onChange={handleChange}
            nestingLevel={currentNestingLevel}
            {...attrs}
          />
        );
    }

    //@@viewOff:render
  },
});

export default TimeZoneSwitch;
