import { Command } from '../../types'

const classifier = 'videos'

const group = {
  icon: '🎥',
  label: 'Video',
  char: '%',
}

interface VideoElement extends HTMLVideoElement {
  requestPictureInPicture(): Promise<void>
}

interface CustomDocument extends Document {
  pictureInPictureEnabled: boolean
  exitPictureInPicture(): Promise<void>
}

export const pauseVideo: Command = {
  key: `${classifier}.pauseVideo`,
  label: 'Pause Video',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    video?.pause()
  },
  group,
}

export const playVideo: Command = {
  key: `${classifier}.playVideo`,
  label: 'Play Video',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    video?.play()
  },
  group,
}

export const openPictureInPicture: Command = {
  key: `${classifier}.openPictureInPicture`,
  label: 'Open Video PiP (Picture in Picture) Mode',
  background: false,
  custom: true,
  handler: () => {
    const customDoc = document as CustomDocument
    if (customDoc.pictureInPictureEnabled) {
      const video = document.getElementsByTagName('video')[0] as VideoElement
      video?.requestPictureInPicture()
    }
  },
  group,
}

export const closePictureInPicture: Command = {
  key: `${classifier}.closePictureInPicture`,
  label: 'Close PiP (Picture in Picture)',
  background: false,
  custom: true,
  handler: () => {
    const customDoc = document as CustomDocument
    if (customDoc.pictureInPictureEnabled) {
      customDoc.exitPictureInPicture()
    }
  },
  group,
}

// ---------------------------------------------------------------------
// Playback Speeds
// ---------------------------------------------------------------------
export const playSpeed05: Command = {
  key: `${classifier}.playSpeed05`,
  label: 'Set Video Speed - 0.5x',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    if (video) video.playbackRate = 0.5
  },
  group,
}
export const playSpeed10: Command = {
  key: `${classifier}.playSpeed10`,
  label: 'Set Video Speed - 1x',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    if (video) video.playbackRate = 1
  },
  group,
}
export const playSpeed15: Command = {
  key: `${classifier}.playSpeed15`,
  label: 'Set Video Speed - 1.5x',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    if (video) video.playbackRate = 1.5
  },
  group,
}
export const playSpeed20: Command = {
  key: `${classifier}.playSpeed20`,
  label: 'Set Video Speed - 2x',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    if (video) video.playbackRate = 2
  },
  group,
}
export const playSpeed25: Command = {
  key: `${classifier}.playSpeed25`,
  label: 'Set Video Speed - 2.5x',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    if (video) video.playbackRate = 2.5
  },
  group,
}
export const playSpeed30: Command = {
  key: `${classifier}.playSpeed30`,
  label: 'Set Video Speed - 3x',
  background: false,
  custom: true,
  handler: () => {
    const video = document.getElementsByTagName('video')[0]
    if (video) video.playbackRate = 3
  },
  group,
}
