import Blits from '@lightningjs/blits'

export default Blits.Component('ActionKey', {
  template: `
    <Element w="$width" h="84" :color="$hasFocus ? '#FFF' : '#1b1c22'" :effects="[{type: 'radius', props: {radius: 10}}]">
      <Element :src="$imgSrc" w="50" h="50" :color="$hasFocus ? '#0D0E12' : '#FFF'" mount="0.5" :x="$width/2" :y="84/2" />
    </Element>
  `,
  props: ['value', 'width'],
  computed: {
    imgSrc() {
      return `assets/${this.value}.png`
    },
  },
})
