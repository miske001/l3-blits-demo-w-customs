import Blits from '@lightningjs/blits'

export const FocusBorder = Blits.Component('FocusBorder', {
  template: `
    <Element y="-1" w="$width" h="$height" rounded="5" border="{w: $bWidth, color: '#bada55'}" />
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
