//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Lsi from "../bricks/level02-lsi";
import Config from "../config/config";
//@@viewOff:imports

export const HiddenInBox = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "HiddenInBox",
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
      <UU5.Bricks.Card bgStyle={bgStyle} colorSchema={colorSchema} className="center padding-s" elevation={0} elevationHover={0}>
        <UU5.Bricks.P><UU5.Bricks.Lsi lsi={Lsi.hiddenInfo} /></UU5.Bricks.P>
        <UU5.Bricks.Icon className={Config.Css.css`font-size: 65px`} icon="mdi-gift" />
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:css
//@@viewOff:css

export default HiddenInBox;
