//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useMemo } from "uu5g04-hooks";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TimeZoneSwitchInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const TimeZoneSwitchInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const valueIndex = useMemo(() => {
      return props.items.findIndex((item) => item.value === props.value);
    }, [props.items, props.value]);

    function handleClick() {
      const newIndex = valueIndex + 1 < props.items.length ? valueIndex + 1 : 0;
      props.onChange(props.items[newIndex]);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
        <UU5.Bricks.Link onClick={handleClick}>{props.items[valueIndex].content}</UU5.Bricks.Link>
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default TimeZoneSwitchInline;
