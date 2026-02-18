import Blits from '@lightningjs/blits'

export default Blits.Component('CancelButton', {
  template: `
    <Element
      w="540"
      h="86"
      :color="$hasFocus ? '#ED51F0' : 'transparent'"
      :effects="[
        { type: 'radius', props: { radius: 50 } },
        { type: 'border', props: { width: 4, color: '#ED51F0' } }
      ]"
    >
      <Text content="Cancel" color="white" size="32" placement="{x:'center', y:'middle'}" />
    </Element>
  `,

  input: {
    enter() {
      this.$emit('cancelPressed')
    },
    up() {
      this.$emit('focusKeyboard')
    }
  }
})
