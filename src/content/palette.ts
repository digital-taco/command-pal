import allCommands from '../commands'
import sendMessage from './send-message'
import { Command } from '../types'
import { pushHistory, getHistory } from './storage'

// we keep track globally which command is highlighted for easy access
let HIGHLIGHTED_CMD_INDEX = 0

// Sort the commands base on recent history
// we do this asynchronously to as to make all the commands available when the user boots up
// the tool. If we run into rendering bugs in the future, we will have to make our whole
// UI render async (right now it is sync)
let commands = allCommands
const sortCommands = async () => {
  const histKeys = await getHistory()
  const calledCommands = histKeys.map((key) => commands.find((cmd) => key === cmd.key))
  const remainingCommands = allCommands
    .filter(({ key }) => !histKeys.includes(key))
    .sort(({ label: a }, { label: b }) => {
      // sorted alphabetically by label
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  commands = [...calledCommands, ...remainingCommands]
}
sortCommands()

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(() => {
  // -----------------------------------------------------------------------------
  // UI Elements
  // -----------------------------------------------------------------------------
  const palette = document.createElement('div')
  const paletteInput = document.createElement('input')
  const paletteContainer = document.createElement('div')
  const paletteOptions = document.createElement('ul')

  // we need id's for testing purposes
  paletteContainer.id = '--command-palette-container--'
  paletteInput.id = '--command-palette-input--'

  paletteInput.classList.add('__palette-input')
  palette.classList.add('__palette')
  palette.classList.add('__palette_frost')
  paletteOptions.classList.add('__palette-options')
  paletteOptions.classList.add('__palette_frost')
  paletteContainer.classList.add('__palette-container')

  paletteContainer.classList.add('__palette-closed')

  palette.appendChild(paletteInput)
  paletteContainer.appendChild(palette)
  paletteContainer.appendChild(paletteOptions)
  document.body.appendChild(paletteContainer)

  // -----------------------------------------------------------------------------
  // UI Management
  // -----------------------------------------------------------------------------

  const paletteState = {
    open: false,
  }

  function togglePalette(): void {
    if (paletteState.open) {
      paletteInput.blur()
      paletteContainer.classList.add('__palette-closed')
      paletteInput.value = ''
      HIGHLIGHTED_CMD_INDEX = 0
    } else {
      paletteInput.focus()
      paletteContainer.classList.remove('__palette-closed')
      paletteOptions.innerHTML = ''
    }
    paletteState.open = !paletteState.open
  }

  // -----------------------------------------------------------------------------
  // Action Processing
  // -----------------------------------------------------------------------------

  function getOptions() {
    const { value } = paletteInput
    const matchingCmds = commands.filter(({ label }: Command) =>
      label.toLowerCase().includes(value.toLowerCase())
    )
    return matchingCmds
  }

  function showOptions() {
    const matchingCmds = getOptions()
    paletteOptions.innerHTML = ''

    matchingCmds.forEach((cmd, index) => {
      const li = document.createElement('li')
      li.classList.add('__palette-option')
      li.innerText = `${cmd.group.icon} ${cmd.label}`
      if (index === HIGHLIGHTED_CMD_INDEX) li.setAttribute('selected', 'true')
      li.addEventListener(
        'click',
        () => {
          handleAction(cmd)
        },
        { once: true }
      )
      paletteOptions.appendChild(li)
    })
  }

  function handleAction(command: Command) {
    if (command.background) {
      sendMessage(command.key)
    } else {
      command.handler?.()
    }
    pushHistory(command.key).then(() => sortCommands())
    togglePalette()
  }

  // -----------------------------------------------------------------------------
  // Event Handling
  // -----------------------------------------------------------------------------

  paletteInput.addEventListener('keyup', ({ code }) => {
    switch (code) {
      // Close the palette
      case 'Escape':
        togglePalette()
        break

      // proccess the user comand
      case 'Enter': {
        const cmd = getOptions()[HIGHLIGHTED_CMD_INDEX]
        cmd && handleAction(cmd)
        break
      }
    }
  })

  // handle Arrow Keys (keydown to access for repeating events)
  paletteInput.addEventListener('keydown', ({ code }) => {
    if (code.startsWith('Arrow')) {
      switch (code) {
        case 'ArrowUp':
          HIGHLIGHTED_CMD_INDEX = Math.max(0, HIGHLIGHTED_CMD_INDEX - 1) // floor at 0
          break

        case 'ArrowDown':
          HIGHLIGHTED_CMD_INDEX = Math.min(HIGHLIGHTED_CMD_INDEX + 1, getOptions().length - 1) // cap at visible commands
          break
      }
      showOptions()
    }
  })

  // update the options list
  paletteInput.addEventListener('input', () => {
    HIGHLIGHTED_CMD_INDEX = 0 // reset the highlighted command when the user is typing
    showOptions()
  })

  // Click away
  document.addEventListener('click', (e) => {
    if (paletteState.open && !palette.contains(e.target as Node)) {
      togglePalette()
    }
  })

  // Open/close the palette
  document.addEventListener('keyup', ({ code, metaKey, ctrlKey, shiftKey }) => {
    if (code === 'Space' && (metaKey || ctrlKey) && shiftKey) {
      togglePalette()
    }
  })
})()
