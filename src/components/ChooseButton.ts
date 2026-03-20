import Blits from "@lightningjs/blits";

export default Blits.Component("Button", {
  props: [{ key: "label" }, { key: "selected", default: false }],

  state() {
    return {
      textWidth: 0,
      height: 68,
    };
  },

  computed: {
    width() {
      const paddingX = 32 * 1;
      const iconWidth = 24;
      const gap = 8;
      return this.textWidth + iconWidth + gap + paddingX;
    },
  },

  template: `
    <Element :w="$width" :h="$height" :effects="[ { type: 'radius', props: { radius: 35 } } ]">
      <!-- FOCUSED (gradient fill) -->
      <Element
        :show="$hasFocus"
        :w="$width"
        :h="$height"
        :color="{ left:'#ED51F0', right:'#9A33FF' }"
        :effects="[ { type:'radius', props:{ radius:35 }} ]"
      />
    
      <!-- SELECTED (gradient border) -->
      <Element
        :show="!$hasFocus && $selected"
        :w="$width"
        :h="$height"
        :color="{ left:'#ED51F0', right:'#9A33FF' }"
        :effects="[ { type:'radius', props:{ radius:35 }} ]"
      >
        <Element
          x="2"
          y="2"
          :w="$width - 4"
          :h="$height - 4"
          color="#2B2B2BFF"
          :effects="[ { type:'radius', props:{ radius:33 }} ]"
        />
      </Element>
    
      <!-- DEFAULT -->
      <Element
        :show="!$hasFocus && !$selected"
        :w="$width"
        :h="$height"
        color="#2B2B2BFF"
        :effects="[ { type:'radius', props:{ radius:35 }} ]"
      />
    
      <!-- CONTENT -->
      <Layout direction="horizontal" placement="{ x: 'start', y: 'middle' }" gap="8" padding="{ left: 32, right: 32 }">
        <Text :content="$label" size="26" color="#fff" @loaded="$onTextLoaded" />
      </Layout>
    </Element>
  `,

  methods: {
    onTextLoaded({ w }) {
      this.textWidth = w;
      this.$size({ w: this.width, h: this.height });
    },
  },
});
