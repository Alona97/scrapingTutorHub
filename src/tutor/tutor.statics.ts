import { ITutorDocument, ITutorModel } from "./tutor.types";
export async function findOneOrCreate(
  this: ITutorModel,
  userId: string
): Promise<ITutorDocument> {
  const record = await this.findOne({ userId });
  if (record) {
    return record;
  } else {
    return this.create({ userId });
  }
}

export async function findByAge(
  this: ITutorModel,
  min?: number,
  max?: number
): Promise<ITutorDocument[]> {
  return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}