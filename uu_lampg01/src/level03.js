//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Config from "./config/config";
import Lsi from "./lamp-lsi";
//@@viewOff:imports

export const Level03 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Level03",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
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
      <UuP.Bricks.ComponentWrapper
        header="uuLamp Level 03 - Lamp With Props"
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        cardView="full"
        copyTagFunc={createTag}
      >
        <UU5.Bricks.Card
          bgStyle={bgStyle}
          colorSchema={colorSchema}
          className="center"
          elevation={0}
          elevationHover={0}
        >
          <UU5.Bricks.Text className={getTextCss(size)} colorSchema={lampColorSchema}>
            <UU5.Bricks.Icon icon={icon} />
          </UU5.Bricks.Text>
        </UU5.Bricks.Card>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function createTag() {
  return "<UuLamp.Level03 />";
}
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

export default Level03;
