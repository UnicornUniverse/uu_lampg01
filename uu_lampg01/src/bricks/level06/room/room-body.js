//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession, useState } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Config from "./config/config";
import RoomView from "../../../core/room/room";
import withAuthentication from "../../../core/with-authentication/with-authentication";
import RoomProvider from "./room-provider";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomBody",
  //@@viewOff:statics
};

export const RoomBody = createVisualComponent({
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

    return (
      <RoomProvider on={props.on}>
        {(room) => {
          return (
            <RoomView
              header={props.header}
              help={props.help}
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
            </RoomView>
          );
        }}
      </RoomProvider>
    );
  },
  //@@viewOff:render
});

export default withAuthentication(RoomBody, STATICS.displayName);
