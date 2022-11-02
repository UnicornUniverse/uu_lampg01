//@@viewOn:imports
import { PropTypes, createComponent } from "uu5g05";
import Config from "./config/config";
import Error from "./error";
import DataObjectPending from "./data-object-state-resolver/data-object-pending";
//@@viewOff:imports

const DataObjectStateResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataObjectStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataObject: PropTypes.object.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    customErrorLsi: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
    height: "100%",
    customErrorLsi: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { dataObject, customErrorLsi, children, ...viewProps } = props;

    switch (dataObject.state) {
      case "ready":
      case "error":
      case "pending":
        return typeof children === "function" ? children() : children;
      case "readyNoData":
      case "pendingNoData":
        return <DataObjectPending {...viewProps} />;
      case "errorNoData":
      default:
        return <Error {...viewProps} errorData={dataObject.errorData} customErrorLsi={customErrorLsi} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DataObjectStateResolver };
export default DataObjectStateResolver;
//@@viewOff:exports
