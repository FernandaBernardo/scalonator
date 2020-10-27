const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const schedule = require('./buildSchedule.js');

const PORT = process.env.PORT || 5000;
const client = require('./redis-client');

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.render("index")
})

app.get('/interview', function (req, res) {
  client.smembers('interviews', function (err, object) {
    res.render("create-interview", {
      interviews: object
    });
  })
})

app.post('/create-interview', function(req, res) {
  client.sadd(['interviews', req.body.type], function(err, reply) {
    res.redirect(301, '/interview');
  });
});

app.get('/schedule', function (req, res) {
  client
    .multi()
    .smembers('interviews')
    .exec(function(err, replies) {
      res.render('schedule', {
        schedule: schedule.build({ interviews: replies[0] }).schedule
      });
    });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));