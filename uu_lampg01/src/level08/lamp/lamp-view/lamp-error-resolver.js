//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";

import Core from "../../../core/core";
import Config from "./config/config";
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

  // TODO - UU5.Bricks.Unauthorized - Does not support inline nesting level properly
  // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60d1c0b35f94de002989fb28
  if (errorCode === "uu-dockit-main/document/load/userHasNotRightsToLoadDocument") {
    return (
      <UU5.Bricks.Unauthorized nestingLevel={currentNestingLevel}>
        <UU5.Bricks.Lsi lsi={Lsi[errorCode]} />
      </UU5.Bricks.Unauthorized>
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
