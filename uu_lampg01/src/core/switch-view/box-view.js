//@@viewOn:imports
import { PropTypes, createVisualComponent } from "uu5g05";
import { Box, UuGds } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config";
//@@viewOff:imports

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
    on: PropTypes.bool,
    header: PropTypes.node,
    colorScheme: PropTypes.colorScheme,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
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
    width: undefined,
    height: undefined,
    significance: "common",
    borderRadius: "none",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      // <UU5.Bricks.Card
      //   colorScheme={props.colorScheme}
      //   bgStyle={props.bgStyle}
      //   borderRadius={props.borderRadius}
      //   elevation={props.elevation}
      //   elevationHover={props.elevation}
      //   className="center padding-s"
      //   {...attrs}
      // >
      //   <UU5.Bricks.Switch
      //     switchedOn={props.on}
      //     onChange={props.onSwitchClick}
      //     onIcon="mdi-power-plug"
      //     offIcon="mdi-power-plug-off"
      //     size="m"
      //   />
      // </UU5.Bricks.Card>
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
        <SwitchSelect {...elementProps} value={props.on} onChange={props.onSwitchClick} itemList={getItemList(props)} />
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
      children: (
        <Icon className={Css.switchIcon(props.bulbSize)} colorScheme={props.colorScheme} icon="mdi-power-plug-off" />
      ),
    },
    {
      value: true,
      children: (
        <Icon className={Css.switchIcon(props.bulbSize)} colorScheme={props.colorScheme} icon="mdi-power-plug" />
      ),
    },
  ];
}
//@@viewOff:helpers

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
