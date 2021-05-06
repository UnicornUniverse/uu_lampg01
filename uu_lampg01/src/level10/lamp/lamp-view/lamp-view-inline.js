//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const LampViewInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    colorSchema: UU5.PropTypes.string,
    showSwitch: UU5.PropTypes.bool,
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    bulbStyle: "filled",
    colorSchema: "amber",
    showSwitch: false,
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <Core.DataObjectStateResolver dataObject={props.documentDataObject} nestingLevel={currentNestingLevel}>
        <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
          <Core.Bulb on={props.lampDataObject.data?.on} bulbStyle={props.bulbStyle} colorSchema={props.colorSchema} />
          {props.showSwitch && (
            <Core.LampSwitch
              on={props.lampDataObject.data?.on}
              colorSchema={props.colorSchema}
              onClick={props.onSwitchClick}
            />
          )}
        </UU5.Bricks.Text>
      </Core.DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default LampViewInline;
