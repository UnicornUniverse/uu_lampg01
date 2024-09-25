//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Text } from "uu5g05-elements";
import Config from "./config/config";
import LampReloadInfo from "../../lamp-reload-info";
import DataObjectStateResolver from "../../../core/data-object-state-resolver";
import Bulb from "../../../core/bulb";
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
    bulbStyle: "filled",
    colorScheme: "yellow",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <DataObjectStateResolver dataObject={props.lampDataObject} nestingLevel="inline">
        <Text nestingLevel="inline" {...elementProps}>
          <Bulb
            on={props.lampDataObject.data?.on}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            nestingLevel="inline"
          />
          <LampReloadInfo lampDataObject={props.lampDataObject} />
        </Text>
      </DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
