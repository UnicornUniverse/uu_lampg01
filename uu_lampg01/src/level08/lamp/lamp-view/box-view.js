//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Box, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import DataObjectStateResolver from "../../../core/data-object-state-resolver";
import LampSwitch from "../../../core/lamp-switch";
import Bulb from "../../../core/bulb";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      padding: UuGds.SpacingPalette.getValue(["fixed", "g"]),
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
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
    showSwitch: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

    if (!props.aspectRatio && !props.width) {
      props.height = "100%";
    }

    return (
      <Box
        {...elementProps}
        colorScheme={props.colorScheme}
        width={props.width}
        height={props.height}
        significance={props.significance}
        borderRadius={props.borderRadius}
        aspectRatio={props.aspectRatio}
      >
        <DataObjectStateResolver dataObject={props.documentDataObject} height={props.height} customErrorLsi={errorsLsi}>
          <Bulb
            on={props.on}
            bulbSize={props.bulbSize}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            nestingLevel="box"
          />
          {props.showSwitch && (
            <LampSwitch
              on={props.on}
              bulbSize={props.bulbSize}
              colorScheme={props.colorScheme}
              onClick={props.onSwitchClick}
              nestingLevel="box"
            />
          )}
        </DataObjectStateResolver>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
