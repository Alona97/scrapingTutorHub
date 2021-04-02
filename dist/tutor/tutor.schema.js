"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutor_statics_1 = require("./tutor.statics");
const TutorSchema = new mongoose_1.Schema({
    name: String,
    education: String,
    score: Number,
    availability: String,
    tutoringSubjects: [{
            type: String
        }],
    areas: [{
            type: Number
        }],
});
TutorSchema.statics.findOneOrCreate = tutor_statics_1.findOneOrCreate;
TutorSchema.statics.findByAge = tutor_statics_1.findByAge;
exports.default = TutorSchema;
//# sourceMappingURL=tutor.schema.js.map