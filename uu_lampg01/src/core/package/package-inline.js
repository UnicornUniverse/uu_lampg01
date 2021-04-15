//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

export const PackageInline = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "PackageInline",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    colorSchema: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UU5.Bricks.Text colorSchema={props.colorSchema} nestingLevel="inline" {...attrs}>
        <UU5.Bricks.Icon icon="mdi-gift" />
      </UU5.Bricks.Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:css
//@@viewOff:css

export default PackageInline;