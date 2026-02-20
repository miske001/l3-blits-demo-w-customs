import Blits from '@lightningjs/blits'

export default Blits.Component('Item', {
  template: `
    <Element
      w="$w"
      h="$h"
      :alpha="$hasFocus ? 1: 0.6"
      :effects="[{type: 'radius', props: {radius: $radius}}]"
      :color="$items?.color"
    >
      <!-- <Element :src="$img" w="$w" h="$h" :color="$items.color" /> -->
      <Text content="$items?.color" color="#121212" size="20" mount="0.5" x="$items?.width/2" y="$items?.height/2" />
    </Element>
  `,
  props: ['items'],
  state() {
    console.log('asdf items1234: ', this.items)
    return {
      radius: 6,
      img: 'assets/somnedzjpk.jpg',
      w: this.items?.width ?? 200,
      h: this.items?.height ?? 200,
    }
  },
})
