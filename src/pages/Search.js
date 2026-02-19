import Blits from '@lightningjs/blits'
import Keyboard from '../components/Keyboard/Keyboard'
import SearchTerm from '../components/Keyboard/SearchTerm'
import VerticalContainer from '../components/VerticalContainer'
import Item from '../components/Item'

export default Blits.Component('Search', {
  components: {
    Keyboard,
    SearchTerm,
    VerticalContainer,
    Item,
  },
  template: `
    <Element>
      <Text content="Search" />
      <Keyboard x="100" :y.transition="$keyboardY" ref="keyboard" margin="100" perRow="6" />
      <Text x="100" :y.transition="$keyboardLabelY" content="keyboard" :alpha="$keyboardY < 0" />
      <Text x="750" y="150" size="46" :content="$searchTerm || $placeholder" :alpha="$searchTerm ? 1 : 0.5" />
      <Element :y.transition="$columnY" height="230" width="600" overflow="false">
        <VerticalContainer
          x="100"
          items="$searchQueries"
          autoScroll="true"
          gap="10"
          ref="column"
          above="keyboard"
          screenH="230"
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
      keyboardLabelY: 800,
      searchQueries: [
        {
          rowH: 75,
          type: SearchTerm,
          items: { value: 'abc', width: 200, height: 75, type: SearchTerm },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: { value: 'cbdd', width: 200, height: 75, type: SearchTerm },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: { value: 'adff', width: 200, height: 75, type: SearchTerm },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: { value: 'adff', width: 200, height: 75, type: SearchTerm },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: { value: 'adff', width: 200, height: 75, type: SearchTerm },
        },
        {
          rowH: 75,
          type: SearchTerm,
          items: { value: 'adff', width: 200, height: 75, type: SearchTerm },
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
      this.$listen('focusDown', () => {
        // this.keyboardY = -700
        // this.columnY = 250
        // this.keyboardLabelY = 200
        this.$select('column').$focus()
      })
      this.$listen('focusUpFromVert', (above) => {
        // this.keyboardY = 150
        // this.columnY = 850

        this.$select(above).$focus()
      })
    },
    focus() {
      this.$select('keyboard').$focus()
    },
  },
  input: {
    down() {
      console.log('asdf upad dole')
    },
  },
})
