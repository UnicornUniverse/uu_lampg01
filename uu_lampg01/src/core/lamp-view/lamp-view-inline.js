//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const LampViewInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    colorSchema: UU5.PropTypes.string,
    showSwitch: UU5.PropTypes.bool,
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    colorSchema: "amber",
    showSwitch: false,
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const bulbStateCode = props.on ? "-on" : "";
    const bulbStyleCode = props.bulbStyle == "outline" ? "-outline" : "";
    const bulbIcon = `mdi-lightbulb${bulbStateCode}${bulbStyleCode}`;

    const lampColorSchema = props.on ? props.colorSchema : "black";

    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const switchCss = Config.Css.css`cursor: pointer`;

    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Text colorSchema={lampColorSchema} nestingLevel="inline" {...attrs}>
        <UU5.Bricks.Icon icon={bulbIcon} />
        {props.showSwitch && (
          <span onClick={props.onSwitchClick} className={switchCss}>
            <UU5.Bricks.Icon icon={switchIcon} />
          </span>
        )}
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default LampViewInline;
