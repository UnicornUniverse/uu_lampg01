//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import SwitchViewInline from "./switch-view/switch-view-inline";
import SwitchViewSmallBox from "./switch-view/switch-view-small-box";
import SwitchViewBox from "./switch-view/switch-view-box";
import Lsi from "./switch-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Switch",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

export const Switch = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    onSwitchClick: UU5.PropTypes.func,
    onCopyLamp: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    onSwitchClick: () => {},
    onCopyLamp: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();

    async function handleSwitchClick() {
      try {
        await props.lampDataObject.handlerMap.setOn(!props.lampDataObject.data.on);
      } catch (error) {
        console.error(error);
        alertBusRef.current.addAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.setOnError} />,
          colorSchema: "danger",
          closeTimer: 3000,
        });
      }
    }

    async function handleReload() {
      try {
        await props.lampDataObject.handlerMap.get();
      } catch (error) {
        console.error(error);
        alertBusRef.current.addAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.reloadError} />,
          colorSchema: "danger",
          closeTimer: 3000,
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
        child = <SwitchViewBox {...props} {...attrs} onSwitchClick={handleSwitchClick} onReload={handleReload} />;
        break;
      case "smallBox":
        child = <SwitchViewSmallBox {...props} {...attrs} onSwitchClick={handleSwitchClick} />;
        break;
      case "inline":
      default:
        child = <SwitchViewInline {...props} {...attrs} onSwitchClick={handleSwitchClick} />;
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

export default Switch;
