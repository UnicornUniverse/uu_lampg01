//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Lamp from "../core/lamp";
import Config from "../config/config";
import Lsi from "./level-lsi";
import createCopyTag from "../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level01",
  //@@viewOff:statics
};

export const Level01 = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        header="uuLamp Level 01 - Dynamic Rendering"
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        cardView="full"
        copyTagFunc={_handleCopyTag}
        {...attrs}
      >
        <Lamp on />
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default Level01;
