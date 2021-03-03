//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

export const Lamp = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Lamp",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    iconStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    size: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    iconStyle: "filled",
    size: "xl",
    bgStyle: "transparent",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render({ on, iconStyle, size, bgStyle, colorSchema }) {
    //@@viewOn:render
    const iconStateCode = on ? "-on" : "";
    const iconStyleCode = iconStyle == "outline" ? "-outline" : "";
    const icon = `mdi-lightbulb${iconStateCode}${iconStyleCode}`;

    const lampColorSchema = on ? colorSchema : "black";

    return (
      <UU5.Bricks.Card bgStyle={bgStyle} colorSchema={colorSchema} className="center" elevation={0} elevationHover={0}>
        <UU5.Bricks.Text className={getTextCss(size)} colorSchema={lampColorSchema}>
          <UU5.Bricks.Icon icon={icon} />
        </UU5.Bricks.Text>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:css
const getTextCss = (size) => {
  return Config.Css.css`
    font-size: ${getFontSize(size)}px
  `;
};

function getFontSize(size) {
  switch (size) {
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

export default Lamp;
