// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('VerticalContainer', {
  template: `
    <Element :y.transition="$y">
      <Component
        :for="(item, index) in $items"
        is="$item.type"
        :y="$rowY($index)"
        :ref="'list-item-'+$index"
        :key="$index"
        :items="$item.items ? $item.items : $item"
        title="$item.title"
        autoScroll="true"
        screenW="$screenW"
      />
    </Element>
  `,
  props: [
    'autoScroll',
    'autoscrollOffset',
    'itemOffset',
    'itemHeight',
    'itemWidth',
    'items',
    'looping',
    'type',
    {
      key: 'screenH',
      default: 1000,
    },
    {
      key: 'screenW',
      default: 1820,
    },
    {
      key: 'gap',
      default: 100,
    },
    {
      key: 'above',
      default: null,
    },
    {
      key: 'below',
      default: null,
    },
  ],
  state() {
    return {
      focused: 0,
      y: 0,
    }
  },
  hooks: {
    ready() {
      console.log('asdf props vert: ', this.items)
    },
  },
  watch: {
    hasFocus(isFocused) {
      if (isFocused) this.$trigger('focused')
    },
    focused(value) {
      const focusItem = this.$select(`list-item-${value}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
        this.scroll()
      }
    },
  },
  methods: {
    changeFocus(direction) {
      const nextFocus = this.looping
        ? (this.focused + direction + this.items.length) % this.items.length
        : Math.max(0, Math.min(this.focused + direction, this.items.length - 1))
      this.focused = nextFocus
    },
    rowOffset(index) {
      return index === 0
        ? 0
        : this.items
            .slice(0, index)
            .reduce((acc, curr) => acc + this.gap + (curr?.rowH ? curr?.rowH : curr.height), 0)
    },
    rowY(index) {
      return this.rowOffset(index)
    },
    scroll() {
      if (this.autoScroll) {
        // this.y = -this.rowOffset(this.focused)

        const h = this.items[0].rowH ? this.items[0]?.rowH : this.items[0].height

        this.y =
          0 -
          (this.items.length - this.screenH / (h + this.gap) < 0
            ? 0
            : Math.min(this.focused, this.items.length - this.screenH / (h + this.gap)) *
              (h + this.gap))
      }
    },
  },
  input: {
    up() {
      if (this.above && this.focused === 0) {
        this.$emit('focusUpFromVert', this.above)
      } else {
        this.changeFocus(-1)
      }
    },
    down() {
      if (this.below && this.focused === this.items.length - 1) {
        this.$emit('focusDownFromVert', this.below)
      } else {
        this.changeFocus(1)
      }
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
