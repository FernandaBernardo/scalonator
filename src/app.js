const express = require('express');
const app = express();
const path = require('path');
const schedule = require('./buildSchedule.js');

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {
    schedule: schedule.build().schedule
  });
})
app.listen(3000);