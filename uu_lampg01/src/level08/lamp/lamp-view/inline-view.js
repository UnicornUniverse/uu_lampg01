//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Text } from "uu5g05-elements";
import Config from "./config/config";
import DataObjectStateResolver from "../../../core/data-object-state-resolver";
import LampSwitch from "../../../core/lamp-switch";
import Bulb from "../../../core/bulb";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

const LampViewInline = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    documentDataObject: PropTypes.object.isRequired,
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    colorScheme: PropTypes.colorScheme,
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    colorScheme: "yellow",
    showSwitch: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <DataObjectStateResolver dataObject={props.documentDataObject} nestingLevel={"inline"} customErrorLsi={errorsLsi}>
        <Text nestingLevel={"inline"} {...elementProps}>
          <Bulb on={props.on} bulbStyle={props.bulbStyle} colorScheme={props.colorScheme} nestingLevel="inline" />
          {props.showSwitch && (
            <LampSwitch
              on={props.on}
              colorScheme={props.colorScheme}
              onClick={props.onSwitchClick}
              nestingLevel="inline"
            />
          )}
        </Text>
      </DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LampViewInline };
export default LampViewInline;
//@@viewOff:exports
