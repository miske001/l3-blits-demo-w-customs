import Blits from '@lightningjs/blits'
import ActionKey from './ActionKey'

export default Blits.Component('ActionKeyContainer', {
  components: {
    ActionKey,
  },
  template: `
    <Element w="$width" h="84">
      <ActionKey
        :for="(item, index) in $actionKeys"
        :ref="'action-' + $index"
        :key="$index"
        :value="$item.value"
        :width="$item.width"
        :x="$item.x"
        y="-9"
        :index="$index"
        :isFocused="$activeZone === 'actions' && $focused === $index"
      />
    </Element>
  `,
  props: ['width', 'activeZone', 'focused'],
  state() {
    return {
      actionKeys: [
        { value: 'spacebar', width: 253, x: 0 },
        { value: 'backspace', width: 253, x: 270 },
      ],
    }
  },
  watch: {
    hasFocus(isFocused) {
      if (isFocused) this.$trigger('focused')
    },
    focused(value) {
      const focusItem = this.$select(`action-${value}`)
      if (focusItem && focusItem.$focus) focusItem.$focus()
    },
  },
  input: {
    up() {
      return
    },
    down() {
      if (this.focused === 0) {
        this.$parent.focusAt(1, 'keys')
      } else {
        this.$parent.focusAt(4, 'keys')
      }
      this.$parent.parent.$focus()
    },
    right() {
      this.$parent.focusAt(1, 'actions')
    },
    left() {
      this.$parent.focusAt(0, 'actions')
    },
  },
})
