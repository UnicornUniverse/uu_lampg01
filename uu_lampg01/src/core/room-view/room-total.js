//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomTotal",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const RoomTotal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    room: UU5.PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
        {`[ ${props.room.lampTotal} `}
        <UU5.Bricks.Icon icon="mdi-lightbulb-on" />
        {` ${props.room.switchTotal} `}
        <UU5.Bricks.Icon icon="mdi-toggle-switch" />
        {` ]`}
      </UU5.Bricks.Text>
    );
  },
  //@@viewOff:render
});

export default RoomTotal;
