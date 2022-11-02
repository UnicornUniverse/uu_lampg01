//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi } from "uu5g05";
import { Block, Text, Box, Icon, UuGds, useAlertBus } from "uu5g05-elements";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: (block) =>
    Config.Css.css({
      textAlign: "center",
      ...block.style,
    }),
  icon: () =>
    Config.Css.css({
      ...UuGds.Typography.getValue(["interface", "title", "main"]),
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
    borderRadius: "moderate",
    aspectRatio: undefined,
    level: "",
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
            <Text>{props.info}</Text>
            <Icon className={Css.icon()} icon={props.icon} colorScheme={props.colorScheme} />
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
