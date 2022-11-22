//@@viewOn:imports
import {
  PropTypes,
  TimeZoneProvider,
  createVisualComponent,
  Lsi,
  useLsi,
  useState,
  usePreviousValue,
  useEffect,
} from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import SunProvider from "./lamp/sun-provider";
import EditModal from "./lamp/edit-modal";
import LampView from "./lamp/lamp-view";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampCore = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampCore",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    timeZone: PropTypes.string,
    header: PropTypes.node,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    card: PropTypes.oneOf(["none", "content", "full"]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    significance: PropTypes.oneOf(["subdued", "common", "highlighted"]),
    colorScheme: PropTypes.colorScheme,
    borderRadius: PropTypes.borderRadius,
    level: PropTypes.number,
    aspectRatio: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    timeZone: "Europe/Prague",
    bulbStyle: "filled",
    bulbSize: "xl",
    card: "full",
    significance: "common",
    colorScheme: "yellow",
    borderRadius: "moderate",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [LampCore.uu5Tag]);
    const [timeZone, setTimeZone] = useState(props.timeZone);
    const prevTimeZone = usePreviousValue(props.timeZone);

    useEffect(() => {
      if (!prevTimeZone) {
        return;
      }

      if (prevTimeZone !== props.timeZone) {
        setTimeZone(props.timeZone);
      }
    }, [prevTimeZone, props.timeZone]);

    function handleCopyComponent() {
      return createCopyTag(
        Config.TAG + "Lamp",
        props,
        ["timeZone", "bulbStyle", "bulbSize", "header"],
        LampCore.defaultProps
      );
    }

    function handleTimeZoneChange(data) {
      setTimeZone(data.timeZone);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <TimeZoneProvider timeZone={timeZone} onChange={handleTimeZoneChange}>
        <SunProvider>
          {(sun) => {
            return (
              <LampView
                {...props}
                header={props.header || lsi.header}
                help={<Lsi import={importLsi} path={[LampCore.uu5Tag, "help"]} />}
                onCopyComponent={handleCopyComponent}
                on={!sun.isShining}
              />
            );
          }}
        </SunProvider>
      </TimeZoneProvider>
    );
    //@@viewOff:render
  },
});

let Lamp = Core.withAuthentication(LampCore);
Lamp = withMargin(Lamp);
Lamp = withEditModal(Lamp, EditModal);
Lamp = withErrorBoundary(Lamp);

//@@viewOn:exports
export { Lamp };
export default Lamp;
//@@viewOff:exports
