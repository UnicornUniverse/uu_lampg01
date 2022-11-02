//@@viewOn:imports
import { PropTypes, createVisualComponent, Utils } from "uu5g05";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config";
//@@viewOff:imports

const BulbSizePicker = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BulbSizePicker",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    onChange: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bulbSize: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    const switchItems = [
      {
        value: "s",
        children: "S",
      },
      {
        value: "m",
        children: "M",
      },
      {
        value: "l",
        children: "L",
      },
      {
        value: "xl",
        children: "XL",
      },
    ];

    return (
      <SwitchSelect
        itemList={switchItems}
        onChange={(ev) => props.onChange(ev.data.value)}
        value={props.bulbSize}
        {...elementProps}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BulbSizePicker };
export default BulbSizePicker;
//@@viewOff:exports
