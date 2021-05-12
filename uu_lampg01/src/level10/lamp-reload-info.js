//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLayoutEffect, useLanguage } from "uu5g04-hooks";
import { UuDateTime } from "uu_i18ng01";
import Lsi from "./lamp-reload-info-lsi";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampReloadInfo",
  nestingLevel: "inline",
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
    const [, setCounter] = useState(0);

    useLayoutEffect(() => {
      const intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 500);

      return () => clearInterval(intervalId);
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const seconds = getRemainingSeconds(props.lampDataObject.data.nextUpdateAt);

    let child;

    switch (props.lampDataObject.state) {
      case "pending":
        child = <UU5.Bricks.Lsi lsi={Lsi.synchronizing} />;
        break;
      case "ready":
        child = <CountInfo seconds={seconds} />;
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

function CountInfo({ seconds }) {
  const [language] = useLanguage();

  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  const secondsFormatted = rtf.format(seconds, "second");
  return <UU5.Bricks.Lsi lsi={Lsi.nextUpdateAt} params={[secondsFormatted]} />;
}
//@@viewOff:helpers

export default LampReloadInfo;
