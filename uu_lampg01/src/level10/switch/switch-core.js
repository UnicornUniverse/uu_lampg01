//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../core/core";
import LampProvider from "../lamp-provider";
import SwitchView from "./switch-view";
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
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const header = props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;
    const help = <UU5.Bricks.Lsi lsi={Lsi.help} />;

    return (
      <Core.PersonProvider>
        {(personDataObject) => {
          return (
            <LampProvider baseUri={props.baseUri} on={props.on} personDataObject={personDataObject} code={props.code}>
              {(lampDataObject) => {
                function handleSwitchClick() {
                  lampDataObject.handlerMap.setOn(!lampDataObject.data.on);
                }

                return (
                  <SwitchView
                    lampDataObject={lampDataObject}
                    header={header}
                    help={help}
                    copyTagFunc={props.copyTagFunc}
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
              }}
            </LampProvider>
          );
        }}
      </Core.PersonProvider>
    );
  },
  //@@viewOff:render
});

export default Core.withAuthentication(SwitchCore, STATICS.displayName);
