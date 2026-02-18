import Blits from '@lightningjs/blits'
import Navbar from '../components/Navbar/Navbar'
import GetStartedButton from '../components/GetStartedButton'
import ProfileContainer from "../components/Navbar/Profile/ProfileContainer";


// #1a002b
export default Blits.Component("Home", {
  components: {
    Navbar,
    GetStartedButton,
    ProfileContainer,
  },
  template: `
    <Element w="1920" h="1080" color="#0D0E12">
      <Navbar ref="navbar" :isProfileOpened="$showProfile" />
      <GetStartedButton x="800" y="400" ref="button2" />
      <ProfileContainer :show="$showProfile" ref="ProfileContainer" />
    </Element>
  `,
  state() {
    return {
      focused: 0,
      showProfile: false,
    };
  },
  hooks: {
    init() {
      this.$listen("toggleProfile", () => {
        this.showProfile = !this.showProfile;

        if (this.showProfile) {
          this.$select("ProfileContainer")?.$focus();
        } else if (!this.showProfile) {
          this.$trigger("focused");
        }
      });
    },
    focus() {
      this.$trigger("focused");
    },
  },

  watch: {
    focused(v: number) {
      if (v === 0) {
        this.$select("navbar")?.$focus();
      } else if (v === 1) {
        this.$select("button2")?.$focus();
      }
    },
  },
  input: {
    down() {
      this.focused = 1;
    },
    up() {
      this.focused = 0;
    },
    enter() {
      if (this.focused === 1) {
        this.$router.to("/kastom/pinkeyboard");
      }
    },
  },
});
