import Blits from '@lightningjs/blits'
import Navbar from '../components/Navbar/Navbar'
import GetStartedButton from '../components/GetStartedButton'


// #1a002b
export default Blits.Component('Home', {
  components: {
    Navbar,
    GetStartedButton
  },
  template: `
    <Element w="1920" h="1080" color="#0D0E12">
      <Navbar ref="navbar" />
      <GetStartedButton x="800" y="400" ref="button2" />
    </Element>
  `,
  state() {
    return {
      focused: 0,
    }
  },
  hooks: {
    focus() {
      this.$trigger('focused')
    },
  },

  watch: {
    focused(v: number) {
        if (v === 0) {
            this.$select('navbar')?.$focus()
        } else if (v === 1) {
            this.$select('button2')?.$focus()
        }
    },
  },
  input: {
    down() {
      this.focused = 1
    },
    up() {
      this.focused = 0
    }
  }
})
