import Blits from '@lightningjs/blits'
import ActionKey from './ActionKey'

export default Blits.Component('ActionKeyContainer', {
  components: {
    ActionKey,
  },
  template: `
    <Element w="$width" h="84">
      <ActionKey value="spacebar" width="272" y="-9" ref="action-0" />
      <ActionKey x="280" y="-9" value="backspace" width="245" ref="action-1" />
    </Element>
  `,
  props: ['width'],
  state() {
    return {
      focused: 0,
    }
  },
  methods: {
    focusAt(index = 0) {
      this.focused = index
      const focusItem = this.$select(`action-${index}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
      }
    },
  },
  //   watch: {
  //     hasFocus(isFocused) {
  //       if (isFocused) this.$trigger('focused')
  //     },
  //     focused(value) {
  //       const focusItem = this.$select(`action-${value}`)
  //       if (focusItem && focusItem.$focus) {
  //         focusItem.$focus()
  //       }
  //     },
  //   },
  input: {
    up() {
      return
    },
    down() {
      console.log('asdf this.parentparent: ', this.parent.parent)
      //   this.parent.parent.focusAt(4)
      if (this.focused === 0) {
        this.$emit('focusAt', 1)
      } else {
        this.$emit('focusAt', 4)
      }
      this.parent.parent.$focus()
    },
    right() {
      this.focused = 1
      this.focusAt(1)
    },
    left() {
      this.focused = 0
      this.focusAt(0)
    },
  },
})
