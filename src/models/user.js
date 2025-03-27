import { model, Schema } from 'mongoose';
import { ROLES } from '../constants/index.js';

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.TEACHER, ROLES.PARENT],
      default: ROLES.TEACHER,
    },
  },
  { timestamps: true, versionKey: false },
);
User.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', User);
