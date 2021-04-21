//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, TimeZoneProvider } from "uu5g04-hooks";
import Core from "../../core/core";
import Config from "./config/config";
import SunProvider from "./sun-provider";
import LampView from "./lamp-view";
import TimeZoneSync from "./time-zone-sync";

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
    timeZone: UU5.PropTypes.string,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
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
    timeZone: "Europe/Prague",
    header: "",
    help: "",
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
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <TimeZoneProvider initialTimeZone={props.timeZone}>
        <TimeZoneSync timeZone={props.timeZone} />
        <SunProvider>
          {(sun) => {
            return (
              <LampView
                header={props.header}
                copyTagFunc={props.copyTagFunc}
                on={!sun.isShining}
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
          }}
        </SunProvider>
      </TimeZoneProvider>
    );
  },
  //@@viewOff:render
});

export default Core.withAuthentication(LampCore, STATICS.displayName);
