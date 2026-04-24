const mongoose = require('mongoose');

const proofSchema = new mongoose.Schema({
  problem: String,
  challenge: String,
  solution: String
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  status: { type: String, enum: ['completed', 'ongoing'], default: 'completed' },
  category: { type: String, enum: ['saas', 'ai', 'devtools', 'health', 'other'], default: 'other' },
  techStack: [String],
  liveUrl: String,
  githubUrl: String,
  screenshots: [String],
  proof: proofSchema,
  featured: { type: Boolean, default: false },
  progress: { type: Number, min: 0, max: 100, default: 100 },
  notes: String,
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
