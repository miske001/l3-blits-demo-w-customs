import Blits from '@lightningjs/blits'

export default Blits.Component("SearchButton", {
  components: {},
  template: `
    <Element w="78" h="78">
      <Circle size="78" x="471" y="49" :color="$hasFocus ? {left:'#ED51F0', right:'#9A33FF'} : '#2B2B2BFF'">
        <Circle w="34" h="34" size="19" src="/assets/magnify.png" mount="0.5" x="39" y="39" />
      </Circle>
    </Element>
  `,

  state() {
    return {
      focused: false,
    };
  },

  hooks: {
    focus() {
      this.hasFocus = true;
    },
    unfocus() {
      this.hasFocus = false;
    },
  },
});
