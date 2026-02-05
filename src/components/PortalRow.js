import Blits from '@lightningjs/blits'

import PortalItem from './PortalItem.js'

export default Blits.Component('PortalRow', {
  components: {
    PortalItem,
  },
  template: `
    <Element>
      <Element :alpha.transition="{value: $itemOffset < 240 ? 1 : 0, duration: 200}">
        <Text content="$title" x="60" />
        <Element y="50" x="60" h="1" w="1800" color="#e8d7f9" />
      </Element>
    
      <Element y="100" :x.transition="$rowOffset">
        <PortalItem
          :for="(item, index) in $items"
          :x.transition="{value: $itemOffset + $index * 430, delay: 50 * ($index%4), duration: 500}"
          title="$item.title"
          description="$item.description"
          id="$item.id"
          index="$index"
          :ref="'item'+$index"
          key="$item.id"
        />
      </Element>
    </Element>
  `,
  props: ['title', 'items'],
  state() {
    return {
      focused: 0,
      rowOffset: 60,
      itemOffset: 240,
    }
  },
  hooks: {
    ready() {
      this.itemOffset = 0
    },
    focus() {
      this.$trigger('focused')
    },
  },
  watch: {
    focused(value) {
      console.log('asdf val: ', value)
      const focusItem = this.$select(`item${value}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
        if (value < 1) {
          this.rowOffset = 60
        } else if (value > this.items.length - 2) {
          this.rowOffset = 60 - (this.items.length - 2) * 430 + 430
        } else {
          this.rowOffset = 60 - value * 430 + 430
        }
      }
    },
  },
  input: {
    left() {
      if (this.focused > 0) {
        this.focused--
      } else {
        this.focused = this.items.length - 1
      }
    },
    right() {
      if (this.focused < this.items.length - 1) {
        this.focused++
      } else {
        this.focused = 0
      }
    },
  },
})
