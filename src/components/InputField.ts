import Blits from "@lightningjs/blits";

export default Blits.Component("InputField", {
  props: {
    label: "",
    placeholder: "",
    password: false,
  },

  state() {
    return {
      value: "",
      focused: false,
      caretVisible: true,
      caretInterval: null as any,
      caretPos: 0,
      scrollIndex: 0,
      textWidth: 0,
    };
  },

  computed: {
    displayText() {
      let text = this.password ? "*".repeat(this.value.length) : this.value;

      if (!this.focused && !this.value) return this.placeholder;

      const caret = this.focused && this.caretVisible ? "|" : "";

      // 42
      const maxChars = 90;

      // CARET LEFT SCROLL
      if (this.caretPos < this.scrollIndex) {
        this.scrollIndex = this.caretPos;
        // samo pozivamo scroll update bez prave Text dimenzije
        this.updateScroll();
      }

      // CARET RIGHT SCROLL (isto kao stara implementacija)
      if (this.caretPos > this.scrollIndex + maxChars) {
        this.scrollIndex = this.caretPos - maxChars;
      }

      const visibleText = text.slice(
        this.scrollIndex,
        this.scrollIndex + maxChars
      );

      const relativeCaret = this.caretPos - this.scrollIndex;

      return (
        visibleText.slice(0, relativeCaret) +
        caret +
        visibleText.slice(relativeCaret)
      );
    },
  },

  template: `
    <Element>
      <Text :content="$label" size="28" font="poppinsBold" y="-10" />
    
      <!-- SIVI BORDER -->
      <Element :show="!$focused" y="40" w="700" h="100" color="#00000000" rounded="50" border="{w: 4, color: '#8F8F8F'}" />
    
      <!-- BELI BORDER -->
      <Element :show="$focused" y="40" w="700" h="100" color="#00000000" rounded="50" border="{w: 4, color: '#FFFFFF'}" />
      <Element clipping="true" w="680" h="120">
        <Text x="45" y="66" :content="$displayText" :alpha="$value ? 1 : 0.5" @loaded="$onTextLoaded" />
      </Element>
    </Element>
  `,

  hooks: {
    focus() {
      this.focused = true;

      this.caretInterval = setInterval(() => {
        this.caretVisible = !this.caretVisible;
      }, 500);
    },

    unfocus() {
      this.focused = false;
      clearInterval(this.caretInterval);
      this.caretVisible = false;
      this.caretPos = this.value.length;
      this.scrollIndex = 0;
    },
  },

  methods: {
    onTextLoaded(dim: any) {
      const maxWidth = 660; // 700 - padding

      this.textWidth = dim.w;

      if (this.textWidth > maxWidth) {
        this.scrollIndex++;
      }
    },
    updateScroll() {
      const maxChars = 90;
      const maxScroll = Math.max(0, this.value.length - maxChars);
      if (this.scrollIndex > maxScroll) {
        this.scrollIndex = maxScroll;
      }
    },
  },

  input: {
    any(e: any) {
      const key = e.key;
      if (!key) return;

      if (key === "Backspace" && this.caretPos > 0) {
        this.value =
          this.value.slice(0, this.caretPos - 1) +
          this.value.slice(this.caretPos);

        this.caretPos--;
        this.updateScroll();
        return;
      }

      if (key.length === 1) {
        this.value =
          this.value.slice(0, this.caretPos) +
          key +
          this.value.slice(this.caretPos);

        this.caretPos++;
      }
    },

    left() {
      if (this.caretPos > 0) this.caretPos--;
    },

    right() {
      if (this.caretPos < this.value.length) this.caretPos++;
    },

    enter() {
      this.$emit("activateNativeInput");
      this.$emit("next");
    },

    down() {
      this.$emit("next");
    },

    up(e) {
      if (this.$parent) this.$parent.$input(e);
    },
  },
});
