import Blits from '@lightningjs/blits'

export default Blits.Component('SearchKeyboardKey', {
  template: `
    <Element w="74" h="84" :color="$isFocused ? '#FFF' : '#1b1c22'" rounded="10" :scale.transition="$isFocused ? 1.1 : 1">
      <Text
        :content="$inputValue"
        size="40"
        :color="$isFocused ? '#0D0E12' : '#FFF'"
        mount="0.5"
        :x="74/2"
        :y="84/2 + $yOffset"
      />
    </Element>
  `,
  props: ['value', 'layout', 'index', 'isFocused'],
  computed: {
    inputValue() {
      return this.layout === 'upper' ? this.value.toUpperCase() : this.value
    },
    yOffset() {
      return /^[0-9]$/.test(this.value) ? 3 : 0
    },
  },
  hooks: {
    hover() {
      this.$parent.focusAt(this.index, 'keys')
    },
  },
})
