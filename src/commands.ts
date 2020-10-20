import { Command } from './types'

import * as tabs from './background/handlers/tabs'
import * as windows from './background/handlers/windows'
import * as chrome from './background/handlers/chrome'
import * as videos from './background/handlers/videos'

const commands: Command[] = [
  ...Object.values(tabs),
  ...Object.values(windows),
  ...Object.values(chrome),
  ...Object.values(videos),
]

export default commands
