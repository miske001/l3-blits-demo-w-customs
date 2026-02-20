import Blits from '@lightningjs/blits'
import Grid from '../components/Grid'
import Item from '../components/Item'

export default Blits.Component('GridPage', {
  components: { Grid },
  template: `
    <Element>
      <Text content="GRID Layout" />
      <Grid
        ref="grid"
        y="100"
        x="150"
        items="$gridItems"
        itemWidth="120"
        itemHeight="50"
        itemOffsetX="150"
        itemOffsetY="230"
        looping="false"
        screenH="980"
        refocusParent="true"
      />
    </Element>
  `,
  state() {
    return {
      gridItems: [
        { label: '0', color: '#BADA55', type: Item },
        { label: '1', color: '#BADA55', type: Item },
        { label: '2', color: '#BADA55', type: Item },
        { label: '3', color: '#BADA55', type: Item },
        { label: '4', color: '#BADA55', type: Item },
        { label: '5', color: '#BADA55', type: Item },
        { label: '6', color: '#BADA55', type: Item },
        { label: '7', color: '#BADA55', type: Item },
        { label: '8', color: '#BADA55', type: Item },
        { label: '9', color: '#BADA55', type: Item },
        { label: '0', color: '#BADA55', type: Item },
        { label: '1', color: '#BADA55', type: Item },
        { label: '2', color: '#BADA55', type: Item },
        { label: '3', color: '#BADA55', type: Item },
        { label: '4', color: '#BADA55', type: Item },
        { label: '5', color: '#BADA55', type: Item },
        { label: '6', color: '#BADA55', type: Item },
        { label: '7', color: '#BADA55', type: Item },
        { label: '8', color: '#BADA55', type: Item },
        { label: '9', color: '#BADA55', type: Item },
      ],
    }
  },
  hooks: {
    focus() {
      this.$select('grid').$focus()
    },
  },
})
