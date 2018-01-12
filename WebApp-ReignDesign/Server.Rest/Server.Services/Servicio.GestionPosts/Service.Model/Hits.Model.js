const mongoose = require('mongoose');

const Hits = mongoose.model('Hits', {
  story_id: Number,
  created_at: Date,
  pretty_date: String,
  title: String,
  story_title: String,
  url: String,
  story_url: String,
  author: String,
  status: Boolean
});

module.exports = Hits;
