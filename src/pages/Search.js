import Blits from '@lightningjs/blits'
import Keyboard from '../components/Keyboard/Keyboard'
import SearchTerm from '../components/Keyboard/SearchTerm'
import VerticalContainer from '../components/VerticalContainer'
import KeyboardLabelBtn from '../components/Keyboard/KeyboardLabelBtn'

export default Blits.Component('Search', {
  components: {
    Keyboard,
    SearchTerm,
    VerticalContainer,
    KeyboardLabelBtn,
  },
  template: `
    <Element>
      <Text content="Search" />
      <Keyboard x="100" :y.transition="$keyboardY" ref="keyboard" margin="100" perRow="6" />
      <KeyboardLabelBtn x="100" :y.transition="$keyboardLabelY" w="200" h="60" />
      <Text x="750" y="150" size="46" :content="$searchTerm || $placeholder" :alpha="$searchTerm ? 1 : 0.5" />
      <Element :y.transition="$columnY" height="430" width="600" overflow="false">
        <VerticalContainer
          x="100"
          items="$searchQueries"
          autoScroll="true"
          gap="10"
          ref="column"
          above="keyboard"
          screenH="430"
          :isColFocused="$isColumnFocused"
        />
      </Element>
      <!-- <SearchTerm x="100" y="850" value="mgt" /> -->
    </Element>
  `,
  state() {
    return {
      searchTerm: '',
      placeholder: 'Search',
      keyboardY: 150,
      columnY: 850,
      keyboardLabelY: -200,
      isColumnFocused: false,
      searchQueries: [
        /* {
          rowH: 75,
          type: SearchTerm,
          value: 'abc',
          width: 200,
          height: 75,
        }, */
        {
          rowH: 75,
          type: SearchTerm,
          isLeaf: true,
          items: {
            value: 'cbdd',
            width: 200,
            height: 75,
            type: SearchTerm,
          },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: {
            value: 'adff',
            width: 200,
            height: 75,
            type: SearchTerm,
          },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: {
            value: 'adff',
            width: 200,
            height: 75,
            type: SearchTerm,
          },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: {
            value: 'adff',
            width: 200,
            height: 75,
            type: SearchTerm,
          },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: {
            value: 'adff',
            width: 200,
            height: 75,
            type: SearchTerm,
          },
        },
      ],
    }
  },
  hooks: {
    init() {
      this.$listen('onKeyInput', (key) => {
        const character = key.key
        if (character === 'backspace') {
          this.searchTerm = this.searchTerm.slice(0, -1)
        } else {
          this.searchTerm += character
        }
      })
      this.$listen('focusDown', (index = 0) => {
        // if (this.$select('column').focused > 0) return
        this.keyboardY = -700
        this.columnY = 250
        this.keyboardLabelY = 200
        this.isColumnFocused = true
        this.$select('column').$focus()
        this.$select('column').focused = index
      })
      this.$listen('focusUpFromVert', (above) => {
        this.keyboardY = 150
        this.columnY = 850
        this.keyboardLabelY = -200
        this.isColumnFocused = false

        this.$select(above).$focus()
      })
    },
    focus() {
      if (this.$select('keyboard').activeZone !== 'keys') return
      this.$select('keyboard').$focus()
    },
  },
})
