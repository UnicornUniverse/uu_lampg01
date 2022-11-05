//@@viewOn:imports
import { PropTypes, createVisualComponent, useLsi, Utils } from "uu5g05";
import { Block, Box, Icon, useAlertBus } from "uu5g05-elements";
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
  box: (block) =>
    Config.Css.css({
      textAlign: "center",
      ...block.style,
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
    onCopySwitch: PropTypes.func,
    onReload: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
    card: "full",
    significance: "common",
    borderRadius: "moderate",
    level: undefined,
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

    function handleCopySwitch() {
      const uu5string = props.onCopySwitch();
      Utils.Clipboard.write(uu5string);

      addAlert({
        message: lsi.copySwitchSuccess,
        priority: "success",
        durationMs: 2000,
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const actionList = getActions(props, lsi, { handleCopyComponent, handleCopySwitch });

    if (
      props.lampDataObject.state === "ready" ||
      props.lampDataObject.state === "pending" ||
      props.lampDataObject.state === "error"
    ) {
      actionList.push({
        icon: <Icon icon="mdi-reload" />,
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
        headerType={props.level ? "heading" : undefined}
        colorScheme={props.colorScheme}
        headerSeparator={true}
        actionList={actionList}
        {...elementProps}
      >
        {(block) => (
          <Core.DataObjectStateResolver
            dataObject={props.lampDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={errorsLsi}
          >
            <Box
              className={Css.box(block)}
              colorScheme={props.colorScheme}
              shape="interactiveElement"
              significance={props.significance === "common" ? "subdued" : "highlighted"}
            >
              <Core.Bulb
                on={props.lampDataObject.data?.on}
                bulbSize={props.lampDataObject.data?.bulbSize}
                bulbStyle={props.bulbStyle}
                colorScheme={props.colorScheme}
                nestingLevel="area"
              />
              <LampReloadInfo lampDataObject={props.lampDataObject} />
            </Box>
          </Core.DataObjectStateResolver>
        )}
      </Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(props, lsi, { handleCopyComponent, handleCopySwitch }) {
  const actionList = [];

  actionList.push({
    icon: "mdi-toggle-switch",
    children: lsi.copySwitch,
    onClick: handleCopySwitch,
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
