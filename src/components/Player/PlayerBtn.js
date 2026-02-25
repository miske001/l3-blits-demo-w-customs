import Blits from '@lightningjs/blits'

export default Blits.Component('PlayerBtn', {
  props: ['items'],
  template: `
    <Element
      :width="$items.width"
      :height="$items.height"
      :color="$hasFocus ? '#FFF' : '#2B2B2B'"
      :effects="[{type: 'radius', props: {radius: 40}}]"
    >
      <Element
        :src="$items.src"
        w="35"
        h="35"
        mount="{x: 0.5, y: 0.5}"
        :x="$items.width/2"
        :y="$items.height/2"
        :color="$hasFocus ? '#000' : '#FFF'"
      />
      <Text
        :x="$items.width/2"
        mount="{x: 0.5}"
        :alpha="$hasFocus ? 1 : 0"
        :content="$items.label"
        align="center"
        size="24"
        y="90"
      />
    </Element>`,
  input: {
    enter(e) {
      this.parent.$input(e)
      this.$emit(this.items.action)
    },
  },
})
