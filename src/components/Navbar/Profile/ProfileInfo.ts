import Blits from '@lightningjs/blits'

export default Blits.Component("ProfileInfo", {
  template: `
    <Element
      w="302"
      h="68"
      :color="$hasFocus ? {left:'#ED51F0', right:'#9A33FF'} : '#3D3D3D'"
      :effects="[ { type: 'radius', props: { radius: 35 } } ]"
    >
      <Circle size="60" src="/assets/profile.png" />
      <Layout direction="vertical" x="80" y="5">
        <Text :content="$username" size="21" color="#fff" maxwidth="215" maxlines="1" @loaded="$logText" />
        <Text content="Back to Switch profile vero re " size="16" color="#fff" maxwidth="215" maxlines="1" />
      </Layout>
    </Element>
  `,

  state() {
    return {
      focused: false,
      username: "UsernamePeraZikaLaza",
    };
  },

  hooks: {
    focus() {
      this.hasFocus = true;
    },
    unfocus() {
      this.hasFocus = false;
    },
  },

  methods: {
    logText() {
      const maxLength = 15;
      if (this.username.length > maxLength) {
        this.username = this.username.substring(0, maxLength - 3) + "...";
      } else {
        this.username;
      }
    },
  },
});

