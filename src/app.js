const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const schedule = require('./buildSchedule.js');

const PORT = process.env.PORT || 5000;

let interviewDAO = require('./database/interviewDAO');
let specialityDAO = require('./database/specialityDAO');

require('./database/dbClient.js')();

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

app.get('/interview', async function (req, res) {
  let data = await interviewDAO.allInterviews()
  res.render("interviews", {
    interviews: data
  });
});

app.post('/interview/create', async function(req, res) {
  await interviewDAO.addInterview(req.body.type);
  res.redirect(301, '/interview');
});

app.get('/interview/delete/:id', async function(req, res) {
  var param = req.params;
  await interviewDAO.deleteInterview(param.id);

  res.redirect(301, '/interview');
});

app.get('/speciality', async function (req, res) {
  let specialities = await specialityDAO.allSpecialities();
  let interviews = await interviewDAO.allInterviews();

  res.render("specialities", {
    specialities: specialities,
    interviews: interviews
  });
});

app.post('/speciality/create', async function(req, res) {
  await specialityDAO.addSpeciality(req.body);
  res.redirect(301, '/speciality');
});

app.get('/speciality/delete/:id', async function(req, res) {
  var param = req.params;
  await specialityDAO.deleteSpeciality(param.id);

  res.redirect(301, '/speciality');
});

app.get('/schedule', async function (req, res) {
  let allInterviews = await interviewDAO.allInterviews();
  let allSpecialities = await specialityDAO.allSpecialities();
  
  res.render('schedule', {
    schedule: schedule.build({
      interviews: allInterviews,
      specialities: allSpecialities
    }).schedule
  });
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));