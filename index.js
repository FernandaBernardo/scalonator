const util = require('util');

let interviews = require("./interviews.json").interviews;
let specialities = require("./specialities.json").specialities;
let interviewers = require("./interviewers.json").interviewers;
let candidates = require("./candidates.json").candidates;

let oneRandom = (list) => list[Math.floor(Math.random() * list.length)];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let interviewTypeRule = (interviewer, interview, _) => -1 !== interviewer.interviews.indexOf(interview.type);
let slotRule = (interviewer, _, candidate) => -1 !== interviewer.slots.indexOf(candidate.slot);
let managerRule = (interviewer, _, candidate) => candidate.isManager ? interviewer.isManager : true;

let interviewerMatchingRules = [
  interviewTypeRule,
  slotRule,
  managerRule
];

let womenRule = (interviewer, _, candidate) => candidate.isWomen ? interviewer.isWomen : false;

let interviewerPreferenceRules = [
  womenRule
];

function findInterviewer(interview, candidate, schedule, candidateSchedule) {
  let usedInterviewers = schedule.flatMap(s => s.schedule.map(s2 => s2.interviewer.id)).concat(candidateSchedule.map(i => i.interviewer && i.interviewer.id));

  let possibleInterviewers = interviewers.filter((interviewer) =>
    interviewerMatchingRules.reduce((matched, rule) => matched && rule(interviewer, interview, candidate), true))
    .filter(i => -1 === usedInterviewers.indexOf(i.id));

  let preferredInterviewers = possibleInterviewers.filter((interviewer) =>
    interviewerPreferenceRules.reduce((matched, rule) => matched && rule(interviewer, interview, candidate), true))
    .map(i => ({...i, preferred: true}));
 
  return oneRandom(preferredInterviewers) || oneRandom(possibleInterviewers);
}

function countUndefinedInterviews(schedule) {
  return schedule.flatMap(s => s.schedule).reduce((acc, s) => s.interviewer ? acc : acc + 1, 0);
}

function countPreferredInterviews(schedule) {
  return schedule.flatMap(s => s.schedule).reduce((acc, s) => (s.interviewer && s.interviewer.preferred) ? acc + 1 : acc, 0);
}

function buildSchedule (candidates) {
  return candidates.reduce((schedule, candidate) => {
    let speciality = specialities.find(s => s.type === candidate.speciality);
    let interviews2 = speciality.interviews.map(i => interviews.find(i2 => i2.type === i))
    let candidateSchedule = shuffle(interviews2).reduce((candidateSchedule, i) => {
      let interviewer = findInterviewer(i, candidate, schedule, candidateSchedule);
      return [...candidateSchedule, {interview: i, interviewer: interviewer}]
    }, [])
    return [...schedule, {candidate: candidate, schedule: candidateSchedule}]
  }, [])
}

let attempts = [...Array(1).keys()]
let schedule = attempts.reduce((chosen, _) => {
  let schedule = buildSchedule(candidates);
  let undefNumber = countUndefinedInterviews(schedule);
  let prefNumber = countPreferredInterviews(schedule);
  if(chosen.undefNumber > undefNumber) {
    return {undefNumber, prefNumber, schedule};
  } else if(chosen.undefNumber == undefNumber && chosen.prefNumber < prefNumber) {
    return {undefNumber, prefNumber, schedule};
  } else {
    return chosen;
  }
}, {undefNumber: 999999, prefNumber: 0})

console.log(util.inspect(schedule, {showHidden: false, depth: null}))
