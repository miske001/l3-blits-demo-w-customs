import Blits from "@lightningjs/blits";

//#FFFFFF1F
export default Blits.Component("VerticalLine", {
  props: ["width", "height"],

  template: `
    <Element :w="$width" :h="$height" color="#FFFFFF33" />
  `,
});
