//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Package from "../../../core/package/package";
import Config from "./config/config";
import Switch from "../../../core/switch/switch";
import withAuthentication from "../../../core/with-authentication/with-authentication";
import useRoom from "../room/use-room";
import Lsi from "./switch-body-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchBody",
  //@@viewOff:statics
};

export const SwitchBody = createVisualComponent({
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
    //@@viewOn:render
    const room = useRoom();

    function handleSwitchClick() {
      room.light.setOn(!room.light.on);
    }

    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    if (room.light) {
      return (
        <Switch
          header={props.header}
          help={props.help}
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
        <Package
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

export default withAuthentication(SwitchBody, STATICS.displayName);
