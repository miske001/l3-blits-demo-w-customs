import Blits from "@lightningjs/blits";

export default Blits.Component("QrCodeSection", {
  props: {
    loginMethod: "phone",
    offsetY: 50,
    qrSrc: "",
    content: "",
  },
  template: `
    <Layout :show="$loginMethod === 'phone'" x="120" y="340" direction="vertical" gap="15">
      <Text content="Scan the QR code" font="poppinsSemiBold" size="48" />
    
      <Text :content="$content.qrText" w="600" maxwidth="734" maxlines="4" size="28" />
    
      <Element h="10" />
    
      <Element w="369" h="369" :src="$qrSrc" rounded="25" />
    </Layout>
  `,
});
