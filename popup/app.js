const mainElement = document.querySelector("#main");

function getMainContent() {
  return document.querySelector("meta[name=description]").textContent;
}

async function getCurrentTabData() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);

  const title = tab.title;
  const url = tab.url;

  mainElement.textContent = `[[${url}][${title}]]`;

  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getMainContent,
  });

  if (results.length > 0) {
    mainElement.textContent += `\n${results[0].result}`;
  }
}

getCurrentTabData();

const copyButton = document.querySelector("#content button");
copyButton.addEventListener("click", () => {
  const content = mainElement.textContent;
  navigator.clipboard.writeText(content);
});
