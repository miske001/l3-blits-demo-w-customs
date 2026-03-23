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
    <Element ref="keyboard">
      <!-- <Element w="74" h="84" mount="{x:0.5, y:0.5}" :x.transition="$focusX" :y.transition="$focusY" color="0xffffff33" /> -->
      <ActionKeyContainer ref="actionContainer" :activeZone="$activeZone" :focused="$actionIndex"> </ActionKeyContainer>
      <SearchKeyboardKey
        :for="(item, index) in $keys"
        :x="$keyX"
        :ref="'key-'+$index"
        :key="$index"
        value="$item"
        :y="$keyY"
        :layout="$layout"
        index="$index"
        :isFocused="$activeZone === 'keys' && $index === $focusIndex"
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
      actionIndex: 0,
      layout: 'lower',
      activeZone: 'keys',
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
    focusAt(index, zone) {
      if (zone === 'keys') {
        this.activeZone = zone
        this.focusIndex = index
      } else {
        this.$select('actionContainer').$focus()
        this.actionIndex = index
        this.activeZone = zone
      }
    },
  },
  watch: {
    $hasFocus(isFocused) {
      if (isFocused) {
        this.activeZone = 'keys'
        this.$trigger('focusIndex')
      }
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
        this.activeZone = 'actions'

        const index = this.focusIndex < this.perRow / 2 ? 0 : 1
        this.actionIndex = index

        this.$select('actionContainer').$focus()

        return
      } else if (this.activeZone === 'keys') {
        this.focusIndex = Math.max(this.focusIndex - this.perRow, 0)
      } else {
        return
      }
    },
    down() {
      if (this.focusIndex >= this.keys.length - this.perRow) {
        this.$emit('focusDown')
        this.activeZone = 'terms'
        return
      } else if (this.activeZone === 'keys') {
        this.focusIndex = Math.min(this.focusIndex + this.perRow, this.keys.length - 1)
      } else return
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
      this.$parent.$focus(e)
    },
  },
  /* hooks: {
    init() {
      this.$listen('focusAt', ({ index, zone }) => {
        if (zone === 'actions') {
          const isAlreadyActive = this.activeZone === 'actions'

          this.actionIndex = index
          this.activeZone = zone

          if (!isAlreadyActive) {
            this.$select('actionContainer').$focus()
          }

          const item = this.$select(`actionContainer.action-${index}`)
          if (item && item.$focus) item.$focus()
        } else {
          this.focusIndex = index
          this.activeZone = zone
          this.$focus()
        }
      })
    },
  }, */
})
