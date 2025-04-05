import getAmazonProductData from "./getAmazonProductData";

export default defineContentScript({
  matches: ['*://www.amazon.co.jp/*', '*://www.amazon.com/*'],
  main() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getAmazonData') {
        sendResponse(getAmazonProductData());
      }
    })
  }
})