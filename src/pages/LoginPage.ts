import Blits from "@lightningjs/blits";
import { generateQR } from "../utils/qrCode";
import VisitWebsite from "../components/VisitWebsite";
import VerticalLine from "../components/VerticalLine";
import ChooseButton from "../components/ChooseButton";
import { choose } from "../constants/choose";
import RemoteLogin from "./RemoteLogin";
import QrCodeSection from "../components/QrCodeSection";
import { CONTENT, ContentType, Mode } from "../constants/qrContent";

export default Blits.Component("LoginPage", {
  components: {
    VisitWebsite,
    VerticalLine,
    ChooseButton,
    RemoteLogin,
    QrCodeSection,
  },

  state() {
    return {
      loginMethod: "phone" as "phone" | "remote",
      currentMode: "signIn" as Mode,
      qrSrc: "",
      buttons: choose,
      width: 0,
      focused: 0,
      lastRemoteIndex: 3,
    };
  },

  computed: {
    content(): ContentType {
      return { ...CONTENT[this.currentMode] };
    },
    steps() {
      return CONTENT[this.currentMode].steps;
    },
    qrUrl() {
      return CONTENT[this.currentMode].url;
    },
    filteredButtons() {
      if (
        this.currentMode === "forgotPassword" ||
        this.currentMode === "createAccount"
      ) {
        return [];
      }
      return this.buttons;
    },
    showQR() {
      return this.loginMethod === "phone";
    },
    contentY() {
      return this.currentMode === "signIn" ? 0 : -50;
    },
  },
  template: `
    <Element w="1920" h="1080" color="#1a002b">
      <Element src="/assets/logo.png" placement="{x:'center'}" y="48" w="164" h="42" />
      <Text
        :content="$content.title"
        fontSize="48"
        placement="{x:'center'}"
        y="115"
        font="poppinsBold"
        size="48"
        color="#c455f9"
      />
      <Element
        placement="{x:'center'}"
        y="207"
        :w="$width"
        height="84"
        color="#2B2B2BFF"
        :effects="[ { type: 'radius', props: { radius: 50 } } ]"
        :show="$filteredButtons.length > 0"
      >
        <Layout
          direction="horizontal"
          gap="8"
          placement="{ y:'middle'}"
          padding="{ left: 8, right: 8 }"
          @updated="$onLayoutUpdated"
        >
          <ChooseButton
            :for="(button, index) in $filteredButtons"
            :ref="'btn-' + $index"
            :label="$button.label"
            :key="$button"
            :selected="$button.value === $loginMethod"
          />
        </Layout>
      </Element>
    
      <QrCodeSection :offsetY="$contentY" :loginMethod="$loginMethod" :content="$content" :qrSrc="$qrSrc" />
    
      <RemoteLogin :show="$loginMethod === 'remote'" ref="RemoteLogin" :active="$currentMode === 'signIn'" />
    
      <VerticalLine x="961" y="339" width="4" height="380" :show="$loginMethod === 'phone'" />
      <Text content="OR" x="944" y="723" size="28" :show="$loginMethod === 'phone'" />
      <VerticalLine x="961" y="767" width="4" height="250" :show="$loginMethod === 'phone'" />
    
      <VisitWebsite x="1072" y="339" :show="$loginMethod === 'phone'" :steps="$steps" :offsetY="$contentY" />
    </Element>
  `,

  hooks: {
    async ready() {
      const img = await generateQR(this.qrUrl);
      this.qrSrc = img;
    },
    focus() {
      this.$select("btn-0")?.$focus();
    },
    init() {
      // sluša eventove iz RemoteLogin
      this.$listen("changeMode", (newMode: Mode) => {
        this.currentMode = newMode;
      });

      this.$listen("switchToPhone", () => {
        this.loginMethod = "phone"; // prebaci na screen sa QR kodom
      });
      this.$listen("switchToRemote", () => {
        this.loginMethod = "remote";

        const remote = this.$select("RemoteLogin");
        if (remote) {
          remote.focusedIndex = this.lastRemoteIndex;
        }
      });
      this.$listen("rememberRemoteIndex", (index) => {
        this.lastRemoteIndex = index;
      });
    },
  },

  watch: {
    currentMode() {
      this.loadQR(); // kada se mode promeni, update-uj QR kod
    },

    hasFocus(isFocused) {
      if (isFocused) this.$trigger("focused");
    },

    focused(value) {
      const focusItem = this.$select(`btn-${value}`);
      if (focusItem && focusItem.$focus) {
        focusItem.$focus();
      }
    },
  },

  input: {
    left() {
      this.focused = Math.max(this.focused - 1, 0);
    },
    right() {
      this.focused = Math.min(this.focused + 1, this.buttons.length - 1);
    },
    down() {
      if (this.loginMethod === "remote") {
        this.$select("RemoteLogin")?.$focus();
      }
    },
    enter() {
      if (this.focused === 0) {
        this.loginMethod = "phone";
        this.currentMode = "signIn";
      }

      if (this.focused === 1) {
        this.loginMethod = "remote";
      }
    },
  },

  methods: {
    async loadQR() {
      const img = await generateQR(this.qrUrl);
      this.qrSrc = img;
    },

    goToSignIn() {
      this.currentMode = "signIn";
    },

    onLayoutUpdated({ w }) {
      this.width = w;
      this.$size({ w, h: 80 });
    },
  },
});
