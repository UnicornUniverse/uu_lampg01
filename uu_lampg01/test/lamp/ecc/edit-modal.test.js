import UU5 from "uu5g04";
import UuLamp from "uu_lampg01";

const { shallow } = UU5.Test.Tools;

describe(`UuLamp.Lamp.Ecc.EditModal`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuLamp.Lamp.Ecc.EditModal />);
    expect(wrapper).toMatchSnapshot();
  });
});
