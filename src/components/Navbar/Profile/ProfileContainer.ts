import Blits from "@lightningjs/blits";
import ProfileInfo from "./ProfileInfo";
import SettingsButton from "./SettingsButton";
import ExitButton from "./ExitButton";

export default Blits.Component("ProfileContainer", {
  components: {
    ProfileInfo,
    SettingsButton,
    ExitButton,
  },
  template: `
    <Element w="334" h="294" x="96" y="130" color="#2B2B2BFF" :effects="[ { type: 'radius', props: { radius: 35 } } ]">
      <Layout direction="vertical" padding="{left: 16, right: 16, top: 36, bottom: 36}" gap="16">
        <ProfileInfo ref="profile" h="68" />
        <SettingsButton ref="settings" h="68" />
        <ExitButton ref="exit" h="68" />
      </Layout>
    </Element>
  `,

  state() {
    return {
      focused: 0,
    };
  },
  hooks: {
    focus() {
      this.$trigger("focused");
    },
  },

  watch: {
    focused(v: number) {
      if (v === 0) {
        this.$select("profile")?.$focus();
      } else if (v === 1) {
        this.$select("settings")?.$focus();
      } else if (v === 2) {
        this.$select("exit")?.$focus();
      }
    },
  },

  input: {
    back() {
      // emitting a toggle event back to Home
      this.$emit("toggleProfile");
    },
    down() {
      this.focused = Math.min(this.focused + 1, 2);
    },
    up() {
      if (this.focused === 0) {
        this.$emit("toggleProfile");
      }
      this.focused = Math.max(this.focused - 1, 0);
    },
  },
});
