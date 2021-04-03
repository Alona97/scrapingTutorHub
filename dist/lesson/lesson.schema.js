"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lesson_statics_1 = require("./lesson.statics");
const LessonSchema = new mongoose_1.Schema({
    subject: String,
    city: String,
    minAgeRange: Number,
    maxAgeRange: Number,
    classType: String,
});
LessonSchema.statics.findOneOrCreate = lesson_statics_1.findOneOrCreate;
exports.default = LessonSchema;
//# sourceMappingURL=lesson.schema.js.map