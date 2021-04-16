//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import RoomViewInline from "./room-view/room-view-inline";
import RoomViewBox from "./room-view/room-view-box";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const RoomView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    room: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: undefined,
    header: "",
    help: "",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    switch (currentNestingLevel) {
      case "box":
        return <RoomViewBox {...props} nestingLevel={currentNestingLevel} {...attrs} />;
      case "inline":
      default:
        return (
          <RoomViewInline
            header={props.header}
            colorSchema={props.colorSchema}
            nestingLevel={currentNestingLevel}
            {...attrs}
          >
            {props.children}
          </RoomViewInline>
        );
    }
    //@@viewOff:render
  },
});

export default RoomView;
