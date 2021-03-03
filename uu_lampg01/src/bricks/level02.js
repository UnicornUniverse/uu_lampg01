//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent, useSession } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Lamp from "../core/lamp";
import Config from "../config/config";
import Lsi from "./level-lsi";
import createCopyTag from "../utils/createCopyTag";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Level02",
  //@@viewOff:statics
};

export const Level02 = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sessionState } = useSession();

    function _handleCopyTag() {
      return createCopyTag(STATICS.displayName, props);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <UuP.Bricks.ComponentWrapper
        header="uuLamp Level 02 - Identity Lamp"
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        cardView="full"
        copyTagFunc={_handleCopyTag}
        {...attrs}
      >
        <Lamp on={sessionState == "authenticated"} />
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

export default Level02;
