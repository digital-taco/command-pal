'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const classifier = 'tab';
const group = {
    icon: '🗂',
    label: 'Tabs',
    char: '#',
};
const close = {
    key: `${classifier}.close`,
    label: 'Close the Current Tab',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            currentTab && chrome.tabs.remove(currentTab.id);
        });
    },
    group,
};
const duplicate = {
    key: `${classifier}.duplicate`,
    label: 'Duplicate Tab',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            currentTab && chrome.tabs.duplicate(currentTab.id);
        });
    },
    group,
};
const open = {
    key: `${classifier}.open`,
    label: 'Open New Tab',
    background: true,
    handler: () => {
        chrome.tabs.create({});
    },
    group,
};
const reload = {
    key: `${classifier}.reload`,
    label: 'Reload Page',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            currentTab && chrome.tabs.reload(currentTab.id);
        });
    },
    group,
};
const hardReload = {
    key: `${classifier}.hardReload`,
    label: 'Reload Page (Ignore Cache)',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            currentTab && chrome.tabs.reload(currentTab.id, { bypassCache: true });
        });
    },
    group,
};
const restoreTab = {
    key: `${classifier}.restoreTab`,
    label: 'Restore last closed tab',
    background: true,
    handler: () => {
        chrome.sessions.getRecentlyClosed((sessions) => {
            chrome.sessions.restore(sessions[0].tab.sessionId);
        });
    },
    group,
};
const restoreWindow = {
    key: `${classifier}.restoreWindow`,
    label: 'Restore last closed window',
    background: true,
    handler: () => {
        chrome.sessions.getRecentlyClosed((sessions) => {
            chrome.sessions.restore(sessions[0].tab.sessionId);
        });
    },
    group,
};
const mute = {
    key: `${classifier}.mute`,
    label: 'Mute Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { muted: true });
    },
    group,
};
const unmute = {
    key: `${classifier}.unmute`,
    label: 'Unmute Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { muted: false });
    },
    group,
};
const pin = {
    key: `${classifier}.pin`,
    label: 'Pin Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { pinned: true });
    },
    group,
};
const unpin = {
    key: `${classifier}.unpin`,
    label: 'Unpin Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { pinned: false });
    },
    group,
};
const goBack = {
    key: `${classifier}.goBack`,
    label: 'Go Back',
    background: true,
    handler: () => {
        chrome.tabs.goBack();
    },
    group,
};
const goForward = {
    key: `${classifier}.goForward`,
    label: 'Go Forward',
    background: true,
    handler: () => {
        chrome.tabs.goForward();
    },
    group,
};
const zoomIn = {
    key: `${classifier}.zoomIn`,
    label: 'Zoom In',
    background: true,
    handler: () => {
        chrome.tabs.getZoom(undefined, (zoomFactor) => {
            chrome.tabs.setZoom(zoomFactor + 0.1);
        });
    },
    group,
};
const zoomOut = {
    key: `${classifier}.zoomOut`,
    label: 'Zoom Out',
    background: true,
    handler: () => {
        chrome.tabs.getZoom(undefined, (zoomFactor) => {
            chrome.tabs.setZoom(zoomFactor - 0.1);
        });
    },
    group,
};
const moveToStart = {
    key: `${classifier}.moveToStart`,
    label: 'Move To Left Side',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            chrome.tabs.move(currentTab.id, { index: 0 });
        });
    },
    group,
};
const moveToEnd = {
    key: `${classifier}.moveToEnd`,
    label: 'Move To Right Side',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            chrome.tabs.move(currentTab.id, { index: -1 });
        });
    },
    group,
};
const moveLeft = {
    key: `${classifier}.moveLeft`,
    label: 'Move Left',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            chrome.tabs.move(currentTab.id, { index: currentTab.index - 1 });
        });
    },
    group,
};
const moveRight = {
    key: `${classifier}.moveRight`,
    label: 'Move Right',
    background: true,
    handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            chrome.tabs.move(currentTab.id, { index: currentTab.index + 1 });
        });
    },
    group,
};

var tabs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    close: close,
    duplicate: duplicate,
    open: open,
    reload: reload,
    hardReload: hardReload,
    restoreTab: restoreTab,
    restoreWindow: restoreWindow,
    mute: mute,
    unmute: unmute,
    pin: pin,
    unpin: unpin,
    goBack: goBack,
    goForward: goForward,
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    moveToStart: moveToStart,
    moveToEnd: moveToEnd,
    moveLeft: moveLeft,
    moveRight: moveRight
});

const classifier$1 = 'window';
const group$1 = {
    icon: '⚙️',
    label: 'Browser',
    char: '>',
};
const open$1 = {
    key: `${classifier$1}.open`,
    label: 'Open New Window',
    background: true,
    handler: () => {
        chrome.windows.create();
    },
    group: group$1,
};
const openIncognito = {
    key: `${classifier$1}.openIncognito`,
    label: 'Open New Incognito Window',
    background: true,
    handler: () => {
        chrome.windows.create({ incognito: true });
    },
    group: group$1,
};
const goFullscreen = {
    key: `${classifier$1}.goFullscreen`,
    label: 'Toggle Fullscreen',
    background: true,
    handler: () => {
        chrome.windows.getCurrent((window) => {
            chrome.windows.update(window.id, {
                state: window.state === 'fullscreen' ? 'normal' : 'fullscreen',
            });
        });
    },
    group: group$1,
};
const minimize = {
    key: `${classifier$1}.minimize`,
    label: 'Minimize Window',
    background: true,
    handler: () => {
        chrome.windows.getCurrent((window) => {
            chrome.windows.update(window.id, {
                state: 'minimized',
            });
        });
    },
    group: group$1,
};

var windows = /*#__PURE__*/Object.freeze({
    __proto__: null,
    open: open$1,
    openIncognito: openIncognito,
    goFullscreen: goFullscreen,
    minimize: minimize
});

const classifier$2 = 'chrome';
const group$2 = {
    icon: '⚙️',
    label: 'Browser',
    char: '>',
};
const settings = {
    key: `${classifier$2}.settings`,
    label: 'Open Chrome Settings',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://settings' });
    },
    group: group$2,
};
const extensions = {
    key: `${classifier$2}.extensions`,
    label: 'Manage Chrome Extensions',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://extensions' });
    },
    group: group$2,
};
const version = {
    key: `${classifier$2}.version`,
    label: 'View Chrome Version',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://version' });
    },
    group: group$2,
};
const history = {
    key: `${classifier$2}.history`,
    label: 'View Browser History',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://history' });
    },
    group: group$2,
};
const downloads = {
    key: `${classifier$2}.downloads`,
    label: 'View Downloads',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://downloads' });
    },
    group: group$2,
};

var chrome$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    settings: settings,
    extensions: extensions,
    version: version,
    history: history,
    downloads: downloads
});

const classifier$3 = 'videos';
const group$3 = {
    icon: '🎥',
    label: 'Video',
    char: '%',
};
const pauseVideo = {
    key: `${classifier$3}.pauseVideo`,
    label: 'Pause Video',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        video === null || video === void 0 ? void 0 : video.pause();
    },
    group: group$3,
};
const playVideo = {
    key: `${classifier$3}.playVideo`,
    label: 'Play Video',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        video === null || video === void 0 ? void 0 : video.play();
    },
    group: group$3,
};
const openPictureInPicture = {
    key: `${classifier$3}.openPictureInPicture`,
    label: 'Open Video PiP (Picture in Picture) Mode',
    background: false,
    custom: true,
    handler: () => {
        const customDoc = document;
        if (customDoc.pictureInPictureEnabled) {
            const video = document.getElementsByTagName('video')[0];
            video === null || video === void 0 ? void 0 : video.requestPictureInPicture();
        }
    },
    group: group$3,
};
const closePictureInPicture = {
    key: `${classifier$3}.closePictureInPicture`,
    label: 'Close PiP (Picture in Picture)',
    background: false,
    custom: true,
    handler: () => {
        const customDoc = document;
        if (customDoc.pictureInPictureEnabled) {
            customDoc.exitPictureInPicture();
        }
    },
    group: group$3,
};
const playSpeed05 = {
    key: `${classifier$3}.playSpeed05`,
    label: 'Set Video Speed - 0.5x',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        if (video)
            video.playbackRate = 0.5;
    },
    group: group$3,
};
const playSpeed10 = {
    key: `${classifier$3}.playSpeed10`,
    label: 'Set Video Speed - 1x',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        if (video)
            video.playbackRate = 1;
    },
    group: group$3,
};
const playSpeed15 = {
    key: `${classifier$3}.playSpeed15`,
    label: 'Set Video Speed - 1.5x',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        if (video)
            video.playbackRate = 1.5;
    },
    group: group$3,
};
const playSpeed20 = {
    key: `${classifier$3}.playSpeed20`,
    label: 'Set Video Speed - 2x',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        if (video)
            video.playbackRate = 2;
    },
    group: group$3,
};
const playSpeed25 = {
    key: `${classifier$3}.playSpeed25`,
    label: 'Set Video Speed - 2.5x',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        if (video)
            video.playbackRate = 2.5;
    },
    group: group$3,
};
const playSpeed30 = {
    key: `${classifier$3}.playSpeed30`,
    label: 'Set Video Speed - 3x',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        if (video)
            video.playbackRate = 3;
    },
    group: group$3,
};

var videos = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pauseVideo: pauseVideo,
    playVideo: playVideo,
    openPictureInPicture: openPictureInPicture,
    closePictureInPicture: closePictureInPicture,
    playSpeed05: playSpeed05,
    playSpeed10: playSpeed10,
    playSpeed15: playSpeed15,
    playSpeed20: playSpeed20,
    playSpeed25: playSpeed25,
    playSpeed30: playSpeed30
});

const commands = [
    ...Object.values(tabs),
    ...Object.values(windows),
    ...Object.values(chrome$1),
    ...Object.values(videos),
];

function sendMessage(command, options) {
    chrome.runtime.sendMessage({ command: command, options }, (response) => {
        console.log(response === null || response === void 0 ? void 0 : response.complete);
    });
}

const userHistoryKey = 'user-history';
function getHistory() {
    return new Promise(resolve => {
        chrome.storage.local.get([userHistoryKey], function (result = []) {
            resolve(result[userHistoryKey] || []);
        });
    });
}
function pushHistory(commandKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const hist = yield getHistory();
        const newHist = [...new Set([commandKey, ...hist])];
        return new Promise(resolve => {
            chrome.storage.local.set({ [userHistoryKey]: newHist }, () => {
                resolve(newHist);
            });
        });
    });
}

let HIGHLIGHTED_CMD_INDEX = 0;
let commands$1 = commands;
const sortCommands = () => __awaiter(void 0, void 0, void 0, function* () {
    const histKeys = yield getHistory();
    const calledCommands = histKeys.map((key) => commands$1.find((cmd) => key === cmd.key));
    const remainingCommands = commands
        .filter(({ key }) => !histKeys.includes(key))
        .sort(({ label: a }, { label: b }) => {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    });
    commands$1 = [...calledCommands, ...remainingCommands];
});
sortCommands();
(() => {
    const palette = document.createElement('div');
    const paletteInput = document.createElement('input');
    const paletteContainer = document.createElement('div');
    const paletteOptions = document.createElement('ul');
    paletteContainer.id = '--command-palette-container--';
    paletteInput.id = '--command-palette-input--';
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
            HIGHLIGHTED_CMD_INDEX = 0;
        }
        else {
            paletteInput.focus();
            paletteContainer.classList.remove('__palette-closed');
            paletteOptions.innerHTML = '';
        }
        paletteState.open = !paletteState.open;
    }
    function getOptions() {
        const { value } = paletteInput;
        const matchingCmds = commands$1.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()));
        return matchingCmds;
    }
    function showOptions() {
        const matchingCmds = getOptions();
        paletteOptions.innerHTML = '';
        matchingCmds.forEach((cmd, index) => {
            const li = document.createElement('li');
            li.classList.add('__palette-option');
            li.innerText = `${cmd.group.icon} ${cmd.label}`;
            if (index === HIGHLIGHTED_CMD_INDEX)
                li.setAttribute('selected', 'true');
            li.addEventListener('click', () => {
                handleAction(cmd);
            }, { once: true });
            paletteOptions.appendChild(li);
        });
    }
    function handleAction(command) {
        var _a;
        if (command.background) {
            sendMessage(command.key);
        }
        else {
            (_a = command.handler) === null || _a === void 0 ? void 0 : _a.call(command);
        }
        pushHistory(command.key).then(() => sortCommands());
        togglePalette();
    }
    paletteInput.addEventListener('keyup', ({ code }) => {
        switch (code) {
            case 'Escape':
                togglePalette();
                break;
            case 'Enter': {
                const cmd = getOptions()[HIGHLIGHTED_CMD_INDEX];
                cmd && handleAction(cmd);
                break;
            }
        }
    });
    paletteInput.addEventListener('keydown', ({ code }) => {
        if (code.startsWith('Arrow')) {
            switch (code) {
                case 'ArrowUp':
                    HIGHLIGHTED_CMD_INDEX = Math.max(0, HIGHLIGHTED_CMD_INDEX - 1);
                    break;
                case 'ArrowDown':
                    HIGHLIGHTED_CMD_INDEX = Math.min(HIGHLIGHTED_CMD_INDEX + 1, getOptions().length - 1);
                    break;
            }
            showOptions();
        }
    });
    paletteInput.addEventListener('input', () => {
        HIGHLIGHTED_CMD_INDEX = 0;
        showOptions();
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
