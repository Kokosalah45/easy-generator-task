import { FilterQuery, Model } from 'mongoose';
import { IBaseRepository } from '../interfaces/IBaseRepository';

export abstract class MongoRepository<T> implements IBaseRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async create(data: T): Promise<T> {
    const doc = await this._repository.create(data);
    return doc;
  }
  async update(id: string, data: T): Promise<T> {
    const doc = await this._repository.findByIdAndUpdate(id, data, {
      new: true,
    });
    return doc;
  }
  async delete(id: string): Promise<T> {
    const doc = await this._repository.findByIdAndDelete(id);
    return doc;
  }
  async findAll(): Promise<T[]> {
    const docs = await this._repository.find().populate(this._populateOnFind);
    return docs;
  }
  async findById(id: string): Promise<T> {
    const doc = await this._repository
      .findById(id)
      .populate(this._populateOnFind);
    return doc;
  }
  async findByField(field: string, value: string): Promise<T> {
    const filter = {
      [field]: value,
    } as FilterQuery<T>;

    const doc = await this._repository
      .findOne(filter)
      .populate(this._populateOnFind);

    return doc;
  }
  async findByFields(fields: object): Promise<T> {
    const doc = await this._repository
      .findOne(fields)
      .populate(this._populateOnFind);
    return doc;
  }
  async findManyByField(field: string, value: string): Promise<T[]> {
    const filter = {
      [field]: value,
    } as FilterQuery<T>;

    const docs = await this._repository
      .find(filter)
      .populate(this._populateOnFind);

    return docs;
  }
  async findManyByFields(fields: object): Promise<T[]> {
    const docs = await this._repository
      .find(fields)
      .populate(this._populateOnFind);
    return docs;
  }

  async count(): Promise<number> {
    const count = await this._repository.countDocuments();
    return count;
  }
}
