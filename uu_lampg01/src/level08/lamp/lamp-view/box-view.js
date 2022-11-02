//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Box, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import Core from "../../../core/core";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
const PLACEHOLDER_HEIGHT = "100%";
//@@viewOff:constants

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      textAlign: "center",
      padding: UuGds.SpacingPalette.getValue(["fixed", "b"]),
    }),
};
//@@viewOff:css

const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    documentDataObject: PropTypes.object.isRequired,
    on: PropTypes.bool,
    header: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    documentDataObject: undefined,
    on: false,
    header: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    width: undefined,
    height: undefined,
    significance: "common",
    borderRadius: "none",
    aspectRatio: undefined,
    showSwitch: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Box
        className={Css.box()}
        colorScheme={props.colorScheme}
        width={props.width}
        height={props.height}
        significance={props.significance}
        borderRadius={props.borderRadius}
        aspectRatio={props.aspectRatio}
        {...elementProps}
      >
        <Core.DataObjectStateResolver
          dataObject={props.documentDataObject}
          height={PLACEHOLDER_HEIGHT}
          customErrorLsi={errorsLsi}
        >
          <Core.Bulb
            on={props.on}
            bulbSize={props.bulbSize}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            nestingLevel="box"
          />
          {props.showSwitch && (
            <Core.LampSwitch
              on={props.on}
              bulbSize={props.bulbSize}
              colorScheme={props.colorScheme}
              onClick={props.onSwitchClick}
              nestingLevel="box"
            />
          )}
        </Core.DataObjectStateResolver>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
