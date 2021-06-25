//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLayoutEffect, useLanguage } from "uu5g04-hooks";
import { UuDateTime } from "uu_i18ng01";
import Core from "../core/core";
import Config from "./config/config";
import Lsi from "./lamp-reload-info-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampReloadInfo",
  nestingLevel: "box",
  //@@viewOff:statics
};

export const LampReloadInfo = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    lampDataObject: UU5.PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    lampDataObject: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, forceRender] = useState(0);

    useLayoutEffect(() => {
      const intervalId = setInterval(() => {
        forceRender((prevCounter) => prevCounter + 1);
      }, 500);

      return () => clearInterval(intervalId);
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    let child;

    switch (props.lampDataObject.state) {
      case "pending":
        child = <SyncInfo />;
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

    return <span {...attrs}>{child}</span>;
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

function SyncInfo() {
  return (
    <div className={infoCss()}>
      <UU5.Bricks.Lsi lsi={Lsi.synchronizing} />
    </div>
  );
}

function ReloadInfo({ seconds }) {
  const [language] = useLanguage();

  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  const secondsFormatted = rtf.format(seconds, "second");

  return (
    <div className={infoCss()}>
      <UU5.Bricks.Lsi lsi={Lsi.nextUpdateAt} params={[secondsFormatted]} />
    </div>
  );
}
//@@viewOff:helpers

export default LampReloadInfo;
