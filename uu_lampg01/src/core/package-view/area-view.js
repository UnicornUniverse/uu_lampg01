//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Block, Box, Icon, UuGds } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      textAlign: "center",
      padding: UuGds.SpacingPalette.getValue(["fixed", "b"]),
    }),
  icon: () =>
    Config.Css.css({
      fontSize: "65px",
      display: "block",
    }),
};
//@@viewOff:css

const AreaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    help: PropTypes.node,
    info: PropTypes.node,
    icon: PropTypes.string,
    card: PropTypes.oneOf(["none", "full", "content"]),
    colorScheme: PropTypes.colorScheme,
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    info: null,
    icon: "mdi-gift",
    card: "none",
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const actionList = [];
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Block
        header={props.header}
        info={props.help}
        card={props.card}
        borderRadius={props.borderRadius}
        actionList={actionList}
        {...elementProps}
      >
        <Box className={Css.box()} colorScheme={props.colorScheme} significance={props.significance}>
          {props.info}
          <Icon className={Css.icon()} icon={props.icon} />
        </Box>
      </Block>
    );
    //@@viewOff:render
  },
})

//@@viewOn:exports
export { AreaView };
export default AreaView;
//@@viewOff:exports
