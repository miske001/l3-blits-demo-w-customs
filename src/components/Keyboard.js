import Blits from '@lightningjs/blits'

const Key = Blits.Component('Key', {
  template: `
    <Element
      w="314"
      h="83"
      :color="$hasFocus ? '#FFF' : 'transparent'"
      :effects="[{ type: 'radius', props: { radius: 50 } }]"
    >
      <Text
        :content="$displayValue"
        size="48"
        :color="$hasFocus ? '#0D0E12' : '#FFF'"
        placement="{x:'center', y:'middle'}"
      />
      <Element :src="$item.src" w="36" h="36" placement="{x:'center', y:'middle'}" />
    </Element>
  `,
  props: ['item', 'layout'],
  computed: {
    displayValue() {
      if (!this.item?.value) return ''
      return this.layout === 'upper' ? this.item.value.toUpperCase() : this.item.value
    },
  },
})

export default Blits.Component('Keyboard', {
  components: {
    Key,
  },
  template: `
    <Element>
      <Key :for="(item, index) in $keys" :x="$keyX" :y="$keyY" :ref="'key-'+$index" :item="$item" :layout="$layout" />
    </Element>
  `,

  props: ['margin', 'perRow'],

  computed: {
    focusX() {
      // console.log('asdf focusedIndex: ', this.focusIndex)
      return (this.focusIndex % this.perRow) * this.margin + 8
    },
    focusY() {
      return ~~(this.focusIndex / this.perRow) * this.margin + 70
    },
    keyX() {
      return (this.index % this.perRow) * (this.margin + 250)
    },
    keyY() {
      // console.log('asdf calc: ', Math.floor(this.index / this.perRow) * this.margin + 90)
      return Math.floor(this.index / this.perRow) * this.margin + 40
    },
  },

  state() {
    return {
      focusIndex: 4,
      layout: 'lower',
      keys: [
        { type: 'char', value: '1' },
        { type: 'char', value: '2' },
        { type: 'char', value: '3' },
        { type: 'char', value: '4' },
        { type: 'char', value: '5' },
        { type: 'char', value: '6' },
        { type: 'char', value: '7' },
        { type: 'char', value: '8' },
        { type: 'char', value: '9' },
        { type: 'char', value: ' ' },
        { type: 'char', value: '0' },
        { type: 'icon', src: './assets/delete.png' },
      ],
    }
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
        return
      }
      const next = Math.max(this.focusIndex - 1, 0)
      if (this.isSpace(next)) return
      this.focusIndex = next
    },

    right() {
      if (this.focusIndex % this.perRow === this.perRow - 1) {
        return
      }
      const next = Math.min(this.focusIndex + 1, this.keys.length - 1)
      if (this.isSpace(next)) return
      this.focusIndex = next
    },

    up() {
      if (this.focusIndex < this.perRow) {
        return
      }
      const next = Math.max(this.focusIndex - this.perRow, 0)
      if (this.isSpace(next)) return
      this.focusIndex = next
    },

    down() {
      let next = this.focusIndex + this.perRow

      if (next >= this.keys.length) {
        this.$emit('goToCancel')
        return
      }

      while (this.isSpace(next) && next < this.keys.length - 1) {
        next++
      }

      if (next < this.keys.length) {
        this.focusIndex = next
      }
    },

    enter() {
      const key = this.keys[this.focusIndex]

      if (key.type === 'char' && key.value === ' ') return

      if (key.type === 'icon') {
        this.$emit('onDelete')
        return
      }

      this.$emit('onKeyboardInput', {
        key: this.layout === 'upper' ? key.value.toUpperCase() : key.value,
      })
    },

    /* any(e) {
      if (e.key === 'Shift') {
        this.layout = this.layout === 'lower' ? 'upper' : 'lower'
      }
    }, */

    back(e) {
      this.parent.$focus(e)
    },
  },

  methods: {
    isSpace(index) {
      const item = this.keys[index]
      return item?.type === 'char' && item.value === ' '
    },
  },
})
