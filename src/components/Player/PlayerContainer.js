// @ts-nocheck
import Blits from '@lightningjs/blits'
import SearchTerm from '../Keyboard/SearchTerm'
import VerticalContainer from '../VerticalContainer'
import MomentItem from './MomentItem'

export default Blits.Component('PlayerContainer', {
  components: { VerticalContainer, SearchTerm, MomentItem },
  props: ['label', 'width', 'height', 'items', 'vertContX', 'autoScroll'],
  template: `
    <Element :w="$width" :h="$height" color="#282828" :effects="[{type: 'radius', props: {radius: 15}}]">
      <Element y="24" x="24">
        <Circle size="50" color="#3D3D3D">
          <Element h="25" w="25" src="/assets/arrowUP.png" mount="0.5" x="25" y="25" rotation="-90" />
        </Circle>
        <Text content="$label" y="7" mount="{x: 0.5}" :x="$width/2-24" />
      </Element>
      <Element x="24" y="95" w="$width-48" h="3.6" color="#646262" :effects="[{type: 'radius', props: {radius: 10}}]" />
      <Element y="110" :height="$height-110" :width="$width" overflow="false">
        <VerticalContainer
          ref="vertCont"
          x="$vertContX"
          :items="$items"
          autoScroll="$autoScroll"
          gap="10"
          screenH="$height-110"
        />
      </Element>
    </Element>
  `,
  state() {
    return {
      focused: 0,
    }
  },
  hooks: {
    focus() {
      this.$select('vertCont').$focus()
    },
  },
  input: {
    back() {
      this.parent.$focus()
      this.$emit('togglePlayerContainer')
    },
  },
})
