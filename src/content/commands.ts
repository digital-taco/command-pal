import { Command } from './types'

const commands: Command[] = [
  {
    command: 'tab.close',
    label: 'Close Tab',
    message: true,
  },
  {
    command: 'tab.open',
    label: 'Open New Tab',
    message: true,
  },
  {
    command: 'tab.duplicate',
    label: 'Duplicate Tab',
    message: true,
  },
]

export default commands
