//@@viewOn:imports
import { PropTypes, Lsi, createVisualComponent, useSession, useLsi } from "uu5g05";
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
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    card: PropTypes.oneOf(["none", "content", "full"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    card: "full",
    width: undefined,
    height: undefined,
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "moderate",
    aspectRatio: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [LampCore.uu5Tag]);
    const session = useSession();

    function handleOnCopyComponent() {
      return createCopyTag(
        Config.TAG + "Lamp",
        props,
        ["on", "bulbStyle", "bulbSize", "header"],
        LampCore.defaultProps
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    switch (session.state) {
      case "authenticated":
        return (
          <Core.LampView
            {...props}
            header={props.header ?? lsi.header}
            help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
            onCopyComponent={handleOnCopyComponent}
          />
        );
      default:
        return (
          <Core.PackageView
            {...props}
            header={props.header ?? lsi.header}
            help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
            info={<Lsi import={importLsi} path={[LampCore.uu5Tag, "hiddenInfo"]} />}
            onCopyComponent={handleOnCopyComponent}
          />
        );
    }
    //@@viewOff:render
  },
});

let Lamp = withMargin(LampCore);
Lamp = withEditModal(Lamp);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
