import Blits from '@lightningjs/blits'
import Keyboard from '../components/Keyboard/Keyboard'

export default Blits.Component('Search', {
  components: {
    Keyboard,
  },
  template: `
    <Element>
      <Text content="Search" />
      <Keyboard x="100" y="150" ref="keyboard" margin="100" perRow="6" />
    </Element>
  `,
  hooks: {
    focus() {
      this.$select('keyboard').$focus()
    },
  },
})
