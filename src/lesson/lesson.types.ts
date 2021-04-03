import { Model, Document } from "mongoose";

export interface Lesson {
    subject: string;
    city?: string;
    minAgeRange?: number;
    maxAgeRange?: number;
    classType?: string;
}


export interface ILessonDocument extends Lesson, Document { }
export interface ILessonModel extends Model<ILessonDocument> { }