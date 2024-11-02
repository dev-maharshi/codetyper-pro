const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StatsSchema = new mongoose.Schema({
  wpm: { type: Number, required: true },
  kpm: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  time: { type: Number, required: true },
  correct: { type: Number, required: true },
  inCorrect: { type: Number, required: true }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stats: { type: [StatsSchema], default: [] }
});



UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema); 
