//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import Config from "./config/config";
import Header from "./header";
//@@viewOff:imports

const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.node,
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

    // We want children to render with smallBox nesting level
    // const children = UU5.Utils.Content.getChildren(
    //   props.children,
    //   { nestingLevel: "box" },
    //   { nestingLevel: "smallBoxCollection" }
    // );

    return (
      // TODO MFA Waiting for fix of LinkModal. Then portal configartion will be default value.
      // TODO MFA Waiting for fix of LinkModal re-render. Now it is not working with RoomProvider.
      //  https://uuapp.plus4u.net/uu-sls-maing01/d127521164ef4a689e37fe6968d1c7ab/issueDetail?id=607862914da80100293d9bbf
      // <UU5.Bricks.LinkModal component={children} modalProps={{ location: "portal" }} {...attrs}>
      //   {props.header}
      // </UU5.Bricks.LinkModal>
      <Text nestingLevel="inline" {...elementProps}>
        <Header />
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
