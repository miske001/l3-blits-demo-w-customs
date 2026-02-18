import Blits from '@lightningjs/blits'
import Keyboard from '../components/Keyboard'
import PinButtons from '../components/PinButtons'
import CancelButton from '../components/CancelButton'
import Spinner from '../components/Spinner'

export default Blits.Component('PinKeyboard', {
  components: {
    Keyboard,
    PinButtons,
    CancelButton,
    Spinner
  },

  template: `
    <Element w="1920" h="1080" color="{ left:'#9A33FF', right:'#ED51F0' }">
      <Text content="Enter Profile PIN" color="#853fad" size="48" x="774" y="48" :alpha="$isSubmitting ? 0 : 1" />
      <Text
        content="Enter your PIN to access this profile"
        color="#fff"
        size="32"
        x="682"
        y="112"
        :alpha="$isSubmitting ? 0 : 1"
      />
      <Text content="Verify your PIN" color="#853fad" size="48" x="808" y="48" :alpha="$isSubmitting ? 1 : 0" />
      <Spinner :if="$isSubmitting" src="/assets/spinner.png" w="64" h="64" x="930" y="128" :alpha="$isSubmitting ? 1 : 0" />
      <PinButtons ref="$pin" :pin="$pin" :maxPinLength="$maxPinLength" :hasError="$hasError" />
      <Keyboard ref="keyboard" x="478" y="415" :margin="90" :perRow="3" />
      <CancelButton ref="cancel" x="691" y="850" />
      <Text content="Forgot PIN? Visit Readline.com/YourAccount" color="lightgrey" size="32" x="622" y="983" />
    </Element>
  `,

  state() {
    return {
      pin: '',
      maxPinLength: 4,
      focusIndex: 0,
      correctPin: '3579',
      hasError: false,
      focused: 0,
      isSubmitting: false,
      submitTimeout: undefined as ReturnType<typeof setTimeout> | undefined
    }
  },

  hooks: {
    ready() {
      this.$select('keyboard')?.$focus()
    },
    focus() {
      this.$trigger('focused')
    },

    init() {

      this.$listen('onKeyboardInput', ({ key }) => this.addPin(key))

      this.$listen('onPinKey', ({ key }) => this.addPin(key))

      this.$listen('goToCancel', () => {
        if (this.isSubmitting) return 
        this.$select('cancel')?.$focus()
      })

      this.$listen('focusKeyboard', () => {
        this.$select('keyboard')?.$focus()
      })

      this.$listen('cancelPressed', () => {
        this.resetVerification()
        this.$router.to('/')
      })

      this.$listen('onDelete', () => {
        if (this.isSubmitting) return
        this.removePin()
      })


    },
  },
  
watch: {
  pin(newPin: string) {
    // console.log('Trenutni pin:', newPin)
    if (newPin.length >= this.maxPinLength) {
      if (this.isSubmitting) return 
      
    this.submitTimeout = this.$setTimeout(() => {
      this.submitPin()
    }, 1000)
    }
  }
},

input: {
  enter() {
    console.log('Cancel pressed')
  }
},

  methods: {
  addPin(key: string | number) {
    if (this.isSubmitting || this.pin.length >= this.maxPinLength) return;
    this.pin += key
  },

    resetVerification() {
      // cancel the timeout if it exists.
      if (this.submitTimeout) {
        this.$clearTimeout(this.submitTimeout)
        this.submitTimeout = undefined
      }
      
      // reseting state
      this.isSubmitting = false
      this.pin = ''
      this.hasError = false
      
    },

    removePin() {
      if (this.isSubmitting) return
      this.pin = this.pin.slice(0, -1)
    },


    submitPin() {
      if (this.pin.length !== this.maxPinLength) {
        return   // If someone deleted a digit, do nothing.
      }

      if (this.isSubmitting) return
        this.isSubmitting = true 
      if (this.pin === this.correctPin) {
        // console.log('✅ PIN je tačan!')
        this.hasError = false
        this.$emit('pinCorrect')
      } else {
        // console.log('❌ PIN je netačan!')
        this.hasError = true
        this.$emit('pinIncorrect')
      }

    // Reseting PIN after verification
    this.$setTimeout(() => {
      this.resetVerification()
    }, 1000)

      return
    },
  },

})
