const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  }
  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
