//@@viewOn:imports
import { PropTypes, Lsi, createVisualComponent, useSession, useLsi } from "uu5g05";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

let Lamp = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lamp",
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
    const lsi = useLsi(importLsi, [Lamp.uu5Tag]);
    const session = useSession();

    function handleOnCopyComponent() {
      return createCopyTag(Lamp.uu5Tag, props, ["header"], Lamp.DEFAULT_PROPS);
    }
    //@@viewOff:private

    //@@viewOn:render
    switch (session.state) {
      case "authenticated":
        return (
          <Core.LampView
            {...props}
            header={props.header ?? lsi.header}
            help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
            onCopyComponent={handleOnCopyComponent}
            on
          />
        );
      default:
        return (
          <Core.PackageView
            {...props}
            header={props.header ?? lsi.header}
            help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
            info={<Lsi import={importLsi} path={[Lamp.uu5Tag, "hiddenInfo"]} />}
            onCopyComponent={handleOnCopyComponent}
          />
        );
    }
    //@@viewOff:render
  },
});

let BrickLamp = withMargin(Lamp);
BrickLamp = withEditModal(BrickLamp, null, { editMode: { customEdit: false }});
BrickLamp = withErrorBoundary(BrickLamp);

//@@viewOn:exports
export { BrickLamp as Lamp };
export default BrickLamp;
//@@viewOff:exports
