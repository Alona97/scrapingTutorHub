import { model } from "mongoose";
import { ITutorDocument } from "./tutor.types";
import TutorSchema from "./tutor.schema";
export const TutorModel = model<ITutorDocument>("teachers", TutorSchema);