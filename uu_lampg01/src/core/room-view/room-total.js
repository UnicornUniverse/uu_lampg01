//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Text, Icon } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const RoomTotal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RoomTotal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    room: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    room: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Text nestingLevel="inline" {...elementProps}>
        {`[ ${props.room.lampTotal} `}
        <Icon icon="mdi-lightbulb-on" />
        {` ${props.room.switchTotal} `}
        <Icon icon="mdi-toggle-switch" />
        {` ]`}
      </Text>
    );
  },
  //@@viewOff:render
});

//@@viewOn:exports
export { RoomTotal };
export default RoomTotal;
//@@viewOff:exports
