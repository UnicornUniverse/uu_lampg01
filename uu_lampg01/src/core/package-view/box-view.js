//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Box, Text, Icon, UuGds } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      textAlign: "center",
      padding: UuGds.SpacingPalette.getValue(["fixed", "g"]),
    }),
  icon: () =>
    Config.Css.css({
      ...UuGds.Typography.getValue(["interface", "title", "main"]),
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
    icon: PropTypes.string,
    colorScheme: PropTypes.colorScheme,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    icon: "mdi-gift",
    significance: "common",
    borderRadius: "none",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps, { icon, ...otherProps }] = Utils.VisualComponent.splitProps(props, Css.box());

    return (
      <Box {...elementProps} {...otherProps}>
        <Text>{props.info}</Text>
        <Icon className={Css.icon()} icon={icon} colorScheme={props.colorScheme} />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
