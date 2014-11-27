config = {};

// Enter Facebook Auth Information Here
config.facebook = {
  appId: '',
  appSecret: '',
  appNamespace: '',
  postsSince: '11/1/14'
};

// Enter Pages, By Category
config.pages = [
  {
    page: 'humansofnewyork',
    category: '5M+'
  },
  {
    page: 'katyperry',
    category: '5M+'
  },
  {
    page: 'wired',
    category: '1M+'
  },
  {
    page: 'escapethefate',
    category: '1M+'
  },
  {
    page: 'nyu',
    category: 'Less Than 500k'
  },
  {
    page: 'thenextweb',
    category: 'Less Than 500k'
  }
];

module.exports = config;
