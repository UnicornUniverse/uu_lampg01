//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../lamp/lamp-view/config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PropertyError",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const PropertyError = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    message: UU5.PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    message: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const className = "center";
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    switch (currentNestingLevel) {
      case "box":
        return (
          <UU5.Bricks.Div nestingLevel={currentNestingLevel} {...attrs}>
            {props.message}
            <UU5.Bricks.Text colorSchema="danger" className={Config.Css.css`font-size: 65px`}>
              <UU5.Bricks.Icon icon="mdi-bug" />
            </UU5.Bricks.Text>
          </UU5.Bricks.Div>
        );
      case "inline":
      default:
        return (
          <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs} colorSchema="danger">
            <UU5.Bricks.Icon icon="mdi-bug" />
            {props.message}
          </UU5.Bricks.Text>
        );
    }
    //@@viewOff:render
  },
});

export default PropertyError;
