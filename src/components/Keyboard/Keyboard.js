import Blits from '@lightningjs/blits'
import SearchKeyboardKey from './SearchKeyboardKey'
import ActionKey from './SearchActionKeys/ActionKey'
import ActionKeyContainer from './SearchActionKeys/ActionKeyContainer'

export default Blits.Component('Keyboard', {
  components: {
    ActionKeyContainer,
    ActionKey,
    SearchKeyboardKey,
  },
  template: `
    <Element>
      <!-- <Element w="74" h="84" mount="{x:0.5, y:0.5}" :x.transition="$focusX" :y.transition="$focusY" color="0xffffff33" /> -->
      <ActionKeyContainer ref="actionContainer"> </ActionKeyContainer>
      <SearchKeyboardKey
        :for="(item, index) in $keys"
        :x="$keyX"
        :ref="'key-'+$index"
        key="$item"
        value="$item"
        :y="$keyY"
        :layout="$layout"
      />
    </Element>
  `,
  props: ['margin', 'perRow'],
  computed: {
    focusX() {
      return (this.focusIndex % this.perRow) * this.margin + 8
    },
    focusY() {
      return ~~(this.focusIndex / this.perRow) * this.margin + 70
    },
    keyX() {
      return (this.index % this.perRow) * (this.margin - 10)
    },
    keyY() {
      return Math.floor(this.index / this.perRow) * this.margin + 90
    },
  },
  state() {
    return {
      focusIndex: 0,
      layout: 'lower',
      keys: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
      ],
    }
  },
  methods: {
    focusAt(index) {
      this.focusIndex = index
    },
  },
  watch: {
    hasFocus(isFocused) {
      if (isFocused) this.$trigger('focusIndex')
    },
    focusIndex(value) {
      const focusItem = this.$select(`key-${value}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
      }
    },
  },
  input: {
    left() {
      if (this.focusIndex % this.perRow === 0) {
        // this.focusIndex = Math.min(this.focusIndex + this.perRow - 1, this.keys.length - 1)
        return
      } else {
        this.focusIndex = Math.max(this.focusIndex - 1, 0)
      }
    },
    right() {
      if (this.focusIndex % this.perRow === this.perRow - 1) {
        // this.focusIndex -= this.perRow - 1
        return
      } else {
        this.focusIndex = Math.min(this.focusIndex + 1, this.keys.length - 1)
      }
    },
    up() {
      if (this.focusIndex < this.perRow) {
        this.focusIndex < this.perRow / 2
          ? this.$select('actionContainer').focusAt(0)
          : this.$select('actionContainer').focusAt(1)
        // this.$select('actionContainer').focusAt(1)
        return
      } else {
        this.focusIndex = Math.max(this.focusIndex - this.perRow, 0)
      }
    },
    down() {
      if (this.focusIndex >= this.keys.length - this.perRow) {
        this.$emit('focusDown')
        return
      } else {
        this.focusIndex = Math.min(this.focusIndex + this.perRow, this.keys.length - 1)
      }
    },
    enter(e) {
      const key = this.keys[this.focusIndex]
      this.$emit('onKeyInput', {
        key: this.layout === 'upper' ? key.toUpperCase() : key,
      })
    },
    any(e) {
      if (e.key === 'Shift') {
        this.layout = this.layout === 'lower' ? 'upper' : 'lower'
      }
    },
    back(e) {
      this.parent.$focus(e)
    },
  },
  hooks: {
    init() {
      this.$listen('focusAt', (index) => {
        this.focusIndex = index
      })
    },
  },
})
