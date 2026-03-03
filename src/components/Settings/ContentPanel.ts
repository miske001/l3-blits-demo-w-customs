import Blits from "@lightningjs/blits";
import InfoSection from "./Sections/InfoSection";
import ContactSection from "./Sections/ContactSection";

export default Blits.Component("ContentPanel", {
  props: ["deviceInfo", "section"],

  components: {
    InfoSection,
    ContactSection,
  },

  template: `
    <Element>
      <InfoSection :show="$section !== 'Contact us'" :deviceInfo="$deviceInfo" :section="$section" />
      <ContactSection :show="$section === 'Contact us'" :deviceInfo="$deviceInfo" />
    </Element>
  `,
});
