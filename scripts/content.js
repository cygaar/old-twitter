// Set favicon
document.querySelector("link[rel~='icon']").href = chrome.runtime.getURL("../assets/twitter-favicon.png");

function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// Set loading page icon
waitForElement('[aria-label="Loading…"]').then((container) => {
  // TODO
  container.innerHTML = "";
});

// Set web app icon
waitForElement('[aria-label="Twitter"]').then((elm) => {
  const container = elm.children[0];
  container.innerHTML = "";

  const twitterIcon = document.createElement("img");
  twitterIcon.src = chrome.runtime.getURL("../assets/twitter.png");
  twitterIcon.width = 42;
  twitterIcon.height = 42;
  container.appendChild(twitterIcon);
});
