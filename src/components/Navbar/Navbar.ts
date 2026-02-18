import Blits from '@lightningjs/blits'
import UserProfile from './UserProfile'
import SearchButton from './SearchButton'
import NavbarRow from './NavbarRow'


// #1a002b
export default Blits.Component("Navbar", {
  components: {
    UserProfile,
    SearchButton,
    NavbarRow,
  },
  template: `
    <Element>
      <Element>
        <UserProfile ref="profile" :isProfileOpened="$isProfileOpened" />
        <SearchButton ref="search" />
        <NavbarRow ref="row" />
      </Element>
      <Element src="/assets/logo.png" x="1704" y="74" w="110" h="28" />
    </Element>
  `,
  props: ["isProfileOpened"],
  state() {
    return {
      w: 0,
      h: 0,
      focused: 2,
    };
  },

  hooks: {
    ready() {
      this.$select("row")?.$focus();
    },
    focus() {
      this.$trigger("focused");
    },
  },

  watch: {
    focused(v: number) {
      console.log("asdf val: ", v);
      if (v === 0) {
        this.$select("profile")?.$focus();
      } else if (v === 1) {
        this.$select("search")?.$focus();
      } else if (v === 2) {
        this.$select("row")?.$focus();
      }
    },
  },

  input: {
    right() {
      if (this.focused === 1) {
        this.$select("row")?.$focus();
      }
      this.focused = Math.min(this.focused + 1, 2);
    },
    left() {
      console.log("index:", this.focused);
      this.focused = Math.max(this.focused - 1, 0);
    },

    enter() {
      if (this.focused === 1) {
        this.$router.to("/home");
      }
    },
  },
});
