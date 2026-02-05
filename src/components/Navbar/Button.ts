import Blits from "@lightningjs/blits"

export default Blits.Component('Button', {
  props: ['label', 'icon'],

  state() {
    return {
      textWidth: 0,
      height: 72,
    }
  },

  computed: {
    width() {
      const paddingX = 32 * 2
      const iconWidth = 24
      const gap = 8
      return this.textWidth + iconWidth + gap + paddingX
    }
  },

  template: `
    <Element
      :w="$width"
      :h="$height"
      :effects="[ { type: 'radius', props: { radius: 35 } } ]"
      :color="$hasFocus ? { left:'#ED51F0', right:'#9A33FF' } : '#2B2B2BFF'"
    >
      <Layout
        direction="horizontal"
        placement="{ x: 'end', y: 'middle' }"
        align-items="center"
        gap="8"
        padding="{ left: 32, right: 32 }"
      >
        <Element :src="$icon" w="24" h="24" />
        <Text :content="$label" size="26" color="#fff" @loaded="$onTextLoaded" />
      </Layout>
    </Element>
  `,

  hooks: {
    focus() {
      this.hasFocus = true
    },
    unfocus() {
      this.hasFocus = false
    }
  },

  methods: {
    onTextLoaded({ w }) {
      this.textWidth = w
      this.$size({ w: this.width, h: this.height })
    },
  }
})
