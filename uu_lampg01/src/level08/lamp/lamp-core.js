//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../core/core";
import Config from "./config/config";
import LampView from "./lamp-view";
import LampProvider from "./lamp-provider";
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
    uuDocKitUri: UU5.PropTypes.string,
    documentId: UU5.PropTypes.string.isRequired,
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
    uuDocKitUri: undefined,
    documentId: undefined,
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
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const header = props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;
    const help = <UU5.Bricks.Lsi lsi={Lsi.help} />;

    return (
      <LampProvider uuDocKitUri={props.uuDocKitUri} documentId={props.documentId} on={props.on}>
        {(lamp) => {
          function handleSwitchClick() {
            lamp.setOn(!lamp.on);
          }

          return (
            <LampView
              on={lamp.on}
              documentDataObject={lamp.documentDataObject}
              header={header}
              help={help}
              copyTagFunc={props.copyTagFunc}
              bulbStyle={props.bulbStyle}
              bulbSize={props.bulbSize}
              bgStyle={props.bgStyle}
              cardView={props.cardView}
              colorSchema={props.colorSchema}
              elevation={props.elevation}
              borderRadius={props.borderRadius}
              nestingLevel={currentNestingLevel}
              showSwitch={lamp.canSwitch}
              onSwitchClick={lamp.canSwitch ? handleSwitchClick : undefined}
              {...attrs}
            />
          );
        }}
      </LampProvider>
    );
  },
  //@@viewOff:render
});

export default Core.withAuthentication(LampCore, STATICS.displayName);