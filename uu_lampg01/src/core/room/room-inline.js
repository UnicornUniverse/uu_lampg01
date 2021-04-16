//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "RoomInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const RoomInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    // We want children to render with smallBox nesting level
    const children = UU5.Utils.Content.getChildren(
      props.children,
      { nestingLevel: "box" },
      { nestingLevel: "smallBoxCollection" }
    );

    return (
      // TODO MFA Waiting for fix of LinkModal. Then portal configartion will be default value.
      // TODO MFA Waiting for fix of LinkModal re-render. Now it is not working with RoomProvider.
      //  https://uuapp.plus4u.net/uu-sls-maing01/d127521164ef4a689e37fe6968d1c7ab/issueDetail?id=607862914da80100293d9bbf
      <UU5.Bricks.LinkModal component={children} modalProps={{ location: "portal" }} {...attrs}>
        {props.header}
      </UU5.Bricks.LinkModal>
    );
    //@@viewOff:render
  },
});

export default RoomInline;
