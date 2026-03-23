import Blits from "@lightningjs/blits";

export default Blits.Component("Button", {
  props: {
    label: '',
    w: null
  },

  state() {
    return {
      textWidth: 0,
      height: 88,
    };
  },

  computed: {
    width() {
      if (this.w) return this.w; // ako je prosleđen width koristi njega

      const paddingX = 32 * 1;
      const iconWidth = 24;
      const gap = 8;
      return this.textWidth + iconWidth + gap + paddingX;
    },
  },

  template: `
    <Element
      :w="$width"
      :h="$height"
      rounded="50"
      border="{w: 4, color: '#ED51F0'}"
      :color="$$hasFocus ? '#ED51F0' : 'transparent'"
    >
      <Layout
        direction="horizontal"
        placement="{ x: 'center', y: 'middle' }"
        align-items="center"
        gap="8"
        padding="{ left: 32, right: 32 }"
      >
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
