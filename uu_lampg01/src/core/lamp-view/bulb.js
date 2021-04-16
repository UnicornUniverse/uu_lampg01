//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

export const Bulb = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Bulb",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const stateCode = props.on ? "-on" : "";
    const styleCode = props.bulbStyle == "outline" ? "-outline" : "";
    const icon = `mdi-lightbulb${stateCode}${styleCode}`;

    const colorSchema = props.on ? props.colorSchema : "black";

    return (
      <UU5.Bricks.Text className={getTextCss(props.bulbSize)} colorSchema={colorSchema}>
        <UU5.Bricks.Icon icon={icon} />
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:css
const getTextCss = (bulbSize) => {
  return Config.Css.css`
    font-size: ${getFontSize(bulbSize)}px
  `;
};

function getFontSize(bulbSize) {
  switch (bulbSize) {
    case "s":
      return 35;
    case "m":
      return 50;
    case "l":
      return 65;
    default:
      return 80;
  }
}
//@@viewOff:css

export default Bulb;
