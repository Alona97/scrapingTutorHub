import { Model, Document} from "mongoose";

export interface Tutor {
    name: string;
    score: number;
    education: string;
    tutoringSubjects: Array<string>;
    availability: string;
}


export interface ITutorDocument extends Tutor, Document {}
export interface ITutorModel extends Model<ITutorDocument> {}
