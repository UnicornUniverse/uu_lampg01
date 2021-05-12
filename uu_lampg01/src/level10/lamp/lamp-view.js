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
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    onCopySwitch: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    onCopySwitch: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();

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
        child = <LampViewBox {...props} {...attrs} onReload={handleReload} nestingLevel={currentNestingLevel} />;
        break;
      case "smallBox":
        child = <LampViewSmallBox {...props} {...attrs} nestingLevel={currentNestingLevel} />;
        break;
      case "inline":
      default:
        child = <LampViewInline {...props} {...attrs} nestingLevel={currentNestingLevel} />;
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
