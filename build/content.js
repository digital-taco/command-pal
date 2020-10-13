'use strict';

const commands = [
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
];

function sendMessage(command, options) {
    chrome.runtime.sendMessage({ command: command, options }, (response) => {
        console.log(response === null || response === void 0 ? void 0 : response.complete);
    });
}

(() => {
    const paletteInput = document.createElement('input');
    const palette = document.createElement('div');
    const paletteContainer = document.createElement('div');
    const paletteOptions = document.createElement('ul');
    paletteInput.classList.add('__palette-input');
    palette.classList.add('__palette');
    palette.classList.add('__palette_frost');
    paletteOptions.classList.add('__palette-options');
    paletteOptions.classList.add('__palette_frost');
    paletteContainer.classList.add('__palette-container');
    paletteContainer.classList.add('__palette-closed');
    palette.appendChild(paletteInput);
    paletteContainer.appendChild(palette);
    paletteContainer.appendChild(paletteOptions);
    document.body.appendChild(paletteContainer);
    const paletteState = {
        open: false,
    };
    function togglePalette() {
        if (paletteState.open) {
            paletteInput.blur();
            paletteContainer.classList.add('__palette-closed');
            paletteInput.value = '';
        }
        else {
            paletteInput.focus();
            paletteContainer.classList.remove('__palette-closed');
        }
        paletteState.open = !paletteState.open;
    }
    function getOptions() {
        const { value } = paletteInput;
        const matchingCmds = commands.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()));
        return matchingCmds;
    }
    function showOptions() {
        const matchingCmds = getOptions();
        paletteOptions.innerHTML = '';
        matchingCmds.forEach((cmd, index) => {
            const li = document.createElement('li');
            li.classList.add('__palette-option');
            li.innerText = cmd.label;
            if (index === 0)
                li.setAttribute('selected', 'true');
            li.addEventListener('click', () => {
                handleAction(cmd);
            }, { once: true });
            paletteOptions.appendChild(li);
        });
    }
    function handleAction(command) {
        var _a;
        if (command.message) {
            sendMessage(command.command);
        }
        else {
            (_a = command.handler) === null || _a === void 0 ? void 0 : _a.call(command);
        }
        togglePalette();
    }
    paletteInput.addEventListener('keyup', ({ code }) => {
        showOptions();
        switch (code) {
            case 'Escape':
                togglePalette();
                break;
            case 'Enter': {
                const [cmd] = getOptions();
                handleAction(cmd);
                break;
            }
        }
    });
    document.addEventListener('click', (e) => {
        if (paletteState.open && !palette.contains(e.target)) {
            togglePalette();
        }
    });
    document.addEventListener('keyup', ({ code, metaKey, ctrlKey, shiftKey }) => {
        if (code === 'Space' && (metaKey || ctrlKey) && shiftKey) {
            togglePalette();
        }
    });
})();
