// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('Grid', {
  template: `
    <Element :x.transition="$x">
      <Component
        :for="(item, index) in $items"
        is="$item.type"
        items="$item"
        :x="($index % ($columns || $baseColumns)) * $totalWidth"
        :y="Math.floor($index / ($columns || $baseColumns)) * $totalHeight"
        :ref="'grid-item-'+$index"
        :key="$index"
      />
    </Element>
  `,
  props: [
    'itemWidth',
    'itemHeight',
    'itemOffsetX',
    'itemOffsetY',
    'items',
    'columns',
    'looping',
    'refocusParent',
  ],
  state() {
    return {
      focused: 0,
      x: 0,
      baseColumns: 4,
    }
  },
  computed: {
    totalWidth() {
      return (this.itemWidth || 300) + (this.itemOffsetX || 0)
    },
    totalHeight() {
      return (this.itemHeight || 300) + (this.itemOffsetY || 0)
    },
  },
  watch: {
    hasFocus(isFocused) {
      if (isFocused) this.$trigger('focused')
    },
    focused(value) {
      const focusItem = this.$select(`grid-item-${value}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
      }
    },
  },
  input: {
    up(e) {
      const columns = this.columns || this.baseColumns
      const previousIndex = this.focused - columns

      if (previousIndex >= 0) {
        this.focused = previousIndex
      } else if (this.looping) {
        // first see if we can go to the last row on this column
        const lastRow = this.items.length - (this.items.length % columns)
        const lastRowColumn = lastRow + (this.focused % columns)
        this.focused = lastRowColumn < this.items.length ? lastRowColumn : lastRowColumn - columns
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    down(e) {
      const columns = this.columns || this.baseColumns
      const nextIndex = this.focused + columns

      if (nextIndex < this.items.length) {
        this.focused = nextIndex
      } else if (this.looping) {
        this.focused = nextIndex % columns
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    left(e) {
      const columns = this.columns || this.baseColumns

      const isNotFirstInRow = this.focused % columns > 0
      const isWithinBounds = this.focused + columns - 1 < this.items.length

      if (isNotFirstInRow) {
        this.focused -= 1
      } else if (this.looping) {
        this.focused = isWithinBounds ? this.focused + columns - 1 : this.items.length - 1
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    right(e) {
      const columns = this.columns || this.baseColumns

      const isNotLastInRow = this.focused % columns < columns - 1
      const isNotLastItem = this.focused < this.items.length - 1

      if (isNotLastInRow && isNotLastItem) {
        this.focused += 1
      } else if (this.looping) {
        const index = this.focused - columns + 1
        this.focused = isNotLastItem ? index : Math.floor(this.focused / columns) * columns
      } else if (this.refocusParent) {
        this.parent.$focus(e)
      }
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
