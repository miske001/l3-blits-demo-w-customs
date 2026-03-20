// @ts-nocheck
import Blits from '@lightningjs/blits'
import PlayerManager from '../managers/PlayerManager.js'
import ProgressBar from '../components/Player/ProgressBar.js'
import HorizontalContainer from '../components/HorizontalContainer.js'
import PlayerBtn from '../components/Player/PlayerBtn.js'
import PlayerChBtn from '../components/Player/PlayerChBtn.js'
import PlayerContainer from '../components/Player/PlayerContainer.js'
import SearchTerm from '../components/Keyboard/SearchTerm.js'
import MomentItem from '../components/Player/MomentItem.js'

export default Blits.Component('Player', {
  components: {
    ProgressBar,
    HorizontalContainer,
    PlayerBtn,
    PlayerChBtn,
    PlayerContainer,
    SearchTerm,
    MomentItem,
  },
  template: `
    <Element>
      <Element
        y="1090"
        mount="{y:1}"
        w="1920"
        h="250"
        :color="{top: 'transparent', bottom: '#000'}"
        :alpha.transition="$controlsVisibility"
      >
        <Element x="60" y="20">
          <Element y="-10" w="80" h="80" color="#2B2B2B" :effects="[{type: 'radius', props: {radius:99}}]">
            <Element
              mount="0.5"
              y="40"
              x="40"
              w="32"
              h="32"
              :src="$playing ? 'assets/player/pause.png' : 'assets/player/play.png'"
            />
          </Element>
          <Text :content="$currentTime" size="25" x="115" y="16" />
          <ProgressBar ref="progressBar" :progress="$progress" :progressLength="$progressLength" />
          <Text x="1675" y="16" size="25" :content="$duration" />
        </Element>
        <HorizontalContainer
          ref="btnsContainer"
          x="60"
          y="100"
          items="$plBtns"
          allowBubbling="true"
          autoScroll="false"
          gap="25"
        />
      </Element>
      <PlayerContainer
        ref="playerContainerMom"
        :show="$showContainer && $showedContainerIndex === 0 ? 1 : 0"
        y="90"
        x="1260"
        label="Moments"
        width="600"
        height="750"
        items="$moments"
        vertContX="30"
        autoScroll="true"
      />
      <PlayerContainer
        ref="playerContainerQual"
        :show="$showContainer && $showedContainerIndex === 1 ? 1 : 0"
        y="90"
        x="1350"
        label="Quality"
        width="510"
        height="665"
        items="$videoQualArr"
        vertContX="50"
        autoScroll="false"
        :selected="$selectedQuality"
      />
    </Element>
  `,
  state() {
    return {
      focused: 0,
      showContainer: false,
      showedContainerIndex: 0,
      controlsVisibility: 0,
      progressLength: 1460,
      progress: 0,
      currentTime: '00:00',
      duration: '00:00',
      playing: false,
      hideTimeout: null,
      isScrubbing: false,
      scrubPreviewTime: 0,
      scrubTimeout: null,
      selectedQuality: 0,
      plBtns: [
        {
          type: PlayerChBtn,
          width: 130,
          height: 80,
          src: 'assets/fenerLogo.png',
        },
        {
          type: PlayerBtn,
          label: 'Start Over',
          width: 80,
          height: 80,
          src: 'assets/replay.png',
          callback: this.startOver,
        },
        {
          type: PlayerBtn,
          label: 'Play Next',
          width: 80,
          height: 80,
          src: 'assets/playNext.png',
        },
        {
          type: PlayerBtn,
          label: 'Moments',
          width: 80,
          height: 80,
          src: 'assets/bookmark.png',
          action: 'togglePlayerContainer',
          actionVal: 'moments',
        },
        {
          type: PlayerBtn,
          label: 'Quality',
          width: 80,
          height: 80,
          src: 'assets/hdIcon.png',
          action: 'togglePlayerContainer',
          actionVal: 'quality',
        },
        {
          type: PlayerBtn,
          label: 'Channel List',
          width: 80,
          height: 80,
          src: 'assets/chch.png',
        },
        {
          type: PlayerBtn,
          label: 'More Info',
          width: 80,
          height: 80,
          src: 'assets/dots.png',
        },
      ],
      videoQualArr: [
        {
          type: SearchTerm,
          rowH: 72,
          value: '1080p HD',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
          id: 0,
          isLeaf: true,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '720p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
          id: 1,
          isLeaf: true,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '480p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
          id: 2,
          isLeaf: true,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '360p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
          id: 3,
          isLeaf: true,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '240p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
          id: 4,
          isLeaf: true,
        },
        {
          type: SearchTerm,
          rowH: 72,
          value: '144p',
          width: 420,
          height: 72,
          textSize: 27,
          radius: 35,
          id: 5,
          isLeaf: true,
        },
      ],
      moments: [
        {
          type: MomentItem,
          label: 'Moment 1',
          text: 'Trabzonpor Line-up',
          time: '01:30',
          width: 530,
          height: 180,
          textSize: 27,
          radius: 20,
          imgSrc: '',
        },
        {
          type: MomentItem,
          label: 'Moment 2',
          text: 'Goal to Fenerbahce - Arda Guler',
          time: '01:30',
          width: 530,
          height: 180,
          textSize: 27,
          radius: 20,
          imgSrc: '',
        },
        {
          type: MomentItem,
          label: 'Moment 3',
          text: 'Tears stream down, crazy festival',
          time: '01:30',
          width: 530,
          height: 180,
          textSize: 27,
          radius: 20,
          imgSrc: '',
        },
        {
          type: MomentItem,
          label: 'Moment 4',
          text: 'test text work',
          width: 530,
          height: 180,
          textSize: 27,
          radius: 20,
          imgSrc: '',
        },
        {
          type: MomentItem,
          label: 'Moment 5',
          text: 'test text work',
          width: 530,
          height: 180,
          textSize: 27,
          radius: 20,
          imgSrc: '',
        },
        {
          type: MomentItem,
          label: 'Moment 6',
          text: 'test text work',
          width: 530,
          height: 180,
          textSize: 27,
          radius: 20,
          imgSrc: '',
        },
      ],
    }
  },
  hooks: {
    focus() {
      this.$emit('clearBackground')
      this.$trigger('focused')
    },
    unfocus() {
      this.$emit('changeBackground')
    },
    async init() {
      this.$listen('seekFromProgBar', (val) => {
        this.seek(val)
      })
      await PlayerManager.init()

      this.$listen('togglePlayerContainer', (container) => {
        this.toggleContainer(container)
      })

      this.$listen('changeQuality', (val) => {
        this.selectedQuality = val
      })
    },
    async ready() {
      await PlayerManager.load({
        streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      })
      const secondsToMmSs = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)
      const duration = PlayerManager.getVideoDuration()

      if (duration) {
        this.duration = secondsToMmSs(duration)
        this.progressChunkSize = Math.floor((this.progressLength / duration) * 100) / 100
      }

      this.$setInterval(() => {
        if (this.isScrubbing || !this.playing) return

        const currentTime = PlayerManager.getCurrentTime()
        this.currentTime = secondsToMmSs(currentTime)
        this.progress = Math.floor(currentTime * this.progressChunkSize)
        if (Math.floor(PlayerManager.getCurrentTime()) === Math.floor(duration)) {
          console.log('asdf upad u exit')
          this.$router.back()
        }
      }, 1000)

      this.togglePlay()
    },
    async destroy() {
      await PlayerManager.destroy()
    },
  },
  watch: {
    focused(v) {
      if (v === 0) {
        this.$select('progressBar')?.$focus()
      } else if (v === 1) {
        this.$select('btnsContainer')?.$focus()
      }
    },
  },
  input: {
    enter() {
      console.log('asdf upad enter')
      if (this.controlsVisibility === 0) {
        this.showNhidePlayerUIDebounced()
      } else if (this.focused === 0) {
        this.togglePlay()
      }
    },
    up() {
      // this.showControls(1)
      this.showNhidePlayerUIDebounced()
      this.focused = 0
    },
    down() {
      // this.showControls(0)
      this.showNhidePlayerUIDebounced()
      this.focused = 1
    },
    left() {
      this.showNhidePlayerUIDebounced()
    },
    right() {
      this.showNhidePlayerUIDebounced()
    },
  },
  methods: {
    togglePlay() {
      // this.showControls(1)
      // this.hideTimeout = this.$setTimeout(() => this.showControls(0), 5000)
      this.showNhidePlayerUIDebounced()
      if (this.playing) {
        PlayerManager.pause()
        this.playing = false
      } else {
        console.log('play!')
        PlayerManager.play()
        this.playing = true
      }
    },
    showControls(v) {
      this.$clearTimeout(this.hideTimeout)
      this.controlsVisibility = v
    },
    showNhidePlayerUIDebounced() {
      this.controlsVisibility = 1

      if (this.hideTimeout) this.$clearTimeout(this.hideTimeout)

      if (this.showContainer) return

      this.hideTimeout = this.$setTimeout(() => {
        this.controlsVisibility = 0
        this.focused = 0
      }, 5000)
    },

    seek(direction) {
      this.showNhidePlayerUIDebounced()

      const step = 10

      // Start scrubbing mode
      if (!this.isScrubbing) {
        this.isScrubbing = true
        this.scrubPreviewTime = PlayerManager.getCurrentTime()
      }

      if (direction === 'left') {
        this.scrubPreviewTime = Math.max(0, this.scrubPreviewTime - step)
      } else {
        const duration = PlayerManager.getVideoDuration()
        this.scrubPreviewTime = Math.min(duration, this.scrubPreviewTime + step)
      }

      // Update UI immediately
      const secondsToMmSs = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)

      this.currentTime = secondsToMmSs(this.scrubPreviewTime)
      this.progress = Math.floor(this.scrubPreviewTime * this.progressChunkSize)

      // Debounce real seek
      if (this.scrubTimeout) this.$clearTimeout(this.scrubTimeout)

      this.scrubTimeout = this.$setTimeout(() => {
        PlayerManager.seekTo(this.scrubPreviewTime)
        this.isScrubbing = false
      }, 600)
    },
    startOver() {
      PlayerManager.seekTo(0)
    },
    toggleContainer(container) {
      console.log('asdf container: ', container)
      if (container === 'moments') {
        this.showedContainerIndex = 0
      } else if (container === 'quality') {
        this.showedContainerIndex = 1
      }

      console.log('asdf containerDATA: ', this.selectedContainerData)

      this.showContainer = !this.showContainer
      if (this.hideTimeout && this.showContainer) {
        this.$clearTimeout(this.hideTimeout)
      }

      if (this.showContainer && this.showedContainerIndex === 0) {
        this.$select('playerContainerMom')?.$focus()
      } else if (this.showContainer && this.showedContainerIndex === 1) {
        this.$select('playerContainerQual')?.$focus()
      } else if (!this.showContainer) {
        this.$trigger('focused')
        this.showNhidePlayerUIDebounced()
      }
    },
  },
})
