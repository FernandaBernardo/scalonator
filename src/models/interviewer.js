module.exports = class Interviewer {
  constructor(name, interviews, slots) {
    this.id = name;
    this.name = name;
    this.interviews = interviews
    this.slots = slots;
  }
}