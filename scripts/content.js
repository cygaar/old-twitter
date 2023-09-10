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
waitForElement('[aria-label="X"]').then((elm) => {
  const container = elm.children[0];
  container.innerHTML = "";

  const twitterIcon = document.createElement("img");
  twitterIcon.src = chrome.runtime.getURL("../assets/twitter.png");
  twitterIcon.width = 42;
  twitterIcon.height = 42;
  container.appendChild(twitterIcon);
});

// Change website title
const titleObserver = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.addedNodes.forEach(node => {
        const title = document.querySelector('title');
        if (node.textContent.endsWith('X')) title.innerText = title.innerText.slice(0, -1) + 'Twitter';
      }));
    }
  }
);

waitForElement('title').then(title => titleObserver.observe(title, { childList: true, }));

// Change posts back to tweets
const textObserver = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      // Sidebar tweet button and timeline tweet button
      const tweetButton = document.querySelector('[aria-label="Post"] > div > span > div > div > span > span');
      if (tweetButton && tweetButton.textContent === 'Post') tweetButton.textContent = 'Tweet';
      const tweetButtonTimeline = document.querySelector('[data-testid="tweetButtonInline"] > div > span > span');
      if (tweetButtonTimeline && tweetButtonTimeline.textContent === 'Post') tweetButtonTimeline.textContent = 'Tweet';
      
      // New tweets popup
      const newTweetsButton = document.querySelector('[data-testid="pillLabel"] > span > span > span');
      if (newTweetsButton) newTweetsButton.textContent = newTweetsButton.textContent.replace('post', 'tweet');

      // Show tweets text
      const showTweetsButton = document.querySelector('[data-testid="cellInnerDiv"] > div > div > div > div > span');
      if (showTweetsButton) showTweetsButton.textContent = showTweetsButton.textContent.replace('post', 'tweet');

      // Retweet menu items
      document.querySelectorAll('[role="link"] > span > span').forEach((item) => {
        if (item && item.textContent === 'Reposts') item.textContent = 'Retweets';
        if (item && item.textContent === 'Quotes') item.textContent = 'Quote tweets';
      });

      // View tweet analytics text
      const tweetAnalytics = document.querySelector('[data-testid="analyticsButton"] > div > span');
      if (tweetAnalytics && tweetAnalytics.textContent === 'View post analytics') tweetAnalytics.textContent = 'View tweet analytics';

      // Tweet header text
      const headerText = document.querySelector('[role="heading"] > span');
      if (headerText && headerText.textContent === 'Post') headerText.textContent = 'Tweet';
      if (headerText && headerText.textContent === 'Quotes') headerText.textContent = 'Quote tweets';

      // Modal header text
      const modalHeader = document.querySelector('#modal-header > span');
      if (modalHeader && modalHeader.textContent === 'Reposted by') modalHeader.textContent = 'Retweeted by';
      if (modalHeader && modalHeader.textContent === 'Post Analytics') modalHeader.textContent = 'Tweet Analytics';

      // Tweets tab on profile
      const tweetsTab = document.querySelector('[role="tab"] > div > div > span');
      if (tweetsTab && tweetsTab.textContent === 'Posts') tweetsTab.textContent = 'Tweets';

      // Number of tweets on profile
      const userTweets = document.querySelector('[aria-label="Home timeline"] > div > div > div > div > div > div > div > div:nth-child(2) > div > div');
      if (userTweets && userTweets.textContent.endsWith('posts')) userTweets.textContent = userTweets.textContent.replace('posts', 'tweets');

      // User retweeted
      document.querySelectorAll('[data-testid="socialContext"]').forEach((label) => {
        label.textContent = label.textContent.replace('reposted', 'retweeted');
      });

      // Retweet button menu
      document.querySelectorAll('[role="menuitem"] > div:nth-child(2) > div > span').forEach((popup) => {
        if (popup && popup.textContent === 'Repost') popup.textContent = 'Retweet';
        if (popup && popup.textContent === 'Quote') popup.textContent = 'Quote tweet';
      });

      // Reply placeholder text
      const replyDraft = document.querySelector('[class="public-DraftEditorPlaceholder-inner"]');
      if (replyDraft) replyDraft.textContent = replyDraft.textContent.replace('Post', 'Tweet');

      // Notifications text
      document.querySelectorAll('[data-testid="cellInnerDiv"] > div > div > article > div > div:nth-child(2) > div:nth-child(2) > span > span').forEach((notification) => {
        if (notification) notification.textContent = notification.textContent.replace('post', 'tweet');
      });

      // Number of tweets per trending topic
      document.querySelectorAll('[data-testid="trend"] > div > div:nth-child(3) > span').forEach((trend) => {
        trend.textContent = trend.textContent.replace('posts', 'tweets');
      });
    }
  }
});

textObserver.observe(document.body, { childList: true, subtree: true });
