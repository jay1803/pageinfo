const mainElement = document.querySelector("#main")

function getActiveTab() {
  return browser.tabs.query({
    active: true,
    currentWindow: true
  });
}

getActiveTab().then((tabs) => {
  const tab = tabs[0]
  const title = tab.title
  const url = tab.url

  mainElement.textContent = `[[${url}][${title}]]`
})

function getPageDescription() {
  return browser.tabs.executeScript({
    code: "document.querySelector('meta[name=description]').content"
  })
}

getPageDescription().then((results) => {
  const description = results[0]
  mainElement.textContent += `\n${description}`
})

const copyButton = document.querySelector("#content button")
copyButton.addEventListener("click", () => {
  const content = mainElement.textContent
  navigator.clipboard.writeText(content)
})