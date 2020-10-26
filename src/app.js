const express = require('express');
const app = express();
const path = require('path');
const schedule = require('./buildSchedule.js');

const PORT = process.env.PORT || 5000;

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send("Hello Scalonator :)")
})

app.get('/schedule', function (req, res) {
  res.render('index', {
    schedule: schedule.build().schedule
  });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));