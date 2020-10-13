import commands from './commands'
import sendMessage from './send-message'
import { Command } from './types'

// eslint-disable-next-line @typescript-eslint/no-extra-semi
;(() => {
  // -----------------------------------------------------------------------------
  // UI Elements
  // -----------------------------------------------------------------------------
  const paletteInput = document.createElement('input')
  const palette = document.createElement('div')
  const paletteContainer = document.createElement('div')
  const paletteOptions = document.createElement('ul')

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
  // UI Managment
  // -----------------------------------------------------------------------------

  const paletteState = {
    open: false,
  }

  function togglePalette(): void {
    if (paletteState.open) {
      paletteInput.blur()
      paletteContainer.classList.add('__palette-closed')
      paletteInput.value = ''
    } else {
      paletteInput.focus()
      paletteContainer.classList.remove('__palette-closed')
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
      li.innerText = cmd.label
      if (index === 0) li.setAttribute('selected', 'true')
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
    if (command.message) {
      sendMessage(command.command)
    } else {
      command.handler?.()
    }
    togglePalette()
  }

  // -----------------------------------------------------------------------------
  // Event Handling
  // -----------------------------------------------------------------------------

  paletteInput.addEventListener('keyup', ({ code }) => {
    // update the options list
    showOptions()

    switch (code) {
      // Close the palette
      case 'Escape':
        togglePalette()
        break
      // proccess the user comand
      case 'Enter': {
        const [cmd] = getOptions()
        handleAction(cmd)
        break
      }
    }
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
