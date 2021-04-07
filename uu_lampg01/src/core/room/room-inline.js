//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const RoomInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
        {props.header}
        {" ["}
        <UU5.Bricks.Text colorSchema={props.colorSchema}>
          {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
        </UU5.Bricks.Text>
        {"]"}
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default RoomInline;
