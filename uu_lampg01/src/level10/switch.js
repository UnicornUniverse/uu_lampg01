//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { createCopyTag } from "../utils/utils";
import Config from "./config/config";
import Core from "../core/core";
import SwitchCore from "./switch/switch-core";
import EditModal from "./switch/edit-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Switch",
  nestingLevelList: ["box", "smallBox", "inline"],
  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  baseUri: undefined,
  code: undefined,
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "amber",
  elevation: 1,
  borderRadius: "0",
};

export const Switch = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
    code: UU5.PropTypes.string.isRequired,
    header: UU5.PropTypes.node,
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
    return this._editRef ? this._editRef.current.getPropsToSave() : undefined;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _editRef: UU5.Common.Reference.create(),

  // We need to copy baseUri even they are same as default value.
  _handleCopyTag() {
    return createCopyTag(STATICS.tagName, this.props, ["on", "header", "baseUri", "code"], {
      ...DEFAULT_PROPS,
      baseUri: undefined,
    });
  },

  _handleCopyLamp() {
    const component = `<UuLamp.Level10.Lamp baseUri="${this.props.baseUri}" code="${this.props.code}" />`;
    UU5.Utils.Clipboard.write(component);
  },
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    const attrs = UU5.Common.VisualComponent.getAttrs(this.props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(this.props, STATICS);

    return (
      <Core.ErrorBoundary nestingLevel={currentNestingLevel} {...attrs}>
        {this.isInlineEdited() && (
          <EditModal
            props={this.props}
            onClose={this.endEditation}
            ref={this._editRef}
            fallback={this.getEditingLoading()}
          />
        )}
        <SwitchCore
          code={this.props.code}
          baseUri={this.props.baseUri}
          bgStyle={this.props.bgStyle}
          cardView={this.props.cardView}
          colorSchema={this.props.colorSchema}
          elevation={this.props.elevation}
          borderRadius={this.props.borderRadius}
          nestingLevel={currentNestingLevel}
          copyTagFunc={this._handleCopyTag}
          onCopyLamp={this._handleCopyLamp}
        />
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

export default Switch;
