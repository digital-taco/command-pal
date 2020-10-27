import { Command } from '../../types'

const classifier = 'bookmarks'

const group = {
  icon: '🏷',
  label: 'Bookmarks',
  char: '$',
}

export const bookmark: Command = {
  key: `${classifier}.bookmark`,
  label: 'Bookmark Page',
  background: true,
  handler: () => {
    chrome.windows.create()
  },
  group,
}
