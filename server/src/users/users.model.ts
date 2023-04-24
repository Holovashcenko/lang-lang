import * as mongoose from 'mongoose';
import { Role } from 'src/roles/role.enum';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin', 'superadmin'],
      default: 'student',
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}
