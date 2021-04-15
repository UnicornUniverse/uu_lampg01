//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import Config from "./config/config";
import RoomBody from "./room-body";
import EditModal from "./edit-modal/edit-modal";
import createCopyTag from "../../../utils/createCopyTag";
import Lsi from "./room-lsi";
//@@viewOff:imports

// TODO MFA: Waiting for fix of placeholder in uuEcc g03
const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Room",
  nestingLevel: ["box", "smallBox", "inline"],
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
    const header = this.props.header || <UU5.Bricks.Lsi lsi={Lsi.header} />;

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
        <RoomBody
          {...this.props}
          {...attrs}
          header={header}
          help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
          nestingLevel={currentNestingLevel}
          copyTagFunc={this._handleCopyTag}
        >
          {this.props.content ?? this.props.children}
        </RoomBody>
      </>
    );
  },
  //@@viewOff:render
});

export default Room;
