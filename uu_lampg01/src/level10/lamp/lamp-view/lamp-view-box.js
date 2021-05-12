//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import Core from "../../../core/core";
import LampErrorResolver from "../../lamp-error-resolver";
import LampReloadInfo from "../../lamp-reload-info";
import Config from "./config/config";
import Lsi from "./lamp-view-box-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampViewBox",
  nestingLevel: "box",
  //@@viewOff:statics
};

const reloadInfoCss = () => Config.Css.css`
  padding: 25px
`;

export const LampViewBox = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    onSwitchClick: UU5.PropTypes.func,
    onCopySwitch: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
    header: "",
    help: "",
    bulbStyle: "filled",
    bulbSize: "xl",
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
    onSwitchClick: () => {},
    onCopySwitch: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const actionList = [
      {
        content: <UU5.Bricks.Lsi lsi={Lsi.copySwitch} />,
        onClick: props.onCopySwitch,
      },
    ];

    if (
      props.lampDataObject.state === "ready" ||
      props.lampDataObject.state === "pending" ||
      props.lampDataObject.state === "error"
    ) {
      actionList.push({
        content: <UU5.Bricks.Icon icon="mdi-reload" />,
        active: true,
        onClick: props.lampDataObject.handlerMap.get,
        bgStyle: "outline",
        disabled: props.lampDataObject.state === "pending",
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
          dataObject={props.lampDataObject}
          nestingLevel={currentNestingLevel}
          height={120}
          passErrorNoData
        >
          <LampErrorResolver dataObject={props.lampDataObject} nestingLevel={currentNestingLevel}>
            <UU5.Bricks.Card
              bgStyle={props.bgStyle}
              colorSchema={props.colorSchema}
              className="center"
              elevation={0}
              elevationHover={0}
            >
              <Core.Bulb
                on={props.lampDataObject.data?.on}
                bulbSize={props.bulbSize}
                bulbStyle={props.bulbStyle}
                colorSchema={props.colorSchema}
                nestingLevel={currentNestingLevel}
              />
              <div className={reloadInfoCss()}>
                <LampReloadInfo lampDataObject={props.lampDataObject} />
              </div>
            </UU5.Bricks.Card>
          </LampErrorResolver>
        </Core.DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default LampViewBox;
