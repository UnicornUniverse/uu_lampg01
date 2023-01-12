//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Text } from "uu5g05-elements";
import Core from "../../../core/core";
import Config from "./config/config";
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
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bulbStyle: "filled",
    colorScheme: "yellow",
    showSwitch: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Core.DataObjectStateResolver dataObject={props.lampDataObject} nestingLevel="inline">
        <Text nestingLevel="inline" {...elementProps}>
          <Core.Bulb
            on={props.lampDataObject.data?.on}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            nestingLevel="inline"
          />
          {props.showSwitch && (
            <Core.LampSwitch
              on={props.lampDataObject.data?.on}
              colorScheme={props.colorScheme}
              onClick={props.onSwitchClick}
              nestingLevel="inline"
            />
          )}
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
