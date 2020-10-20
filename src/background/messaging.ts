import commands from '../commands'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { command } = request

  const cmd = commands.find((cmd) => command === cmd.key)
  const [scope, handlerKey] = command.split('.')

  if (!cmd) {
    sendResponse({ complete: false })
    throw new Error(`Command not found ${scope}::${handlerKey}`)
  }

  const { handler } = cmd

  if (handler) {
    handler()
  } else {
    throw new Error(`Command Handler not found ${scope}::${handlerKey}::handler`)
  }

  sendResponse({ complete: true })
})
