// Create function that takes as argument an object and creates a rss feed based on it
// Return the rss feed as a string
const rss = require('rss');

const createRssFeed = (data) => {
  const feed = new rss({
    title: data.title,
    description: data.description,
    feed_url: data.feed_url,
    site_url: data.site_url,
    image_url: data.image_url,
    managingEditor: data.managingEditor,
    webMaster: data.webMaster,
    language: data.language,
    categories: data.categories,
    pubDate: data.pubDate,
    ttl: data.ttl,
  });

  data.items.forEach((item) => {
    feed.item({
      title: item.title,
      description: item.description,
      url: item.url,
      guid: item.guid,
      categories: item.categories,
      pubDate: item.pubDate,
    });
  });

  return feed.xml();
};

module.exports = createRssFeed;