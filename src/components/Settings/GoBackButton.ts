import Blits from '@lightningjs/blits'


export default Blits.Component("Settings", {
  components: {},

  template: `
    <Element
      w="232"
      h="72"
      :effects="[ { type: 'radius', props: { radius: 35 } } ]"
      :color="$hasFocus ? { left:'#ED51F0', right:'#9A33FF' } : 'transparent'"
    >
      <Layout direction="horizontal" padding="{ left: 12, top: 12 }" gap="4" align-items="end">
        <Element src="/assets/arrowLeft.png" w="50" h="50" />
        <Text content="Go Back" x="110" font="poppinsBold" y="48"></Text>
      </Layout>
    </Element>
  `,
  state() {
    return {
      hasFocus: false,
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

  input: {
    enter() {
      this.$router.back();
    },
  },
});
