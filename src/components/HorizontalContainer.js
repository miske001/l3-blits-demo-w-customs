// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('HorizontalContainer', {
  template: `
    <Element>
      <Text content="$title" color="#FFF" h="50" :show="$title" />
      <Element :x.transition="$x" ref="container">
        <Component
          :for="(item, index) in $items"
          is="$item.type"
          :x="$rowX($index)"
          :y="$title ? 50 : 0"
          :ref="'list-item-'+$index"
          :key="$index"
          :items="$item.items ? $item.items : $item"
          autoScroll="true"
          screenH="$screenH"
          index="$index"
          indexInH="$index"
          :isFocused="$isLeafLevel && ($index === $focused && $isRowFocused)"
          :isColFocused="$index === $focused"
        />
      </Element>
    </Element>
  `,
  props: {
    autoScroll: null,
    items: null,
    looping: null,
    title: null,
    indexInV: 0,
    isRowFocused: null,
    screenH: 1000,
    screenW: 1820,
    gap: 50,
    allowBubbling: false,
  },
  state() {
    return {
      focused: 0,
      x: 0,
    }
  },
  computed: {
    isLeafLevel() {
      return this.items?.[0]?.isLeaf
    },
  },
  hooks: {
    hover() {
      if (!this.$parent.$componentId.includes('VerticalContainer')) return
      if (this.$parent.isScrolling) return

      this.$parent.focused = this.indexInV
    },
  },
  watch: {
    $hasFocus(isFocused) {
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
        : this.items.slice(0, index).reduce((acc, curr) => {
            //check if this item has more childs inside - first value would be used horizontal - vertical, other in vertical - horiz
            const w = curr?.items ? curr?.items[0].width : curr.width
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
          (this.items.length - this.screenW / (this.items[0].width + this.gap) < 0
            ? 0
            : Math.min(
                this.focused,
                this.items.length - this.screenW / (this.items[0].width + this.gap)
              ) *
              (this.items[0].width + this.gap))
      }
    },
  },
  input: {
    left(e) {
      console.log('asdf upad left')
      this.changeFocus(-1)
      this.allowBubbling && this.$parent.$input(e)
    },
    right(e) {
      console.log('asdf upad right')

      this.changeFocus(1)
      this.allowBubbling && this.$parent.$input(e)
    },
    enter(e) {
      this.allowBubbling && this.$parent.$input(e)
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
