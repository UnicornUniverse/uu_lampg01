//@@viewOn:imports
import { Utils, PropTypes, createVisualComponent, useMemo } from "uu5g05";
import { Text, Link } from "uu5g05-elements";
import Config from "../../config/config";
//@@viewOff:imports

const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    value: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        content: PropTypes.node,
      })
    ),
    onChange: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    value: PropTypes.string,
    items: PropTypes.shape({
      value: PropTypes.string,
      content: PropTypes.node,
    }),
    onChange: PropTypes.func,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const valueIndex = useMemo(() => {
      return props.items.findIndex((item) => item.value === props.value);
    }, [props.items, props.value]);

    function handleClick() {
      const newIndex = valueIndex + 1 < props.items.length ? valueIndex + 1 : 0;
      props.onChange({ data: props.items[newIndex] });
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Text nestingLevel={"inline"} {...elementProps}>
        <Link onClick={handleClick}>{props.items[valueIndex].children}</Link>
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineView };
export default InlineView;
//@@viewOff:exports
