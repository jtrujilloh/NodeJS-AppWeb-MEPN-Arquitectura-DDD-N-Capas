const axios = require("axios");

exports.getDataFromApiGET = getDataFromApiGET;

function getDataFromApiGET (logger, callback, job_AppConfig) {
  axios.get(job_AppConfig.API.dataProvider)
    .then(function (response) {
      //logger.trace(response.data);
      callback(null, response.data);
    })
    .catch(function (error) {
      //logger.error(error);
      callback(error, null);
    });
};
