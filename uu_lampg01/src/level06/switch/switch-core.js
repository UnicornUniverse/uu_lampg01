//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useEffect } from "uu5g04-hooks";
import Core from "../../core/core";
import useRoom from "../room/use-room";
import Config from "./config/config";
import Lsi from "./switch-core-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchCore",
  //@@viewOff:statics
};

export const SwitchCore = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const room = useRoom();

    useEffect(() => {
      if (!room.registerSwitch || !room.unregisterSwitch) {
        return;
      }

      room.registerSwitch(props.id);

      return () => room.unregisterSwitch(props.id);
    }, []);

    function handleSwitchClick() {
      room.light.setOn(!room.light.on);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const header = props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;

    if (room.light) {
      return (
        <Core.SwitchView
          header={header}
          help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
          copyTagFunc={props.copyTagFunc}
          on={room.light && room.light.on}
          bgStyle={props.bgStyle}
          cardView={props.cardView}
          colorSchema={props.colorSchema}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          nestingLevel={props.nestingLevel}
          onSwitchClick={handleSwitchClick}
          {...attrs}
        />
      );
    } else {
      return (
        <Core.PackageView
          header={props.header}
          help={props.help}
          info={<UU5.Bricks.Lsi lsi={Lsi.noRoom} />}
          cardView={props.cardView}
          copyTagFunc={props.copyTagFunc}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          nestingLevel={props.nestingLevel}
          {...attrs}
        />
      );
    }
  },
  //@@viewOff:render
});

export default Core.withAuthentication(SwitchCore, STATICS.displayName);
