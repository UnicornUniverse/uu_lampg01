//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Pending } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) =>
    Config.Css.css({
      height: typeof height === "number" ? `${height}px` : height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataObjectPending",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const DataObjectPending = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    height: "100%",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { height, ...otherProps } = props;
    const className = Css.placeholder(height);
    const [elementProps, pendingProps] = Utils.VisualComponent.splitProps(otherProps, className);

    switch (currentNestingLevel) {
      case "box":
        return (
          <div {...elementProps}>
            <Pending {...pendingProps} size="xl" className={Config.Css.css`display: block`} />
          </div>
        );
      case "inline":
      default:
        return <Pending {...pendingProps} nestingLevel="inline" />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DataObjectPending };
export default DataObjectPending;
//@@viewOff:exports
