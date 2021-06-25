//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useEffect } from "uu5g04-hooks";
import Core from "../../core/core";
import Config from "./config/config";
import useRoom from "../room/use-room";
import Lsi from "./lamp-core-lsi";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampCore",
  //@@viewOff:statics
};

export const LampCore = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    on: UU5.PropTypes.bool,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
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
      if (!room) {
        return;
      }

      room.registerLamp(props.id);

      return () => room.unregisterLamp(props.id);
    }, [room, props.id]);
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const header = props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;
    const help = <UU5.Bricks.Lsi lsi={Lsi.help} />;

    if (room) {
      return (
        <Core.LampView
          header={header}
          help={help}
          copyTagFunc={props.copyTagFunc}
          on={room.light.on}
          bulbStyle={props.bulbStyle}
          bulbSize={props.bulbSize}
          bgStyle={props.bgStyle}
          cardView={props.cardView}
          colorSchema={props.colorSchema}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          nestingLevel={props.nestingLevel}
          {...attrs}
        />
      );
    } else {
      return (
        <Core.PackageView
          header={header}
          help={help}
          info={<UU5.Bricks.Lsi lsi={Lsi.noRoom} />}
          icon="mdi-home-alert"
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

export default Core.withAuthentication(LampCore, STATICS.displayName);
