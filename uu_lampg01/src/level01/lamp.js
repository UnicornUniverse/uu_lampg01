//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import LampCore from "./lamp/lamp-core";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Lamp",
  nestingLevelList: ["box", "smallBox", "inline"],
  editMode: {
    displayType: "block",
    startMode: "button",
    customEdit: false,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  header: undefined,
};

export const Lamp = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  //@@viewOn:private
  _handleCopyTag() {
    return createCopyTag(STATICS.tagName, this.props, ["header"], DEFAULT_PROPS);
  },
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    const attrs = UU5.Common.VisualComponent.getAttrs(this.props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(this.props, STATICS);

    return <LampCore {...this.props} {...attrs} nestingLevel={currentNestingLevel} copyTagFunc={this._handleCopyTag} />;
  },
  //@@viewOff:render
});

export default Lamp;
