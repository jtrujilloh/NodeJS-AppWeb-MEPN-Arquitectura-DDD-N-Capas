const schedule = require('node-schedule');

exports.getRule_JobManageNewHits= getRule_JobManageNewHits;

function getRule_JobManageNewHits(){
  let rule = new schedule.RecurrenceRule();
  //rule.hour = 0; // Hora en que se ejecutará, si está en cero, sólo aplica minutos y/o segundos...
  //rule.minute = 0; // Minuto 0 de cada Hora...
  rule.second = 0; // Segundo 0 (cero) de cada Minuto...
  return rule;
};
