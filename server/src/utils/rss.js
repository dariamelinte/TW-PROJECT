const rss = require('rss');

// create rss conversion types enum
const rssConversionTypes = {
  child: {
    getById: "getById_RSS",
    getByFamilyId: "getByFamilyId_RSS",
    getAll: "getAll_RSS",
  },
  friend: {
    getById: "getById_RSS",
    getAll: "getAll_RSS",
  },
  friendInteraction: {
    getById: "getById_RSS",
    getByChildId: "getByChildId_RSS",
  },
};

const recursiveObjectIterator = (obj, feed, field) => {
  // If obj is an array, iterate over it
  if(Array.isArray(obj)) {
    obj.forEach((item) => {
      recursiveObjectIterator(item, feed);
    });
  // If obj is an object, iterate over it
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      recursiveObjectIterator(obj[key], feed, key);
    });
  // If obj is a string or number, add it to the feed
  } else {
    feed.item({
      title: field,
      description: obj,
    });
  }
};

const createRssFeed = (data, conversionType) => {
  let feed;

  if(conversionType === rssConversionTypes.child.getById) {
    feed = new rss({
      title: "Child",
      description: "Child by id",
    });
  } else if(conversionType === rssConversionTypes.child.getByFamilyId) {
    feed = new rss({
      title: "Child",
      description: "Child by family id",
    });
  } else if(conversionType === rssConversionTypes.child.getAll) {
    feed = new rss({
      title: "Children list",
      description: "Children list",
    });
  } else if(conversionType === rssConversionTypes.friend.getById) {
    feed = new rss({
      title: "Friend",
      description: "Friend by id",
    });
  } else if(conversionType === rssConversionTypes.friend.getAll) {
    feed = new rss({
      title: "Friends list",
      description: "Friends list",
    });
  } else if(conversionType === rssConversionTypes.friendInteraction.getById) {
    feed = new rss({
      title: "Friend interaction",
      description: "Friend interaction by id",
    });
  } else if(conversionType === rssConversionTypes.friendInteraction.getByChildId) {
    feed = new rss({
      title: "Friend interaction",
      description: "Friend interaction by child id",
    });
  } else {
    feed = new rss({
      title: "RSS feed",
      description: "RSS feed",
    });
  }

  recursiveObjectIterator(data, feed);

  return feed.xml({ indent: true });
};

module.exports = {
  createRssFeed,
  rssConversionTypes,
};