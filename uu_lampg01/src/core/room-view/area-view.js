//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useLsi, Content } from "uu5g05";
import { Block, Box, useAlertBus, UuGds } from "uu5g05-elements";
import Config from "./config/config";
import Header from "./header";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  box: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: "inherit",
      padding: UuGds.SpacingPalette.getValue(["fixed", "g"]),
    }),
};
//@@viewOff:css

const AreaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    room: PropTypes.object.isRequired,
    header: PropTypes.node,
    help: PropTypes.node,
    colorScheme: PropTypes.colorScheme,
    card: PropTypes.oneOf(["none", "full", "content"]),
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    onCopyComponent: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    colorScheme: "yellow",
    card: "none",
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
        header={<Header room={props.room} header={props.header} />}
        info={props.help}
        card={props.card}
        borderRadius={props.borderRadius}
        level={props.level}
        headerType={props.card === "full" ? "title" : "heading"}
        headerSeparator={true}
        colorScheme={props.colorScheme}
        actionList={actionList}
        {...elementProps}
      >
        {() => <Content nestingLevel="area">{props.children}</Content>}
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
