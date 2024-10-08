//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Block, Box, useAlertBus, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import Clock from "../clock";
import TimeZoneSwitch from "../time-zone-switch";
import Bulb from "../../../core/bulb";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: (block) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      ...block.style,
    }),
  bulb: () =>
    Config.Css.css({
      display: "block",
    }),
  clock: () => Config.Css.css({ padding: UuGds.SpacingPalette.getValue(["fixed", "g"]) }),
};
//@@viewOff:css

const AreaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    header: PropTypes.node,
    help: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
    card: PropTypes.oneOf(["none", "full", "content"]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    showSwitch: PropTypes.bool,
    onSwitchClick: PropTypes.func,
    onCopyComponent: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    card: "full",
    significance: "common",
    borderRadius: "moderate",
    showSwitch: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [AreaView.uu5Tag]);
    const { addAlert } = useAlertBus();

    function handleCopyComponent() {
      const uu5string = props.onCopyComponent();
      Utils.Clipboard.write(uu5string);

      addAlert({
        message: lsi.copyComponentSuccess,
        priority: "success",
        durationMs: 2000,
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    const actionList = getActions(props, lsi, { handleCopyComponent });
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Block
        header={props.header}
        info={props.help}
        card={props.card}
        borderRadius={props.borderRadius}
        level={props.level}
        headerType={props.card === "full" ? "title" : "heading"}
        colorScheme={props.colorScheme}
        headerSeparator={true}
        actionList={actionList}
        {...elementProps}
      >
        {(block) => (
          <Box
            className={Css.box(block)}
            colorScheme={props.colorScheme}
            shape="interactiveElement"
            significance={props.significance === "common" ? "subdued" : "highlighted"}
          >
            <Bulb
              className={Css.bulb()}
              on={props.on}
              bulbSize={props.bulbSize}
              bulbStyle={props.bulbStyle}
              colorScheme={props.colorScheme}
              nestingLevel="area"
            />
            <Clock className={Css.clock()} />
            <TimeZoneSwitch />
          </Box>
        )}
      </Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(props, lsi, { handleCopyComponent }) {
  const actionList = [];

  if (props.showSwitch) {
    actionList.push({
      children: props.on ? lsi.switchOff : lsi.switchOn,
      primary: true,
      onClick: props.onSwitchClick,
    });
  }

  actionList.push({
    icon: "mdi-content-copy",
    children: lsi.copyComponent,
    onClick: handleCopyComponent,
    collapsed: true,
    disabled: props.disabled,
  });

  return actionList;
}
//@@viewOff:helpers

//@@viewOn:exports
export { AreaView };
export default AreaView;
//@@viewOff:exports
