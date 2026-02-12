import Blits from '@lightningjs/blits'

export default Blits.Component('SearchTerm', {
  template: `
    <Element
      w="$items.width"
      h="$items.height"
      :color="$hasFocus ? '#FFF' : 'transparent'"
      :effects="[{type: 'radius', props: {radius: 10}}]"
      x="-10"
    >
      <Text
        :content="$items.value"
        size="40"
        :color="$hasFocus ? '#0D0E12' : '#FFF'"
        mount="{x: 0, y: 0.5}"
        x="10"
        :y="84/2"
      />
    </Element>
  `,
  props: ['items'],
})
