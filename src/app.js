const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const schedule = require('./buildSchedule.js');

const PORT = process.env.PORT || 5000;
const client = require('./database/redis-client');
let interviewDAO = require('./database/interviewDAO');

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/interview', function (req, res) {
  interviewDAO.allInterviews()
    .then(allInterviews => {
      res.render("interviews", {
        interviews: allInterviews
      });
    });
});

app.post('/interview/create', function(req, res) {
  interviewDAO.addInterview(req.body.type)
    .then(res.redirect(301, '/interview'));
});

app.get('/interview/delete/:id', function(req, res) {
  console.log('aqui primeiro')
  var param = req.params;
  interviewDAO.deleteInterview(param.id)
    .then(res.redirect(301, '/interview'));
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