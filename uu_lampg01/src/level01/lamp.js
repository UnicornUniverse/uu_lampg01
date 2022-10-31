//@@viewOn:imports
import { PropTypes, createVisualComponent, Lsi, useLsi } from "uu5g05";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [LampCore.uu5Tag]);

    function handleOnCopyComponent() {
      return createCopyTag(LampCore.uu5Tag, props, ["header"], LampCore.defaultProps);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Core.LampView
        {...props}
        header={props.header ?? lsi.header}
        help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
        onCopyComponent={handleOnCopyComponent}
        on
      />
    );
    //@@viewOff:render
  },
});

let Lamp = withMargin(LampCore);
Lamp = withEditModal(Lamp, null, { editMode: { customEdit: false } });
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
