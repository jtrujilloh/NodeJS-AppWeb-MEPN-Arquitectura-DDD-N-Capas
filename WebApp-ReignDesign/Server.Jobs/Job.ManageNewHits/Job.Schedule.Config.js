const schedule = require('node-schedule');

exports.getRule_JobManageNewHits= getRule_JobManageNewHits;

function getRule_JobManageNewHits(){
  let rule = new schedule.RecurrenceRule();
  //rule.hour = 0; //De Cada Día...
  //rule.minute = 0; //De Cada Hora...
  rule.second = 0; //de Cada Minuto...
  return rule;
};
