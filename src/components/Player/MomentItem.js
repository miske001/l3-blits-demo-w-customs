import Blits from '@lightningjs/blits'

export default Blits.Component('MomentItem', {
  template: `
    <Element w="$items.width" h="$items.height" :color="$$hasFocus ? '#FFF' : 'transparent'" rounded="$items.radius">
      <Element h="148" w="285" color="#000" x="10" :y="$items.height/2" mount="{x: 0, y: 0.5}" rounded="20" />
      <Text :color="$$hasFocus ? '#000' : '#FFF'" x="310" y="20" content="$items.label" size="28" />
      <Text
        :color="$$hasFocus ? '#000' : '#FFF'"
        x="310"
        y="65"
        content="$items.text"
        size="24"
        maxlines="2"
        maxwidth="220"
      />
      <Text :color="$$hasFocus ? '#000' : '#FFF'" x="310" y="130" content="$items.time || '24:00'" size="28" />
    </Element>
  `,
  props: {
    items: null,
  },
})
