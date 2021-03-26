//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Lsi from "./package-lsi";
import Config from "./config/config";
//@@viewOff:imports

export const Package = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Package",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    bgStyle: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render({ bgStyle, colorSchema }) {
    //@@viewOn:render
    return (
      <UU5.Bricks.Card
        bgStyle={bgStyle}
        colorSchema={colorSchema}
        className="center padding-s"
        elevation={0}
        elevationHover={0}
      >
        <UU5.Bricks.Lsi lsi={Lsi.info} />
        <UU5.Bricks.Text className={Config.Css.css`font-size: 65px`} colorSchema={colorSchema ?? "green"}>
          <UU5.Bricks.Icon icon="mdi-gift" />
        </UU5.Bricks.Text>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:css
//@@viewOff:css

export default Package;
