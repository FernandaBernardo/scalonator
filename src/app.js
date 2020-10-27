const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const schedule = require('./buildSchedule.js');

const PORT = process.env.PORT || 5000;
let redis;

if (process.env.REDISTOGO_URL) {
  let rtg = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  redis = require("redis").createClient();
}

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.render("index")
})

app.get('/interview', function (req, res) {
  redis.smembers('interviews', function (err, object) {
    res.render("create-interview", {
      interviews: object
    });
  })
})

app.post('/create-interview', function(req, res) {
  redis.sadd(['interviews', req.body.type], function(err, reply) {
    res.redirect(301, '/interview');
  });
});

app.get('/schedule', function (req, res) {
  res.render('schedule', {
    schedule: schedule.build().schedule
  });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));