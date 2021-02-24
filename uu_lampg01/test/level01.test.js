import UU5 from "uu5g04";
import UuLamp from "uu_lampg01";

const { shallow } = UU5.Test.Tools;

describe(`UuLamp.Level01`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuLamp.Level01 />);
    expect(wrapper).toMatchSnapshot();
  });
});
