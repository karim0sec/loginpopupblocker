chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse();
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.storage.local.get('apps', (data) => {
    if (!data.apps) {
      LoadDefaultApps();
    }
  });
});

function LoadDefaultApps() {
  const url = chrome.runtime.getURL('data/apps.json');
  fetch(url).then(response => response.json()).then(data => {
    chrome.storage.local.set( {"apps": data} );
  });
}
