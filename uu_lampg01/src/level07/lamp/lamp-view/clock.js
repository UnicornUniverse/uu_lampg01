//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Clock",
  nestingLevel: ["smallBox", "inline"],
  //@@viewOff:statics
};

export const Clock = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
        <UU5.Bricks.DateTime />
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

export default Clock;
