// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('HorizontalContainer', {
  template: `
    <Element>
      <Text content="$title" color="#FFF" h="50" />
      <Element :x.transition="$x" ref="container">
        <Component
          :for="(item, index) in $items"
          is="$item.type"
          :x="$rowX($index)"
          :y="$title ? 50 : 0"
          :ref="'list-item-'+$index"
          :key="$index"
          :items="$item.items ? $item.items : $item"
          :alpha="$index === $focused ? 1 : 0.6"
          autoScroll="true"
        />
      </Element>
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
    'title',
    {
      key: 'gap',
      default: 50,
    },
  ],
  state() {
    return {
      focused: 0,
      x: 0,
    }
  },
  hooks: {
    ready() {
      console.log('asdf props: ', this.props)
    },
  },
  watch: {
    hasFocus(isFocused) {
      if (isFocused) this.$trigger('focused')
    },
    focused(value) {
      const focusItem = this.$select(`list-item-${value}`)
      console.log('asdf focusItem: ', this.items[0].width)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
        // if(this.items)
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
        : this.items.slice(0, index).reduce((acc, curr) => {
            //check if this item has more childs inside - first value would be used horizontal - vertical, other in vertical - horiz
            const w = curr?.items ? curr?.items[0].width : curr.width
            console.log('asdf items cur: ', curr)
            return acc + w + this.gap
          }, 0)
    },
    rowX(index) {
      return this.rowOffset(index)
    },
    scroll() {
      if (this.autoScroll) {
        // this.x = -this.rowOffset(this.focused)  //stara logika
        //1820 = 1920 - xOffset set on VerticalContainer
        this.x =
          0 -
          (this.items.length - 1820 / (this.items[0].width + this.gap) < 0
            ? 0
            : Math.min(this.focused, this.items.length - 1820 / (this.items[0].width + this.gap)) *
              (this.items[0].width + this.gap))
      }
    },
  },
  input: {
    left() {
      this.changeFocus(-1)
    },
    right() {
      this.changeFocus(1)
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
