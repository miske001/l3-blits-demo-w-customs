import Blits from "@lightningjs/blits"
import { generateQR } from "../../../utils/qrCode"

export default Blits.Component("ContactSection", {
  template: `
    <Element>
      <Text content="Contact us" font="poppinsBold" size="48" color="#ED51F0" />
    
      <Layout direction="vertical" gap="20" y="80" align-items="center">
        <Text content="We welcome all your comments and opinions" font="poppinsBold" />
    
        <Element w="441" h="441" ref="qrContainer" :src="$imgSrc" rounded="25" />
    
        <Text content="Use your mobile to scan QR code" />
        <Text content="or visit" />
    
        <Text content="www.Redline.com/contactus" font="poppinsBold" />
      </Layout>
    </Element>
  `,
  state() {
    return {
      imgSrc: "",
    };
  },

  hooks: {
    async ready() {
      const img = await generateQR("https://redline.com.tr/en/");
      this.imgSrc = img;
      console.log("asdf img: ", img);
    },
  },
});