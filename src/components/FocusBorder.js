import Blits from '@lightningjs/blits'

export const FocusBorder = Blits.Component('FocusBorder', {
  template: `
    <Element
      y="-1"
      w="$width"
      h="$height"
      :effects="[{type: 'radius', props: {radius: 5}}, {type: 'border', props:{width:
    $bWidth, color: '#BADA55'}}]"
    />
  `,
  props: [
    'width',
    'height',
    {
      key: 'bWidth',
      default: 8,
    },
  ],
})
