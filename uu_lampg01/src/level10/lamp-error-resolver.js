//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import { PropertyError } from "./lamp-provider-errors";
import "uu_plus4u5g01-bricks";

import Core from "../core/core";
import Config from "./config/config";
import PropertyErrorView from "./lamp-error-resolver/property-error-view";
import Lsi from "./lamp-error-resolver-lsi";
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
        return renderError(props.dataObject.errorData, props.height, props.nestingLevel, attrs);
      default:
        return props.children;
    }
    //@@viewOff:render
  },
});

//@viewOn:helpers
function renderError(errorData, height, currentNestingLevel, attrs) {
  const errorCode = errorData.error?.code;

  if (errorData.error instanceof PropertyError) {
    return (
      <PropertyErrorView
        message={<UU5.Bricks.Lsi lsi={Lsi[errorCode]} />}
        nestingLevel={currentNestingLevel}
        {...attrs}
      />
    );
  }

  return (
    <Core.Error
      height={height}
      moreInfo
      errorData={errorData}
      customErrorLsi={Lsi}
      nestingLevel={currentNestingLevel}
      {...attrs}
    />
  );
}

export default LampErrorResolver;
