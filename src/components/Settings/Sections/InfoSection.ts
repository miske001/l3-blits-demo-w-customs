import Blits from "@lightningjs/blits";

export default Blits.Component("InfoSection", {
  props: ["deviceInfo", "section"],

  template: `
    <Element>
      <Text :content="$section" size="48" color="#ED51F0" />
      <Layout direction="vertical" gap="25" y="80">
        <Element :for="(item, index) in $deviceInfo" :key="$item.key" h="100" w="500">
          <Text :content="$item.key" size="36" />
          <Text :content="$item.value" maxwidth="840" size="32" maxlines="1" y="60" />
        </Element>
      </Layout>
    </Element>
  `,
});
