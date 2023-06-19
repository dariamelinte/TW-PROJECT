export default function RSSButton(requestRss) {
  const rssButton = document.createElement('button');

  // add onclick event
  rssButton.addEventListener('click', async () => {
    
    const response = await requestRss();

    console.log(response);

    // Save the response in the clipboard as a string from the JSON object
    navigator.clipboard.writeText(JSON.stringify(response));
  });

  rssButton.className = 'rounded-xl p-1 mr-3';
  // add position absolute to the right of the screen
  rssButton.style.position = 'absolute';
  rssButton.style.right = '0';
  rssButton.style.top = '120px';
  rssButton.style.width = '30px';
  rssButton.style.height = '30px';
  rssButton.innerHTML = `
    <img src="/frontend/assets/img/rss.png" alt="logo" />
  `;
  return rssButton;
}