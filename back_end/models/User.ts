import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript pour le type User
export interface IUser extends Document {
  email: string;
  password: string;
}

// Schéma Mongoose pour les utilisateurs
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
