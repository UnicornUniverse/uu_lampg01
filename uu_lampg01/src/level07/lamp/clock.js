//@@viewOn:imports
import { Utils, createVisualComponent } from "uu5g05";
import { Text, DateTime } from "uu5g05-elements";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Clock",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const Clock = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <Text {...elementProps} nestingLevel={currentNestingLevel}>
        <DateTime />
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Clock };
export default Clock;
//@@viewOff:exports
