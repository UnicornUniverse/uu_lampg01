//@@viewOn:imports
import { PropTypes, Utils, createVisualComponent, useLsi } from "uu5g05";
import { Box, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import LampReloadInfo from "../../lamp-reload-info";
import DataObjectStateResolver from "../../../core/data-object-state-resolver";
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
    lampDataObject: PropTypes.object.isRequired,
    header: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

    if (!props.aspectRatio && !props.width) {
      props.height = "230px";
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
        <DataObjectStateResolver dataObject={props.lampDataObject} height={props.height} customErrorLsi={errorsLsi}>
          <Bulb
            on={props.lampDataObject.data?.on}
            bulbSize={props.lampDataObject.data?.bulbSize}
            bulbStyle={props.bulbStyle}
            colorScheme={props.colorScheme}
            nestingLevel="box"
          />
          <LampReloadInfo lampDataObject={props.lampDataObject} />
        </DataObjectStateResolver>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:expoorts
export { BoxView };
export default BoxView;
//@@viewOff:expoorts
