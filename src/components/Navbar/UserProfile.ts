import Blits from '@lightningjs/blits'



export default Blits.Component('Navbar', {
    
  components: {

  },
  template: `
    <!-- <Element w="128" h="78" color="#2B2B2BFF"> </Element> -->
    <Element
      w="128"
      h="78"
      x="96"
      y="48"
      :effects="[
        { type: 'radius', props: { radius: 50 } },
      ]"
      :color="$hasFocus ? {left:'#ED51F0', right:'#9A33FF'} : '#2B2B2BFF'"
    >
      <!-- <Circle size="72" w="20" h="20" mount="-0.5"/> -->
      <!-- <Circle -->
      <!-- w="64" -->
      <!-- h="64" -->
      <!-- src="/assets/profile.png" -->
      <!-- mount="0.5" -->
      <!-- :x="$parent.w / 2" -->
      <!-- :y="$parent.h / 2" -->
      <!-- /> -->
    
      <Circle w="64" h="64" size="64" src="/assets/profile.png" mount="0.5" x="39" y="39" />
      <Element w="32" h="32" mount="0.5" x="96" y="42" src="/assets/arrowUP.png"> </Element>
    </Element>
  `,
  state() {
    return {
        focused: false,
    }
  },
  

  hooks: {
    focus() {
      this.hasFocus = true
    },
    unfocus() {
      this.hasFocus = false
    }
  },


})
