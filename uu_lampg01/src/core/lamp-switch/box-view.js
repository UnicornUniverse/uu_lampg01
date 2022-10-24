//@@viewOn:imports
import { PropTypes, createVisualComponent } from "uu5g05";
import { Icon, UuGds } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "../lamp-view/config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  switchIcon: (bulbSize) =>
    Config.Css.css({
      ...getSwitchTypography(bulbSize),
    }),
};
//@@viewOff:css

const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
    onClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbSize: "xl",
    colorScheme: "yellow",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return <SwitchSelect {...elementProps} value={props.on} onChange={props.onClick} itemList={getItemList(props)} />;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getSwitchTypography(bulbSize) {
  switch (bulbSize) {
    case "s":
    case "m":
      return UuGds.Typography.getValue(["interface", "title", "minor"]);
    case "l":
    case "xl":
    default:
      return UuGds.Typography.getValue(["interface", "title", "common"]);
  }
}

function getItemList(props) {
  return [
    {
      value: false,
      children: (
        <Icon
          className={Css.switchIcon(props.bulbSize)}
          colorScheme={props.colorScheme}
          icon="mdi-power-plug"
        />
      ),
    },
    {
      value: true,
      children: (
        <Icon
          className={Css.switchIcon(props.bulbSize)}
          colorScheme={props.colorScheme}
          icon="mdi-power-plug"
        />
      ),
    },
  ];
}
//@@viewOff:helpers

//@@viewOn:exports
export { BoxView };
export default BoxView;
//@@viewOff:exports
