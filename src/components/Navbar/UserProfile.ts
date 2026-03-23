import Blits from '@lightningjs/blits'

export default Blits.Component("UserProfile", {
  components: {},
  template: `
    <Element
      w="128"
      h="78"
      x="96"
      y="48"
      rounded="50"
      :color="$$hasFocus ? {left:'#ED51F0', right:'#9A33FF'} : '#2B2B2BFF'"
    >
      <Element w="64" h="64" size="64" src="/assets/profile.png" mount="0.5" x="39" y="39" />
      <Element w="32" h="32" x="96" y="42" mount="0.5">
        <Element w="32" h="32" src="/assets/arrowUP.png" :alpha.transition="$isProfileOpened ? 1 : 0" />
        <Element w="32" h="32" src="/assets/arrowDOWN.png" :alpha.transition="$isProfileOpened ? 0 : 1" />
      </Element>
    </Element>
  `,
  props: ["isProfileOpened"],

  input: {
    enter() {
      this.$emit("toggleProfile");
    },
  },
});
