const datetime = require("date-and-time");
const hitModel = require("../Job.Schedule.Model/Hits.Model");

exports.GET_HIT_BY_STORY_ID = GET_HIT_BY_STORY_ID;
exports.INSERT_NEW_HIT = INSERT_NEW_HIT;

function GET_HIT_BY_STORY_ID (logger, callback, job_AppConfig,
                              story_id) {

  logger.info("[D.A.L.][HitsDAO.js][OPERATION]: GET_HIT_BY_STORY_ID");

  hitModel.findOne({ story_id: story_id }, function(err, hit) {
    if (err) {
      callback(err, null);
    } else {
      console.log(hit);
      callback(null, hit);
    }
  });

};

function INSERT_NEW_HIT (logger, callback, job_AppConfig,
                        hit) {

  logger.info("[D.A.L.][HitsDAO.js][OPERATION]: INSERT_NEW_HIT");

  let newhit = new hitModel({
    story_id: hit.story_id,
    created_at: hit.created_at,
    pretty_date: '',
    title: hit.title,
    story_title: hit.story_title,
    url: hit.url,
    story_url: hit.story_url,
    author: hit.author,
    status: true
  });

  newhit.save(function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, "OK");
    }
  });

};
