//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import RoomCore from "./room/room-core";
import EditModal from "./room/edit-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Room",
  nestingLevelList: ["box", "inline"],
  editMode: {
    displayType: "block",
    startMode: "button",
    customEdit: true,
    lazy: true,
    enablePlaceholder: true,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  on: false,
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "amber",
  elevation: 1,
  borderRadius: "0",
};

export const Room = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    on: UU5.PropTypes.bool,
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
    return createCopyTag(STATICS.displayName, this.props, ["on", "header"], DEFAULT_PROPS);
  },
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    const attrs = UU5.Common.VisualComponent.getAttrs(this.props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(this.props, STATICS);

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
        <RoomCore {...this.props} {...attrs} nestingLevel={currentNestingLevel} copyTagFunc={this._handleCopyTag}>
          {this.props.content || this.props.children}
        </RoomCore>
      </>
    );
  },
  //@@viewOff:render
});

export default Room;
