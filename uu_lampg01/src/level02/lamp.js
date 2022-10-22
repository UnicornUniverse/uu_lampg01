//@@viewOn:imports
import { Utils, PropTypes, Lsi, createVisualComponent, useSession } from "uu5g05";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import importLsi from "../lsi/import-lsi";
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

let Lamp = createVisualComponent({
  ...STATICS,

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
    const session = useSession();

    function handleCopyTag() {
      return createCopyTag(STATICS.uu5Tag, props, ["header"], DEFAULT_PROPS);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    switch (session.state) {
      case "authenticated":
        return (
          <Core.LampView
            header={props.header ?? <Lsi import={importLsi} path={[Lamp.uu5Tag, "header"]} />}
            help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
            copyTagFunc={handleCopyTag}
            nestingLevel={currentNestingLevel}
            on
            {...elementProps}
          />
        );
      default:
        return (
          <Core.PackageView
            header={props.header ?? <Lsi import={importLsi} path={[Lamp.uu5Tag, "header"]} />}
            help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
            info={<Lsi import={importLsi} path={[Lamp.uu5Tag, "hiddenInfo"]} />}
            copyTagFunc={handleCopyTag}
            nestingLevel={currentNestingLevel}
            {...elementProps}
          />
        );
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
