//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Icon, Block, Box, useAlertBus, UuGds } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      textAlign: "center",
    }),
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
    colorScheme: PropTypes.colorScheme,
    card: PropTypes.oneOf(["none", "full", "content"]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    onSwitchClick: PropTypes.func,
    onCopyComponent: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    header: "",
    help: "",
    card: "none",
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "none",
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
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Block
        header={props.header}
        info={props.help}
        card={props.card}
        borderRadius={props.borderRadius}
        significance={props.significance}
        colorScheme={props.colorScheme}
        actionList={actionList}
        {...elementProps}
      >
        <Box className={Css.box()} colorScheme={props.colorScheme} significance={props.significance}>
          <SwitchSelect
            {...elementProps}
            value={props.on}
            onChange={props.onSwitchClick}
            itemList={getItemList(props)}
          />
        </Box>
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

function getItemList(props) {
  return [
    {
      value: false,
      children: (
        <Icon colorScheme={props.colorScheme} icon="mdi-power-plug-off" />
      ),
    },
    {
      value: true,
      children: (
        <Icon colorScheme={props.colorScheme} icon="mdi-power-plug" />
      ),
    },
  ];
}
//@@viewOff:helpers

//@@viewOn:exports
export { AreaView };
export default AreaView;
//@@viewOff:exports
