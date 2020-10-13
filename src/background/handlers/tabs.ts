export function close(): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0]
    currentTab && chrome.tabs.remove(currentTab.id)
  })
}

export function duplicate(): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0]
    currentTab && chrome.tabs.duplicate(currentTab.id)
  })
}

export function open(): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0]
    currentTab && chrome.tabs.remove(currentTab.id)
  })
}

export function reload(): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0]
    currentTab && chrome.tabs.reload(currentTab.id)
  })
}

export function hardReload(): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0]
    currentTab && chrome.tabs.reload(currentTab.id, { bypassCache: true })
  })
}

// reorder? sort?
// reload
// reopen
// detect language
// captureVisibleTab (screenshot?)
// execute script
// insert css
// zoom in/out
// go forward/backward
