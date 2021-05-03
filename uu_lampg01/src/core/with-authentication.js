//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useSession } from "uu5g04-hooks";
import PackageView from "./package-view";
import Lsi from "./with-authentication-lsi";
//@@viewOff:imports

function withAuthentication(Component, displayName, header, help) {
  return createComponent({
    //@@viewOn:statics
    displayName,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:render
      const { sessionState } = useSession();

      if (sessionState === "authenticated") {
        return <Component {...props} />;
      } else {
        return <PackageView info={<UU5.Bricks.Lsi lsi={Lsi.notAuthenticated} />} {...props} />;
      }
      //@@viewOff:render
    },
  });
}

export default withAuthentication;
