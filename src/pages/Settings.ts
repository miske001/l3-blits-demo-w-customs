import Blits from "@lightningjs/blits";
import GoBackButton from "../components/Settings/GoBackButton";
import SideBar from "../components/Settings/SideBar";
import { DeviceInfo, getStoredDeviceInfo } from "../utils/deviceInfo";
import ContentPanel from "../components/Settings/ContentPanel";

const accInfo = [
  { profileName: "Loai" },
  { accEmail: "example@email.com" },
  { country: "AU / en-AU" },
];
const rrInfo = [
  {
    key: "Restart Redstrim",
    value: "Restart the Redstrim application",
  },
];
const exitInfo = [
  {
    key: "Exit",
    value: "Are you sure you want to exit the application?",
  },
];
const logoutInfo = [
  {
    key: "Logout your account",
    value: "Logout of your Redstrim account on this device?",
  },
];

export default Blits.Component("Settings", {
  components: {
    GoBackButton,
    SideBar,
    ContentPanel,
  },

  template: `
    <Element w="1920" h="1080" color="#000000">
      <Text content="Settings" x="110" y="48"></Text>
      <GoBackButton x="99" y="116" ref="goback" />
      <SideBar ref="sidebar" :selectedSection="$selectedSection" />
      <ContentPanel x="960" y="48" :deviceInfo="$deviceInfo" :section="$selectedSection" />
    </Element>
  `,

  state() {
    return {
      focused: 0,
      selectedSection: "Device information", // default
      deviceInfo: [] as any,
    };
  },

  watch: {
    focused(v: number) {
      if (v === 0) {
        this.$select("goback")?.$focus();
      } else if (v === 1) {
        this.$select("sidebar")?.$focus();
      }
    },

    selectedSection() {
      console.log("asdf selected sect: ", this.selectedSection);
      if (this.selectedSection === "Device information") {
        const info = getStoredDeviceInfo(this.$storage);
        console.log("asdf info: ", info);
        this.deviceInfo = this.formatData(info);
      } else if (this.selectedSection === "Account information") {
        this.deviceInfo = this.formatData(accInfo);
      } else if (this.selectedSection === "Restart App") {
        this.deviceInfo = rrInfo;
      } else if (this.selectedSection === "Exit App") {
        this.deviceInfo = exitInfo;
      } else if (this.selectedSection === "Logout") {
        this.deviceInfo = logoutInfo;
      }
    },
  },

  hooks: {
    init() {
      this.$listen("sectionSelected", (section: string) => {
        this.selectedSection = section;
      });
    },
    ready() {
      this.$select("goback")?.$focus();
      this.selectedSection === "Account information";

      const info = getStoredDeviceInfo(this.$storage);
      console.log('asdf info: ', info);
      this.deviceInfo = this.formatData(info);
    },
    focus() {
      this.$trigger("focused");
    },
  },

  methods: {
    formatData(data) {
      if (!data) return [];

      //formatting for accInfo format
      if (Array.isArray(data)) {
        return data.map((obj) => {
          const [key, value] = Object.entries(obj)[0];
          return {
            key,
            value: value || "-",
          };
        });
      }

      //for deviceInfo format
      return Object.entries(data).map(([key, value]) => ({
        key,
        value: value || "-",
      }));
    },
  },

  input: {
    down() {
      this.focused = 1;
    },
    up() {
      this.focused = 0;
    },
  },
});
