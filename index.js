var sentiment = require("sentiment"),
    facebook = require("fb"),
    csv = require("json2csv"),
    fs = require("fs"),
    config = require("./config");

// CSV

// Setup Facebook
config.facebook.access_token = process.argv[2];
if(!config.facebook.access_token) throw new Error('You must set an access_token as the third argument.');
facebook.setAccessToken(config.facebook.access_token);

var comments = [];

config.pages.forEach(function(p) {
  comments = [];
  facebook.api(p.page + '/posts', { since: config.facebook.postsSince, fields: ['comments'] }, function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }

    posts = res.data;

    res.data.forEach(function(post) {

        facebook.api(post.id + '/comments', { limit: 500 }, function(res) {

          res.data.forEach(function(comment) {
            var c = {
              message: comment.message,
              from: comment.from.id,
              sentiment: sentiment(comment.message).comparative
            };
            comments.push(c);
          });

          csv({data: comments, fields: ['message', 'from', 'sentiment']}, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('data/'+ p.category +'.csv', csv, function(err) {
              if (err) throw err;
            });
          });

      }); // facebook.api

    }); // res.data.forEach

  }); // facebook.api

}); // config.pages.forEach
