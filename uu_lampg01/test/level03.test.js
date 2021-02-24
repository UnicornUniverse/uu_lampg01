import UU5 from "uu5g04";
import UuLamp from "uu_lampg01";

const { shallow } = UU5.Test.Tools;

describe(`UuLamp.Level03`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuLamp.Level03 />);
    expect(wrapper).toMatchSnapshot();
  });
});
