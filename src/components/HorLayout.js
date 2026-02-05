// @ts-nocheck
import Blits from '@lightningjs/blits'
import DynamicButton from './DynamicButton'

const CHAR_WIDTH = 20
const BTN_PADDING = 20
const BTN_GAP = 20

export default Blits.Component('HorLayout', {
  components: {
    DynamicButton,
  },
  template: `
    <Element
      y="200"
      h="100"
      :w="$totalWidth - 7"
      color="#2B2B2B"
      :effects="[{type: 'radius', props: {radius: 50}}]"
      @loaded="$btnLoaded"
    >
      <!-- <Text>Horizontal Layout Container</Text> -->
      <Layout ref="container" gap="20">
        <DynamicButton
          :for="(item, index) in $buttons"
          :ref="'btn-'+$index"
          :title="$item.title"
          :w="$item.w"
          @loaded="$btnLoaded"
        />
      </Layout>
    </Element>
  `,
  state() {
    return {
      focused: 0,
      btnArr: [
        {
          title: 'Home',
        },
        {
          title: 'Live',
        },
        {
          title: 'TV Shows',
        },
        {
          title: 'Movies',
        },
        {
          title: 'My contenddddddddddddddts',
        },
      ],
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
      this.focused = Math.min(this.focused + 1, this.btnArr.length - 1)
    },
    left() {
      this.focused = Math.max(this.focused - 1, 0)
    },
  },
  computed: {
    buttons() {
      return this.btnArr.map((item) => {
        const w = item.title.length * CHAR_WIDTH + BTN_PADDING
        console.log('asdf w: ', w)
        return { ...item, w }
      })
    },
    totalWidth() {
      const btnsWidth = this.buttons.reduce((s, b) => s + b.w, 0)
      const gaps = (this.buttons.length - 1) * BTN_GAP
      console.log('asdf total w: ', btnsWidth + gaps)
      return btnsWidth + gaps
    },
  },
  methods: {
    btnLoaded() {
      console.log('aasdf layout loadededddddddddddd')
    },
  },
})
