import Blits from '@lightningjs/blits'

export default Blits.Component("ExitButton", {
  template: `
    <Element
      w="302"
      h="68"
      :color="$hasFocus ? {left:'#ED51F0', right:'#9A33FF'} : '#3D3D3D'"
      :effects="[ { type: 'radius', props: { radius: 35 } } ]"
    >
      <Layout direction="horizontal" padding="{ left: 16, top: 16 }" gap="12" align-items="end">
        <Element src="/assets/exit.png" w="33" h="33" color="#E6454A" />
        <Text content="Exit" size="21" color="#E6454A" />
      </Layout>
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

