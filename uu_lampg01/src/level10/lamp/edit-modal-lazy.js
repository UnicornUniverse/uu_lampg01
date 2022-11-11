//@@viewOn:imports
import { Utils, createVisualComponent, useLsi, useEffect } from "uu5g05";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
const { EditModal } = Utils.Uu5Loader.get("uu5g05-editing");
const { FormText, FormSwitchSelect } = Utils.Uu5Loader.get("uu5g05-forms");
//@@viewOff:imports

//TODO MFA - Add documentation link to info header

const EditModalLazy = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModalLazy",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [EditModalLazy.uu5Tag]);
    useEffect(() => props.onReady(), [props]);

    const tabList = [
      {
        label: lsi.properties,
        layout: {
          xs: "baseUri, bulbStyle, bulbSize, header, code",
        },
      },
      {
        template: "visual",
        layout: {
          xs: `
            nestingLevel nestingLevel,
            card card,
            significance significance,
            borderRadius borderRadius,
            aspectRatio aspectRatio,
            width height,
            colorScheme colorScheme
          `,
        },
        columns: "1fr 1fr",
      },
      {
        label: lsi.advancedConfiguration,
        layout: {
          xs: `level`,
        },
      },
    ];

    const propInputMap = {
      baseUri: {
        component: FormText,
        props: {
          label: lsi.baseUri,
        },
      },
      code: {
        component: FormText,
        props: {
          label: lsi.code,
          pattern: "^\\w{3,32}$",
          validationMap: {
            pattern: {
              message: lsi.codePatternMessage,
              feedback: "error",
            },
          },
        },
      },
      bulbStyle: {
        component: FormSwitchSelect,
        props: {
          label: lsi.bulbStyle,
          itemList: [
            { value: "filled", children: "filled" },
            { value: "outline", children: "outline" },
          ],
        },
      },
      bulbSize: {
        component: FormSwitchSelect,
        props: {
          label: lsi.bulbSize,
          itemList: [
            { value: "s", children: "s" },
            { value: "m", children: "m" },
            { value: "l", children: "l" },
            { value: "xl", children: "xl" },
          ],
        },
      },
      header: {
        component: FormText,
        props: {
          label: lsi.header,
        },
      },
      nestingLevel: {
        props: {
          valueList: ["area", "box", "inline"],
        },
      },
      significance: {
        props: {
          valueList: ["common", "highlighted"],
        },
      },
      aspectRatio: {
        props: {
          valueList: ["1x1", "2x1", "2x3", "3x1", "3x2", "3x4", "4x3", "4x5", "5x4", "16x9", "16x10"],
        },
      },
      level: {
        component: FormSwitchSelect,
        props: ({ componentProps }) => {
          return {
            label: lsi.level,
            itemList: [
              { children: "auto", value: undefined },
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
            disabled: componentProps.card === "full",
          };
        },
      },
    };

    function handleSave(data) {
      const aspectRatio = data.props.aspectRatio?.replace(":", "x");
      const newValues = { ...data.props, aspectRatio };
      props.onSave({ ...data, props: newValues });
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <EditModal
        uu5Tag={props.componentType.uu5Tag}
        header={lsi.header}
        props={props.componentProps}
        tabList={tabList}
        propInputMap={propInputMap}
        onSave={handleSave}
        onClose={props.onClose}
        open
      />
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export { EditModalLazy };
export default EditModalLazy;
//viewOff:exports
