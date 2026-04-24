const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'database', 'cloud', 'ai', 'language', 'tools'], required: true },
  projectsUsed: { type: Number, default: 0 },
  lastUsed: String,
  status: { type: String, enum: ['known', 'learning'], default: 'known' },
  progress: { type: Number, min: 0, max: 100 },
  learningSource: String,
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', skillSchema);
