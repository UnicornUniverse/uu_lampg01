//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_pg01-bricks";
import Config from "./config/config";
import Lsi from "./lamp-lsi";
//@@viewOff:imports

export const Level02 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Level02",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:render
    return (
      <UuP.Bricks.ComponentWrapper
        header="uuLamp Level 02 - Identity Lamp"
        help={<UU5.Bricks.Lsi lsi={Lsi.help} />}
        cardView="full"
        copyTagFunc={createTag}
      >
        <div className="center">
          <UU5.Bricks.Authenticated authenticated>
            <UU5.Bricks.Text style="font-size:80px" colorSchema="amber">
              <UU5.Bricks.Icon icon="mdi-lightbulb-on" />
            </UU5.Bricks.Text>
          </UU5.Bricks.Authenticated>

          <UU5.Bricks.Authenticated notAuthenticated pending>
            <UU5.Bricks.Text style="font-size:80px" colorSchema="black">
              <UU5.Bricks.Icon icon="mdi-lightbulb" />
            </UU5.Bricks.Text>
          </UU5.Bricks.Authenticated>
        </div>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function createTag() {
  return "<UuLamp.Level02 />";
}
//@@viewOff:helpers

export default Level02;
