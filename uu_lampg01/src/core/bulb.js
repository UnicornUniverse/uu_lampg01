//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent } from "uu5g05";
import { Text, Icon } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  text: (bulbSize) =>
    Config.Css.css({
      fontSize: `${getFontSize(bulbSize)}px`,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
function getFontSize(bulbSize) {
  switch (bulbSize) {
    case "s":
      return 35;
    case "m":
      return 50;
    case "l":
      return 65;
    default:
      return 80;
  }
}
//@@viewOff:helpers

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Bulb",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const Bulb = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    on: PropTypes.bool,
    bulbStyle: PropTypes.oneOf(["filled", "outline"]),
    bulbSize: PropTypes.oneOf(["s", "m", "l", "xl"]),
    colorScheme: PropTypes.colorScheme,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    on: false,
    bulbStyle: "filled",
    bulbSize: "xl",
    colorScheme: "yellow",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const className = currentNestingLevel !== "inline" ? Css.text(props.bulbSize) : null;
    const [elementProps] = Utils.VisualComponent.splitProps(props, className);

    const stateCode = props.on ? "-on" : "";
    const styleCode = props.bulbStyle == "outline" ? "-outline" : "";
    const icon = `mdi-lightbulb${stateCode}${styleCode}`;

    const colorScheme = props.on ? props.colorScheme : "grey";

    return (
      <Text colorScheme={colorScheme} {...elementProps}>
        <Icon icon={icon} />
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Bulb };
export default Bulb;
//@@viewOff:exports
