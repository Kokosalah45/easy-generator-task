export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findByField(field: string, value: string): Promise<T>;
  findByFields(fields: object): Promise<T>;
  findManyByField(field: string, value: string): Promise<T[]>;
  findManyByFields(fields: object): Promise<T[]>;
  count(): Promise<number>;
}
