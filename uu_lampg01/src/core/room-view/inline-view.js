//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Link } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
    onDetail: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      // TODO MFA Waiting for fix of LinkModal. Then portal configartion will be default value.
      // TODO MFA Waiting for fix of LinkModal re-render. Now it is not working with RoomProvider.
      //  https://uuapp.plus4u.net/uu-sls-maing01/d127521164ef4a689e37fe6968d1c7ab/issueDetail?id=607862914da80100293d9bbf
      <Link {...elementProps} onClick={props.onDetail} nestingLevel="inline">
        {props.header}
      </Link>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
