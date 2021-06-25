//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import Config from "./config/config";
import LampErrorResolver from "../../lamp-error-resolver";
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    bulbStyle: "filled",
    colorSchema: "amber",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <Core.DataObjectStateResolver
        dataObject={props.lampDataObject}
        nestingLevel={currentNestingLevel}
        passErrorNoData
      >
        <LampErrorResolver dataObject={props.lampDataObject} nestingLevel={currentNestingLevel}>
          <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs}>
            <Core.Bulb on={props.lampDataObject.data?.on} bulbStyle={props.bulbStyle} colorSchema={props.colorSchema} />
          </UU5.Bricks.Text>
        </LampErrorResolver>
      </Core.DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default LampViewInline;