//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Core from "../../../core/core";
import BulbSizePicker from "./bulb-size-picker";
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
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showSwitch: UU5.PropTypes.bool,
    onSwitchClick: UU5.PropTypes.func,
    onBulbSizeChange: UU5.PropTypes.func,
    onSavePreference: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    bulbStyle: "filled",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    showSwitch: false,
    onSwitchClick: () => {},
    onBulbSizeChange: () => {},
    onSavePreference: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const actionList = [
      {
        content: <UU5.Bricks.Lsi lsi={props.lampDataObject.data?.on ? Lsi.switchOn : Lsi.switchOff} />,
        active: true,
        onClick: props.onSwitchClick,
      },
      {
        content: <UU5.Bricks.Lsi lsi={Lsi.preference} />,
        items: [
          {
            content: <UU5.Bricks.Lsi lsi={Lsi.preferenceDefault} />,
            onClick: () => props.onSavePreference("DEFAULT"),
          },
          {
            content: <UU5.Bricks.Lsi lsi={Lsi.preferenceSpecific} />,
            onClick: () => props.onSavePreference("SPECIFIC"),
          },
        ],
      },
    ];

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
        <Core.DataObjectStateResolver dataObject={props.lampDataObject} nestingLevel={currentNestingLevel} height={120}>
          <UU5.Bricks.Card
            bgStyle={props.bgStyle}
            colorSchema={props.colorSchema}
            className="center"
            elevation={0}
            elevationHover={0}
          >
            <BulbSizePicker bulbSize={props.lampDataObject.data?.bulbSize} onChange={props.onBulbSizeChange} />
            <Core.Bulb
              on={props.lampDataObject.data?.on}
              bulbSize={props.lampDataObject.data?.bulbSize}
              bulbStyle={props.bulbStyle}
              colorSchema={props.colorSchema}
              nestingLevel={currentNestingLevel}
            />
          </UU5.Bricks.Card>
        </Core.DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default LampViewBox;
