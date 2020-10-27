import { Command } from '../../types'

const classifier = 'tab'

const group = {
  icon: '🗂',
  label: 'Tabs',
  char: '#',
}

export const close: Command = {
  key: `${classifier}.close`,
  label: 'Close the Current Tab',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      currentTab && chrome.tabs.remove(currentTab.id)
    })
  },
  group,
}

export const duplicate: Command = {
  key: `${classifier}.duplicate`,
  label: 'Duplicate Tab',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      currentTab && chrome.tabs.duplicate(currentTab.id)
    })
  },
  group,
}

export const open: Command = {
  key: `${classifier}.open`,
  label: 'Open New Tab',
  background: true,
  handler: () => {
    chrome.tabs.create({})
  },
  group,
}

export const reload: Command = {
  key: `${classifier}.reload`,
  label: 'Reload Page',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      currentTab && chrome.tabs.reload(currentTab.id)
    })
  },
  group,
}

export const hardReload: Command = {
  key: `${classifier}.hardReload`,
  label: 'Reload Page (Ignore Cache)',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      currentTab && chrome.tabs.reload(currentTab.id, { bypassCache: true })
    })
  },
  group,
}

export const restoreTab: Command = {
  key: `${classifier}.restoreTab`,
  label: 'Restore last closed tab',
  background: true,
  handler: () => {
    chrome.sessions.getRecentlyClosed((sessions) => {
      chrome.sessions.restore(sessions[0].tab.sessionId)
    })
  },
  group,
}

export const restoreWindow: Command = {
  key: `${classifier}.restoreWindow`,
  label: 'Restore last closed window',
  background: true,
  handler: () => {
    chrome.sessions.getRecentlyClosed((sessions) => {
      chrome.sessions.restore(sessions[0].tab.sessionId)
    })
  },
  group,
}

export const mute: Command = {
  key: `${classifier}.mute`,
  label: 'Mute Tab',
  background: true,
  handler: () => {
    chrome.tabs.update(undefined, { muted: true })
  },
  group,
}

export const unmute: Command = {
  key: `${classifier}.unmute`,
  label: 'Unmute Tab',
  background: true,
  handler: () => {
    chrome.tabs.update(undefined, { muted: false })
  },
  group,
}

export const pin: Command = {
  key: `${classifier}.pin`,
  label: 'Pin Tab',
  background: true,
  handler: () => {
    chrome.tabs.update(undefined, { pinned: true })
  },
  group,
}

export const unpin: Command = {
  key: `${classifier}.unpin`,
  label: 'Unpin Tab',
  background: true,
  handler: () => {
    chrome.tabs.update(undefined, { pinned: false })
  },
  group,
}

export const goBack: Command = {
  key: `${classifier}.goBack`,
  label: 'Go Back',
  background: true,
  handler: () => {
    chrome.tabs.goBack()
  },
  group,
}

export const goForward: Command = {
  key: `${classifier}.goForward`,
  label: 'Go Forward',
  background: true,
  handler: () => {
    chrome.tabs.goForward()
  },
  group,
}

export const zoomIn: Command = {
  key: `${classifier}.zoomIn`,
  label: 'Zoom In',
  background: true,
  handler: () => {
    chrome.tabs.getZoom(undefined, (zoomFactor) => {
      chrome.tabs.setZoom(zoomFactor + 0.1)
    })
  },
  group,
}

export const zoomOut: Command = {
  key: `${classifier}.zoomOut`,
  label: 'Zoom Out',
  background: true,
  handler: () => {
    chrome.tabs.getZoom(undefined, (zoomFactor) => {
      chrome.tabs.setZoom(zoomFactor - 0.1)
    })
  },
  group,
}

export const moveToStart: Command = {
  key: `${classifier}.moveToStart`,
  label: 'Move To Left Side',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      chrome.tabs.move(currentTab.id, { index: 0 })
    })
  },
  group,
}

export const moveToEnd: Command = {
  key: `${classifier}.moveToEnd`,
  label: 'Move To Right Side',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      chrome.tabs.move(currentTab.id, { index: -1 })
    })
  },
  group,
}

export const moveLeft: Command = {
  key: `${classifier}.moveLeft`,
  label: 'Move Left',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      chrome.tabs.move(currentTab.id, { index: currentTab.index - 1 })
    })
  },
  group,
}

export const moveRight: Command = {
  key: `${classifier}.moveRight`,
  label: 'Move Right',
  background: true,
  handler: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]
      chrome.tabs.move(currentTab.id, { index: currentTab.index + 1 })
    })
  },
  group,
}
