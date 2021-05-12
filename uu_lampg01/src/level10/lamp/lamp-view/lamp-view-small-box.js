//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Core from "../../../core/core";
import LampErrorResolver from "../../lamp-error-resolver";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewSmallBox",
  nestingLevel: "smallBox",
  //@@viewOff:statics
};

export const LampViewSmallBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
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
    lampDataObject: undefined,
    header: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 0,
    borderRadius: "0",
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
            <Core.Bulb
              on={props.lampDataObject.data?.on}
              bulbSize={props.bulbSize}
              bulbStyle={props.bulbStyle}
              colorSchema={props.colorSchema}
              nestingLevel={currentNestingLevel}
            />
          </LampErrorResolver>
        </Core.DataObjectStateResolver>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default LampViewSmallBox;
