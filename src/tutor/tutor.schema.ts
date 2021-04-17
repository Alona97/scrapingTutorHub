import { Schema } from "mongoose";
import { findOneOrCreate, findByAge } from "./tutor.statics";

const TutorSchema = new Schema({
    name: String,
    education: String,
    score: Number,
    availability: Boolean,
    tutoringSubjects: [{
        type: String
    }],
    areas: [{
        type: String
    }],
    phone: String
});

TutorSchema.statics.findOneOrCreate = findOneOrCreate;
TutorSchema.statics.findByAge = findByAge;

export default TutorSchema;