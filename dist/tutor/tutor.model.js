"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorModel = void 0;
const mongoose_1 = require("mongoose");
const tutor_schema_1 = require("./tutor.schema");
exports.TutorModel = mongoose_1.model("teachers", tutor_schema_1.default);
//# sourceMappingURL=tutor.model.js.map