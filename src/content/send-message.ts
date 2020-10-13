export default function sendMessage(command: string, options?: { [key: string]: any }): void {
  chrome.runtime.sendMessage({ command: command, options }, (response) => {
    console.log(response?.complete)
  })
}
