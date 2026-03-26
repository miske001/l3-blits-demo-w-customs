import Blits from "@lightningjs/blits";
import Button from "./Button"

export default Blits.Component("ExitModal", {
  components: {
    Button,
  },

  template: `
    <Element w="1920" h="1080" src="assets/background.png">
      <Text placement="{x: 'center', y:'middle'}" y="440" size="44" :content="$mainText" />
      <Layout
        direction="horizontal"
        gap="30"
        placement="{x: 'center', y:'middle'}"
        @updated="$onLayoutUpdated"
        padding="{ left: 8, right: 8 }"
      >
        <Button :for="(item, index) in $items" :ref="'btn-' + $index" :label="$item.label" key="$item.label" />
      </Layout>
    </Element>
  `,
  state() {
    return {
      mainText: "Are you sure you want to exit the app?",
      items: [
        { label: "Yes, Exit",  },
        { label: "No, do not",  },
      ],
      width: 0,
    };
  },
  props: {
    shouldShowModal: false as boolean,
  },

  hooks: {
    focus() {
      if (this.shouldShowModal) {
        this.$select("btn-0")?.$focus();
      }
    },
  },

  input: {
    back() {
      this.$emit("onAppExit");
      return true;
    },
    left() {
      this.$select("btn-0")?.$focus();
      return true;
    },
    right() {

      this.$select("btn-1")?.$focus();
      return true;
    },
  },

  watch: {
    shouldShowModal(value: boolean) {
      if (value) {
        this.$select("btn-0")?.$focus();
      }
    },
  },

  methods: {
    onLayoutUpdated({ w }) {
      this.width = w;
      this.$size({ w, h: 80 });
    },
  },
});
