'use strict';

function close() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        currentTab && chrome.tabs.remove(currentTab.id);
    });
}
function duplicate() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        currentTab && chrome.tabs.duplicate(currentTab.id);
    });
}
function open() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        currentTab && chrome.tabs.remove(currentTab.id);
    });
}
function reload() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        currentTab && chrome.tabs.reload(currentTab.id);
    });
}
function hardReload() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        currentTab && chrome.tabs.reload(currentTab.id, { bypassCache: true });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { command, options } = request;
    switch (command) {
        case 'tab.close':
            return close();
        case 'tab.duplicate':
            return duplicate();
        case 'tab.open':
            return open();
        case 'tab.reload':
            return reload();
        case 'tab.hardReload':
            return hardReload();
    }
    sendResponse({ complete: true });
});
