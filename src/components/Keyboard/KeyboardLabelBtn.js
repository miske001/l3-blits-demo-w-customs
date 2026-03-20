import Blits from '@lightningjs/blits'

export default Blits.Component('KeyboardLabelBtn', {
  template: `
    <Element>
      <Element src="assets/keyboard-icon.png" w="45" h="45" y="-5"></Element>
      <Text content="keyboard" x="55"></Text>
    </Element>
  `,
  hooks: {
    hover() {
      this.$emit('focusUpFromVert', 'keyboard')
    },
  },
})
