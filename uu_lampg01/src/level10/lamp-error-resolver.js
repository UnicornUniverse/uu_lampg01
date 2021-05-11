//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Core from "../core/core";
import Config from "./config/config";
import Lsi from "./lamp-error-resolver-lsi";
import PropertyError from "./lamp-error-resolver/property-error";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LampErrorResolver",
  //@@viewOff:statics
};

export const LampErrorResolver = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    dataObject: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    switch (props.dataObject.state) {
      case "errorNoData":
        return renderError(props.dataObject, props.height, props.nestingLevel, attrs);
      default:
        return props.children;
    }
    //@@viewOff:render
  },
});

//@viewOn:helpers
function renderError(dataObject, height, currentNestingLevel, attrs) {
  const errorCode = dataObject.errorData?.error?.code;

  switch (errorCode) {
    case Config.Error.NO_BASE_URI:
    case Config.Error.NO_CODE:
    case Config.Error.CODE_INVALID_FORMAT:
      return (
        <PropertyError
          message={<UU5.Bricks.Lsi lsi={Lsi[errorCode]} />}
          nestingLevel={currentNestingLevel}
          {...attrs}
        />
      );
    default:
      return (
        <Core.Error
          height={height}
          moreInfo
          errorData={dataObject.errorData}
          customErrorLsi={Lsi}
          nestingLevel={currentNestingLevel}
          {...attrs}
        />
      );
  }
}

export default LampErrorResolver;
