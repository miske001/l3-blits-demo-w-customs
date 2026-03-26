import Blits from "@lightningjs/blits";

export default Blits.Component("Button", {
  props: ["label", "icon", 'w'],

  state() {
    return {
      textWidth: 0,
      height: 72,
    };
  },
  
  computed: {
    width() {
      const paddingX = 32 * 2;
      return this.textWidth + paddingX;
    },
  },

  template: `
    <Element :w="$width" :h="$height" rounded="35" :color="$$hasFocus ? { left:'#ED51F0', right:'#9A33FF' } : '#2B2B2BFF'">
      <Layout direction="horizontal" placement="{ x: 'end', y: 'middle' }" padding="{ left: 32, right: 32, top: 2 }">
        <Text :content="$label" size="29" color="#fff" @loaded="$onTextLoaded" />
      </Layout>
    </Element>
  `,

  methods: {
    onTextLoaded({ w }) {
      this.textWidth = w;
      // this.$size({ w: this.width, h: this.height });
    },
  },
});
