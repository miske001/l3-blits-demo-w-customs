import Blits from '@lightningjs/blits'

export default Blits.Component('ActionKey', {
  template: `
    <Element
      w="$width"
      h="84"
      :color="$isFocused ? '#FFF' : '#1b1c22'"
      rounded="10"
      :scale.transition="$isFocused ? 1.1 : 1"
    >
      <Element :src="$imgSrc" w="50" h="50" :color="$isFocused ? '#0D0E12' : '#FFF'" mount="0.5" :x="$width/2" :y="84/2" />
    </Element>
  `,
  props: {
    value: '',
    width: '',
    isFocused: false,
    index: 0,
  },
  computed: {
    imgSrc() {
      return `assets/${this.value}.png`
    },
  },
  hooks: {
    hover() {
      this.$parent.$focus()
      this.$parent.$parent.focusAt(this.index, 'actions')
    },
  },
  input: {
    enter() {
      this.$emit('onKeyInput', {
        key: this.index === 0 ? ' ' : 'backspace',
      })
    },
  },
})
