//@@viewOn:imports
import * as UU5 from "uu5g04";
import { createComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import "uu5g04-bricks";
import Config from "./config/config";
import Lsi from "./edit-modal-lazy-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "EditModalLazy",
  //@@viewOff:statics
};

const EditModalLazy = createComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    props: UU5.PropTypes.object,
    onClose: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    props: undefined,
    onClose: undefined,
  },
  //@@viewOff:defaultProps

  render({ props, onClose }, ref) {
    //@@viewOn:private
    const modalRef = useRef();
    //@@viewOff:private

    //@@viewOn:interface
    useImperativeHandle(ref, () => ({
      getPropsToSave: modalRef.current.getPropsToSave,
    }));
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.BricksEditable.Modal
        header={<UU5.Bricks.Lsi lsi={{ en: "Edit Level04" }} />}
        shown
        onClose={onClose}
        componentName={"UuLamp.Level04"}
        componentProps={props}
        componentPropsForm={[
          {
            name: <UU5.Bricks.Lsi lsi={Lsi.properties} />,
            setup: [
              {
                name: "on",
                type: "switchSelector",
                label: Lsi.state,
                getProps: () => {
                  return {
                    items: [
                      { content: <UU5.Bricks.Lsi lsi={Lsi.on} />, value: true },
                      { content: <UU5.Bricks.Lsi lsi={Lsi.off} />, value: false },
                    ],
                  };
                },
              },
              {
                name: "bulbStyle",
                type: "switchSelector",
                label: Lsi.bulbStyle,
                getProps: () => {
                  return {
                    items: [
                      { content: "filled", value: "filled" },
                      { content: "outline", value: "outline" },
                    ],
                  };
                },
              },
              {
                name: "bulbSize",
                type: "switchSelector",
                label: Lsi.bulbSize,
                getProps: () => {
                  return {
                    items: [
                      { content: "s", value: "s" },
                      { content: "m", value: "m" },
                      { content: "l", value: "l" },
                      { content: "xl", value: "xl" },
                    ],
                  };
                },
              },
            ],
            info: <UU5.Bricks.Lsi lsi={{ en: "Info pokus" }} params={[]} />,
          },
          {
            name: <UU5.Bricks.Lsi lsi={Lsi.visual} />,
            setup: [
              {
                name: "cardView",
                type: "switchSelector",
                label: Lsi.cardView,
                getProps: () => {
                  return {
                    items: [
                      { content: "none", value: "none" },
                      { content: "full", value: "full" },
                      { content: "content", value: "content" },
                    ],
                  };
                },
              },
              {
                name: "colorSchema",
                type: "colorSchema",
                label: Lsi.colorSchema,
              },
              {
                name: "bgStyle",
                type: "bgStyle",
                label: Lsi.bgStyle,
              },
              {
                name: "elevation",
                type: "elevation",
                label: Lsi.elevation,
              },
              {
                name: "borderRadius",
                type: "borderRadius",
                label: Lsi.borderRadius,
              },
            ],
            info: <UU5.Bricks.Lsi lsi={Lsi.info} />,
          },
        ]}
        ref_={modalRef}
      />
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export default EditModalLazy;
//viewOff:exports
