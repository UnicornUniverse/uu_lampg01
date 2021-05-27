//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchViewInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const SwitchViewInline = createVisualComponent({
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
    const className = Config.Css.css`cursor: pointer`;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    const switchStateCode = props.on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const colorSchema = props.on ? props.colorSchema : "black";

    return (
      <UU5.Bricks.Text
        mainAttrs={{ onClick: props.onSwitchClick }}
        colorSchema={colorSchema}
        nestingLevel="inline"
        {...attrs}
      >
        <UU5.Bricks.Icon icon={switchIcon} />
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default SwitchViewInline;
