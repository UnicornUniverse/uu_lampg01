//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Utils } from "uu5g05";
import { Block, Box, Icon, useAlertBus, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import Core from "../../../core/core";
import LampReloadInfo from "../../lamp-reload-info";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
const PLACEHOLDER_HEIGHT = "300px";
//@@viewOff:constants

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      gap: UuGds.SpacingPalette.getValue(["fixed", "f"]),
    }),
};
//@@viewOff:css

const AreaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: PropTypes.object.isRequired,
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
    onCopyLamp: PropTypes.func,
    onReload: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    card: "full",
    significance: "common",
    borderRadius: "moderate",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [AreaView.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);
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

    function handleCopyLamp() {
      const uu5string = props.onCopyLamp();
      Utils.Clipboard.write(uu5string);

      addAlert({
        message: lsi.copyComponentSuccess,
        priority: "success",
        durationMs: 2000,
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const actionList = getActions(props, lsi, { handleCopyComponent, handleCopyLamp });

    if (
      props.lampDataObject.state === "ready" ||
      props.lampDataObject.state === "pending" ||
      props.lampDataObject.state === "error"
    ) {
      actionList.push({
        icon: <Icon icon="mdi-sync" />,
        collapsedChildren: lsi.reload,
        primary: true,
        onClick: props.onReload,
        disabled: props.lampDataObject.state === "pending",
      });
    }

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
        <Core.DataObjectStateResolver
          dataObject={props.lampDataObject}
          height={PLACEHOLDER_HEIGHT}
          customErrorLsi={errorsLsi}
        >
          <Box
            className={Css.box()}
            colorScheme={props.colorScheme}
            shape="interactiveElement"
            significance={props.significance === "common" ? "subdued" : "highlighted"}
          >
            <Core.LampSwitch
              on={props.lampDataObject.data?.on}
              onClick={props.onSwitchClick}
              colorScheme={props.colorScheme}
              disabled={props.lampDataObject.state !== "ready"}
              nestingLevel="box"
            />
            <LampReloadInfo lampDataObject={props.lampDataObject} />
          </Box>
        </Core.DataObjectStateResolver>
      </Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(props, lsi, { handleCopyComponent, handleCopyLamp }) {
  const actionList = [];

  actionList.push({
    icon: "mdi-lightbulb",
    children: lsi.copyLamp,
    onClick: handleCopyLamp,
    collapsed: true,
  });

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
