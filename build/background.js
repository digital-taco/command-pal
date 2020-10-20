'use strict';

const classifier = 'tab';
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
};
const open = {
    key: `${classifier}.open`,
    label: 'Open New Tab',
    background: true,
    handler: () => {
        chrome.tabs.create({});
    },
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
};
const mute = {
    key: `${classifier}.mute`,
    label: 'Mute Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { muted: true });
    },
};
const unmute = {
    key: `${classifier}.unmute`,
    label: 'Unmute Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { muted: false });
    },
};
const pin = {
    key: `${classifier}.pin`,
    label: 'Pin Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { pinned: true });
    },
};
const unpin = {
    key: `${classifier}.unpin`,
    label: 'Unpin Tab',
    background: true,
    handler: () => {
        chrome.tabs.update(undefined, { pinned: false });
    },
};
const goBack = {
    key: `${classifier}.goBack`,
    label: 'Go Back',
    background: true,
    handler: () => {
        chrome.tabs.goBack();
    },
};
const goForward = {
    key: `${classifier}.goForward`,
    label: 'Go Forward',
    background: true,
    handler: () => {
        chrome.tabs.goForward();
    },
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
const open$1 = {
    key: `${classifier$1}.open`,
    label: 'Open New Window',
    background: true,
    handler: () => {
        chrome.windows.create();
    },
};
const openIncognito = {
    key: `${classifier$1}.openIncognito`,
    label: 'Open New Incognito Window',
    background: true,
    handler: () => {
        chrome.windows.create({ incognito: true });
    },
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
};

var windows = /*#__PURE__*/Object.freeze({
    __proto__: null,
    open: open$1,
    openIncognito: openIncognito,
    goFullscreen: goFullscreen,
    minimize: minimize
});

const classifier$2 = 'chrome';
const settings = {
    key: `${classifier$2}.settings`,
    label: 'Open Chrome Settings',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://settings' });
    },
};
const extensions = {
    key: `${classifier$2}.extensions`,
    label: 'Manage Chrome Extensions',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://extensions' });
    },
};
const version = {
    key: `${classifier$2}.version`,
    label: 'View Chrome Version',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://version' });
    },
};
const history = {
    key: `${classifier$2}.history`,
    label: 'View Browser History',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://history' });
    },
};
const downloads = {
    key: `${classifier$2}.downloads`,
    label: 'View Downloads',
    background: true,
    handler: () => {
        chrome.tabs.create({ url: 'chrome://downloads' });
    },
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
const pauseVideo = {
    key: `${classifier$3}.pauseVideo`,
    label: 'Pause Video',
    background: false,
    custom: true,
    handler: () => {
        const video = document.getElementsByTagName('video')[0];
        video === null || video === void 0 ? void 0 : video.pause();
    },
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { command } = request;
    const cmd = commands.find((cmd) => command === cmd.key);
    const [scope, handlerKey] = command.split('.');
    if (!cmd) {
        sendResponse({ complete: false });
        throw new Error(`Command not found ${scope}::${handlerKey}`);
    }
    const { handler } = cmd;
    if (handler) {
        handler();
    }
    else {
        throw new Error(`Command Handler not found ${scope}::${handlerKey}::handler`);
    }
    sendResponse({ complete: true });
});
