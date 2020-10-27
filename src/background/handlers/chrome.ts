import { Command } from '../../types'

const classifier = 'chrome'

const group = {
  icon: '⚙️',
  label: 'Browser',
  char: '>',
}

export const settings: Command = {
  key: `${classifier}.settings`,
  label: 'Open Chrome Settings',
  background: true,
  handler: () => {
    chrome.tabs.create({ url: 'chrome://settings' })
  },
  group,
}

export const extensions: Command = {
  key: `${classifier}.extensions`,
  label: 'Manage Chrome Extensions',
  background: true,
  handler: () => {
    chrome.tabs.create({ url: 'chrome://extensions' })
  },
  group,
}

export const version: Command = {
  key: `${classifier}.version`,
  label: 'View Chrome Version',
  background: true,
  handler: () => {
    chrome.tabs.create({ url: 'chrome://version' })
  },
  group,
}

export const history: Command = {
  key: `${classifier}.history`,
  label: 'View Browser History',
  background: true,
  handler: () => {
    chrome.tabs.create({ url: 'chrome://history' })
  },
  group,
}

export const downloads: Command = {
  key: `${classifier}.downloads`,
  label: 'View Downloads',
  background: true,
  handler: () => {
    chrome.tabs.create({ url: 'chrome://downloads' })
  },
  group,
}
