//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import LampErrorResolver from "../../lamp-error-resolver";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchViewSmallBox",
  nestingLevel: "smallBox",
  //@@viewOff:statics
};

export const SwitchViewSmallBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 0,
    borderRadius: "0",
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Card
        colorSchema={props.colorSchema}
        bgStyle={props.bgStyle}
        borderRadius={props.borderRadius}
        elevation={props.elevation}
        elevationHover={props.elevation}
        className="center padding-s"
        {...attrs}
      >
        <Core.DataObjectStateResolver
          dataObject={props.lampDataObject}
          height={120}
          nestingLevel={currentNestingLevel}
          passErrorNoData
        >
          <LampErrorResolver dataObject={props.lampDataObject} nestingLevel={currentNestingLevel}>
            <UU5.Bricks.Switch
              switchedOn={props.lampDataObject?.data?.on}
              onChange={props.onSwitchClick}
              onIcon="mdi-power-plug"
              offIcon="mdi-power-plug-off"
              size="m"
              disabled={props.lampDataObject.state !== "ready"}
            />
          </LampErrorResolver>
        </Core.DataObjectStateResolver>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default SwitchViewSmallBox;