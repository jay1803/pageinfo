const mainElement = document.querySelector("#main")
function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true});
  }

getActiveTab().then((tabs) => {
    const tab = tabs[0]
    const title = tab.title
    const url = tab.url
    
    mainElement.textContent = `[[${url}][${title}]]`
})