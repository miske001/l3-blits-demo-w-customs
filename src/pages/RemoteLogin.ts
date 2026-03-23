import Blits from "@lightningjs/blits";
import InputField from "../components/InputField";
import RemoteLoginBtn from "../components/RemoteLoginBtn";

export default Blits.Component("RemoteLogin", {
  components: { InputField, RemoteLoginBtn },
  props: {
    active: true
  },

  state() {
    return { focusedIndex: 0 };
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

      // Ne aktiviramo tastaturu odmah
    },

    activateNativeInput() {
      const ref = this.focusableRefs()[this.focusedIndex];
      const field = this.$select(ref);
      if (!field || !this.nativeInput) return;
      this.nativeInput.value = field.value || "";
      this.nativeInput.focus();
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
        this.focusedIndex = -1;
        this.$emit("changeMode", "forgotPassword");
        this.$emit("switchToPhone");
      }

      if (focusedRef === "create") {
        this.$emit("rememberRemoteIndex", this.focusedIndex);
        this.focusedIndex = -1;
        this.$emit("changeMode", "createAccount");
        this.$emit("switchToPhone");
      }

      if (focusedRef === "signin") {
        this.$router.to("/");
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
      this.$emit("changeMode", "signIn");
      this.$emit("switchToRemote");
    },
  },
});
