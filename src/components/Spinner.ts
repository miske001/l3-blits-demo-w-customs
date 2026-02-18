import Blits from '@lightningjs/blits'

export default Blits.Component('Spinner', {

  template: `
    <Element w="$w" h="$h">
      <Element w="$w" h="$h" src="$src" :rotation.transition="{value:$rotation, duration:0.5, repeat:-1}" />
    </Element>
  `,

  props: ['src', 'w', 'h'],

  state() {
    return {
      rotation: 0
    }
  },

  hooks: {
    ready() {
      this.startRotate()
    }
  },

  methods: {
    startRotate() {
      this._interval = this.$setInterval(() => {
        this.rotation += 20
        if (this.rotation >= 360) this.rotation = 0
      }, 50)
    },

    stopRotate() {
      if (this._interval) this.$clearInterval(this._interval)
    }

  },

})
