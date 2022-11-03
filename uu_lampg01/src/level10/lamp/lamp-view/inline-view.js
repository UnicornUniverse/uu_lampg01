//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Text } from "uu5g05-elements";
import Config from "./config/config";
import Core from "../../../core/core";
import LampReloadInfo from "../../lamp-reload-info";
//@@viewOff:imports

const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: PropTypes.object.isRequired,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    colorScheme: PropTypes.colorScheme,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    bulbStyle: "filled",
    colorScheme: "yellow",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Core.DataObjectStateResolver dataObject={props.lampDataObject} nestingLevel="inline">
        <Text nestingLevel="inline" {...elementProps}>
          <Core.Bulb
            on={props.lampDataObject.data?.on}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            nestingLevel="inline"
          />
          <LampReloadInfo lampDataObject={props.lampDataObject} />
        </Text>
      </Core.DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
