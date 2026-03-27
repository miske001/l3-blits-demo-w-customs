import Blits from "@lightningjs/blits";
import InputField from "../components/InputField";
import RemoteLoginBtn from "../components/RemoteLoginBtn";

export default Blits.Component("RemoteLogin", {
  components: { InputField, RemoteLoginBtn },
  props: {
    active: true,
  },

  state() {
    return { focusedIndex: 0, isTyping: false };
  },

  template: `
    <Element w="1920">
      <InputField ref="email" x="610" y="340" label="Email" placeholder="Enter your email" />
      <InputField ref="password" x="610" y="520" label="Password" placeholder="Enter your password" password="true" />
      <RemoteLoginBtn ref="signin" placement="{x:'center'}" y="780" label="Sign In" :w="268" />
      <Layout placement="{x:'center'}" gap="40" y="915">
        <RemoteLoginBtn ref="forgot" label="Forgot Password" :w="350" />
        <RemoteLoginBtn ref="create" label="Don't have an account?" :w="408" />
      </Layout>
    </Element>
  `,

  hooks: {
    init() {
      this.$listen("requestKeyboard", () => this.handleKeyboardRequest());
      // this.$listen('activateNativeInput', () => this.activateNativeInput())
      // slušamo emit 'next'
      this.$listen("next", () => this.focusNext());

      // Dodajemo hidden HTML input
      const input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.top = "-1000px"; // sakrij
      document.body.appendChild(input);
      this.nativeInput = input;

      // Sinhronizacija sa Blits inputom
      input.addEventListener("input", () => {
        const fieldRef = this.focusableRefs()[this.focusedIndex];
        const field = this.$select(fieldRef);
        if (field) field.value = input.value;
      });

      input.addEventListener("blur", () => {
        const fieldRef = this.focusableRefs()[this.focusedIndex];
        const field = this.$select(fieldRef);
        if (field) {
          field.caretPos = field.value.length;
        }
      });
    },

    focus() {
      this.setFocus();
    },
  },

  methods: {
    focusableRefs() {
      return ["email", "password", "signin", "forgot", "create"];
    },

    focusNext() {
      const max = this.focusableRefs().length - 1;
      this.focusedIndex = Math.min(this.focusedIndex + 1, max);
    },

    focusPrev() {
      if (this.focusedIndex === 0) {
        this.$parent.$focus();
        return;
      }

      this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
    },

    setFocus() {
      const ref = this.focusableRefs()[this.focusedIndex];
      const field = this.$select(ref);
      if (!field) return;

      field.$focus();

      // 🔥 KLJUČNO: ako nije input → ugasi tastaturu
      if (ref !== "email" && ref !== "password") {
        this.deactivateNativeInput();
      }
    },

    activateNativeInput() {
      const ref = this.focusableRefs()[this.focusedIndex];
      if (ref !== "email" && ref !== "password") return;

      if (this.isTyping) return; // 🔥 SPREČAVA DUPLO OTVARANJE

      this.isTyping = true;

      const field = this.$select(ref);
      this.nativeInput.value = field?.value || "";

      setTimeout(() => {
        this.nativeInput.focus();
      }, 0);
    },
    deactivateNativeInput() {
      this.isTyping = false;

      if (!this.nativeInput) return;

      this.nativeInput.blur();

      // 🔥 OVO JE KLJUČNO ZA TV
      this.nativeInput.style.display = "none";
      setTimeout(() => {
        this.nativeInput.style.display = "block";
      }, 0);
    },
    handleKeyboardRequest() {
      const ref = this.focusableRefs()[this.focusedIndex];

      // ❌ ako već nije input → IGNORE
      if (ref !== "email" && ref !== "password") return;

      // ❌ ako već kuca → IGNORE
      if (this.isTyping) return;

      this.activateNativeInput();
    },
  },

  watch: {
    focusedIndex() {
      this.setFocus();
    },
  },

  input: {
    enter() {
      if (!this.active) return;
      const focusedRef = this.focusableRefs()[this.focusedIndex];

      if (focusedRef === "forgot") {
        this.$emit("rememberRemoteIndex", this.focusedIndex);
        this.focusedIndex = null;
        this.$emit("changeMode", "forgotPassword");
        this.$emit("switchToPhone");
      }

      if (focusedRef === "create") {
        this.$emit("rememberRemoteIndex", this.focusedIndex);
        this.focusedIndex = null;
        this.$emit("changeMode", "createAccount");
        this.$emit("switchToPhone");
      }

      if (focusedRef === "signin") {
        this.$router.to("/home");
      }
    },
    down() {
      if (!this.active) return;
      if (this.focusedIndex === 2) {
        // Sign In -> Forgot
        this.focusedIndex = 3;
        return;
      }

      if (this.focusedIndex < 2) {
        this.focusNext();
      }
    },

    up() {
      this.deactivateNativeInput();
      if (!this.active) return;

      // ako smo na email inputu
      if (this.focusedIndex === 0) {
        const loginPage = this.$parent;

        loginPage.focused = 1; // indeks dugmeta "Use remote"
        loginPage.$select("btn-1")?.$focus();

        return;
      }

      if (this.focusedIndex === 3 || this.focusedIndex === 4) {
        this.focusedIndex = 2;
        return;
      }

      this.focusPrev();
    },
    right() {
      if (!this.active) return;
      if (this.focusedIndex === 3) {
        // Forgot -> Create
        this.focusedIndex = 4;
      }
    },
    left() {
      if (!this.active) return;
      if (this.focusedIndex === 4) {
        // Create -> Forgot
        this.focusedIndex = 3;
      }
    },
    back() {
      this.deactivateNativeInput();
      this.$emit("changeMode", "signIn");
      this.$emit("switchToRemote");
      // this.focusedIndex = 0
    },
  },
});
