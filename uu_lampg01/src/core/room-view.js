//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import Config from "./config/config";
import InlineView from "./room-view/inline-view";
import AreaView from "./room-view/area-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RoomView",
  nestingLevel: ["area", "inline"],
  //@@viewOff:statics
};

const RoomView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    room: PropTypes.object.isRequired,
    header: PropTypes.node,
    help: PropTypes.node,
    card: PropTypes.oneOf(["none", "full", "content"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: undefined,
    header: "",
    help: "",
    card: "none",
    width: undefined,
    height: undefined,
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "none",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);

    switch (currentNestingLevel) {
      case "area":
        return <AreaView {...elementProps} {...otherProps} nestingLevel={currentNestingLevel} />;
      case "inline":
      default:
        return (
          <InlineView
            header={props.header}
            colorScheme={props.colorScheme}
            nestingLevel={currentNestingLevel}
            {...elementProps}
          >
            {props.children}
          </InlineView>
        );
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RoomView };
export default RoomView;
//@@viewOff:exports
