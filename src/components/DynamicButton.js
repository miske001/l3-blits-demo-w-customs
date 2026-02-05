import Blits from '@lightningjs/blits'

export default Blits.Component('DynamicButton', {
  props: ['title'],
  template: `
    <Layout
      y="6"
      :color="$hasFocus ? {left: '#ed51f0', right: '#9A33FF'} : 'rgba(0,0,0,0)'"
      padding="25 20 25 20"
      :effects="[{type: 'radius', props: {radius: 45}}]"
    >
      <Text content="$title" @loaded="$btnLoaded" />
    </Layout>`,
  state() {
    return {
      totalW: 0,
    }
  },
  methods: {
    btnLoaded(dims) {
      console.log('aasdf layout loaded', dims)
      this.totalW += dims.w + 20 + 40
      console.log('asdf totalW load:', this.totalW)
    },
  },
})
