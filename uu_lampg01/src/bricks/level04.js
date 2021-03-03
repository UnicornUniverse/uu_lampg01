//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import Config from "./config/config";
import Level04Body from "./level04-body";
import { EditModal } from "../ecc/ecc";
import createCopyTag from "../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level04",
  editMode: {
    displayType: "block",
    startMode: "button",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  on: false,
  iconStyle: "filled",
  size: "xl",
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "amber",
  elevation: 1,
  borderRadius: 0,
};

export const Level04 = createVisualComponent({
  ...STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    on: UU5.PropTypes.bool,
    iconStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    size: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  //@@viewOn:overriding
  onBeforeForceEndEditation_() {
    return this._editRef ? this._editRef.getPropsToSave() : undefined;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _editRef: UU5.Common.Reference.create(),

  _handleCopyTag() {
    return createCopyTag(STATICS.displayName, this.props, ["on", "iconStyle", "size"], DEFAULT_PROPS);
  },
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    const attrs = UU5.Common.VisualComponent.getAttrs(this.props);

    return (
      <>
        {this.isInlineEdited() && (
          <EditModal
            props={this.props}
            onClose={this.endEditation}
            ref={this._editRef}
            fallback={this.getEditingLoading()}
          />
        )}
        <Level04Body {...this.props} {...attrs} copyTagFunc={this._handleCopyTag} />
      </>
    );
  },
  //@@viewOff:render
});

export default Level04;