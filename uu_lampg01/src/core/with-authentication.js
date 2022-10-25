//@@viewOn:imports
import { Lsi, createComponent, useSession } from "uu5g05";
import PackageView from "./package-view";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

function withAuthentication(Component, uu5Tag, header, help) {
  return createComponent({
    //@@viewOn:statics
    uu5Tag: `withAuthentication(${uu5Tag})`,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const session = useSession();
      //@@viewOff:private

      //@@viewOn:render
      switch (session.state) {
        case "authenticated":
          return <Component {...props} />;
        default:
          return <PackageView info={<Lsi import={importLsi} path={[uu5Tag, "notAuthenticated"]} />} {...props} />;
      }
      //@@viewOff:render
    },
  });
}

//@@viewOn:exports
export { withAuthentication };
export default withAuthentication;
//@@viewOff:exports
