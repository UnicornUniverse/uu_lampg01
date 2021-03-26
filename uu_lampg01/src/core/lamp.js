//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

export const Lamp = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Lamp",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render({ on, bulbStyle, bulbSize, bgStyle, colorSchema }) {
    //@@viewOn:render
    const iconStateCode = on ? "-on" : "";
    const bulbStyleCode = bulbStyle == "outline" ? "-outline" : "";
    const icon = `mdi-lightbulb${iconStateCode}${bulbStyleCode}`;

    const lampColorSchema = on ? colorSchema : "black";

    return (
      <UU5.Bricks.Card bgStyle={bgStyle} colorSchema={colorSchema} className="center" elevation={0} elevationHover={0}>
        <UU5.Bricks.Text className={getTextCss(bulbSize)} colorSchema={lampColorSchema}>
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

export default Lamp;
