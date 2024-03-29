//@@viewOn:imports
import { PropTypes, createVisualComponent, Utils } from "uu5g05";
import { Box, Icon, UuGds } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: UuGds.SpacingPalette.getValue(["fixed", "g"]),
    }),
  input: () =>
    Config.Css.css({
      maxWidth: 200,
      margin: "0 auto",
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
    colorScheme: PropTypes.colorScheme,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
    onSwitchClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());

    return (
      <Box
        {...elementProps}
        colorScheme={props.colorScheme}
        width={props.width}
        height={props.height}
        significance={props.significance}
        borderRadius={props.borderRadius}
        aspectRatio={props.aspectRatio}
        shape="interactiveElement"
      >
        <SwitchSelect
          {...elementProps}
          value={props.on}
          onChange={props.onSwitchClick}
          itemList={getItemList(props)}
          className={Css.input()}
        />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getItemList(props) {
  return [
    {
      value: false,
      children: <Icon colorScheme="grey" icon="mdi-power-plug-off" />,
    },
    {
      value: true,
      children: <Icon colorScheme={props.colorScheme} icon="mdi-power-plug" />,
    },
  ];
}
//@@viewOff:helpers

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
