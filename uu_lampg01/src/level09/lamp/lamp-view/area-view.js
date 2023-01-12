//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Block, Box, useAlertBus } from "uu5g05-elements";
import Config from "./config/config";
import Core from "../../../core/core";
import BulbSizePicker from "./bulb-size-picker";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: (block) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
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
    onBulbSizeChange: PropTypes.func,
    onSavePreference: PropTypes.func,
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
    showSwitch: false,
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
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const actionList = getActions(props, lsi, { handleCopyComponent });

    if (!props.aspectRatio && !props.width) {
      props.height = "150px";
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
        {(block) => (
          <Core.DataObjectStateResolver
            dataObject={props.lampDataObject}
            height={props.height}
            customErrorLsi={errorsLsi}
          >
            <Box
              className={Css.box(block)}
              colorScheme={props.colorScheme}
              shape="interactiveElement"
              significance={props.significance === "common" ? "subdued" : "highlighted"}
            >
              <BulbSizePicker bulbSize={props.lampDataObject.data?.bulbSize} onChange={props.onBulbSizeChange} />
              <Core.Bulb
                on={props.lampDataObject.data?.on}
                bulbSize={props.lampDataObject.data?.bulbSize}
                bulbStyle={props.bulbStyle}
                colorScheme={props.colorScheme}
                nestingLevel="area"
              />
            </Box>
          </Core.DataObjectStateResolver>
        )}
      </Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(props, lsi, { handleCopyComponent }) {
  const actionList = [];

  if (props.lampDataObject.data) {
    actionList.push({
      children: props.lampDataObject.data?.on ? lsi.switchOff : lsi.switchOn,
      primary: true,
      onClick: props.onSwitchClick,
    });

    actionList.push({
      icon: "mdi-settings",
      children: lsi.preference,
      collapsed: true,
      itemList: [
        {
          children: lsi.preferenceDefault,
          onClick: () => props.onSavePreference("DEFAULT"),
        },
        {
          children: lsi.preferenceSpecific,
          onClick: () => props.onSavePreference("SPECIFIC"),
        },
      ],
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
