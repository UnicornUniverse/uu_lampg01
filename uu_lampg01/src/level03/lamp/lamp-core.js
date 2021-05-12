//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession } from "uu5g04-hooks";
import Core from "../../core/core";
import Config from "./config/config";
import Lsi from "./lamp-core-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampCore",
  nestingLevel: ["box", "smallBox", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  on: false,
  header: undefined,
  bulbStyle: "filled",
  bulbSize: "xl",
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "amber",
  elevation: 1,
  borderRadius: 0,
};

export const LampCore = createVisualComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    on: UU5.PropTypes.bool,
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
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sessionState } = useSession();
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    if (sessionState === "authenticated") {
      return (
        <Core.LampView
          header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
          help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
          copyTagFunc={props.copyTagFunc}
          on={props.on}
          bulbStyle={props.bulbStyle}
          bulbSize={props.bulbSize}
          bgStyle={props.bgStyle}
          cardView={props.cardView}
          colorSchema={props.colorSchema}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          nestingLevel={currentNestingLevel}
          {...attrs}
        />
      );
    } else {
      return (
        <Core.PackageView
          header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
          help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
          info={<UU5.Bricks.Lsi lsi={Lsi.hiddenInfo} />}
          cardView={props.cardView}
          copyTagFunc={props.copyTagFunc}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          nestingLevel={currentNestingLevel}
          {...attrs}
        />
      );
    }
    //@@viewOff:render
  },
});

export default LampCore;
