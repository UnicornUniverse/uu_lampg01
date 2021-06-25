//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Core from "../../../core/core";
import LampErrorResolver from "./lamp-error-resolver";
import Lsi from "./lamp-view-box-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewBox",
  nestingLevel: "box",
  //@@viewOff:statics
};

export const LampViewBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    documentDataObject: UU5.PropTypes.object.isRequired,
    on: UU5.PropTypes.bool,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showSwitch: UU5.PropTypes.bool,
    onSwitchClick: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    documentDataObject: undefined,
    on: false,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    showSwitch: false,
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const actionList = [];

    if (props.showSwitch) {
      actionList.push({
        content: <UU5.Bricks.Lsi lsi={props.on ? Lsi.switchOn : Lsi.switchOff} />,
        active: true,
        onClick: props.onSwitchClick,
      });
    }

    return (
      <UuP.Bricks.ComponentWrapper
        header={props.header}
        help={props.help}
        cardView={props.cardView}
        copyTagFunc={props.copyTagFunc}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        actionList={actionList}
        {...attrs}
      >
        <Core.DataObjectStateResolver
          dataObject={props.documentDataObject}
          nestingLevel={currentNestingLevel}
          height={120}
          passErrorNoData
        >
          <LampErrorResolver dataObject={props.documentDataObject} nestingLevel={currentNestingLevel}>
            <UU5.Bricks.Card
              bgStyle={props.bgStyle}
              colorSchema={props.colorSchema}
              className="center"
              elevation={0}
              elevationHover={0}
            >
              <Core.Bulb
                on={props.on}
                bulbSize={props.bulbSize}
                bulbStyle={props.bulbStyle}
                colorSchema={props.colorSchema}
                nestingLevel={currentNestingLevel}
              />
            </UU5.Bricks.Card>
          </LampErrorResolver>
        </Core.DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default LampViewBox;