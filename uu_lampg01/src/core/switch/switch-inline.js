//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const SwitchInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    colorSchema: UU5.PropTypes.string,
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    colorSchema: "amber",
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const switchCss = Config.Css.css`cursor: pointer`;
    const colorSchema = props.on ? props.colorSchema : "black";

    return (
      <UU5.Bricks.Text colorSchema={colorSchema} nestingLevel="inline" {...attrs}>
        <span onClick={props.onSwitchClick} className={switchCss}>
          <UU5.Bricks.Icon icon={switchIcon} />
        </span>
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default SwitchInline;
