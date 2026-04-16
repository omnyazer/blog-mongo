const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidatorPackage = require('mongoose-unique-validator');
const uniqueValidator = uniqueValidatorPackage.default || uniqueValidatorPackage;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
