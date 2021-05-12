//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import LampViewInline from "./lamp-view/lamp-view-inline";
import LampViewSmallBox from "./lamp-view/lamp-view-small-box";
import LampViewBox from "./lamp-view/lamp-view-box";
import Lsi from "./lamp-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampView",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const LampView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    bulbStyle: "filled",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();

    function handleSwitchClick() {
      props.lampDataObject.handlerMap.setOn(!props.lampDataObject.data.on);
    }

    function handleBulbSizeChange(bulbSize) {
      props.lampDataObject.handlerMap.setBulbSize(bulbSize);
    }

    async function handleSavePreference(preferenceType) {
      try {
        await props.lampDataObject.handlerMap.savePreference(preferenceType);
        alertBusRef.current.addAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.preferenceSuccess} />,
          closeTimer: 2000,
          colorSchema: "success",
        });
      } catch (error) {
        alertBusRef.current.addAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.preferenceError} />,
          closeTimer: 5000,
          colorSchema: "danger",
        });
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    let child;

    switch (currentNestingLevel) {
      case "box":
        child = (
          <LampViewBox
            {...props}
            {...attrs}
            nestingLevel={currentNestingLevel}
            onSwitchClick={handleSwitchClick}
            onBulbSizeChange={handleBulbSizeChange}
            onSavePreference={handleSavePreference}
          />
        );
        break;
      case "smallBox":
        child = (
          <LampViewSmallBox
            {...props}
            {...attrs}
            nestingLevel={currentNestingLevel}
            onSwitchClick={handleSwitchClick}
          />
        );
        break;
      case "inline":
      default:
        child = (
          <LampViewInline {...props} {...attrs} nestingLevel={currentNestingLevel} onSwitchClick={handleSwitchClick} />
        );
    }

    return (
      <>
        {child}
        <UU5.Bricks.AlertBus ref_={alertBusRef} />
      </>
    );
    //@@viewOff:render
  },
});

export default LampView;
