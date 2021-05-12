//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
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

export const LampCore = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <Core.LampView
        header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        copyTagFunc={props.copyTagFunc}
        nestingLevel={currentNestingLevel}
        on
        {...attrs}
      />
    );
    //@@viewOff:render
  },
});

export default LampCore;
