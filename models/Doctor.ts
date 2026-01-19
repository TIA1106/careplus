import mongoose, { Schema, model, models } from "mongoose";

export interface IDoctor {
  name: string;
  email: string;
  isProfileComplete: boolean;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Doctor || model<IDoctor>("Doctor", DoctorSchema);
