import Blits from "@lightningjs/blits";

import { settings } from "../../constants/settings";
import Button from "./Button";
import { exitApp, reloadApp, restartApp } from "../../utils/appControl";

export default Blits.Component("SideBar", {
  props: {
    selectedSection: ''
  },
  components: {
    Button,
  },
  template: `
    <Element x="100" y="520">
      <Layout direction="vertical" gap="24" placement="{ y:'middle'}" padding="{ left: 8, right: 8 }">
        <Button
          :for="(item, index) in $items"
          :ref="'btn-' + $index"
          :label="$item.label"
          :icon="$item.icon"
          :isActive="$item.label === $selectedSection"
          key="$item.label"
          w="602"
          h="84"
        />
      </Layout>
    </Element>
  `,

  state() {
    return {
      items: settings,
      focused: 0,
      confirmingAction: false,
    };
  },

  hooks: {
    focus() {
      this.$select("btn-0")?.$focus();
    },
  },

  watch: {
    $hasFocus(isFocused: boolean) {
      if (isFocused) this.$trigger("focused");
    },
    focused(value: number) {
      const focusItem = this.$select(`btn-${value}`);
      if (focusItem && focusItem.$focus) {
        focusItem.$focus();
      }
      this.confirmingAction = false;
    },
  },

  input: {
    down() {
      this.focused = Math.min(this.focused + 1, this.items.length - 1);
      console.log("okida dole");
    },
    up() {
      if (this.focused === 0) {
        // console.log('asdf parent: ', this.$parent)

        this.$parent.focused = 0; //set the parent focused index in order to properly shift to search button
        this.$parent.$focus();
      }
      this.focused = Math.max(this.focused - 1, 0);
      console.log("okida gore");
    },

    enter() {
      const selectedItem = this.items[this.focused];

      console.log("📌 SELECTED:", selectedItem);

      // Emit ka parent komponenti
      this.$emit("sectionSelected", selectedItem.label);

      if (selectedItem.label === "Restart App") {
        if (!this.confirmingAction) {
          // Prvi pritisak: samo aktiviraj restart sekciju i setuj flag
          this.confirmingAction = true;
          console.log("Restart initiated - press Enter again to confirm");
          // Opcionalno: ovde možeš emitovati event za prikaz poruke korisniku
        } else {
          // Drugi pritisak: stvarno restartuj aplikaciju
          restartApp();
        }
        return;
      }

      if (selectedItem.label === "Exit App") {
        if (!this.confirmingAction) {
          // Prvi pritisak: samo aktiviraj exit sekciju i setuj flag
          this.confirmingAction = true;
          console.log("Exit initiated - press Enter again to confirm");
          // Opcionalno: ovde možeš emitovati event za prikaz poruke korisniku
        } else {
          // Drugi pritisak: stvarno restartuj aplikaciju
          exitApp();
        }
        return;
      }

      // if (selectedItem.label === 'Exit App') {
      //   exitApp()
      // }

      if (selectedItem.label === "Logout") {
        if (!this.confirmingAction) {
          // Prvi pritisak: samo aktiviraj logout sekciju i setuj flag
          this.confirmingAction = true;
          console.log("Logout initiated - press Enter again to confirm");
          // Opcionalno: ovde možeš emitovati event za prikaz poruke korisniku
        } else {
          // Drugi pritisak: stvarno restartuj aplikaciju
          this.$router.to("/");
        }
        return;
      }

      // if (selectedItem.label === 'Logout') {
      //   this.$router.to('/home')
      // }
    },
  },
});
