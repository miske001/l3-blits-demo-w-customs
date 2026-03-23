import Blits from '@lightningjs/blits'

export default Blits.Component('PlayerChBtn', {
  components: {},
  template: `
    <Element w="$items.width" h="$items.height" rounded="50" :color="$$hasFocus ? '#FFF' : '#2B2B2B'">
      <Text :color="$$hasFocus ? '#2B2B2B' : '#FFF'" :content="4" y="25" x="20" />
      <Element w="55" h="55" src="$items.src" mount="0.5" x="80" :y="$items.height/2" />
    </Element>
  `,
  props: {
    isProfileOpened: false,
    items: [],
  },
})
