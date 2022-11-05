//@@viewOn:imports
import { Utils, createVisualComponent, useTimeZone, Lsi, useLsi } from "uu5g05";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config";
import TimeZone from "./utils/time-zone";
import InlineView from "./time-zone-switch/inline-view";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TimeZoneSwitch",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const TimeZoneSwitch = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const timeZonesLsi = useLsi(importLsi, ["TimeZones"]);
    const [timeZone, setTimeZone] = useTimeZone();

    function handleChange(ev) {
      setTimeZone(ev.data.value);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    const items = TimeZone.list().map((timeZone) => {
      return {
        value: timeZone,
        children: timeZonesLsi[timeZone],
      };
    });

    switch (currentNestingLevel) {
      case "box":
        return (
          <SwitchSelect
            value={timeZone}
            itemList={items}
            onChange={handleChange}
            nestingLevel={currentNestingLevel}
            {...elementProps}
          />
        );
      case "inline":
      default:
        return <InlineView value={timeZone} items={items} onChange={handleChange} {...elementProps} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TimeZoneSwitch };
export default TimeZoneSwitch;
//@@viewOff:exports
