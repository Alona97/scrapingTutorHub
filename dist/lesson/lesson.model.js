"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModel = void 0;
const mongoose_1 = require("mongoose");
const lesson_schema_1 = require("./lesson.schema");
exports.LessonModel = mongoose_1.model("lessons", lesson_schema_1.default);
//# sourceMappingURL=lesson.model.js.map