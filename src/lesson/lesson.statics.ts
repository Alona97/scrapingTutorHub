import { ILessonDocument, ILessonModel } from "./lesson.types";
export async function findOneOrCreate(
  this: ILessonModel,
  userId: string
): Promise<ILessonDocument> {
  const record = await this.findOne({ userId });
  if (record) {
    return record;
  } else {
    return this.create({ userId });
  }
}

export async function findByAge(
  this: ILessonModel,
  min?: number,
  max?: number
): Promise<ILessonDocument[]> {
  return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}