import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const User = new Schema({
  userName: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  confirmPassword: { type: String, require: true },
  avatar: { type: String },
  role: { type: String },
  plan: { type: Object },
});

export default model('User', User);
