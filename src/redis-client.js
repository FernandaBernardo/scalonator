let redis = require("redis");
let client;

if (process.env.REDISTOGO_URL) {
  let rtg = require("url").parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  client = redis.createClient();
}

module.exports = client;