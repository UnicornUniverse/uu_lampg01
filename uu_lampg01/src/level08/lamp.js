//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { createCopyTag } from "../utils/utils";
import Core from "../core/core";
import Config from "./config/config";
import LampCore from "./lamp/lamp-core";
import EditModal from "./lamp/edit-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Lamp",
  nestingLevelList: ["box", "smallBox", "inline"],
  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  documentUri: undefined,
  on: false,
  bulbStyle: "filled",
  bulbSize: "xl",
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "amber",
  elevation: 1,
  borderRadius: "0",
};

export const Lamp = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    documentUri: UU5.PropTypes.string.isRequired,
    on: UU5.PropTypes.bool,
    header: UU5.PropTypes.node,
    bulbStyle: UU5.PropTypes.oneOf(["filled", "outline"]),
    bulbSize: UU5.PropTypes.oneOf(["s", "m", "l", "xl"]),
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

  _handleCopyTag() {
    return createCopyTag(
      STATICS.tagName,
      this.props,
      ["on", "documentUri", "bulbStyle", "bulbSize", "header"],
      DEFAULT_PROPS
    );
  },
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(this.props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(this.props);
    const { baseUri, documentId } = parseBaseUriAndId(this.props.documentUri);

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

        <LampCore
          key={this.props.documentUri}
          uuDocKitUri={baseUri}
          documentId={documentId}
          on={this.props.on}
          bulbStyle={this.props.bulbStyle}
          bulbSize={this.props.bulbSize}
          bgStyle={this.props.bgStyle}
          cardView={this.props.cardView}
          colorSchema={this.props.colorSchema}
          elevation={this.props.elevation}
          borderRadius={this.props.borderRadius}
          nestingLevel={currentNestingLevel}
          copyTagFunc={this._handleCopyTag}
        />
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

//@@viewOn:helpers
function parseBaseUriAndId(documentUri) {
  if (!documentUri) {
    return { baseUri: undefined, documentId: undefined };
  }

  const baseUri = documentUri.match("(http|https)://.*/").shift();
  const url = UU5.Common.Url.parse(documentUri);
  const documentId = url.parameters.documentId;
  return { baseUri, documentId };
}
//@@viewOff:helpers

export default Lamp;