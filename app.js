'use strict'

/**
 * Module dependencies.
 */
const axios = require('axios');

var express = require('express');

var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use('/api', function(req, res, next){
  var key = req.query['api-key'];

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (apiKeys.indexOf(key) === -1) return next(error(401, 'invalid api key'))

  // all good, store req.key for route access
  req.key = key;
  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ['foo', 'bar', 'baz'];

// these two objects will serve as our faux database

var repos = [
  { name: 'express', url: 'https://github.com/expressjs/express' },
  { name: 'stylus', url: 'https://github.com/learnboost/stylus' },
  { name: 'cluster', url: 'https://github.com/learnboost/cluster' }
];

var users = [
  { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
];

var userRepos = {
  tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

// we now can assume the api key is valid,
// and simply expose the data

// example: http://localhost:3000/dỉ
app.get('/api/users1', function(req, res, next){
  res.send(users);
});

// example: http://localhost:3000/api/geturl/?api-key=foo&url-fb=https://m.facebook.com/watch?v=890759372162366
app.get('/api/geturl/', function(req, res, next) {

  let urlvideo;
  let urldownlink;
  urlvideo=req.query["url-fb"]; 

  getdownLoadLinks(urlvideo)
    .then((urls) => res.send([{'url':urls[0]}]));
  ;  
  //res.send(users); 
});

// example: http://localhost:3000/api/repos/?api-key=foo
app.get('/api/repos', function(req, res, next){
  
  axios.get('https://m.facebook.com/watch?v=890759372162366').then((res) => {
    
  console.log(res.data)});
     
  //console.log(data);
  res.send(repos);
});

// example: http://localhost:3000/api/user/tobi/repos/?api-key=foo
app.get('/api/user/:name/repos', function(req, res, next){
  var name = req.params.name;
  var user = userRepos[name];

  if (user) res.send(user);
  else next();
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Sorry, can't find that" })
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000 || process.env.PORT);
  console.log('Express started on port 3000');
}

const getdownLoadLinks = async (viewLink) => {
  try {

    // Set cookie for user ngoctrinh90.vn@gmail.com/....
    var config = {
      method: 'get',
    // maxBodyLength: Infinity,
      url: viewLink,
      headers: { 
        'authority': 'm.facebook.com', 
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
        'accept-language': 'en-US,en;q=0.9', 
        'cookie': 'sb=3wvrY-tCb7fA-2CovBly26vv; datr=3wvrY_KVkixtffPsfcdDmFpw; locale=en_GB; c_user=100007151746863; xs=22%3ACA-V4EN9FtUO-g%3A2%3A1676349568%3A-1%3A15345; m_page_voice=100007151746863; m_pixel_ratio=0.75; presence=EDvF3EtimeF1676349963EuserFA21B07151746863A2EstateFDutF0CEchF_7bCC; fr=0oxQ1GwS45hEfrCnJ.AWXTIQXKy3tDvcgmxe7idRrfF30.Bj6wvf.h2.AAA.0.0.Bj6xJI.AWWiobgCINs; x-referer=eyJyIjoiL2hvbWUucGhwP3BhaXB2PTAmZWF2PUFmYklKWDBmbTZlaGc3S0xwSEx4bTR5Q0hqYWVVYnZvSFpPQUs0MHVRQ2dsOE9RVE1TYzFKTW5PaUIzZmNYb19mNzQmdGJ1YT0xIiwiaCI6Ii9ob21lLnBocD9wYWlwdj0wJmVhdj1BZmJJSlgwZm02ZWhnN0tMcEhMeG00eUNIamFlVWJ2b0haT0FLNDB1UUNnbDhPUVRNU2MxSk1uT2lCM2ZjWG9fZjc0JnRidWE9MSIsInMiOiJtIn0%3D; wd=1381x929; datr=ZPvpY8psgAah7JRKAoBeOr2o; sb=ZPvpY1VbL4ECsd2CZEtwpKMU', 
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"Windows"', 
        'sec-fetch-dest': 'document', 
        'sec-fetch-mode': 'navigate', 
        'sec-fetch-site': 'none', 
        'sec-fetch-user': '?1', 
        'upgrade-insecure-requests': '1', 
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      }
    };

    // axios.config = config;
    const { data } = await axios(config);

    
      //console.log(data);
      const urls = [];


      // Note: This regex is not a string ! 
      // const regex= /href="\/video_redirect\/\?src=(.+?)"/gm
             const regex = /meta property="og:video" content="(.+?)"/gm
      //const regex=/href="(.+?)"/gm
      //const regex= /<img src=("https:\/\/scontent.*?")/gm
      
      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('src=(https.+\\.mp4)', 'gm')
      const str = data;
      let m;
      while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }        
          // The result can be accessed through the `m`-variable. m is an Array
          m.forEach((match, groupIndex,arr) => {
              //console.log(`Found match, group ${groupIndex}: ${match}`);
              urls.push(decodeURIComponent(arr[1]));
              
              
          });
      }
      return urls;
  } catch (error) {
      throw error;
  }
};
// Export the Express API
module.exports = app;