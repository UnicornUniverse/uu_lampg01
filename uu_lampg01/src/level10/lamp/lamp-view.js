//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config";
import AreaView from "./lamp-view/area-view";
import BoxView from "./lamp-view/box-view";
import InlineView from "./lamp-view/inline-view";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampView",
  nestingLevel: ["area", "box", "inline"],
  //@@viewOff:statics
};

const LampView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: PropTypes.object.isRequired,
    header: PropTypes.node,
    help: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
    card: PropTypes.oneOf(["none", "full", "content"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
    onCopyComponent: PropTypes.func,
    onCopySwitch: PropTypes.func,
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
    const lsi = useLsi(importLsi, [LampView.uu5Tag]);
    const { addAlert } = useAlertBus();

    async function handleReload() {
      try {
        await props.lampDataObject.handlerMap.load();
      } catch (error) {
        LampView.logger.error(error);
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
        return <AreaView {...props} onReload={handleReload} nestingLevel={currentNestingLevel} />;
      case "box":
        return <BoxView {...props} nestingLevel={currentNestingLevel} />;
      case "inline":
      default:
        return <InlineView {...props} nestingLevel={currentNestingLevel} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LampView };
export default LampView;
//@@viewOff:exports
