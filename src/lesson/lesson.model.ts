import { model } from "mongoose";
import { ILessonDocument } from "./lesson.types";
import LessonSchema from "./lesson.schema";
export const LessonModel = model<ILessonDocument>("lessons", LessonSchema);