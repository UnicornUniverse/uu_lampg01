//@@viewOn:imports
import { createComponent, useSession, useLsi, Lsi } from "uu5g05";
import PackageView from "./package-view";
import Config from "./config/config";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

function withAuthentication(Component) {
  return createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + `withAuthentication(${Component.uu5Tag})`,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: { ...Component.propTypes },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      ...Component.defaultProps,
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const lsi = useLsi(importLsi, [Component.uu5Tag]);
      const session = useSession();

      // function handleCopyComponent() {
      //   return createCopyTag(
      //     Config.TAG + "Lamp",
      //     props,
      //     ["baseUri", "bulbStyle", "bulbSize", "header", "code"],
      //     LampCore.defaultProps
      //   );
      // }
      //@@viewOff:private

      //@@viewOn:render
      switch (session.state) {
        case "authenticated":
          return <Component {...props} />;
        default:
          return (
            <PackageView
              {...props}
              header={props.header ?? lsi.header}
              help={<Lsi import={importLsi} path={[Component.uu5Tag, "help"]} />}
              info={<Lsi import={importLsi} path={[Config.TAG + "withAuthentication", "notAuthenticated"]} />}
            />
          );
      }
      //@@viewOff:render
    },
  });
}

//@@viewOn:exports
export { withAuthentication };
export default withAuthentication;
//@@viewOff:exports
