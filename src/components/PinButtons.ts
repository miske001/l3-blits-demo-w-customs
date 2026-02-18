import Blits from '@lightningjs/blits'

export default Blits.Component('PinButtons', {
  props: ['pin', 'hasError'],
  template: `
    <Element>
      <Element :for="(item, index) in $buttons" :key="$index" w="140" h="140" :x="600 + ($index * 200)" y="232">
        <Element
          w="140"
          h="140"
          color="transparent"
          :effects="[
        { type: 'radius', props: { radius: 50 } },
        { type: 'border', props: { width: 4, color: '0xc9bcbcff' } }
      ]"
        />
        <Element
          :alpha="$pin.length > $index ? 1 : 0"
          w="140"
          h="140"
          color="transparent"
          :effects="[
        { type: 'radius', props: { radius: 50 } },
        { type: 'border', props: { width: 4, color: '#fff' } }
      ]"
        />
        <Element
          :if="$hasError === false"
          :alpha="$hasError ? 1 : 0"
          w="140"
          h="140"
          color="transparent"
          :effects="[
        { type: 'radius', props: { radius: 50 } },
        { type: 'border', props: { width: 4, color: '0xff3b3bff' } }
      ]"
        />
        <Text
          :content="$pin.length > $index ? '*' : ''"
          :color="$hasError ? '0xff3b3bff' : '0xffffffff'"
          size="48"
          mount="0.5"
          x="50%"
          y="50%"
        />
      </Element>
      <Text
        content="incorrect PIN, Please try again"
        :alpha="$hasError ? 1 : 0"
        :color="$hasError ? '0xff3b3bff' : '0xffffffff'"
        size="32"
        x="717"
        y="407"
      />
    </Element>
  `,

  state() {
    return {
      buttons: [1, 2, 3, 4],
    }
  },
  
hooks: {
  init() {
    // console.log("PinButtons pin:", this.pin.length);
  },

},
  watch: {
    pin(newVal: string) {
      // console.log("PinButtons pin updated:", newVal);
    }
  },


  input: {
    enter() {
      const key = this.buttons[this.focusIndex]
      this.$emit('onPinKey', { key })
    },
  },

})
