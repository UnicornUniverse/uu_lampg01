//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useSession, useLsi } from "uu5g05";
import { PlaceholderBox } from "uu5g05-elements";
import Plus4U5Elements, { Unauthenticated, Unauthorized } from "uu_plus4u5g02-elements";
import { getErrorStatus, HttpStatus, getMessageByCode, getMessageByStatus, PropertyError } from "../errors/errors";
import Config from "./config/config";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) =>
    Config.Css.css({
      height,
      display: "flex",
      justifyContent: "center",
    }),
};
//@@viewOff:css

const Error = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Error",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    moreInfo: PropTypes.bool,
    inline: PropTypes.bool,
    errorData: PropTypes.object,
    customErrorLsi: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    moreInfo: false,
    errorData: {},
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    const { state } = useSession();
    //@@viewOff:private

    //@@viewOn:render
    const className =
      props.height && props.nestingLevel !== "inline"
        ? Utils.Css.joinClassName(props.className, Css.placeholder(props.height))
        : props.className;

    const { elementProps } = Utils.VisualComponent.splitProps(props, className);
    const errorStatus = getErrorStatus(props.errorData);
    let message = getMessageByCode(props.errorData, { ...errorsLsi, ...props.customErrorLsi });

    if (errorStatus === HttpStatus.Unauthorized || errorStatus === HttpStatus.Forbidden) {
      if (state === "authenticated") {
        return (
          <Unauthorized {...elementProps} nestingLevel={props.nestingLevel} lsi={{ unauthorizedDetail: message }} />
        );
      } else {
        return <Unauthenticated {...elementProps} nestingLevel={props.nestingLevel} />;
      }
    }

    if (props.errorData.error instanceof PropertyError) {
      return <PlaceholderBox {...elementProps} code="error" header={message} nestingLevel={props.nestingLevel} />;
    }

    // We don't want to override default messages for Unauthorized, Unauthenticated and PropertyError.
    // But we want to get some default message in case there is no value defined for other cases.
    if (!message) {
      message = getMessageByStatus(errorStatus, { ...errorsLsi, ...props.customErrorLsi });
    }

    return (
      <Plus4U5Elements.Error
        {...elementProps}
        error={props.errorData}
        title={message}
        nestingLevel={props.nestingLevel}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Error };
export default Error;
//@@viewOff:exports
