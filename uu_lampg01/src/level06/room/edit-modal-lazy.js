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
          xs: "on, header",
        },
      },
      {
        template: "visual",
        layout: {
          xs: `
          nestingLevel nestingLevel,
          card card,
          borderRadius borderRadius
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
      on: {
        component: FormSwitchSelect,
        props: {
          label: lsi.state,
          itemList: [
            { value: true, children: lsi.on },
            { value: false, children: lsi.off },
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
          valueList: ["area", "inline"],
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