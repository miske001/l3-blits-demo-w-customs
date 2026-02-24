import Blits from '@lightningjs/blits'

export default Blits.Component('ProgressBar', {
  props: ['progressLength', 'progress'],
  template: `
    <Element y="22" x="200" w="$progressLength" h="16" color="#ffffff80" :effects="[{type: 'radius', props: {radius:8}}]">
      <Element
        h="16"
        :w.transition="{value: $progress, d: 100, f: 'ease-in-out'}"
        :effects="[{type: 'radius', props: {radius:8}}]"
        color="#FFF"
      />
      <Circle
        :alpha="$hasFocus ? 1 : 0"
        size="28"
        color="#fff"
        y="-6"
        :x.transition="{value: $progress - 8, d: 100, f: 'ease-in-out'}"
      />
    </Element>
  `,

  input: {
    left() {
      this.$emit('seekFromProgBar', 'left')
    },
    right() {
      this.$emit('seekFromProgBar', 'right')
    },
  },
})
