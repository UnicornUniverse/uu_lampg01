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
  on: false,
  bulbStyle: "filled",
  bulbSize: "xl",
  card: "full",
  width: undefined,
  height: undefined,
  significance: "common",
  colorScheme: "yellow",
  borderRadius: "none",
};

let Lamp = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    card: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.borderRadius,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const session = useSession();

    function handleOnCopyComponent() {
      return createCopyTag(STATICS.uu5Tag, props, ["on", "bulbStyle", "bulbSize", "header"], DEFAULT_PROPS);
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
            onCopyComponent={handleOnCopyComponent}
            on={props.on}
            bulbStyle={props.bulbStyle}
            bulbSize={props.bulbSize}
            card={props.card}
            colorScheme={props.colorScheme}
            borderRadius={props.borderRadius}
            nestingLevel={currentNestingLevel}
            {...elementProps}
          />
        );
      default:
        return (
          <Core.PackageView
            header={props.header ?? <Lsi import={importLsi} path={[Lamp.uu5Tag, "header"]} />}
            help={<Lsi import={importLsi} path={[Lamp.uu5Tag, "help"]} />}
            info={<Lsi import={importLsi} path={[Lamp.uu5Tag, "hiddenInfo"]} />}
            onCopyComponent={handleOnCopyComponent}
            bulbStyle={props.bulbStyle}
            bulbSize={props.bulbSize}
            card={props.card}
            colorScheme={props.colorScheme}
            borderRadius={props.borderRadius}
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
