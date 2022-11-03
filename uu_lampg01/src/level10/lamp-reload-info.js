//@@viewOn:imports
import { PropTypes, createVisualComponent, useState, useLayoutEffect, useLanguage, Utils, useLsi, Lsi } from "uu5g05";
import { UuDateTime } from "uu_i18ng01";
import Config from "./config/config";
import Core from "../core/core";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const LampReloadInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "LampReloadInfo",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [LampReloadInfo.uu5Tag]);
    const [, forceRender] = useState(0);

    useLayoutEffect(() => {
      const intervalId = setInterval(() => {
        forceRender((prevCounter) => prevCounter + 1);
      }, 500);

      return () => clearInterval(intervalId);
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    let child;

    switch (props.lampDataObject.state) {
      case "pending":
        child = <SyncInfo lsi={lsi} />;
        break;
      case "ready": {
        let seconds = getRemainingSeconds(props.lampDataObject.data.nextUpdateAt);
        child = <ReloadInfo seconds={seconds} />;
        break;
      }
      case "error":
        child = <Core.Error errorData={props.lampDataObject.errorData} />;
        break;
      default:
        child = null;
    }

    return <span {...elementProps}>{child}</span>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getRemainingSeconds(nextUpdateAt) {
  if (!nextUpdateAt) {
    return null;
  }

  const now = UuDateTime.utc();

  if (now.toIsoString() > nextUpdateAt.toIsoString()) {
    return null;
  }

  const diffMs = new Date(nextUpdateAt.toIsoString()) - new Date(now.toIsoString());
  return Math.ceil(diffMs / 1000);
}

const infoCss = () => Config.Css.css`padding-top:25px; padding-bottom:25px`;

function SyncInfo({ lsi }) {
  return <div className={infoCss()}>{lsi.synchronizing}</div>;
}

function ReloadInfo({ seconds }) {
  const [language] = useLanguage();

  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  const secondsFormatted = rtf.format(seconds, "second");

  return (
    <div className={infoCss()}>
      <Lsi import={importLsi} path={[LampReloadInfo.uu5Tag, "nextUpdateAt"]} params={[secondsFormatted]} />
    </div>
  );
}
//@@viewOff:helpers

//@@viewOn:exports
export { LampReloadInfo };
export default LampReloadInfo;
//@@viewOff:exports
