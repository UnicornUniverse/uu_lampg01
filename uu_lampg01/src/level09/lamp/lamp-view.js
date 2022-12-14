//@@viewOn:imports
import { PropTypes, createVisualComponent, Utils, useLsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config";
import AreaView from "./lamp-view/area-view";
import InlineView from "./lamp-view/inline-view";
import BoxView from "./lamp-view/box-view";
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
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
    onCopyComponent: PropTypes.func,
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

    function handleSwitchClick() {
      props.lampDataObject.handlerMap.setOn(!props.lampDataObject.data.on);
    }

    function handleBulbSizeChange(bulbSize) {
      props.lampDataObject.handlerMap.setBulbSize(bulbSize);
    }

    async function handleSavePreference(preferenceType) {
      try {
        await props.lampDataObject.handlerMap.savePreference(preferenceType);
        addAlert({
          message: lsi.preferenceSuccess,
          durationMs: 2000,
          priority: "success",
        });
      } catch (error) {
        // TODO Switch Lsi for Error component
        addAlert({
          message: lsi.preferenceError,
          durationMs: 5000,
          priority: "error",
        });
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    switch (currentNestingLevel) {
      case "area":
        return (
          <AreaView
            {...props}
            onSwitchClick={handleSwitchClick}
            onBulbSizeChange={handleBulbSizeChange}
            onSavePreference={handleSavePreference}
          />
        );
      case "box":
        return <BoxView {...props} onBulbSizeChange={handleBulbSizeChange} onSwitchClick={handleSwitchClick} />;
      case "inline":
      default:
        return <InlineView {...props} onBulbSizeChange={handleBulbSizeChange} onSwitchClick={handleSwitchClick} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { LampView };
export default LampView;
//@@viewOff:exports
