//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { createCopyTag } from "../utils/utils";
import Core from "../core/core";
import Config from "./config/config";
import Lsi from "./lamp-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Lamp",
  nestingLevel: ["box", "smallBox", "inline"],
  editMode: {
    displayType: "block",
    startMode: "button",
  },
  //@@viewOff:statics
};

export const Lamp = createVisualComponent({
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
    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props, ["header"]);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <Core.LampView
        header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        copyTagFunc={_handleCopyTag}
        nestingLevel={currentNestingLevel}
        on
        {...attrs}
      />
    );
    //@@viewOff:render
  },
});

export default Lamp;
