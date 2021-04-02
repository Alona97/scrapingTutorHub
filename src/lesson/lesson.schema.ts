import { Schema } from "mongoose";
import { findOneOrCreate } from "./lesson.statics";

const LessonSchema = new Schema({
    subject: String,
});

LessonSchema.statics.findOneOrCreate = findOneOrCreate;

export default LessonSchema;