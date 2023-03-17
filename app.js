'use strict'

/**
 * Module dependencies.
 */
const axios = require('axios');

var express = require('express');

var app = module.exports = express();
const fs = require('fs');



// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

class fbVideoPost {
  constructor(status , msg , url, title , thumb) {
    this.status = status;
    this.msg = msg;
    this.url = url;
    this.title = title;
    this.thumb = thumb;
  }
}

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

// example: http://localhost:3000/api/geturl/?api-key=foo&url-fb=https://fb.watch/jhebmXJOnv/
//  http://localhost:3000/api/geturl/?api-key=foo&url-fb=https://m.facebook.com/watch?v=167296512751262
// https://fb.watch/jeH3uhIuwK/
// http://localhost:3000/api/geturl/?api-key=foo&url-fb=https://twitter.com/PLF_Officials/status/1635920741450301440?t=lASaKrN01tOzmgmpGjQl1g&s=19 
app.get('/api/geturl/', async function(req, res, next) {


// start twiter


//end tw


  let shareLink =req.query["url-fb"]; 
  
  let finalLink = await fetchUrl(shareLink)
  //let finalLink = await fetchUrlTw(shareLink)

  getdownLoadLinks(finalLink)
    .then(
      (urls) => {
        
        if (urls.length>0 ) {
          const vdlink = (urls[0].url).replaceAll("&amp;","&");
          const vdstatus = urls[0].status; 
          const vdmsg = urls[0].msg;
          const vdthumb = urls[0].thumb.replaceAll("&amp;","&");
          const vdtitle = urls[0].title.replace(/(.+?)-/m,'').replace('| Facebook"','');
          res.send({'status':vdstatus, 'message':vdmsg,'url':vdlink,'title':vdtitle,'thumb':vdthumb});
        } else {
          res.send({'status': 0, 'message': 'Error finding video links'});
        }
 
      });
});

// example: http://localhost:3000/api/repos/?api-key=foo
app.get('/api/repos', function(req, res, next){
  
  axios.get('https://m.facebook.com/watch?v=167296512751262').then((res) => {
    
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

const getdownLoadLinksAxi = async (viewLink) => {
  try {

    // Set cookie for user ngoctrinh90.vn@gmail.com/....
    var config = {
      method: 'get',
    // maxBodyLength: Infinity,
      url: viewLink,
      // headers: { 
      //   'authority': 'm.facebook.com', 
      //   'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
      //   'accept-language': 'en-US,en;q=0.9', 
      //   'cookie': 'sb=3wvrY-tCb7fA-2CovBly26vv; datr=3wvrY_KVkixtffPsfcdDmFpw; locale=en_GB; c_user=100007151746863; xs=22%3ACA-V4EN9FtUO-g%3A2%3A1676349568%3A-1%3A15345; m_page_voice=100007151746863; m_pixel_ratio=0.75; presence=EDvF3EtimeF1676349963EuserFA21B07151746863A2EstateFDutF0CEchF_7bCC; fr=0oxQ1GwS45hEfrCnJ.AWXTIQXKy3tDvcgmxe7idRrfF30.Bj6wvf.h2.AAA.0.0.Bj6xJI.AWWiobgCINs; x-referer=eyJyIjoiL2hvbWUucGhwP3BhaXB2PTAmZWF2PUFmYklKWDBmbTZlaGc3S0xwSEx4bTR5Q0hqYWVVYnZvSFpPQUs0MHVRQ2dsOE9RVE1TYzFKTW5PaUIzZmNYb19mNzQmdGJ1YT0xIiwiaCI6Ii9ob21lLnBocD9wYWlwdj0wJmVhdj1BZmJJSlgwZm02ZWhnN0tMcEhMeG00eUNIamFlVWJ2b0haT0FLNDB1UUNnbDhPUVRNU2MxSk1uT2lCM2ZjWG9fZjc0JnRidWE9MSIsInMiOiJtIn0%3D; wd=1381x929; datr=ZPvpY8psgAah7JRKAoBeOr2o; sb=ZPvpY1VbL4ECsd2CZEtwpKMU', 
      //   'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"', 
      //   'sec-ch-ua-mobile': '?0', 
      //   'sec-ch-ua-platform': '"Windows"', 
      //   'sec-fetch-dest': 'document', 
      //   'sec-fetch-mode': 'navigate', 
      //   'sec-fetch-site': 'none', 
      //   'sec-fetch-user': '?1', 
      //   'upgrade-insecure-requests': '1', 
      //   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      // }
      headers: { 
        'authority': 'm.facebook.com', 
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
        'accept-language': 'en-US,en;q=0.9', 
        'cache-control': 'max-age=0', 
        'cookie': 'sb=DKoFZF8ptuGPr1f0y-vR6cmC; datr=DKoFZCDZKYaDZ6hAThUD1vMW; c_user=100007151746863; xs=36%3AC7_9ZEBcA14inQ%3A2%3A1678092819%3A-1%3A15345; fr=0bDZw5KiofiMJWnAr.AWW5_U29QGbex9RbPTLjt0Y7Bn0.BkBaoM.D5.AAA.0.0.BkBaoW.AWX6gm1fWO4; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1678092833768%2C%22v%22%3A1%7D; m_page_voice=100007151746863; m_pixel_ratio=0.75; wd=1693x929', 
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
      // const regex1 = /meta property="og:video" content="(.+?)"/gm
      const regex = /<meta property="og:video:secure_url" content="(.+?)" \/><meta property="og:url" content="" \/><meta property="og:site_name" content="Facebook Watch" \/><meta property="og:title" content="(.+?) \/><meta property="og:image" content="(.+?)"/gm
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
              //let vdurl = decodeURIComponent(arr[1] + '- thumb:  ' + arr[3]);
              let fb = new fbVideoPost(1,'Success',arr[1],arr[2],arr[3]);

              urls.push(fb);
          });
          
      }
      //console.log(str); // console not write full content of str variable ! 
      //fs.writeFileSync('tst2.txt', str); 
      return urls;
  } catch (error) {
      throw error;
  }
};

const getdownLoadLinks = async (viewLink) => {
  try {

    let data  = await fetch(viewLink, 
      {"headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "sb=3SwRZIDa8dtP7KQGjJbolO-1; datr=3SwRZFxvY79WBL24om_joTF8; c_user=100007151746863; xs=33%3Ao6Prea1MroEiGA%3A2%3A1678847207%3A-1%3A15345; fr=0hj0WXoSrRKGowaLo.AWUMpqIA6K3R772Btfyt6hXsSxQ.BkESzd._k.AAA.0.0.BkESzq.AWVggyvwXCY; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1678847213835%2C%22v%22%3A1%7D; wd=510x697"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
      //"redirect": 'manual'
    });

    
      //console.log(data);
      const urls = [];


      // Note: This regex is not a string ! 
      // const regex= /href="\/video_redirect\/\?src=(.+?)"/gm
      // const regex1 = /meta property="og:video" content="(.+?)"/gm
      const regex = /<meta property="og:video:secure_url" content="(.+?)" \/><meta property="og:url" content="" \/><meta property="og:site_name" content="Facebook Watch" \/><meta property="og:title" content="(.+?) \/><meta property="og:image" content="(.+?)"/gm
      //const regex=/href="(.+?)"/gm
      //const regex= /<img src=("https:\/\/scontent.*?")/gm
      
      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('src=(https.+\\.mp4)', 'gm')
      const str = await data.text();
      let m;
      while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }        
          // The result can be accessed through the `m`-variable. m is an Array
          m.forEach((match, groupIndex,arr) => {
              //console.log(`Found match, group ${groupIndex}: ${match}`);
              //let vdurl = decodeURIComponent(arr[1] + '- thumb:  ' + arr[3]);
              let fb = new fbVideoPost(1,'Success',arr[1],arr[2],arr[3]);

              urls.push(fb);
          });
          
      }
      //console.log(str); // console not write full content of str variable ! 
      //fs.writeFileSync('tst2.txt', str); 
      return urls;
  } catch (error) {
      throw error;
  }
};

async function fetchUrl(url) {  
  let response = await fetch(url, 
  {"headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "sb=3SwRZIDa8dtP7KQGjJbolO-1; datr=3SwRZFxvY79WBL24om_joTF8; c_user=100007151746863; xs=33%3Ao6Prea1MroEiGA%3A2%3A1678847207%3A-1%3A15345; fr=0hj0WXoSrRKGowaLo.AWUMpqIA6K3R772Btfyt6hXsSxQ.BkESzd._k.AAA.0.0.BkESzq.AWVggyvwXCY; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1678847213835%2C%22v%22%3A1%7D; wd=510x697"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "redirect": 'manual'
});

let urlWithID =response.url; //  the last follow url 

  console.log(response.status); // 200
  console.log(response.statusText); // OK
  console.log(response.url); //  the last follow url 

  //fs.writeFileSync('tst1.txt', await response.text()); 
  
  
  

  if (response.status > 300) {
      let data = response.headers.get('location'); 
      // response code 302 and location may be the following cases
      // case1: 'https://www.facebook.com/chrismorganwc/videos/1339204009863681/?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C&mibextid=1YhcI9R&ref=sharing';
      // case 2: https://www.facebook.com/watch/?v=629731672138946&extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C&mibextid=1YhcI9R&ref=sharing

      var regex = /\/\d+\//

      if (data.includes('v=')) 
        regex=/v=\d+/
                   
      const found = data.match(regex);
      let id = found[0].replaceAll('/','').replaceAll("v=",'');
      urlWithID = 'https://m.facebook.com/watch?v=' + id;
      console.log ('url with id:' + urlWithID);
      
  }
  return urlWithID; 
}


async function fetchUrlTw(url) {  
  let response = await fetch(url);

  console.log(response.status); // 200
  console.log(response.statusText); // OK
  console.log(response.url); //  the last follow url 

  //fs.writeFileSync('tst1.txt', await response.text()); 
  
  

  if (response.status > 300) {
      let data = response.headers.get('location'); 
      //const paragraph = 'https://www.facebook.com/chrismorganwc/videos/1339204009863681/?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C&mibextid=1YhcI9R&ref=sharing';
      const regex = /\/\d+\//
      const found = data.match(regex);
      let id = found[0].replaceAll('/','');
      let urlWithID = 'https://m.facebook.com/watch?v=' + id;
      return urlWithID;
  }
  return null; 
}




// Export the Express API
module.exports = app;