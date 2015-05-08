'use strict';

var Promise = require('bluebird'),
  CleanCSS = require('clean-css'),
  client = Promise.promisifyAll(require('simple-keystone-client')),
  fs = Promise.promisifyAll(require('fs')),
  fetch = require('node-fetch'),
  Mustache = require('mustache'),
  uncss = Promise.promisify(require('uncss'));

fetch.Promise = Promise;

function getPilot() {
  return fs.readFileAsync(process.env.COPILOT_SETTINGS || 'config.json', 'utf8')
  .then(function (cfg) {
    var configJson = JSON.parse(cfg);

    return Promise.all([
      client.authenticateAsync({
        username: configJson.username,
        apiKey: configJson.api_key
      }),
      Promise.resolve(configJson)
    ]);
  })
  .then(function (data) {
    var accessToken = data[0].access.token.id,
      configJson = data[1];

    return fetch('https://prod.pilot.api.rackspacecloud.com/v1/cloud/' + configJson.tenant_id + '/navigation', {
      headers: {
        'X-Auth-Token': accessToken
      }
    });
  })
  .then(function (res) {
    return res.text();
  })
}

Promise.all([
  fs.readFileAsync('templates/index.html', 'utf8'),
  getPilot()
]).then(function (data) {
  var template = data[0],
    content = data[1],
    rendered;

  rendered = Mustache.render(template, { content: content });
  return fs.writeFile('./site/index.html', rendered);
})
.then(function () {
  return uncss(['./site/index.html']);
})
.then(function (res) {
  console.log(new CleanCSS().minify(res[0]).styles);
  process.exit(0);
})
.catch(function (err) {
  console.error('An error occurred:', err);
  process.exit(1);
});
