import { Model, Document} from "mongoose";

export interface Lesson {
    subject: string;
}


export interface ILessonDocument extends Lesson, Document {}
export interface ILessonModel extends Model<ILessonDocument> {}