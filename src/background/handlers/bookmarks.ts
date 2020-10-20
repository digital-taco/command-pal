import { Command } from '../../types'

const classifier = 'bookmarks'

export const bookmark: Command = {
  key: `${classifier}.bookmark`,
  label: 'Bookmark Page',
  background: true,
  handler: () => {
    chrome.windows.create()
  },
}
