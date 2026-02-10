import Blits from '@lightningjs/blits'
import { FocusBorder } from './FocusBorder'

export default Blits.Component('PortalItem', {
  components: {
    FocusBorder,
  },
  template: `
    <Element
      w="370"
      h="320"
      :scale.transition="$hasFocus ? 1.1 : 1"
      :color="$backgroundColor"
      :effects="[{type: 'radius', props: {radius: 5}}]"
    >
      <Text x="30" y="30" :content="$number" size="84" :color="$fontColor" />
      <Text
        x="30"
        y="140"
        :content="$title"
        size="42"
        font="raleway"
        :color="$fontColor"
        letterspacing="2"
        maxwidth="350"
        maxlines="1"
      />
      <Text x="30" y="200" :content="$description" maxwidth="300" size="28" :color="$fontColor" lineheight="32" />
      <FocusBorder width="372" height="322" :alpha="$hasFocus ? 1 : 0" />
    </Element>
  `,
  props: ['title', 'description', 'index', 'id'],
  state() {
    return {
      backgroundColor: '#44037a',
      fontColor: '#e8d7f9',
      number: this.index < 9 ? `0${this.index + 1}` : this.index + 1,
    }
  },
  hooks: {
    focus() {
      this.backgroundColor = '#fafafa'
      this.fontColor = '#000'
    },
    unfocus() {
      if (!this.$router.navigating) {
        this.backgroundColor = '#44037a'
        this.fontColor = '#e8d7f9'
      }
    },
  },
  input: {
    enter() {
      this.$router.to(`/${this.id}`)
    },
    back() {
      // intercept
    },
  },
})
