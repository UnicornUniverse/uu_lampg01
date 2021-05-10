//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BulbSizePicker",
  nestingLevel: "inline",
  //@@viewOff:statics
};

const switchCss = () => Config.Css.css`margin: 20px`;

export const BulbSizePicker = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    onChange: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bulbSize: undefined,
    onChange: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const switchItems = [
      {
        value: "s",
        content: "S",
      },
      {
        value: "m",
        content: "M",
      },
      {
        value: "l",
        content: "L",
      },
      {
        value: "xl",
        content: "XL",
      },
    ];

    return (
      <UU5.Bricks.SwitchSelector
        items={switchItems}
        onChange={(opt) => props.onChange(opt.value)}
        value={props.bulbSize}
        size="xl"
        className={switchCss()}
        nestingLevel={currentNestingLevel}
        {...attrs}
      />
    );
    //@@viewOff:render
  },
});

export default BulbSizePicker;
