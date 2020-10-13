import * as tabHandlers from './handlers/tabs'

import commands from '../content/commands'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { command, options } = request

  // const [scope, ...path] = command.split('.')

  switch (command) {
    case 'tab.close':
      return tabHandlers.close()
    case 'tab.duplicate':
      return tabHandlers.duplicate()
    case 'tab.open':
      return tabHandlers.open()
    case 'tab.reload':
      return tabHandlers.reload()
    case 'tab.hardReload':
      return tabHandlers.hardReload()
  }

  sendResponse({ complete: true })
})
