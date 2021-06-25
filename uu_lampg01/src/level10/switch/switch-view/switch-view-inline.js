//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import LampErrorResolver from "../../lamp-error-resolver";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchViewInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const SwitchViewInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    colorSchema: UU5.PropTypes.string,
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    bulbStyle: "filled",
    colorSchema: "amber",
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const on = props.lampDataObject.data?.on;
    const switchStateCode = on ? "-outline" : "-off";
    const switchIcon = `mdi-toggle-switch${switchStateCode}`;
    const switchCss = Config.Css.css`cursor: pointer`;
    const colorSchema = on ? props.colorSchema : "black";

    return (
      <Core.DataObjectStateResolver
        dataObject={props.lampDataObject}
        nestingLevel={currentNestingLevel}
        passErrorNoData
      >
        <LampErrorResolver dataObject={props.lampDataObject} nestingLevel={currentNestingLevel}>
          <UU5.Bricks.Text
            colorSchema={colorSchema}
            nestingLevel="inline"
            disabled={props.lampDataObject.state !== "ready"}
            {...attrs}
          >
            <span onClick={props.onSwitchClick} className={switchCss}>
              <UU5.Bricks.Icon icon={switchIcon} />
            </span>
          </UU5.Bricks.Text>
        </LampErrorResolver>
      </Core.DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default SwitchViewInline;