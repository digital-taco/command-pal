import { Command } from '../../types'

const classifier = 'window'

const group = {
  icon: '⚙️',
  label: 'Browser',
  char: '>',
}

export const open: Command = {
  key: `${classifier}.open`,
  label: 'Open New Window',
  background: true,
  handler: () => {
    chrome.windows.create()
  },
  group,
}

export const openIncognito: Command = {
  key: `${classifier}.openIncognito`,
  label: 'Open New Incognito Window',
  background: true,
  handler: () => {
    chrome.windows.create({ incognito: true })
  },
  group,
}

export const goFullscreen: Command = {
  key: `${classifier}.goFullscreen`,
  label: 'Toggle Fullscreen',
  background: true,
  handler: () => {
    chrome.windows.getCurrent((window) => {
      chrome.windows.update(window.id, {
        state: window.state === 'fullscreen' ? 'normal' : 'fullscreen',
      })
    })
  },
  group,
}

export const minimize: Command = {
  key: `${classifier}.minimize`,
  label: 'Minimize Window',
  background: true,
  handler: () => {
    chrome.windows.getCurrent((window) => {
      chrome.windows.update(window.id, {
        state: 'minimized',
      })
    })
  },
  group,
}
