//@@viewOn:imports
import { createComponent, useDataObject, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PersonProvider",
  //@@viewOff:statics
};

export const PersonProvider = createComponent({
  //@@viewOn:statics
  ...STATICS,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    peopleBaseUri: "https://uuappg01-eu-w-1.plus4u.net/uu-plus4upeople-maing01/56ac93ddb0034de8b8e4f4b829ff7d0f",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();

    const personDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    async function handleLoad() {
      const persons = await Calls.findPerson(props.peopleBaseUri, { uuIdentity: identity.uuIdentity });
      return persons.itemList[0];
    }
    //@@viewOff:private

    //@@viewOn:render
    return props.children(personDataObject);
    //@@viewOff:render
  },
});

export default PersonProvider;
