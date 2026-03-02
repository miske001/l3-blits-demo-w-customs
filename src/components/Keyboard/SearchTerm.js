import Blits from '@lightningjs/blits'

export default Blits.Component('SearchTerm', {
  template: `
    <Element
      w="$items.width"
      h="$items.height"
      :color="$hasFocus ? '#FFF' : 'transparent'"
      :effects="[{type: 'radius', props: {radius: $items.radius}}]"
      x="-10"
    >
      <Element
        src="assets/check.png"
        h="24"
        w="24"
        x="10"
        :y="28"
        :color="$hasFocus ? '#0D0E12' : '#FFF'"
        :alpha="$isSelected ? 1 : 0"
      />
      <Text
        :content="$items.value"
        size="$items.textSize || 40"
        :color="$hasFocus ? '#0D0E12' : '#FFF'"
        mount="{x: 0, y: 0.5}"
        :x="$isSelected ? 45 : 10"
        :y="84/2"
      />
    </Element>
  `,
  props: [
    'items',
    {
      key: 'selected',
      default: null,
    },
  ],
  computed: {
    isSelected() {
      if (this.selected === undefined || this.selected === null) {
        return false
      }
      return this.selected === this.items.id
    },
  },
  input: {
    enter() {
      this.$emit('changeQuality', this.items.id)
    },
  },
})
