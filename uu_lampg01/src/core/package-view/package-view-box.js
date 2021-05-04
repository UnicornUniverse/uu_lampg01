//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

export const PackageViewBox = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "PackageViewBox",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.node,
    help: UU5.PropTypes.node,
    info: UU5.PropTypes.node,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: "",
    help: "",
    info: null,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "amber",
    elevation: 1,
    borderRadius: "0",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <UuP.Bricks.ComponentWrapper
        header={props.header}
        help={props.help}
        cardView={props.cardView}
        copyTagFunc={props.copyTagFunc}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
      >
        <UU5.Bricks.Card
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          className="center padding-s"
          elevation={0}
          elevationHover={0}
        >
          {props.info}
          <UU5.Bricks.Text className={Config.Css.css`font-size: 65px`} colorSchema={props.colorSchema}>
            <UU5.Bricks.Icon icon="mdi-gift" />
          </UU5.Bricks.Text>
        </UU5.Bricks.Card>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:css
//@@viewOff:css

export default PackageViewBox;
