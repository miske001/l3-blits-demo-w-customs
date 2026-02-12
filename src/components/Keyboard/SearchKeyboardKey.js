import Blits from '@lightningjs/blits'

export default Blits.Component('SearchKeyboardKey', {
  template: `
    <Element
      w="74"
      h="84"
      :color="$hasFocus ? '#FFF' : '#1b1c22'"
      :effects="[{type: 'radius', props: {radius: 10}}]"
      :scale.transition="$hasFocus ? 1.1 : 1"
    >
      <Text
        :content="$inputValue"
        size="40"
        :color="$hasFocus ? '#0D0E12' : '#FFF'"
        mount="0.5"
        :x="74/2"
        :y="84/2 + $yOffset"
      />
    </Element>
  `,
  props: ['value', 'layout'],
  computed: {
    inputValue() {
      return this.layout === 'upper' ? this.value.toUpperCase() : this.value
    },
    yOffset() {
      return /^[0-9]$/.test(this.value) ? 3 : 0
    },
  },
})
