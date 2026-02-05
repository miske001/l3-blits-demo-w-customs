import Blits from '@lightningjs/blits'
import Button from './Button'
import { menu } from '../../constants/menu'

export default Blits.Component('NavbarRow', {
  components: {
    Button
  },
  template: `
    <Element :w="$width" h="80" x="565" y="49" color="#2B2B2BFF" :effects="[ { type: 'radius', props: { radius: 50 } } ]">
      <Layout
        direction="horizontal"
        gap="8"
        placement="{ y:'middle'}"
        @updated="$onLayoutUpdated"
        padding="{ left: 8, right: 8 }"
      >
        <Button
          :for="(item, index) in $items"
          :ref="'btn-' + $index"
          :label="$item.label"
          :icon="$item.icon"
          key="$item.path"
        />
      </Layout>
    </Element>
  `,

  state() {
    return {
        items: menu,
        focused: 0,
        width: 0,
    }
  },
  

  hooks: {
    focus() {
      this.$select('btn-0')?.$focus()
    },
  },
  watch: {
    hasFocus(isFocused) {
      if (isFocused) this.$trigger('focused')
    },
    focused(value) {
      const focusItem = this.$select(`btn-${value}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
      }
    },
  },
  input: {
    right() {
      this.focused = Math.min(this.focused + 1, this.items.length - 1)
    },
    left() {
      if (this.focused === 0) {
        console.log('asdf parent: ', this.parent)
        this.parent.focused = 1 //set the parent focused index in order to properly shift to search button
        this.parent.$focus()
      }
      this.focused = Math.max(this.focused - 1, 0)
    },

  },

  methods: {
    onLayoutUpdated({ w }) {
      this.width = w
      this.$size({ w, h: 80 })
    }
  }
})
