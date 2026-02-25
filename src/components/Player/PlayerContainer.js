// @ts-nocheck
import Blits from '@lightningjs/blits'
import SearchTerm from '../Keyboard/SearchTerm'
import VerticalContainer from '../VerticalContainer'

export default Blits.Component('PlayerContainer', {
  components: { VerticalContainer, SearchTerm },
  props: ['label', 'width', 'height'],
  template: `
    <Element w="$width" h="$height" color="#282828" :effects="[{type: 'radius', props: {radius: 15}}]">
      <Element y="24" x="24">
        <Circle size="50" color="#3D3D3D">
          <Element h="25" w="25" src="/assets/arrowUP.png" mount="0.5" x="25" y="25" rotation="-90" />
        </Circle>
        <Text content="$label" y="7" mount="{x: 0.5}" x="$width/2-24" />
      </Element>
      <Element x="24" y="95" w="$width-48" h="3.6" color="#646262" :effects="[{type: 'radius', props: {radius: 10}}]" />
      <Element y="110" height="$height-110" width="$width" overflow="false">
        <VerticalContainer ref="vertCont" x="50" items="$videoQualArr" autoScroll="false" gap="10" screenH="230" />
      </Element>
    </Element>
  `,
  state() {
    return {
      focused: 0,
      videoQualArr: [
        {
          type: SearchTerm,
          rowH: 72,
          value: '1080p HD',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '720p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '480p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '360p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '240p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '144p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
        },
      ],
    }
  },
  hooks: {
    focus() {
      console.log('asdf foucsed upad')
      this.$select('vertCont').$focus()
    },
  },
  input: {
    back() {
      this.parent.$focus()
      this.$emit('toggleQuality')
    },
  },
})
