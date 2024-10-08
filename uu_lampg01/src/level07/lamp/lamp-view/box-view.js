//@@viewOn:imports
import { PropTypes, Utils, createVisualComponent } from "uu5g05";
import { Box, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import TimeZoneSwitch from "../time-zone-switch";
import Bulb from "../../../core/bulb";
import Clock from "../clock";
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
  bulb: () =>
    Config.Css.css({
      display: "block",
    }),
};
//@@viewOff:css

const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
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
    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());
    const clockCss = Config.Css.css({ padding: UuGds.SpacingPalette.getValue(["fixed", "e"]) });

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
        <Bulb
          className={Css.bulb()}
          on={props.on}
          bulbSize={props.bulbSize}
          bulbStyle={props.bulbStyle}
          colorSchema={props.colorSchema}
        />
        <Clock className={clockCss} />
        <TimeZoneSwitch />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
