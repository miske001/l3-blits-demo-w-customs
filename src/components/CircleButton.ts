import Blits from "@lightningjs/blits"

export default Blits.Component('CircleButton', {

  props: ['number', 'label'],

  template: `
    <Element w="600" h="100">
      <Element w="80" h="80" y="10" color="#FFFFFF33" :effects="[ { type: 'radius', props: { radius: 40 } } ]" />
    
      <Text :content="$number" color="#fff" size="32" x="40" y="50" mount="{x:0.5, y:0.5}" />
    
      <Text :content="$label" color="#fff" size="28" x="120" y="30" mountY="0.5" w="460" />
    </Element>
  `
})