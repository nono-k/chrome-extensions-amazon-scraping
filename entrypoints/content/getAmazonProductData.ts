export default function getAmazonProductData() {
  const title = document.querySelector('#productTitle')?.textContent?.trim() || '';
  const author = document.querySelector('.author .a-link-normal')?.textContent?.trim() || '';
  const imageSrc = document.querySelector('#imgTagWrapperId img')?.getAttribute('src') || '';
  const imageUrl = imageSrc ? extractImageId(imageSrc) : '';

  return { title, author, imageUrl };
}

function extractImageId(url: string) {
  const match = url.match(/\/images\/I\/([^\/]+)\.jpg/);
  return match ? match[1] : null;
}