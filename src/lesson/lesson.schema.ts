import { Schema } from "mongoose";
import { findOneOrCreate } from "./lesson.statics";

const LessonSchema = new Schema({
    subject: String,
    city: String,
    minAgeRange: Number,
    maxAgeRange: Number,
    classType: String,
});

LessonSchema.statics.findOneOrCreate = findOneOrCreate;

export default LessonSchema;