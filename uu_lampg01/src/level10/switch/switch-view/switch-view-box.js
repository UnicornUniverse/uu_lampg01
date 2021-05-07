//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import Config from "./config/config";
import Lsi from "./switch-view-box-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SwitchViewBox",
  nestingLevel: "box",
  //@@viewOff:statics
};

const switchCss = () => Config.Css.css`margin: 20px`;

export const SwitchViewBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
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
    help: "",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    onSwitchClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const actionList = [
      {
        content: <UU5.Bricks.Icon icon="mdi-reload" />,
        active: true,
        onClick: props.lampDataObject.handlerMap.get,
        bgStyle: "outline",
      },
    ];

    const switchItems = [
      {
        value: true,
        content: <UU5.Bricks.Lsi lsi={Lsi.switchOn} />,
      },
      {
        value: false,
        content: <UU5.Bricks.Lsi lsi={Lsi.switchOff} />,
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
        <UU5.Bricks.Card
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          className="center"
          elevation={0}
          elevationHover={0}
        >
          <Core.DataObjectStateResolver
            dataObject={props.lampDataObject}
            height={120}
            nestingLevel={currentNestingLevel}
          >
            <UU5.Bricks.SwitchSelector
              items={switchItems}
              onChange={props.onSwitchClick}
              value={props.lampDataObject.data?.on}
              size="xl"
              className={switchCss()}
            />
          </Core.DataObjectStateResolver>
        </UU5.Bricks.Card>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default SwitchViewBox;
