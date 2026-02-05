// @ts-nocheck
/*
 * Copyright 2024 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-ignore
import shaka from 'shaka-player'

// @ts-ignore
let player
// @ts-ignore
let videoElement

const state = {
  playingState: false,
}

/**
 * Initializes the player.
 * @param {HTMLElement} [element] - The video element used to initiate playback in.
 * @returns {Promise<void>}
 */
const init = async (element) => {
  shaka.polyfill.installAll() // polyfilling for devices that need it.

  videoElement = element

  if (!videoElement) {
    videoElement = document.createElement('video')

    videoElement.style.cssText = 'position: absolute; top: 0; left: 0; z-index: -1'

    videoElement.width = window.innerWidth
    videoElement.height = window.innerHeight

    player = new shaka.Player()
    await player.attach(videoElement)

    videoElement.autoplay = false

    // Listen for error events.
    // @ts-ignore
    player.addEventListener('error', (err) => {
      console.error(err)
    })
    document.body.insertBefore(videoElement, document.body.firstChild)

    // 🔥 ATTACH SEEKED LISTENER HERE 🔥
    videoElement.addEventListener('seeked', onSeeked)
  }
}
/**
 * Loads the player.
 * @param {Object} config - The player configuration.
 * @returns {Promise<void>}
 */
const load = async (config) => {
  // @ts-ignore
  if (!player || !videoElement) {
    throw 'Player not initialized yet'
  }

  // @ts-ignore
  await player.load(config.streamUrl)
}

const play = () => {
  // @ts-ignore
  videoElement.play().then(() => {
    state.playingState = true
  })
}

const pause = () => {
  // @ts-ignore
  videoElement.pause()
  state.playingState = false
}

const destroy = async () => {
  // @ts-ignore
  await player.destroy()

  player = null
  // @ts-ignore
  videoElement.remove()
  videoElement = null
}

const getCurrentTime = () => {
  // @ts-ignore
  return videoElement.currentTime
}

const getVideoDuration = () => {
  // @ts-ignore
  return videoElement.duration
}

let pendingSeekTime = null
let resumeTimeout = null
let wasPlayingBeforeSeek = false

const seekFW = () => {
  if (!videoElement) return

  const current = pendingSeekTime ?? videoElement.currentTime
  pendingSeekTime = Math.min(current + 15, videoElement.duration - 0.1)

  wasPlayingBeforeSeek = !videoElement.paused
  videoElement.pause()

  clearTimeout(resumeTimeout)

  resumeTimeout = setTimeout(() => {
    videoElement.currentTime = pendingSeekTime
  }, 500) // match LJS2 easeExecution timing
}

const onSeeked = () => {
  console.log('asdf seeked upad')
  pendingSeekTime = null

  if (wasPlayingBeforeSeek) {
    clearTimeout(resumeTimeout)
    resumeTimeout = setTimeout(() => {
      videoElement.play()
    }, 500) // yes, ANOTHER delay
  }
}

4 // @ts-ignore
const seekBW = () => {
  // @ts-ignore
  return (videoElement.currentTime = videoElement.currentTime - 5)
}

const getTimeFormat = () => {
  // @ts-ignore
  let secondsToMmSs = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)
  // @ts-ignore
  return `${secondsToMmSs(videoElement.currentTime)} : ${secondsToMmSs(
    // @ts-ignore
    Math.floor(videoElement.duration)
  )}`
}

export default {
  init,
  load,
  play,
  pause,
  getCurrentTime,
  getVideoDuration,
  seekFW,
  seekBW,
  getTimeFormat,
  state,
  destroy,
}
