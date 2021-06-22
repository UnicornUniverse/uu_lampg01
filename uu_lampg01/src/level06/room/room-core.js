//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Core from "../../core/core";
import Config from "./config/config";
import RoomProvider from "./room-provider";
import Lsi from "./room-core-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomCore",
  //@@viewOff:statics
};

export const RoomCore = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    on: UU5.PropTypes.bool,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    on: false,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const header = props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;

    return (
      <RoomProvider on={props.on}>
        {(room) => {
          return (
            <Core.RoomView
              header={header}
              help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
              copyTagFunc={props.copyTagFunc}
              bgStyle={props.bgStyle}
              cardView={props.cardView}
              colorSchema={props.colorSchema}
              elevation={props.elevation}
              borderRadius={props.borderRadius}
              nestingLevel={props.nestingLevel}
              room={room}
              {...attrs}
            >
              {props.children}
            </Core.RoomView>
          );
        }}
      </RoomProvider>
    );
  },
  //@@viewOff:render
});

export default Core.withAuthentication(RoomCore, STATICS.displayName);
