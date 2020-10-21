const userHistoryKey = 'user-history'

export function getHistory(): Promise<string[]> {
  return new Promise(resolve => {
    chrome.storage.local.get([userHistoryKey], function(result = []) {
      resolve(result[userHistoryKey] || [])
    });
  })
}

export async function pushHistory(commandKey: string): Promise<string[]>{
  const hist = await getHistory()
  const newHist = [...new Set([commandKey, ...hist])]
  return new Promise(resolve => {
    chrome.storage.local.set({[userHistoryKey]: newHist}, () => {
      resolve(newHist)
    });
  })
}