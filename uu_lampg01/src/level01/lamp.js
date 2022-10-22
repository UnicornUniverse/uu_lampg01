//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, Lsi } from "uu5g05";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
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
    function handleOnCopyComponent() {
      return createCopyTag(STATICS.uu5Tag, props, ["header"], DEFAULT_PROPS);
    }
    //@@viewOff:private
    
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <Core.LampView
        header={props.header ?? <Lsi import={importLsi} path={[Lamp.uu5Tag, "header"]} />}
        help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
        onCopyComponent={handleOnCopyComponent}
        nestingLevel={currentNestingLevel}
        on
        {...elementProps}
      />
    );
  },
  //@@viewOff:render
});

// Lamp = withMargin(Lamp);
// Lamp = withEditModal(Lamp, null);
// Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
