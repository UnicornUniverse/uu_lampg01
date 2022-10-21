//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lamp",
  nestingLevel: ["area", "box", "inline"],
  editMode: {
    displayType: "block",
    customEdit: false,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  header: undefined,
};

const Lamp = createVisualComponent({
  statics: STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sessionState } = useSession();
    
    function handleCopyTag() {
      return createCopyTag(STATICS.uu5Tag, props, ["header"], DEFAULT_PROPS);
    }
    //@@viewOff:private
    
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.getAttrs(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    switch (sessionState) {
      case "authenticated":
        return (
          <Core.LampView
            header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
            help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
            copyTagFunc={handleCopyTag}
            nestingLevel={currentNestingLevel}
            on
            {...elementProps}
          />
        );
      default:
        return (
          <Core.PackageView
            header={props.header ?? <UU5.Bricks.Lsi lsi={Lsi.header} />}
            help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
            info={<UU5.Bricks.Lsi lsi={Lsi.hiddenInfo} />}
            copyTagFunc={handleCopyTag}
            nestingLevel={currentNestingLevel}
            {...elementProps}
          />
        );
    }
  },
  //@@viewOff:render
});

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
