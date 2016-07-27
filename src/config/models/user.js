import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const PollSchema = new mongoose.Schema({
  value: {type: Number, default: 0},
  color: String,
  highlight: String,
  label: String,
  createdAt: {type: Date, default: Date.now}
});

const PollsSchema = new mongoose.Schema({
    title: String,
    publicDisplay: Boolean,
    poll: [PollSchema]
});


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  polls: [PollsSchema]
});


UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) next(err);
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});


UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
