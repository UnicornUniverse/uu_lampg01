//@@viewOn:imports
import { PropTypes, Utils, createVisualComponent, useLsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config";
import AreaView from "./switch-view/area-view";
import BoxView from "./switch-view/box-view";
import InlineView from "./switch-view/inline-view";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SwitchView",
  nestingLevel: ["area", "box", "inline"],
  //@@viewOff:statics
};

const SwitchView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: PropTypes.object.isRequired,
    header: PropTypes.node,
    help: PropTypes.node,
    card: PropTypes.oneOf(["none", "content", "full"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
    onSwitchClick: PropTypes.func,
    onCopyComponent: PropTypes.func,
    onCopyLamp: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    card: "none",
    width: undefined,
    height: undefined,
    colorScheme: "yellow",
    significance: "common",
    borderRadius: "none",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [SwitchView.uu5Tag]);
    const { addAlert } = useAlertBus();

    async function handleSwitchClick() {
      try {
        await props.lampDataObject.handlerMap.setOn(!props.lampDataObject.data.on);
      } catch (error) {
        SwitchView.logger.error(error);
        addAlert({
          message: lsi.setOnError,
          priority: "error",
          durationMs: 3000,
        });
      }
    }

    async function handleReload() {
      try {
        await props.lampDataObject.handlerMap.get();
      } catch (error) {
        SwitchView.logger.error(error);
        addAlert({
          message: lsi.reloadError,
          priority: "error",
          durationMs: 3000,
        });
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    switch (currentNestingLevel) {
      case "area":
        return <AreaView {...props} onSwitchClick={handleSwitchClick} onReload={handleReload} />;
      case "box":
        return <BoxView {...props} onSwitchClick={handleSwitchClick} />;
      case "inline":
      default:
        return <InlineView {...props} onSwitchClick={handleSwitchClick} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SwitchView };
export default SwitchView;
//@@viewOff:exports
