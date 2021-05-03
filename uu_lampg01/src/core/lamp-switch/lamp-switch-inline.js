//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampSwitchInline",
  nestingLevel: ["smallBox", "inline"],
  //@@viewOff:statics
};

export const LampSwitchInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    colorSchema: UU5.PropTypes.string,
    onClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    colorSchema: "amber",
    onClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const switchCss = Config.Css.css`cursor: pointer`;

    const colorSchema = props.on ? props.colorSchema : "black";

    const attrs = UU5.Common.VisualComponent.getAttrs(props, switchCss);

    return (
      <UU5.Bricks.Text nestingLevel={currentNestingLevel} colorSchema={colorSchema} {...attrs}>
        <span onClick={props.onClick}>
          <UU5.Bricks.Icon icon={switchIcon} />
        </span>
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default LampSwitchInline;
